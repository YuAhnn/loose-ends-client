import { create } from 'zustand';
import { 
  listTodos,
  createTodo,
  patchTodo,
  deleteTodo
} from '../../api/todo';
import { errorMessage } from '../../api/client';
import { useAuthStore } from '../auth';

function fail(err) {
  if (err.response?.status === 401) {
    useAuthStore.getState().logout();
    return { error: null };
  }
  return { error: errorMessage(err) };
}

export const useTodosStore = create((set, get) => ({
  items: [],
  selectedId: null,
  busy: false,
  error: null,

  async refresh() {
    set({ busy: true, error: null });
    try {
      const items = await listTodos();
      const { selectedId } = get();
      set({
        items,
        busy: false,
        selectedId: items.some((t) => t.id === selectedId) ? selectedId : null,
      });
    } catch (err) {
      set({ busy: false, ...fail(err) });
    }
  },

  select(id) {
    set({ selectedId: id });
  },

  async create(title) {
    set({ busy: true, error: null });
    try {
      const todo = await createTodo({ title });
      set((s) => ({ items: [todo, ...s.items], busy: false }));
      return todo;
    } catch (err) {
      set({ busy: false, ...fail(err) });
      throw err;
    }
  },

  async toggle(id) {
    const item = get().items.find((t) => t.id === id);
    if (!item) return;

    set((s) => ({
      items: s.items.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    }));

    try {
      const updated = await patchTodo(id, { completed: !item.completed });
      set((s) => ({ items: s.items.map((t) => (t.id === id ? updated : t)) }));
    } catch (err) {
      set((s) => ({ items: s.items.map((t) => (t.id === id ? item : t)), ...fail(err) }));
    }
  },

  async rename(id, title) {
    set({ busy: true, error: null });
    try {
      const updated = await patchTodo(id, { title });
      set((s) => ({ items: s.items.map((t) => (t.id === id ? updated : t)), busy: false }));
      return updated;
    } catch (err) {
      set({ busy: false, ...fail(err) });
      throw err;
    }
  },

  async remove(id) {
    set({ busy: true, error: null });
    try {
      await deleteTodo(id);
      set((s) => ({
        items: s.items.filter((t) => t.id !== id),
        selectedId: s.selectedId === id ? null : s.selectedId,
        busy: false,
      }));
    } catch (err) {
      set({ busy: false, ...fail(err) });
    }
  },

  dismissError() {
    set({ error: null });
  },
}));