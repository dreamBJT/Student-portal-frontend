// src/services/database.service.ts
import { apiClient } from '@/lib/api';

export interface DatabaseStatus {
  status: string;
  connection: string;
  storage: {
    used: string;
    total: string;
    percentage: number;
  };
  activeConnections: number;
  uptime?: number;
  lastChecked: string;
  error?: string;
}

export interface BackupSchedule {
  daily: {
    enabled: boolean;
    time: string;
    description: string;
  };
  weekly: {
    enabled: boolean;
    time: string;
    description: string;
  };
  monthly: {
    enabled: boolean;
    time: string;
    description: string;
  };
}

export interface DatabaseStats {
  databaseName: string;
  collections: Array<{
    name: string;
    count: number;
    size: number;
    avgObjSize: number;
  }>;
  totalSize: number;
  totalIndexes: number;
  indexSize: number;
  storageSize: number;
}

export interface Backup {
  name: string;
  size: string;
  date: string;
  status: string;
  path?: string;
}

export interface BackupResponse {
  success: boolean;
  message: string;
  filename?: string;
  size?: string;
  timestamp?: string;
}

export const databaseService = {
  getDatabaseStatus: async (): Promise<DatabaseStatus> => {
    const response = await apiClient.get<DatabaseStatus>('/database/status');
    return response.data;
  },

  getDatabaseStats: async (): Promise<DatabaseStats> => {
    const response = await apiClient.get<DatabaseStats>('/database/stats');
    return response.data;
  },

  getBackups: async (): Promise<Backup[]> => {
    const response = await apiClient.get<Backup[]>('/database/backups');
    return response.data;
  },

  createBackup: async (): Promise<BackupResponse> => {
    const response = await apiClient.post<BackupResponse>('/database/backup');
    return response.data;
  },

  restoreDatabase: async (): Promise<BackupResponse> => {
    const response = await apiClient.post<BackupResponse>('/database/restore');
    return response.data;
  },

  getBackupSchedule: async (): Promise<BackupSchedule> => {
    const response = await apiClient.get<BackupSchedule>('/database/schedule');
    return response.data;
  },
};
