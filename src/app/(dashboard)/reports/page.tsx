'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { AuthGuard } from '@/shared/auth/AuthGuard';
import { FileText, Download, Eye, Plus, Filter } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { reportService, Report } from '@/features/reports/services/reportService';
import { UploadReportModal } from '@/features/reports/components/UploadReportModal';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const data = await reportService.getReports();
      setReports(data);
    } catch (err) {
      console.error('Failed to fetch reports', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <AuthGuard permission="VIEW_REPORT">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Medical Reports</h1>
            <p className="text-gray-500">Access and manage medical diagnostic reports and lab results.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Upload Report
          </Button>
        </div>

        <UploadReportModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchReports}
        />

        <div className="flex gap-4">
          <div className="relative flex-1">
            <input type="text" placeholder="Search reports..." className="input" />
          </div>
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse h-48 ring-1 ring-secondary/50 border-none shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-secondary rounded-lg" />
                  <div className="w-16 h-6 bg-secondary rounded-full" />
                </div>
                <div className="h-6 w-3/4 bg-secondary rounded mb-2" />
                <div className="h-4 w-1/2 bg-secondary rounded mb-4" />
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <div className="h-9 bg-secondary rounded-lg" />
                  <div className="h-9 bg-secondary rounded-lg" />
                </div>
              </Card>
            ))
          ) : reports.length > 0 ? (
            reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow ring-1 ring-secondary/50 border-none">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                    report.status === 'Finalized' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {report.status}
                  </span>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-1">{report.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Patient: {report.patientName}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
                  <span className="bg-base px-2 py-1 rounded border border-secondary">{report.type || 'Diagnostic'}</span>
                  <span>{new Date(report.date).toLocaleDateString()}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Button variant="secondary" className="text-xs py-2">
                    <Eye className="w-3 h-3 mr-2" />
                    View
                  </Button>
                  <Button variant="secondary" className="text-xs py-2">
                    <Download className="w-3 h-3 mr-2" />
                    Download
                  </Button>
                </div>
                
                {report.status !== 'Finalized' && (
                  <Button 
                    variant="accent" 
                    className="w-full text-xs py-2"
                    onClick={async () => {
                      try {
                        await reportService.finalizeReport(report.id);
                        fetchReports();
                      } catch (err) {
                        console.error('Failed to finalize report', err);
                      }
                    }}
                  >
                    Finalize Report
                  </Button>
                )}
              </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500 italic">No reports found</div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
