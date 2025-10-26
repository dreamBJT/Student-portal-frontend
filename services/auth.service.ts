// src/services/auth.service.ts
import { apiClient } from '@/lib/api';

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    role: 'students' | 'admin' | 'superAdmin';
    studentId?: string;
  };
};

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      username,
      password,
    });
    return response.data;
  },

  register: async (email: string, password: string, name: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  },

  validateToken: async (token: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/validate', {
      token,
    });
    return response.data;
  },
};