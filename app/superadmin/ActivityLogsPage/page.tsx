"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { FileText, Download, Filter, RefreshCw, XCircle } from "lucide-react";
import { activityLogsService, type ActivityLog, type ActivityLogStats } from '@/services/activity-logs.service';

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<ActivityLogStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [logsData, statsData] = await Promise.all([
        activityLogsService.getRecentLogs(50),
        activityLogsService.getLogStats()
      ]);
      setLogs(logsData);
      setStats(statsData);
    } catch (err) {
      setError('Failed to fetch activity logs');
      console.error('Error fetching activity logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "create": return "bg-green-500";
      case "update": return "bg-blue-500";
      case "delete": return "bg-red-500";
      case "auth": return "bg-yellow-500";
      case "vote": return "bg-purple-500";
      case "system": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "create": return "Create";
      case "update": return "Update";
      case "delete": return "Delete";
      case "auth": return "Auth";
      case "vote": return "Vote";
      case "system": return "System";
      default: return "Other";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl mb-2">Activity Logs</h1>
          <p className="text-muted-foreground">
            Monitor system activities and user actions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={fetchData}>
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button className="gap-2">
            <Download size={16} />
            Export
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
              <span>Loading activity logs...</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-blue-500" size={20} />
              Total Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalLogs || 0}</div>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-green-500">Success</Badge>
              Successful
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.successfulLogs || 0}</div>
            <p className="text-sm text-muted-foreground">{stats?.successRate || '0'}% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-red-500">Failed</Badge>
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.failedLogs || 0}</div>
            <p className="text-sm text-muted-foreground">{stats?.failureRate || '0'}% failure rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-yellow-500">Auth</Badge>
              Auth Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.authLogs || 0}</div>
            <p className="text-sm text-muted-foreground">Login attempts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest system and user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <Badge className={getTypeColor(log.type)}>
                      {getTypeLabel(log.type)}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={log.status === "success" ? "bg-green-500" : "bg-red-500"}>
                      {log.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500 font-medium">No activity logs found</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Activity logs will appear here once users start interacting with the system.
                  </p>
                </div>
              </div>
            )}
          </div>
          {logs.length > 0 && (
            <Button variant="outline" className="w-full mt-4">
              Load More Activities
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}