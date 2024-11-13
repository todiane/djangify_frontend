// src/lib/api/base.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // General error handling
    if (error.response) {
      // Handle different status codes if needed
      switch (error.response.status) {
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API error:', error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received');
    } else {
      // Something else went wrong
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
