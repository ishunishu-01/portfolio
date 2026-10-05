import axios from 'axios';

/**
 * Axios instance pre-configured to talk to the Laravel API.
 * Base URL is pulled from .env — set VITE_API_URL in your .env file.
 * Defaults to http://127.0.0.1:8000/api when not set.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept:         'application/json',
  },
  withCredentials: false,
});

// ── Request interceptor (attach token later for admin panel) ──
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// ── Response interceptor (handle 401 globally) ────────────────
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Typed API helpers ─────────────────────────────────────────
export const projectsApi = {
  getAll:  ()     => api.get('/projects'),
  getOne:  (id)   => api.get(`/projects/${id}`),
  create:  (data) => api.post('/projects', data),
  update:  (id, data) => api.put(`/projects/${id}`, data),
  delete:  (id)   => api.delete(`/projects/${id}`),
};

export const skillsApi = {
  getAll: () => api.get('/skills'),
};

export const experiencesApi = {
  getAll: () => api.get('/experiences'),
};

export const educationApi = {
  getAll: () => api.get('/education'),
};

export const certificationsApi = {
  getAll: () => api.get('/certifications'),
};

export const messagesApi = {
  send: (data) => api.post('/messages', data),
};