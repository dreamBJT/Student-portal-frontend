"use client";

import { useState } from "react";
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
  Server
} from "lucide-react";

export default function DatabaseBackupPage() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const handleBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRestore = () => {
    // Handle restore logic
    console.log("Restoring database...");
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={20} />
                <div>
                  <p className="font-medium">Connection Status</p>
                  <p className="text-sm text-muted-foreground">Healthy</p>
                </div>
              </div>
              <Badge className="bg-green-500">Online</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HardDrive className="text-blue-500" size={20} />
                <div>
                  <p className="font-medium">Storage Used</p>
                  <p className="text-sm text-muted-foreground">2.4 GB / 10 GB</p>
                </div>
              </div>
              <Badge className="bg-blue-500">24%</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Server className="text-purple-500" size={20} />
                <div>
                  <p className="font-medium">Active Connections</p>
                  <p className="text-sm text-muted-foreground">12 connections</p>
                </div>
              </div>
              <Badge className="bg-purple-500">12</Badge>
            </div>
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
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Backups</p>
                <p className="text-sm text-muted-foreground">Every day at 2:00 AM</p>
              </div>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Backups</p>
                <p className="text-sm text-muted-foreground">Every Sunday at 3:00 AM</p>
              </div>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Monthly Backups</p>
                <p className="text-sm text-muted-foreground">1st of every month</p>
              </div>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>
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
            {[
              { name: "backup_2025_01_25.sql", size: "2.4 GB", date: "2025-01-25 02:00", status: "success" },
              { name: "backup_2025_01_24.sql", size: "2.3 GB", date: "2025-01-24 02:00", status: "success" },
              { name: "backup_2025_01_23.sql", size: "2.2 GB", date: "2025-01-23 02:00", status: "success" },
              { name: "backup_2025_01_22.sql", size: "2.1 GB", date: "2025-01-22 02:00", status: "warning" },
            ].map((backup, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="text-green-500" size={20} />
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
