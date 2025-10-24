import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  ClipboardList,
  Newspaper,
  Trophy,
  Eye,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Database,
  Server,
  Cloud,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboard() {
  return (
      <>
        <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">
          Welcome back! Here's what's happening with your system today.
        </p>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-4 flex items-center justify-between">
            <CardContent>
              <p className="text-sm text-gray-500">Total Students</p>
              <h2 className="text-3xl font-semibold">4,156</h2>
              <p className="text-green-600 text-xs">+12%</p>
            </CardContent>
            <Users className="w-10 h-10 text-blue-800" />
          </Card>
          <Card className="p-4 flex items-center justify-between">
            <CardContent>
              <p className="text-sm text-gray-500">Elections</p>
              <h2 className="text-3xl font-semibold">3</h2>
              <p className="text-green-600 text-xs">+1 this month</p>
            </CardContent>
            <ClipboardList className="w-10 h-10 text-yellow-500" />
          </Card>
          <Card className="p-4 flex items-center justify-between">
            <CardContent>
              <p className="text-sm text-gray-500">News Posts</p>
              <h2 className="text-3xl font-semibold">27</h2>
              <p className="text-green-600 text-xs">+5 this week</p>
            </CardContent>
            <Newspaper className="w-10 h-10 text-blue-700" />
          </Card>
          <Card className="p-4 flex items-center justify-between">
            <CardContent>
              <p className="text-sm text-gray-500">Leaders</p>
              <h2 className="text-3xl font-semibold">12</h2>
              <p className="text-gray-600 text-xs">All positions filled</p>
            </CardContent>
            <Trophy className="w-10 h-10 text-yellow-500" />
          </Card>
        </div>

        {/* Mid Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Election Management */}
          <Card className="col-span-2">
            <CardContent className="p-4">
              <div className="flex justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold">Election Management</h2>
                  <p className="text-sm text-gray-500">
                    Manage and monitor ongoing elections
                  </p>
                </div>
                <Button className="bg-blue-900 hover:bg-blue-800">
                  View All
                </Button>
              </div>

              <table className="w-full text-sm">
                <thead className="text-left text-gray-600 border-b">
                  <tr>
                    <th className="pb-2">Name</th>
                    <th>Status</th>
                    <th>Votes</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "2025 Student President",
                      status: "Active",
                      color: "bg-green-500",
                      votes: 2847,
                      date: "Oct 16, 2025",
                    },
                    {
                      name: "2025 Vice President",
                      status: "Scheduled",
                      color: "bg-blue-500",
                      votes: 0,
                      date: "Nov 5, 2025",
                    },
                    {
                      name: "2024 President",
                      status: "Completed",
                      color: "bg-gray-500",
                      votes: 3921,
                      date: "May 15, 2024",
                    },
                  ].map((election, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2">{election.name}</td>
                      <td>
                        <span
                          className={`text-white text-xs px-2 py-1 rounded ${election.color}`}
                        >
                          {election.status}
                        </span>
                      </td>
                      <td>{election.votes}</td>
                      <td>{election.date}</td>
                      <td className="flex gap-2">
                        <Eye className="w-4 h-4 cursor-pointer" />
                        <Edit className="w-4 h-4 cursor-pointer" />
                        <Trash className="w-4 h-4 cursor-pointer text-red-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Live Votes */}
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-1">Live Votes</h2>
              <p className="text-gray-500 text-sm mb-3">
                Total votes in active elections
              </p>
              <h3 className="text-3xl font-bold">2,847</h3>
              <div className="w-full bg-gray-200 h-2 rounded mt-2">
                <div className="bg-blue-900 h-2 rounded w-[68%]"></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">68.5% turnout rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-4">
          {/* Candidate Approval */}
          <Card className="col-span-2">
            <CardContent className="p-4">
              <div className="flex justify-between mb-3">
                <h2 className="text-lg font-semibold">
                  Candidate Approval Queue
                </h2>
                <span className="text-blue-700 text-sm font-medium">
                  2 Pending
                </span>
              </div>
              {[
                {
                  name: "Michael Chen",
                  role: "Student President",
                  dept: "Engineering",
                },
                {
                  name: "Emma Rodriguez",
                  role: "Vice President",
                  dept: "Business",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b last:border-0 py-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYwMzczMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-gray-500">
                        {c.role} — {c.dept}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button className="bg-gray-200 text-black hover:bg-gray-300 text-sm px-3 py-1 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </Button>
                    <Button className="bg-blue-100 text-blue-900 hover:bg-blue-200 text-sm px-3 py-1">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right Sidebar Stats */}
          <div className="space-y-4">
            {/* Active Users */}
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-1">Active Users</h2>
                <h3 className="text-3xl font-bold">234</h3>
                <p className="text-gray-500 text-sm">Currently online</p>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <p>Students: 212</p>
                  <p>Admins: 22</p>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">System Health</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-800" />
                      Database
                    </span>
                    <CheckCircle className="text-green-500 w-4 h-4" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-blue-800" />
                      Server
                    </span>
                    <CheckCircle className="text-green-500 w-4 h-4" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-blue-800" />
                      API Service
                    </span>
                    <CheckCircle className="text-green-500 w-4 h-4" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-blue-800" />
                      Backup
                    </span>
                    <XCircle className="text-yellow-500 w-4 h-4" />
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    New Students Today: <span className="font-medium">23</span>
                  </li>
                  <li>
                    Votes Cast Today: <span className="font-medium">234</span>
                  </li>
                  <li>
                    News Views Today: <span className="font-medium">1,456</span>
                  </li>
                  <li>
                    System Uptime: <span className="font-medium">99.9%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* News Management */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between mb-3">
              <h2 className="text-lg font-semibold">News Management</h2>
              <Button className="bg-blue-900 hover:bg-blue-800">
                Manage News
              </Button>
            </div>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-600 border-b">
                <tr>
                  <th className="pb-2">Title</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    title: "Presidential Election 2025 Opens",
                    views: 1234,
                    status: "Published",
                    color: "bg-green-500",
                  },
                  {
                    title: "Town Hall Q&A Session",
                    views: 987,
                    status: "Published",
                    color: "bg-green-500",
                  },
                  {
                    title: "Voting Guidelines Update",
                    views: 0,
                    status: "Draft",
                    color: "bg-yellow-500",
                  },
                ].map((news, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2">{news.title}</td>
                    <td>{news.views}</td>
                    <td>
                      <span
                        className={`text-white text-xs px-2 py-1 rounded ${news.color}`}
                      >
                        {news.status}
                      </span>
                    </td>
                    <td className="flex gap-2">
                      <Edit className="w-4 h-4 cursor-pointer" />
                      <Trash className="w-4 h-4 cursor-pointer text-red-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </>
  );
}
