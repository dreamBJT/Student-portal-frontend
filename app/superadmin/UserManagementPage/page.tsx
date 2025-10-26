"use client";

import { useState, useEffect } from "react";
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
import { usersService } from "../../../services/users.service";
import { User } from "../../../types/user";
import { toast } from "sonner";

interface UserManagementPageProps {
  // Removed unused onNavigate prop
}

export default function UserManagementPage({}: UserManagementPageProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Form state for adding new user
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'student' as 'student' | 'admin' | 'superadmin',
    password: ''
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const [permissions, setPermissions] = useState({
    elections: { create: false, edit: false, delete: false },
    news: { create: false, edit: false, delete: false },
    users: { create: false, edit: false, delete: false }
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await usersService.getUsers();
      console.log('Fetched users from API:', fetchedUsers); // Debug log

      // Validate that users have valid IDs (either id or _id)
      const validUsers = fetchedUsers.filter(user => {
        const userId = user.id || user._id;
        if (!userId) {
          console.warn('User with invalid ID found:', user);
          return false;
        }
        return true;
      });

      console.log('Valid users after filtering:', validUsers); // Debug log
      setUsers(validUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPermissions = (user: User) => {
    // Get the user ID (either id or _id)
    const userId = user.id || user._id;

    // Validate that user ID exists
    if (!userId) {
      toast.error('Invalid user ID. Cannot edit permissions.');
      console.error('User ID is invalid:', user);
      return;
    }

    setSelectedUser(user);
    setPermissions(user.permissions || {
      elections: { create: false, edit: false, delete: false },
      news: { create: false, edit: false, delete: false },
      users: { create: false, edit: false, delete: false }
    });
    setShowPermissionModal(true);
  };

  const handleSavePermissions = async () => {
    if (selectedUser) {
      try {
        // Get the user ID (either id or _id)
        const userId = selectedUser.id || selectedUser._id;

        // Validate that user ID exists
        if (!userId) {
          toast.error('Invalid user ID. Cannot update permissions.');
          console.error('Selected user ID is invalid:', selectedUser);
          return;
        }

        await usersService.updateUser(userId, {
          permissions
        });
        toast.success(`Permissions updated for ${selectedUser.username || selectedUser.name || 'User'}`);
        setShowPermissionModal(false);
        setSelectedUser(null);
        await fetchUsers(); // Refresh the users list
      } catch (err) {
        console.error('Error updating permissions:', err);

        // Provide more specific error messages
        if (err instanceof Error) {
          if (err.message.includes('500')) {
            toast.error('Server error occurred. Please try again later.');
          } else if (err.message.includes('404')) {
            toast.error('User not found. The user may have been deleted.');
          } else if (err.message.includes('403') || err.message.includes('401')) {
            toast.error('You do not have permission to update this user.');
          } else if (err.message.includes('Network Error') || err.message.includes('timeout')) {
            toast.error('Network error. Please check your connection and try again.');
          } else {
            toast.error(`Failed to update permissions: ${err.message}`);
          }
        } else {
          toast.error('An unknown error occurred while updating permissions.');
        }
      }
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.username || user.name || 'this user'}? This action cannot be undone.`)) {
      try {
        // Get the user ID (either id or _id)
        const userId = user.id || user._id;

        // Validate that user ID exists
        if (!userId) {
          toast.error('Invalid user ID. Cannot delete user.');
          console.error('User ID is invalid:', user);
          return;
        }

        console.log('Deleting user:', user); // Debug log
        await usersService.deleteUser(userId);
        toast.success(`User ${user.username || user.name || 'User'} has been deleted`);
        await fetchUsers(); // Refresh the users list
      } catch (err) {
        console.error('Error deleting user:', err);

        // Provide more specific error messages
        if (err instanceof Error) {
          if (err.message.includes('500')) {
            toast.error('Server error occurred. Please try again later.');
          } else if (err.message.includes('404')) {
            toast.error('User not found. The user may have already been deleted.');
          } else if (err.message.includes('403') || err.message.includes('401')) {
            toast.error('You do not have permission to delete this user.');
          } else if (err.message.includes('Network Error') || err.message.includes('timeout')) {
            toast.error('Network error. Please check your connection and try again.');
          } else {
            toast.error(`Failed to delete user: ${err.message}`);
          }
        } else {
          toast.error('An unknown error occurred while deleting the user.');
        }
      }
    }
  };

  const handleAddUser = async () => {
    if (!newUserForm.name.trim()) {
      toast.error('Please enter a full name');
      return;
    }

    if (!newUserForm.email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    if (!newUserForm.password.trim()) {
      toast.error('Please enter a temporary password');
      return;
    }

    if (newUserForm.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserForm.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setIsCreatingUser(true);

      // Log authentication token for debugging
      const token = localStorage.getItem("token");
      console.log('Auth token present:', !!token);
      console.log('Auth token length:', token?.length || 0);

      const requestData = {
        name: newUserForm.name,
        email: newUserForm.email,
        role: newUserForm.role,
        password: newUserForm.password
      };

      console.log('About to create user with data:', {
        ...requestData,
        password: '[REDACTED]'
      });

      await usersService.createUserBySuperAdmin(requestData);
      toast.success("New user has been added successfully");
      setShowAddUserModal(false);
      setNewUserForm({ name: '', email: '', role: 'student' as 'student' | 'admin' | 'superadmin', password: '' });
      await fetchUsers(); // Refresh the users list
    } catch (err) {
      console.error('Error creating user:', err);

      // Provide more specific error messages based on error type
      if (err instanceof Error) {
        const axiosError = err as any;

        if (axiosError.response?.status === 500) {
          toast.error('Server error occurred. Please check the console for more details.');
          console.error('Backend returned 500 error. Check service logs for specific issues.');
          console.error('Response data:', axiosError.response?.data);
        } else if (axiosError.response?.status === 401) {
          toast.error('Authentication failed. Please log in again.');
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
        } else if (axiosError.response?.status === 403) {
          toast.error('You do not have permission to create users.');
        } else if (axiosError.response?.status === 400) {
          toast.error('Invalid request data. Please check your input.');
          console.error('400 Bad Request - Backend validation failed:', axiosError.response?.data);
        } else if (axiosError.code === 'ERR_NETWORK') {
          toast.error('Network error. Please check your connection and try again.');
        } else {
          toast.error(`Failed to create user: ${err.message}`);
        }
      } else {
        toast.error('An unknown error occurred while creating the user.');
      }
    } finally {
      setIsCreatingUser(false);
    }
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
    // Check if permissions exist and are not null
    if (!user.permissions) {
      return "0/9";
    }

    const total = Object.values(user.permissions).reduce((acc, perm) => {
      return acc + Object.values(perm).filter(Boolean).length;
    }, 0);
    return `${total}/9`;
  };

  const getUsersByTab = () => {
    switch (activeTab) {
      case "admins":
        return users.filter(user => user.role === 'admin' || user.role === 'superadmin');
      case "students":
        return users.filter(user => user.role === 'student');
      default:
        return users;
    }
  };

  const totalUsers = users.length;
  const adminUsers = users.filter(user => user.role === 'admin' || user.role === 'superadmin');
  const studentUsers = users.filter(user => user.role === 'student');
  const activeUsers = users.filter(user => user.status === 'Active');
  const totalAdmins = adminUsers.length;
  const totalStudents = studentUsers.length;
  const activeRoles = new Set(users.map(user => user.role).filter(Boolean)).size;

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
                  Manage system administrators and their permissions
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
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage all administrators and students with their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="all">
                        All Users
                      </TabsTrigger>
                      <TabsTrigger value="admins">
                        Admins
                      </TabsTrigger>
                      <TabsTrigger value="students">
                        Students
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                      <UserTable
                        users={getUsersByTab()}
                        onEditPermissions={handleEditPermissions}
                        onDelete={handleDeleteUser}
                        getPermissionSummary={getPermissionSummary}
                        loading={loading}
                        error={error}
                      />
                    </TabsContent>

                    <TabsContent value="admins" className="mt-0">
                      <UserTable
                        users={getUsersByTab()}
                        onEditPermissions={handleEditPermissions}
                        onDelete={handleDeleteUser}
                        getPermissionSummary={getPermissionSummary}
                        loading={loading}
                        error={error}
                      />
                    </TabsContent>

                    <TabsContent value="students" className="mt-0">
                      <UserTable
                        users={getUsersByTab()}
                        onEditPermissions={handleEditPermissions}
                        onDelete={handleDeleteUser}
                        getPermissionSummary={getPermissionSummary}
                        loading={loading}
                        error={error}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Summary */}
            <div className="space-y-6">
              {/* Total Users */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#002B7F] rounded-lg flex items-center justify-center">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-3xl">{totalUsers}</div>
                      <div className="text-sm text-muted-foreground">
                        {activeUsers.length} active
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

              {/* Total Admins */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Administrators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#002B7F] rounded-lg flex items-center justify-center">
                      <Shield className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-3xl">{totalAdmins}</div>
                      <div className="text-sm text-muted-foreground">
                        {adminUsers.filter(a => a.status === 'Active').length} active
                      </div>
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
                    <Badge className="bg-[#002B7F]">{adminUsers.filter(a => a.role === 'superadmin').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Admins</span>
                    <Badge className="bg-[#FFB400] text-[#002B7F]">{adminUsers.filter(a => a.role === 'admin').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Students</span>
                    <Badge variant="secondary">{totalStudents}</Badge>
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
                    Add New Admin
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
              Configure module permissions for {selectedUser?.username || selectedUser?.name || 'User'}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="py-4">
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#002B7F] rounded-full flex items-center justify-center">
                    <span className="text-white">
                      {(selectedUser.username || selectedUser.name || '?').charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3>{selectedUser.username || selectedUser.name || 'Unknown User'}</h3>
                    <p className="text-sm text-muted-foreground">{selectedUser.email || 'No email'}</p>
                  </div>
                  <Badge className="ml-auto">{selectedUser.role || 'No role'}</Badge>
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
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with custom permissions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                className="mt-1"
                value={newUserForm.name}
                onChange={(e) => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@injibara.edu.et"
                className="mt-1"
                value={newUserForm.email}
                onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-input-background"
                value={newUserForm.role}
                onChange={(e) => setNewUserForm(prev => ({ ...prev, role: e.target.value as 'student' | 'admin' | 'superadmin' }))}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <div>
              <Label htmlFor="password">Temporary Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter temporary password"
                className="mt-1"
                value={newUserForm.password}
                onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
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
              disabled={isCreatingUser}
            >
              {isCreatingUser ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2" size={16} />
                  Add User
                </>
              )}
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
  loading?: boolean;
  error?: string | null;
}

function UserTable({ users, onEditPermissions, onDelete, getPermissionSummary, loading, error }: UserTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">No users found</div>
      </div>
    );
  }

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
          <TableRow key={user.id || user._id || Math.random()}>
            <TableCell>
              <div>
                <div>{user.username || user.name || 'Unknown User'}</div>
                <div className="text-xs text-muted-foreground">{user.email || 'No email'}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.role === "superadmin" ? "default" : "secondary"}
                className={user.role === "superadmin" ? "bg-[#002B7F]" : ""}
              >
                {user.role || 'No role'}
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
                {user.status || 'Unknown'}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {user.lastLogin || 'Never'}
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
                  className="text-red-500 hover:text-red-700"
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
