import React from 'react';
import { Card } from '@/shared/ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: string;
    isUp: boolean;
  };
  color: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, color }: StatCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-none ring-1 ring-secondary/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-bold ${trend.isUp ? 'text-success' : 'text-danger'}`}>
                {trend.isUp ? '+' : ''}{trend.value}
              </span>
              <span className="text-xs text-gray-400">from last month</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};
