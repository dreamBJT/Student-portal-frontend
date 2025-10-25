"use client";
import { useState } from "react";
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
import { ClipboardList, Eye, Edit, Trash, Calendar as CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ElectionsPage() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("President");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [maxCandidates, setMaxCandidates] = useState<number | "">(10);
  const [showResultsDuringVoting, setShowResultsDuringVoting] = useState(true);
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
        <Button onClick={() => setOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
          + Create New Election
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>Create New Election</DialogTitle>
            <DialogDescription>
              Set up a new election for student leadership positions
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Election Title</Label>
              <Input
                id="title"
                placeholder="e.g., 2025 Student President Election"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="President">President</SelectItem>
                  <SelectItem value="Vice President">Vice President</SelectItem>
                  <SelectItem value="Secretary">Secretary</SelectItem>
                  <SelectItem value="Treasurer">Treasurer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start">Start Date</Label>
              <Input
                id="start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End Date</Label>
              <Input
                id="end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about this election..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="max-candidates">Maximum Candidates</Label>
              <Input
                id="max-candidates"
                type="number"
                min={1}
                value={maxCandidates}
                onChange={(e) => setMaxCandidates(e.target.value === "" ? "" : Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Maximum number of candidates allowed for this election</p>
            </div>
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">Show Results During Voting</p>
                  <p className="text-xs text-muted-foreground">Display live results while voting is active</p>
                </div>
                <Switch
                  checked={showResultsDuringVoting}
                  onCheckedChange={setShowResultsDuringVoting}
                  aria-label="Show results during voting"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full items-center justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-blue-900 hover:bg-blue-800">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Save Election
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
