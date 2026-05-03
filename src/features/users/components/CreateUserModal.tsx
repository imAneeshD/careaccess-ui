'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { userService, Role } from '../services/userService';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateUserModal = ({ isOpen, onClose, onSuccess }: CreateUserModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchRoles = async () => {
        try {
          const data = await userService.getRoles();
          setRoles(data);
        } catch (err) {
          console.error('Failed to fetch roles', err);
        }
      };
      fetchRoles();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await userService.createUser({ name, email, roleId });
      onSuccess();
      onClose();
      setName('');
      setEmail('');
      setRoleId('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create user. Please ensure you are sending a valid GUID.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New User">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Full Name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <Input 
          label="Email Address"
          type="email"
          placeholder="john@careaccess.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Role</label>
          <select 
            className="input"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            required
          >
            <option value="">Select a role</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-sm text-danger bg-danger/10 p-3 rounded-lg border border-danger/20">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-4">
          <Button 
            variant="secondary" 
            className="flex-1" 
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            type="submit"
            isLoading={isLoading}
          >
            Create User
          </Button>
        </div>
      </form>
    </Modal>
  );
};
