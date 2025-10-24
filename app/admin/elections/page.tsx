import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ClipboardList, Eye, Edit, Trash } from "lucide-react";

export default function ElectionsPage() {
  const elections = [
    {
      name: "2025 Student President Election",
      position: "President",
      status: { label: "Open", color: "bg-green-500" },
      votes: 2847,
      start: "Oct 10, 2025",
      end: "Oct 16, 2025",
    },
    {
      name: "2025 Vice President Election",
      position: "Vice President",
      status: { label: "Scheduled", color: "bg-blue-600" },
      votes: 0,
      start: "Nov 1, 2025",
      end: "Nov 5, 2025",
    },
    {
      name: "2025 Secretary General Election",
      position: "Secretary",
      status: { label: "Draft", color: "bg-yellow-500 text-black" },
      votes: 0,
      start: "Nov 15, 2025",
      end: "Nov 20, 2025",
    },
    {
      name: "2024 Student President Election",
      position: "President",
      status: { label: "Closed", color: "bg-gray-500" },
      votes: 3921,
      start: "May 10, 2024",
      end: "May 15, 2024",
    },
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Elections</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-blue-100 text-blue-900">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Elections</h1>
            <p className="text-gray-500">Create and manage student elections</p>
          </div>
        </div>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
          + Create New Election
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">All Elections</h2>
            <p className="text-sm text-gray-500">Manage all past, present, and future elections</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-600 border-b">
                <tr>
                  <th className="pb-3">Election Name</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Votes</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {elections.map((e, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-4">{e.name}</td>
                    <td>{e.position}</td>
                    <td>
                      <span className={`inline-block text-white text-xs px-2 py-1 rounded ${e.status.color}`}>
                        {e.status.label}
                      </span>
                    </td>
                    <td>{e.votes.toLocaleString()}</td>
                    <td>{e.start}</td>
                    <td>{e.end}</td>
                    <td className="flex items-center gap-5 py-2">
                      <Eye className="w-4 h-4 cursor-pointer" />
                      <Edit className="w-4 h-4 cursor-pointer" />
                      <Trash className="w-4 h-4 cursor-pointer text-red-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
