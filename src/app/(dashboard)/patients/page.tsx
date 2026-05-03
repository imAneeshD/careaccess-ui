'use client';

import React from 'react';
import { PatientList } from '@/features/patients/components/PatientList';
import { AuthGuard } from '@/shared/auth/AuthGuard';

export default function PatientsPage() {
  return (
    <AuthGuard permission="VIEW_PATIENT">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-gray-500">View and manage patient records, assignments, and medical history.</p>
          </div>
        </div>

        <PatientList />
      </div>
    </AuthGuard>
  );
}
