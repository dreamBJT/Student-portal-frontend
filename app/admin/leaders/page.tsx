import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { GraduationCap, Linkedin, Mail, Globe, Edit, Trash } from "lucide-react";

export default function LeadersPage() {
  const leaders = [
    {
      name: "Marcus Thompson",
      role: "Student President",
      department: "Computer Science",
      quote: "Building bridges across our diverse campus community",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Elena Rodriguez",
      role: "Vice President",
      department: "Business Administration",
      quote: "Empowering every student voice",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "David Kim",
      role: "Secretary General",
      department: "Engineering",
      quote: "Transparency and accountability",
      image:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
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
            <BreadcrumbPage>Leaders Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-blue-100 text-blue-900">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Leaders Management</h1>
            <p className="text-gray-500">Manage student leaders and representatives</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-28 h-10">
              <SelectValue placeholder="2025" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">+ Add Leader</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leaders.map((l, i) => (
          <Card key={i} className="overflow-hidden">
            <img src={l.image} alt={l.name} className="w-full h-56 object-cover" />
            <CardContent className="p-4 space-y-2">
              <div>
                <h3 className="text-xl font-semibold">{l.name}</h3>
                <div className="text-blue-900">{l.role}</div>
                <div className="text-gray-600 text-sm">{l.department}</div>
              </div>
              <p className="text-gray-700 italic">“{l.quote}”</p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3 text-gray-600">
                  <Linkedin className="w-4 h-4 cursor-pointer" />
                  <Mail className="w-4 h-4 cursor-pointer" />
                  <Globe className="w-4 h-4 cursor-pointer" />
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Edit className="w-4 h-4 cursor-pointer" />
                  <Trash className="w-4 h-4 cursor-pointer text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
