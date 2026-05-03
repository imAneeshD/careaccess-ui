'use client';

import React, { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { reportService } from '../services/reportService';
import { patientService } from '@/features/patients/services/patientService';
import { useAuth } from '@/shared/auth/AuthContext';

interface UploadReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UploadReportModal = ({ isOpen, onClose, onSuccess }: UploadReportModalProps) => {
  const [patientId, setPatientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const { user } = useAuth();

  React.useEffect(() => {
    if (isOpen) {
      const fetchPatients = async () => {
        try {
          const data = await patientService.getPatients();
          setPatients(data);
        } catch (err) {
          console.error('Failed to fetch patients', err);
        }
      };
      fetchPatients();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    setError('');

    try {
      await reportService.uploadReport({ 
        patientId, 
        createdBy: user.id 
      });
      onSuccess();
      onClose();
      setPatientId('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload report');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Medical Report">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Patient</label>
          <select 
            className="input"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          >
            <option value="">Select a patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name} ({patient.id})
              </option>
            ))}
          </select>
        </div>

        <div className="p-8 border-2 border-dashed border-secondary rounded-2xl flex flex-col items-center justify-center gap-3 bg-base/30">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG (max. 10MB)</p>
          </div>
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
            disabled={!patientId}
          >
            Upload Report
          </Button>
        </div>
      </form>
    </Modal>
  );
};
