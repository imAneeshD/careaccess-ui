'use client';

import React, { useEffect, useState } from 'react';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { UserRound, Users, FileText, Activity, Calendar, ArrowRight } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { patientService } from '@/features/patients/services/patientService';
import { userService } from '@/features/users/services/userService';
import { reportService } from '@/features/reports/services/reportService';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    patients: 0,
    users: 0,
    reports: 0,
    activity: '98.2%'
  });
  const [recentPatients, setRecentPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [patients, users, reports] = await Promise.all([
          patientService.getPatients(),
          userService.getUsers(),
          reportService.getReports()
        ]);
        
        setStats({
          patients: patients.length,
          users: users.length,
          reports: reports.length,
          activity: '100%' // Mocked for now
        });
        
        setRecentPatients(patients.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back to CareAccess. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value={isLoading ? '...' : stats.patients} 
          icon={UserRound} 
          trend={{ value: '12%', isUp: true }}
          color="accent"
        />
        <StatCard 
          title="Total Users" 
          value={isLoading ? '...' : stats.users} 
          icon={Users} 
          trend={{ value: '4%', isUp: true }}
          color="success"
        />
        <StatCard 
          title="Pending Reports" 
          value={isLoading ? '...' : stats.reports} 
          icon={FileText} 
          trend={{ value: '2', isUp: false }}
          color="warning"
        />
        <StatCard 
          title="System Activity" 
          value={stats.activity} 
          icon={Activity} 
          color="accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Recent Patients" className="lg:col-span-2 ring-1 ring-secondary/50 border-none shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-secondary">
                  <th className="pb-3 font-semibold text-gray-600 text-sm">Patient Name</th>
                  <th className="pb-3 font-semibold text-gray-600 text-sm">ID</th>
                  <th className="pb-3 font-semibold text-gray-600 text-sm">Status</th>
                  <th className="pb-3 font-semibold text-gray-600 text-sm">Date</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {isLoading ? (
                   Array(4).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-4"><div className="h-8 w-32 bg-secondary rounded" /></td>
                      <td className="py-4"><div className="h-4 w-16 bg-secondary rounded" /></td>
                      <td className="py-4"><div className="h-6 w-16 bg-secondary rounded-full" /></td>
                      <td className="py-4"><div className="h-4 w-24 bg-secondary rounded" /></td>
                      <td className="py-4"></td>
                    </tr>
                  ))
                ) : recentPatients.length > 0 ? (
                  recentPatients.map((patient) => (
                    <tr key={patient.id} className="group hover:bg-base transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary-muted flex items-center justify-center text-xs font-bold text-accent">
                            {patient.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{patient.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-500">{patient.id}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'Critical' ? 'bg-danger/10 text-danger' : 
                          patient.status === 'Recovering' ? 'bg-success/10 text-success' : 
                          'bg-accent/10 text-accent'
                        }`}>
                          {patient.status || 'Stable'}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-500">{new Date(patient.lastVisit || Date.now()).toLocaleDateString()}</td>
                      <td className="py-4 text-right">
                        <button className="text-gray-400 hover:text-accent p-1 transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 italic">No recent patients</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Button variant="secondary" className="w-full mt-4 py-2">View All Patients</Button>
        </Card>

        <Card title="Upcoming Tasks" className="ring-1 ring-secondary/50 border-none shadow-sm">
          <div className="space-y-6">
            {[
              { title: 'Morning Rounds', time: '09:00 AM', category: 'Medical' },
              { title: 'New Lab Reports Review', time: '11:30 AM', category: 'Diagnostics' },
              { title: 'Staff Meeting', time: '02:00 PM', category: 'Admin' },
              { title: 'Patient Consultation', time: '04:30 PM', category: 'Medical' },
            ].map((task, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  {i !== 3 && <div className="w-px h-full bg-secondary mt-1" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{task.time}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/5 px-1.5 py-0.5 rounded">
                      {task.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-8">Create New Task</Button>
        </Card>
      </div>
    </div>
  );
}
