export interface User {
  _id?: string;
  id?: number;
  username?: string;
  name?: string;
  email: string;
  role: string;
  permissions?: {
    elections: { create: boolean; edit: boolean; delete: boolean };
    news: { create: boolean; edit: boolean; delete: boolean };
    users: { create: boolean; edit: boolean; delete: boolean };
  };
  status?: 'Active' | 'Inactive' | 'Suspended';
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  password?: string;
  __v?: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: 'student' | 'admin' | 'superadmin';
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
  status?: 'Active' | 'Inactive' | 'Suspended';
  permissions?: {
    elections: { create: boolean; edit: boolean; delete: boolean };
    news: { create: boolean; edit: boolean; delete: boolean };
    users: { create: boolean; edit: boolean; delete: boolean };
  };
}
