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
import { Switch } from "@/components/ui/switch";
import {
  Lock,
  Shield,
  AlertTriangle,
  Eye,
  Key,
  Users,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function SecurityPage() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: true,
    ipWhitelist: false,
    auditLogging: true,
    passwordPolicy: true,
    failedLoginLockout: true,
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl mb-2">Security Center</h1>
          <p className="text-muted-foreground">
            Manage system security settings and access controls
          </p>
        </div>
        <Button>
          <Shield className="w-4 h-4 mr-2" />
          Run Security Scan
        </Button>
      </div>

      {/* Security Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500" size={24} />
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-muted-foreground">Security Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="text-blue-500" size={24} />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-yellow-500" size={24} />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Security Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="text-purple-500" size={24} />
              <div>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-sm text-muted-foreground">Last Scan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="text-red-500" size={20} />
              Authentication Settings
            </CardTitle>
            <CardDescription>User authentication and access control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
              </div>
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500">30 min</Badge>
                <Switch
                  checked={securitySettings.sessionTimeout}
                  onCheckedChange={(checked) => handleSettingChange('sessionTimeout', checked)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Failed Login Lockout</p>
                <p className="text-sm text-muted-foreground">Lock account after failed attempts</p>
              </div>
              <Switch
                checked={securitySettings.failedLoginLockout}
                onCheckedChange={(checked) => handleSettingChange('failedLoginLockout', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-green-500" size={20} />
              Access Control
            </CardTitle>
            <CardDescription>Network and access restrictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">IP Whitelist</p>
                <p className="text-sm text-muted-foreground">Restrict access to specific IPs</p>
              </div>
              <Switch
                checked={securitySettings.ipWhitelist}
                onCheckedChange={(checked) => handleSettingChange('ipWhitelist', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Strong Password Policy</p>
                <p className="text-sm text-muted-foreground">Enforce password requirements</p>
              </div>
              <Switch
                checked={securitySettings.passwordPolicy}
                onCheckedChange={(checked) => handleSettingChange('passwordPolicy', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Audit Logging</p>
                <p className="text-sm text-muted-foreground">Log all administrative actions</p>
              </div>
              <Switch
                checked={securitySettings.auditLogging}
                onCheckedChange={(checked) => handleSettingChange('auditLogging', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="text-orange-500" size={20} />
            Recent Security Events
          </CardTitle>
          <CardDescription>Latest security-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: "login", user: "admin@university.edu", action: "Successful login", time: "2 minutes ago", status: "success" },
              { type: "failed", user: "unknown", action: "Failed login attempt", time: "5 minutes ago", status: "warning" },
              { type: "password", user: "student@university.edu", action: "Password changed", time: "1 hour ago", status: "success" },
              { type: "permission", user: "admin@university.edu", action: "Permission modified", time: "2 hours ago", status: "info" },
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {event.status === 'success' && <CheckCircle className="text-green-500" size={16} />}
                  {event.status === 'warning' && <AlertTriangle className="text-yellow-500" size={16} />}
                  {event.status === 'info' && <Eye className="text-blue-500" size={16} />}
                  <div>
                    <p className="font-medium">{event.action}</p>
                    <p className="text-sm text-muted-foreground">{event.user} • {event.time}</p>
                  </div>
                </div>
                <Badge className={
                  event.status === 'success' ? 'bg-green-500' :
                  event.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }>
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
