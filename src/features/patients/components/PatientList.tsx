'use client';

import React, { useEffect, useState } from 'react';
import { patientService, Patient } from '../services/patientService';
import { userService } from '@/features/users/services/userService';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Search, Filter, MoreVertical, Plus } from 'lucide-react';
import { CreatePatientModal } from './CreatePatientModal';

export const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const data = await patientService.getPatients();
      setPatients(data);
    } catch (err) {
      console.error('Failed to fetch patients', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const users = await userService.getUsers();
      setDoctors(users.filter(u => u.role === 'Doctor'));
    } catch (err) {
      console.error('Failed to fetch doctors', err);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button 
            className="flex-1 sm:flex-none"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      <CreatePatientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchPatients}
      />

      <Card className="ring-1 ring-secondary/50 border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-base/50 border-b border-secondary">
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Patient</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Patient ID</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Assigned Doctor</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Last Visit</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-10 w-40 bg-secondary rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-20 bg-secondary rounded" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-24 bg-secondary rounded" /></td>
                    <td className="px-6 py-4"><div className="h-6 w-16 bg-secondary rounded-full" /></td>
                    <td className="px-6 py-4"><div className="h-4 w-24 bg-secondary rounded" /></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-base transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent ring-1 ring-accent/10">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{patient.name}</p>
                          <p className="text-xs text-gray-500">patient@{patient.id.toLowerCase()}.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs font-mono bg-base px-1.5 py-0.5 rounded border border-secondary text-gray-600">
                        {patient.id}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <select 
                        className="bg-transparent border-none focus:ring-0 cursor-pointer"
                        value={patient.assignedDoctorId || ''}
                        onChange={async (e) => {
                          const doctorId = e.target.value;
                          if (doctorId) {
                            try {
                              await patientService.assignDoctor(patient.id, doctorId);
                              fetchPatients();
                            } catch (err) {
                              console.error('Failed to assign doctor', err);
                            }
                          }
                        }}
                      >
                        <option value="">Unassigned</option>
                        {doctors.map(doctor => (
                          <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        patient.status === 'Critical' ? 'bg-danger/10 text-danger border border-danger/20' : 
                        patient.status === 'Recovering' ? 'bg-success/10 text-success border border-success/20' : 
                        'bg-accent/10 text-accent border border-accent/20'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-secondary/50 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No patients found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {!isLoading && (
          <div className="px-6 py-4 bg-base/30 border-t border-secondary flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing {filteredPatients.length} of {patients.length} patients</p>
            <div className="flex gap-2">
              <Button variant="secondary" className="px-3 py-1.5 text-xs" disabled>Previous</Button>
              <Button variant="secondary" className="px-3 py-1.5 text-xs" disabled>Next</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
