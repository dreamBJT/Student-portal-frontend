"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import { Settings, Database, Shield, Bell, Globe, AlertTriangle } from "lucide-react";

export default function SystemSettingsPage() {
  const [values, setValues] = useState({
    maintenance: false,
  });

  const onSave = () => {
    // Handle save logic
    console.log("Saving settings:", values);
  };

  const onRestore = () => {
    // Handle restore defaults
    setValues({ maintenance: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl mb-2">System Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide settings and preferences
          </p>
        </div>
        <Button className="gap-2">
          <Settings size={16} />
          Save Changes
        </Button>
      </div>

      {/* Maintenance Mode Card - Full Width */}
      <Card className="w-full">
        <CardContent className="p-5 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Maintenance Mode</h2>
            <p className="text-sm text-gray-500">Enable maintenance mode to restrict system access</p>
          </div>

          <div className="flex items-start gap-3 rounded-md bg-yellow-50 text-yellow-900 border border-yellow-200 p-3">
            <AlertTriangle className="w-5 h-5 mt-0.5" />
            <p className="text-sm">
              <span className="font-medium">Warning:</span> Enabling maintenance mode will prevent students from accessing the system.
              Only administrators will be able to log in.
            </p>
          </div>

          <div
            className={`flex items-center justify-between rounded-md border p-3 ${
              values.maintenance
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            <div className={`text-sm ${values.maintenance ? "text-red-700" : "text-green-700"}`}>
              {values.maintenance ? "● System is in maintenance mode" : "● System is operational"}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${values.maintenance ? "text-red-700" : "text-gray-600"}`}>Maintenance Mode</span>
              <Switch
                checked={values.maintenance}
                onCheckedChange={(checked) => setValues((v) => ({ ...v, maintenance: !!checked }))}
                aria-label="Maintenance Mode"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={onRestore}>Restore Defaults</Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium" onClick={onSave}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="text-blue-500" size={20} />
              General Settings
            </CardTitle>
            <CardDescription>Basic system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">Enable maintenance mode for all users</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">User Registration</p>
                <p className="text-sm text-muted-foreground">Allow new user registrations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Send system notification emails</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="text-green-500" size={20} />
              Database Settings
            </CardTitle>
            <CardDescription>Database configuration and maintenance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automatic Backups</p>
                <p className="text-sm text-muted-foreground">Daily database backups</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Query Optimization</p>
                <p className="text-sm text-muted-foreground">Enable query performance optimization</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Connection Pooling</p>
                <p className="text-sm text-muted-foreground">Use database connection pooling</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Read Replicas</p>
                <p className="text-sm text-muted-foreground">Enable read replica databases</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-red-500" size={20} />
              Security Settings
            </CardTitle>
            <CardDescription>Security and access control configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-muted-foreground">Auto-logout after inactivity (minutes)</p>
              </div>
              <Badge className="bg-blue-500">30 min</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password Policy</p>
                <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">IP Whitelist</p>
                <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Audit Logging</p>
                <p className="text-sm text-muted-foreground">Log all administrative actions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="text-yellow-500" size={20} />
              Notification Settings
            </CardTitle>
            <CardDescription>Email and system notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Alerts</p>
                <p className="text-sm text-muted-foreground">Critical system notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">User Registration Alerts</p>
                <p className="text-sm text-muted-foreground">New user registration notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-muted-foreground">Failed login and security events</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Weekly system usage reports</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Current system status and version information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="font-medium">System Version</p>
              <p className="text-2xl font-bold text-blue-600">v2.1.0</p>
              <p className="text-sm text-muted-foreground">Latest stable release</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Database Version</p>
              <p className="text-2xl font-bold text-green-600">Mongodb Atlas latest</p>
              <p className="text-sm text-muted-foreground">Up to date</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Last Backup</p>
              <p className="text-2xl font-bold text-purple-600">3 hours ago</p>
              <p className="text-sm text-muted-foreground">Successful backup</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}