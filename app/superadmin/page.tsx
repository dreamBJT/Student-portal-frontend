"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle,
  Server,
  Database,
  Users,
  Activity,
  Clock,
  Info,
  XCircle,
  AlertCircle,
  Cog
} from "lucide-react";

// Main Dashboard Component
export default function SuperAdminPage() {
  const systemStats = [
    { label: "CPU Usage", value: 45, unit: "%", icon: Server, color: "text-blue-500" },
    { label: "Memory", value: 62, unit: "%", icon: Database, color: "text-green-500" },
    { label: "Active Users", value: 234, unit: "", icon: Users, color: "text-purple-500" },
    { label: "System Uptime", value: 99.9, unit: "%", icon: Activity, color: "text-emerald-500" }
  ];

  const recentActivities = [
    { user: "admin@injibara.edu.et", action: "Created new election", time: "5 mins ago", status: "Success" },
    { user: "john@injibara.edu.et", action: "Cast vote", time: "12 mins ago", status: "Success" },
    { user: "system", action: "Database backup", time: "1 hour ago", status: "Success" },
    { user: "sarah@injibara.edu.et", action: "Failed login attempt", time: "2 hours ago", status: "Failed" },
    { user: "mike@injibara.edu.et", action: "Updated news article", time: "3 hours ago", status: "Success" }
  ];

  const systemAlerts = [
    { type: "warning", message: "High CPU usage detected", time: "10 mins ago" },
    { type: "info", message: "Scheduled backup completed", time: "1 hour ago" },
    { type: "success", message: "All systems operational", time: "2 hours ago" }
  ];

  return (
    <div>
      {/* Navbar */}
      <div className="fixed top-0 right-0 left-64 bg-white border-b border-gray-200 px-6 py-4 z-40">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cog className="text-[#00205a] w-6 h-6" />
            <h1 className="text-xl font-semibold text-[#00205a]">
              Super Admin Panel
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {systemAlerts.filter(alert => alert.type === "warning" || alert.type === "error").length} Alerts
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="pt-20 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Monitor system health, user activity, and security status
          </p>
        </div>

        {/* System Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{stat.label}</CardTitle>
                <stat.icon className={stat.color} size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl mb-2">
                  {stat.value}{stat.unit}
                </div>
                <Progress value={stat.value > 100 ? 100 : stat.value} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* System Health */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time system status and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={24} />
                      <div>
                        <p>Database Connection</p>
                        <p className="text-sm text-muted-foreground">Healthy</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={24} />
                      <div>
                        <p>API Services</p>
                        <p className="text-sm text-muted-foreground">All endpoints responding</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="text-yellow-500" size={24} />
                      <div>
                        <p>Email Service</p>
                        <p className="text-sm text-muted-foreground">Processing queue</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500">Busy</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={24} />
                      <div>
                        <p>Backup Service</p>
                        <p className="text-sm text-muted-foreground">Last backup: 3 hours ago</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Ready</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={activity.status === "Success" ? "bg-green-500" : "bg-red-500"}>
                          {activity.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" size={20} />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      {alert.type === "warning" && <AlertTriangle className="text-yellow-500 flex-shrink-0" size={16} />}
                      {alert.type === "info" && <Info className="text-blue-500 flex-shrink-0" size={16} />}
                      {alert.type === "success" && <CheckCircle className="text-green-500 flex-shrink-0" size={16} />}
                      <div>
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Total Users</span>
                    <span>4,156</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Active Elections</span>
                    <span>1</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Storage Used</span>
                    <span>2.4 / 10 GB</span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Resource Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Requests/min</span>
                  <span className="text-sm">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Queries/sec</span>
                  <span className="text-sm">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Sessions</span>
                  <span className="text-sm">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg Response Time</span>
                  <span className="text-sm">45ms</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
