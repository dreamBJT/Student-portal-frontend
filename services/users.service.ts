// src/services/users.service.ts
import { apiClient } from '@/lib/api';
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/user';

export const usersService = {
  // Create user (superAdmin only, protected)
  createUserBySuperAdmin: async (userData: CreateUserRequest): Promise<User> => {
    try {
      console.log('Creating user with data:', {
        ...userData,
        password: '[REDACTED]' // Don't log the password
      });

      // Use username and lowercase role format based on auth service expectations
      const requestData = {
        username: userData.name, // Backend expects username field
        email: userData.email,
        role: userData.role.toLowerCase(), // Backend expects lowercase roles
        password: userData.password
      };

      console.log('Sending request with corrected format:', {
        ...requestData,
        password: '[REDACTED]'
      });

      const response = await apiClient.post<User>('/users/create-by-superadmin', requestData);
      console.log('User creation successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('User creation failed:', error);
      console.error('Request config:', error.config);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      console.error('Request data sent:', {
        ...userData,
        password: '[REDACTED]'
      });

      // If still failing, provide helpful error message
      if (error.response?.status === 500) {
        console.error('Backend returned 500 error. Possible issues:');
        console.error('1. Database connection issues');
        console.error('2. Required fields missing or incorrect format');
        console.error('3. Role validation failure');
        console.error('4. Email uniqueness constraint violation');
      }

      // Re-throw the original error
      throw error;
    }
  },

  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: number | string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  // Update user information
  updateUser: async (id: number | string, userData: UpdateUserRequest): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number | string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
