// src/services/activity-logs.service.ts
import { apiClient } from '@/lib/api';

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  type: string;
  status: string;
  timestamp: string;
  time: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
}

export interface ActivityLogStats {
  totalLogs: number;
  successfulLogs: number;
  failedLogs: number;
  authLogs: number;
  successRate: string;
  failureRate: string;
}

export const activityLogsService = {
  getRecentLogs: async (limit: number = 50): Promise<ActivityLog[]> => {
    const response = await apiClient.get<ActivityLog[]>(`/activity-logs/recent?limit=${limit}`);
    return response.data;
  },

  getLogStats: async (): Promise<ActivityLogStats> => {
    const response = await apiClient.get<ActivityLogStats>('/activity-logs/stats');
    return response.data;
  },

  createLog: async (): Promise<any> => {
    const response = await apiClient.post('/activity-logs/create');
    return response.data;
  },

  cleanupOldLogs: async (days: number = 30): Promise<any> => {
    const response = await apiClient.delete(`/activity-logs/cleanup?days=${days}`);
    return response.data;
  },
};
