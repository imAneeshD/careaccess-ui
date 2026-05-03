'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { AuthGuard } from '@/shared/auth/AuthGuard';
import { Users, Shield, Mail, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { userService, User, Role } from '@/features/users/services/userService';
import { CreateUserModal } from '@/features/users/components/CreateUserModal';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await userService.getRoles();
      setRoles(data);
    } catch (err) {
      console.error('Failed to fetch roles', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  return (
    <AuthGuard permission="MANAGE_USERS">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          {/* ... */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-500">Manage system users, roles, and permissions across the organization.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </div>

        <CreateUserModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchUsers}
        />

        <Card className="ring-1 ring-secondary/50 border-none shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-base/50 border-b border-secondary">
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">User</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Role</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-10 w-40 bg-secondary rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-24 bg-secondary rounded" /></td>
                    <td className="px-6 py-4"><div className="h-6 w-16 bg-secondary rounded-full" /></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-base transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-gray-600">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-accent" />
                        <select 
                          className="text-sm text-gray-700 font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
                          value={roles.find(r => r.name === user.role)?.id || ''}
                          onChange={async (e) => {
                            const newRoleId = e.target.value;
                            if (newRoleId) {
                              try {
                                await userService.assignRole(user.id, newRoleId);
                                fetchUsers();
                              } catch (err) {
                                console.error('Failed to assign role', err);
                              }
                            }
                          }}
                        >
                          <option value="" disabled>Select Role</option>
                          {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        user.status === 'Active' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {user.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </AuthGuard>
  );
}
