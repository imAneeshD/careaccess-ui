'use client';

import React, { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { patientService } from '../services/patientService';
import { userService } from '@/features/users/services/userService';

interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreatePatientModal = ({ isOpen, onClose, onSuccess }: CreatePatientModalProps) => {
  const [name, setName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState<any[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      const fetchDoctors = async () => {
        try {
          const users = await userService.getUsers();
          setDoctors(users.filter(u => u.role === 'Doctor'));
        } catch (err) {
          console.error('Failed to fetch doctors', err);
        }
      };
      fetchDoctors();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await patientService.createPatient({ name, doctorId });
      onSuccess();
      onClose();
      setName('');
      setDoctorId('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create patient');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Patient">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Full Name"
          placeholder="Enter patient's full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Assign Doctor</label>
          <select 
            className="input"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
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
            Create Patient
          </Button>
        </div>
      </form>
    </Modal>
  );
};
