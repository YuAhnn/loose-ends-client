import { create } from 'zustand';
import { login, me, logout, register } from '../../api/auth';
import { TOKEN_KEY } from '../../api/client';

function storedToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function persistToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    return;
  }
}

export const useAuthStore = create((set, get) => ({
  token: storedToken(),
  user: null,

  async signIn(username, password) {
    const { token, user } = await login({ username, password });
    persistToken(token);
    set({ token, user });
  },

  async signUp(username, password) {
    const { token, user } = await register({ username, password });
    persistToken(token);
    set({ token, user });
  },

  async loadMe() {
    const { token } = get();
    if (!token) return;
    try {
      set({ user: await me() });
    } catch (err) {
      if (err.response?.status === 401) get().logout();
    }
  },

  async logout() {
    const { token } = get();
    persistToken(null);
    set({ token: null, user: null });
    if (token) {
      try {
        await logout({ token });
      } catch {
        return;
      }
    }
  },
}));