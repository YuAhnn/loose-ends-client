import api from '../client';

async function listTodos() {
  const response = await api.get('/todos');
  return response.data;
}

async function createTodo({ title } = {}) {
  const response = await api.post('/todos', { title });
  return response.data;
}

async function patchTodo(id, patch) {
  const response = await api.patch(`/todos/${id}`, patch);
  return response.data;
}

async function deleteTodo(id) {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
}

export { 
  listTodos,
  createTodo,
  patchTodo,
  deleteTodo
}