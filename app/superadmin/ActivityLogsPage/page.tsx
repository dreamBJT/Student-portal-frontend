"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { FileText, Download, Filter } from "lucide-react";

export default function ActivityLogsPage() {
  const activities = [
    { user: "admin@injibara.edu.et", action: "Created new election", time: "5 mins ago", type: "create", status: "success" },
    { user: "john@injibara.edu.et", action: "Cast vote", time: "12 mins ago", type: "vote", status: "success" },
    { user: "system", action: "Database backup", time: "1 hour ago", type: "system", status: "success" },
    { user: "sarah@injibara.edu.et", action: "Failed login attempt", time: "2 hours ago", type: "auth", status: "failed" },
    { user: "mike@injibara.edu.et", action: "Updated news article", time: "3 hours ago", type: "update", status: "success" },
    { user: "admin@injibara.edu.et", action: "Deleted user account", time: "4 hours ago", type: "delete", status: "success" },
    { user: "system", action: "Security scan completed", time: "5 hours ago", type: "system", status: "success" },
    { user: "jane@injibara.edu.et", action: "Profile updated", time: "6 hours ago", type: "update", status: "success" },
  ];

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

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-blue-500" size={20} />
              Total Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,247</div>
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
            <div className="text-3xl font-bold">1,189</div>
            <p className="text-sm text-muted-foreground">95.3% success rate</p>
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
            <div className="text-3xl font-bold">58</div>
            <p className="text-sm text-muted-foreground">4.7% failure rate</p>
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
            <div className="text-3xl font-bold">23</div>
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
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <Badge className={getTypeColor(activity.type)}>
                    {getTypeLabel(activity.type)}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={activity.status === "success" ? "bg-green-500" : "bg-red-500"}>
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            Load More Activities
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}