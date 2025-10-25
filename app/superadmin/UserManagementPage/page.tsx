"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import {
  Shield, Users, Plus, Edit, Trash2, Eye, Settings,
  LogOut, CheckCircle, Clock, AlertCircle, UserCheck
} from "lucide-react";
import { toast } from "sonner";

interface UserManagementPageProps {
  // Removed unused onNavigate prop
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: {
    elections: { create: boolean; edit: boolean; delete: boolean };
    news: { create: boolean; edit: boolean; delete: boolean };
    users: { create: boolean; edit: boolean; delete: boolean };
  };
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
}

export default function UserManagementPage({}: UserManagementPageProps) {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("admins");

  const [permissions, setPermissions] = useState({
    elections: { create: false, edit: false, delete: false },
    news: { create: false, edit: false, delete: false },
    users: { create: false, edit: false, delete: false }
  });



  const admins = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@injibara.edu.et",
      role: "Super Admin",
      permissions: {
        elections: { create: true, edit: true, delete: true },
        news: { create: true, edit: true, delete: true },
        users: { create: true, edit: true, delete: true }
      },
      status: "Active" as const,
      lastLogin: "2 hours ago"
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike@injibara.edu.et",
      role: "Admin",
      permissions: {
        elections: { create: true, edit: true, delete: false },
        news: { create: true, edit: true, delete: false },
        users: { create: false, edit: false, delete: false }
      },
      status: "Active" as const,
      lastLogin: "1 day ago"
    },
    {
      id: 3,
      name: "Lisa Anderson",
      email: "lisa@injibara.edu.et",
      role: "Admin",
      permissions: {
        elections: { create: true, edit: true, delete: false },
        news: { create: true, edit: true, delete: true },
        users: { create: false, edit: false, delete: false }
      },
      status: "Active" as const,
      lastLogin: "3 hours ago"
    },
    {
      id: 4,
      name: "Robert Chen",
      email: "robert@injibara.edu.et",
      role: "Admin",
      permissions: {
        elections: { create: true, edit: false, delete: false },
        news: { create: true, edit: true, delete: false },
        users: { create: false, edit: false, delete: false }
      },
      status: "Inactive" as const,
      lastLogin: "5 days ago"
    }
  ];

  const moderators = [
    {
      id: 5,
      name: "Sarah Williams",
      email: "sarah.w@injibara.edu.et",
      role: "Moderator",
      permissions: {
        elections: { create: false, edit: true, delete: false },
        news: { create: true, edit: true, delete: false },
        users: { create: false, edit: false, delete: false }
      },
      status: "Active" as const,
      lastLogin: "1 hour ago"
    },
    {
      id: 6,
      name: "James Brown",
      email: "james.b@injibara.edu.et",
      role: "Moderator",
      permissions: {
        elections: { create: false, edit: true, delete: false },
        news: { create: true, edit: true, delete: false },
        users: { create: false, edit: false, delete: false }
      },
      status: "Active" as const,
      lastLogin: "4 hours ago"
    },
    {
      id: 7,
      name: "Emily Davis",
      email: "emily.d@injibara.edu.et",
      role: "Moderator",
      permissions: {
        elections: { create: false, edit: false, delete: false },
        news: { create: true, edit: true, delete: false },
        users: { create: false, edit: false, delete: false }
      },
      status: "Suspended" as const,
      lastLogin: "2 weeks ago"
    }
  ];

  const systemUsers = [
    {
      id: 8,
      name: "Election Service Bot",
      email: "election-bot@system.local",
      role: "System User",
      permissions: {
        elections: { create: true, edit: true, delete: false },
        news: { create: false, edit: false, delete: false },
        users: { create: false, edit: false, delete: false }
      },
      status: "Active" as const,
      lastLogin: "Always active"
    },
    {
      id: 9,
      name: "Backup Service",
      email: "backup@system.local",
      role: "System User",
      permissions: {
        elections: { create: false, edit: false, delete: false },
        news: { create: false, edit: false, delete: false },
        users: { create: false, edit: false, delete: false }
      },
      status: "Active" as const,
      lastLogin: "Always active"
    }
  ];

  const handleEditPermissions = (user: User) => {
    setSelectedUser(user);
    setPermissions(user.permissions);
    setShowPermissionModal(true);
  };

  const handleSavePermissions = () => {
    if (selectedUser) {
      toast.success(`Permissions updated for ${selectedUser.name}`);
      setShowPermissionModal(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (user: User) => {
    toast.success(`User ${user.name} has been removed`);
  };

  const handleAddUser = () => {
    toast.success("New user has been added successfully");
    setShowAddUserModal(false);
  };

  const togglePermission = (module: 'elections' | 'news' | 'users', action: 'create' | 'edit' | 'delete') => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action]
      }
    }));
  };

  const getPermissionSummary = (user: User) => {
    const total = Object.values(user.permissions).reduce((acc, perm) => {
      return acc + Object.values(perm).filter(Boolean).length;
    }, 0);
    return `${total}/9`;
  };

  const getUsersByTab = () => {
    switch (activeTab) {
      case "admins":
        return admins;
      case "moderators":
        return moderators;
      case "system":
        return systemUsers;
      default:
        return admins;
    }
  };

  const totalAdmins = admins.length;
  const totalModerators = moderators.length;
  const totalSystemUsers = systemUsers.length;
  const activeRoles = 3;
  const pendingRequests = 2;

  return (
    <div className="space-y-6">
      {/* Content */}
      <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl mb-2">User Management</h1>
                <p className="text-muted-foreground">
                  Manage system administrators, moderators, and permissions
                </p>
              </div>
              <Button
                className="bg-[#002B7F] hover:bg-[#001f5c]"
                onClick={() => setShowAddUserModal(true)}
              >
                <Plus className="mr-2" size={16} />
                Add New Admin
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>System Users</CardTitle>
                  <CardDescription>View and manage all system users and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="admins">
                        Admins ({admins.length})
                      </TabsTrigger>
                      <TabsTrigger value="moderators">
                        Moderators ({moderators.length})
                      </TabsTrigger>
                      <TabsTrigger value="system">
                        System Users ({systemUsers.length})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="admins" className="mt-0">
                      <UserTable
                        users={admins}
                        onEditPermissions={handleEditPermissions}
                        onDelete={handleDeleteUser}
                        getPermissionSummary={getPermissionSummary}
                      />
                    </TabsContent>

                    <TabsContent value="moderators" className="mt-0">
                      <UserTable
                        users={moderators}
                        onEditPermissions={handleEditPermissions}
                        onDelete={handleDeleteUser}
                        getPermissionSummary={getPermissionSummary}
                      />
                    </TabsContent>

                    <TabsContent value="system" className="mt-0">
                      <UserTable
                        users={systemUsers}
                        onEditPermissions={handleEditPermissions}
                        onDelete={handleDeleteUser}
                        getPermissionSummary={getPermissionSummary}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Summary */}
            <div className="space-y-6">
              {/* Total Admins */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Total Admins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#002B7F] rounded-lg flex items-center justify-center">
                      <Shield className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-3xl">{totalAdmins}</div>
                      <div className="text-sm text-muted-foreground">
                        {admins.filter(a => a.status === 'Active').length} active
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Roles */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Active Roles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FFB400] rounded-lg flex items-center justify-center">
                      <UserCheck className="text-[#002B7F]" size={24} />
                    </div>
                    <div>
                      <div className="text-3xl">{activeRoles}</div>
                      <div className="text-sm text-muted-foreground">role types</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Requests */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <Clock className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-3xl">{pendingRequests}</div>
                      <div className="text-sm text-muted-foreground">awaiting approval</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Role Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Role Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Super Admins</span>
                    <Badge className="bg-[#002B7F]">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Admins</span>
                    <Badge className="bg-[#FFB400] text-[#002B7F]">{totalAdmins - 1}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Moderators</span>
                    <Badge variant="secondary">{totalModerators}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Users</span>
                    <Badge variant="secondary">{totalSystemUsers}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowAddUserModal(true)}
                  >
                    <Plus size={16} className="mr-2" />
                    Add New User
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings size={16} className="mr-2" />
                    Role Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye size={16} className="mr-2" />
                    View Activity Log
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      {/* Permission Matrix Modal */}
      <Dialog open={showPermissionModal} onOpenChange={setShowPermissionModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Permissions</DialogTitle>
            <DialogDescription>
              Configure module permissions for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="py-4">
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#002B7F] rounded-full flex items-center justify-center">
                    <span className="text-white">
                      {selectedUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3>{selectedUser.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                  <Badge className="ml-auto">{selectedUser.role}</Badge>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-4 flex items-center gap-2">
                    <Settings className="text-[#002B7F]" size={18} />
                    Permission Matrix
                  </h4>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Module</TableHead>
                        <TableHead className="text-center">Create</TableHead>
                        <TableHead className="text-center">Edit</TableHead>
                        <TableHead className="text-center">Delete</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Elections</TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={permissions.elections.create}
                            onCheckedChange={() => togglePermission('elections', 'create')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={permissions.elections.edit}
                            onCheckedChange={() => togglePermission('elections', 'edit')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={permissions.elections.delete}
                            onCheckedChange={() => togglePermission('elections', 'delete')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>News</TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={permissions.news.create}
                            onCheckedChange={() => togglePermission('news', 'create')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={permissions.news.edit}
                            onCheckedChange={() => togglePermission('news', 'edit')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={permissions.news.delete}
                            onCheckedChange={() => togglePermission('news', 'delete')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Users</TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={permissions.users.create}
                            onCheckedChange={() => togglePermission('users', 'create')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={permissions.users.edit}
                            onCheckedChange={() => togglePermission('users', 'edit')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={permissions.users.delete}
                            onCheckedChange={() => togglePermission('users', 'delete')}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPermissionModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#002B7F] hover:bg-[#001f5c]"
              onClick={handleSavePermissions}
            >
              <CheckCircle className="mr-2" size={16} />
              Save Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <Dialog open={showAddUserModal} onOpenChange={setShowAddUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogDescription>
              Create a new administrator account with custom permissions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@injibara.edu.et"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-input-background"
              >
                <option>Admin</option>
                <option>Moderator</option>
                <option>System User</option>
              </select>
            </div>
            <div>
              <Label htmlFor="password">Temporary Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter temporary password"
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddUserModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#002B7F] hover:bg-[#001f5c]"
              onClick={handleAddUser}
            >
              <Plus className="mr-2" size={16} />
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// User Table Component
interface UserTableProps {
  users: User[];
  onEditPermissions: (user: User) => void;
  onDelete: (user: User) => void;
  getPermissionSummary: (user: User) => string;
}

function UserTable({ users, onEditPermissions, onDelete, getPermissionSummary }: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div>
                <div>{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.role === "Super Admin" ? "default" : "secondary"}
                className={user.role === "Super Admin" ? "bg-[#002B7F]" : ""}
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline">
                {getPermissionSummary(user)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={
                user.status === "Active" ? "bg-green-500" :
                user.status === "Suspended" ? "bg-red-500" :
                "bg-gray-500"
              }>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {user.lastLogin}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditPermissions(user)}
                  title="Edit Permissions"
                >
                  <Settings size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  title="Edit User"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(user)}
                  title="Delete User"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
