"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Switch } from "@/components/ui/switch";
import { Settings, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  type SettingsState = {
    universityName: string;
    phone: string;
    email: string;
    maxCandidates: number;
    defaultDuration: number;
    alerts: { registration: boolean; elections: boolean; news: boolean };
    maintenance: boolean;
  };

  const defaultValues: SettingsState = {
    universityName: "Injibara University",
    phone: "+251-XX-XXX-XXXX",
    email: "info@injibara.edu.et",
    maxCandidates: 10,
    defaultDuration: 7,
    alerts: {
      registration: true,
      elections: true,
      news: true,
    },
    maintenance: false,
  };

  const [values, setValues] = React.useState<SettingsState>({ ...defaultValues });

  const onRestore = () => setValues({ ...defaultValues });
  const onSave = () => {
    // TODO: replace with API call
    console.log("Saving settings", values);
  };

  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>System Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-blue-100 text-blue-900">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-gray-500">Configure system-wide settings and preferences</p>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardContent className="p-5 space-y-5">
          <div>
            <h2 className="text-lg font-semibold">General Settings</h2>
            <p className="text-sm text-gray-500">Basic information about your institution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">University Name</div>
              <Input
                value={values.universityName}
                onChange={(e) => setValues((v) => ({ ...v, universityName: e.target.value }))}
                className="h-11"
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Phone Number</div>
              <Input
                value={values.phone}
                onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                className="h-11"
              />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Contact Email</div>
              <Input
                type="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                className="h-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Election Defaults */}
      <Card>
        <CardContent className="p-5 space-y-5">
          <div>
            <h2 className="text-lg font-semibold">Election Defaults</h2>
            <p className="text-sm text-gray-500">Default settings for new elections</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Maximum Candidates</div>
              <Input
                type="number"
                min={1}
                value={values.maxCandidates}
                onChange={(e) => setValues((v) => ({ ...v, maxCandidates: Number(e.target.value) }))}
                className="h-11"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum candidates allowed per election</p>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Default Duration (days)</div>
              <Input
                type="number"
                min={1}
                value={values.defaultDuration}
                onChange={(e) => setValues((v) => ({ ...v, defaultDuration: Number(e.target.value) }))}
                className="h-11"
              />
              <p className="text-xs text-gray-500 mt-1">Default voting period duration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Notification Settings</h2>
            <p className="text-sm text-gray-500">Manage email alerts and notifications</p>
          </div>

          <div className="flex items-center justify-between py-2 border-b last:border-0">
            <div>
              <div className="font-medium">New Registration Alerts</div>
              <div className="text-sm text-gray-500">Receive email when new students register</div>
            </div>
            <Switch
              checked={values.alerts.registration}
              onCheckedChange={(checked) =>
                setValues((v) => ({ ...v, alerts: { ...v.alerts, registration: !!checked } }))
              }
              aria-label="New Registration Alerts"
            />
          </div>
          <div className="flex items-center justify-between py-2 border-b last:border-0">
            <div>
              <div className="font-medium">Election Alerts</div>
              <div className="text-sm text-gray-500">Notifications for election events and milestones</div>
            </div>
            <Switch
              checked={values.alerts.elections}
              onCheckedChange={(checked) =>
                setValues((v) => ({ ...v, alerts: { ...v.alerts, elections: !!checked } }))
              }
              aria-label="Election Alerts"
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">News Updates</div>
              <div className="text-sm text-gray-500">Alerts when news articles are published</div>
            </div>
            <Switch
              checked={values.alerts.news}
              onCheckedChange={(checked) =>
                setValues((v) => ({ ...v, alerts: { ...v.alerts, news: !!checked } }))
              }
              aria-label="News Updates"
            />
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Mode */}
      <Card>
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
    </div>
  );
}
