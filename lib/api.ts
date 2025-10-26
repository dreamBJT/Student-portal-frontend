// src/lib/api.ts
import axios from "axios";
import { env } from "@/config/env";

// ✅ Export as `apiClient`
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Log request details (excluding sensitive data)
  console.log('API Request:', {
    method: config.method?.toUpperCase(),
    url: config.url,
    headers: {
      ...config.headers,
      Authorization: config.headers.Authorization ? '[TOKEN PRESENT]' : '[NO TOKEN]'
    },
    data: config.data ? {
      ...config.data,
      password: config.data.password ? '[REDACTED]' : undefined
    } : undefined
  });

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log('API Response Success:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Log error responses
    console.log('API Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);