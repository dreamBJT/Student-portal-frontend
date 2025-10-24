import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Users, CheckCircle, Ban, RefreshCw, Eye, Edit, Trash } from "lucide-react";

export default function StudentsPage() {
  const stats = {
    total: { count: 4156, note: "+12% from last year" },
    active: { count: 4142, note: "99.7% of total" },
    suspended: { count: 14, note: "Disciplinary actions" },
  };

  const students = [
    {
      id: "IU20218001",
      name: "John Doe",
      department: "Computer Science",
      year: "Year 3",
      email: "john.doe@injibara.edu.et",
      status: { label: "Active", color: "bg-green-500" },
    },
    {
      id: "IU20218082",
      name: "Sarah Smith",
      department: "Business Administration",
      year: "Year 3",
      email: "sarah.smith@injibara.edu.et",
      status: { label: "Active", color: "bg-green-500" },
    },
    {
      id: "IU20212015",
      name: "Michael Chen",
      department: "Engineering",
      year: "Year 2",
      email: "michael.chen@injibara.edu.et",
      status: { label: "Active", color: "bg-green-500" },
    },
    {
      id: "IU20211045",
      name: "Emma Rodriguez",
      department: "Medicine",
      year: "Year 1",
      email: "emma.rodriguez@injibara.edu.et",
      status: { label: "Suspended", color: "bg-red-500" },
    },
    {
      id: "IU20209001",
      name: "David Kim",
      department: "Engineering",
      year: "Year 4",
      email: "david.kim@injibara.edu.et",
      status: { label: "Active", color: "bg-green-500" },
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
            <BreadcrumbPage>Student Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-blue-100 text-blue-900">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-gray-500">Manage student records and registrations</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm">Total Students</div>
              <div className="text-3xl font-bold">{stats.total.count.toLocaleString()}</div>
              <div className="text-green-600 text-xs">{stats.total.note}</div>
            </div>
            <RefreshCw className="w-8 h-8 text-blue-800" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm">Active Students</div>
              <div className="text-3xl font-bold">{stats.active.count.toLocaleString()}</div>
              <div className="text-gray-600 text-xs">{stats.active.note}</div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm">Suspended</div>
              <div className="text-3xl font-bold">{stats.suspended.count}</div>
              <div className="text-gray-600 text-xs">{stats.suspended.note}</div>
            </div>
            <Ban className="w-8 h-8 text-red-500" />
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <Input placeholder="Search by name, ID, or email..." className="h-11" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select>
            <SelectTrigger className="w-44 h-11">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="ba">Business Administration</SelectItem>
              <SelectItem value="eng">Engineering</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32 h-11">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="y1">Year 1</SelectItem>
              <SelectItem value="y2">Year 2</SelectItem>
              <SelectItem value="y3">Year 3</SelectItem>
              <SelectItem value="y4">Year 4</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-36 h-11">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium h-11">+ Add Student</Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Student Records</h2>
              <p className="text-sm text-gray-500">Showing {students.length} of {students.length} students</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-600 border-b">
                <tr>
                  <th className="pb-3">Student ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-4">{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.department}</td>
                    <td>{s.year}</td>
                    <td className="whitespace-nowrap">{s.email}</td>
                    <td>
                      <span className={`inline-block text-white text-xs px-2 py-1 rounded ${s.status.color}`}>
                        {s.status.label}
                      </span>
                    </td>
                    <td className="flex items-center gap-2 py-2">
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
