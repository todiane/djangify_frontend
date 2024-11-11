import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',  // This will use our Next.js rewrite rule
  headers: {
    'Content-Type': 'application/json',
  },
});

// Basic response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Example API functions for your portfolio content
export const portfolioApi = {
  // Get portfolio items
  getProjects: () => api.get('/v1/portfolio/projects/'),

  // Get blog posts
  getBlogPosts: () => api.get('/v1/blog/posts/'),

  // Get single project
  getProject: (slug: string) => api.get(`/v1/portfolio/projects/${slug}/`),

  // Get single blog post
  getBlogPost: (slug: string) => api.get(`/v1/blog/posts/${slug}/`),
};
