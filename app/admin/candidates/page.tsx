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
import { Users, Eye, CheckCircle, XCircle } from "lucide-react";

export default function CandidatesPage() {
  const candidates = [
    {
      name: "Ahmed Hassan",
      position: "President",
      department: "Computer Science",
      year: 2025,
      status: { label: "Approved", color: "bg-green-500" },
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Sarah Johnson",
      position: "President",
      department: "Business Administration",
      year: 2025,
      status: { label: "Approved", color: "bg-green-500" },
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Michael Chen",
      position: "President",
      department: "Engineering",
      year: 2025,
      status: { label: "Pending", color: "bg-yellow-500 text-black" },
      avatar:
        "https://images.unsplash.com/photo-1607346256330-dee7af15f7d3?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Emma Rodriguez",
      position: "Vice President",
      department: "Business",
      year: 2025,
      status: { label: "Pending", color: "bg-yellow-500 text-black" },
      avatar:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "David Kim",
      position: "Secretary",
      department: "Engineering",
      year: 2025,
      status: { label: "Rejected", color: "bg-red-500" },
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop",
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
            <BreadcrumbPage>Candidate Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-blue-100 text-blue-900">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Candidate Management</h1>
          <p className="text-gray-500">Manage election candidates and their applications</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <Input placeholder="Search by name or department..." className="h-11" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select>
            <SelectTrigger className="w-40 h-11">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40 h-11">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium h-11">
            + Add Candidate
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">All Candidates</h2>
              <p className="text-sm text-gray-500">Showing {candidates.length} of {candidates.length} candidates</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-600 border-b">
                <tr>
                  <th className="pb-3">Photo</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-4">
                      <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                    </td>
                    <td className="whitespace-nowrap">{c.name}</td>
                    <td>{c.position}</td>
                    <td>{c.department}</td>
                    <td>{c.year}</td>
                    <td>
                      <span className={`inline-block text-white text-xs px-2 py-1 rounded ${c.status.color}`}>
                        {c.status.label}
                      </span>
                    </td>
                    <td className="py-2">
                      {c.status.label === "Pending" ? (
                        <div className="flex items-center gap-2">
                          <Button className="bg-green-500 hover:bg-green-600 text-white h-8 px-3 text-xs flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Approve
                          </Button>
                          <Button variant="secondary" className="h-8 px-3 text-xs flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Reject
                          </Button>
                          <Eye className="w-4 h-4 cursor-pointer" />
                        </div>
                      ) : (
                        <Eye className="w-4 h-4 cursor-pointer" />
                      )}
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
