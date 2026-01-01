"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  HardDrive,
  Server,
  XCircle
} from "lucide-react";
import { databaseService, type DatabaseStatus, type Backup, type BackupSchedule } from '@/services/database.service';

export default function DatabaseBackupPage() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [databaseStatus, setDatabaseStatus] = useState<DatabaseStatus | null>(null);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [backupSchedule, setBackupSchedule] = useState<BackupSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [statusData, backupsData, scheduleData] = await Promise.all([
        databaseService.getDatabaseStatus(),
        databaseService.getBackups(),
        databaseService.getBackupSchedule()
      ]);
      setDatabaseStatus(statusData);
      setBackups(backupsData);
      setBackupSchedule(scheduleData);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async () => {
    try {
      setIsBackingUp(true);
      setBackupProgress(0);
      setError(null);

      // Simulate progress while waiting for API response
      const progressInterval = setInterval(() => {
        setBackupProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await databaseService.createBackup();
      
      clearInterval(progressInterval);
      setBackupProgress(100);
      
      setTimeout(() => {
        setIsBackingUp(false);
        setBackupProgress(0);
        fetchData(); // Refresh backups list
      }, 1000);

      console.log('Backup created:', result);
    } catch (err) {
      setIsBackingUp(false);
      setBackupProgress(0);
      setError('Backup failed');
      console.error('Backup error:', err);
    }
  };

  const handleRestore = async () => {
    try {
      setError(null);
      const result = await databaseService.restoreDatabase();
      console.log('Database restored:', result);
      fetchData(); // Refresh data after restore
    } catch (err) {
      setError('Restore failed');
      console.error('Restore error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl mb-2">Database & Backup</h1>
          <p className="text-muted-foreground">
            Manage database backups, restoration, and maintenance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRestore}>
            <Upload className="w-4 h-4 mr-2" />
            Restore
          </Button>
          <Button onClick={handleBackup} disabled={isBackingUp}>
            {isBackingUp ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {isBackingUp ? "Creating Backup..." : "Create Backup"}
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-red-800">
              <XCircle className="text-red-500" size={20} />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && !error && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="animate-spin" size={20} />
              <span>Loading database information...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {isBackingUp && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Backup Progress</span>
                <span>{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="text-green-500" size={20} />
              Database Status
            </CardTitle>
            <CardDescription>Current database health and metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {databaseStatus ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {databaseStatus.status === 'healthy' ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <AlertTriangle className="text-red-500" size={20} />
                    )}
                    <div>
                      <p className="font-medium">Connection Status</p>
                      <p className="text-sm text-muted-foreground capitalize">{databaseStatus.status}</p>
                    </div>
                  </div>
                  <Badge className={databaseStatus.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'}>
                    {databaseStatus.connection}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HardDrive className="text-blue-500" size={20} />
                    <div>
                      <p className="font-medium">Storage Used</p>
                      <p className="text-sm text-muted-foreground">{databaseStatus.storage.used} / {databaseStatus.storage.total}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500">{databaseStatus.storage.percentage}%</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Server className="text-purple-500" size={20} />
                    <div>
                      <p className="font-medium">Active Connections</p>
                      <p className="text-sm text-muted-foreground">{databaseStatus.activeConnections} connections</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-500">{databaseStatus.activeConnections}</Badge>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">No database status available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-yellow-500" size={20} />
              Backup Schedule
            </CardTitle>
            <CardDescription>Automated backup configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {backupSchedule ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Backups</p>
                    <p className="text-sm text-muted-foreground">{backupSchedule.daily.description}</p>
                  </div>
                  <Badge className={backupSchedule.daily.enabled ? 'bg-green-500' : 'bg-gray-500'}>
                    {backupSchedule.daily.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Backups</p>
                    <p className="text-sm text-muted-foreground">{backupSchedule.weekly.description}</p>
                  </div>
                  <Badge className={backupSchedule.weekly.enabled ? 'bg-green-500' : 'bg-gray-500'}>
                    {backupSchedule.weekly.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Monthly Backups</p>
                    <p className="text-sm text-muted-foreground">{backupSchedule.monthly.description}</p>
                  </div>
                  <Badge className={backupSchedule.monthly.enabled ? 'bg-green-500' : 'bg-gray-500'}>
                    {backupSchedule.monthly.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">No backup schedule available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Backups</CardTitle>
          <CardDescription>Latest database backup history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.length > 0 ? (
              backups.map((backup, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database className={backup.status === 'success' ? 'text-green-500' : 'text-yellow-500'} size={20} />
                    <div>
                      <p className="font-medium">{backup.name}</p>
                      <p className="text-sm text-muted-foreground">{backup.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={backup.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {backup.size}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">No backups available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
