'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, Permission } from '@/shared/auth/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  FileText, 
  LogOut, 
  Activity,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  permission?: Permission;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/users', icon: Users, permission: 'MANAGE_USERS' },
  { label: 'Patients', href: '/patients', icon: UserRound, permission: 'VIEW_PATIENT' },
  { label: 'Reports', href: '/reports', icon: FileText, permission: 'VIEW_REPORT' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout, hasPermission } = useAuth();

  const filteredNavItems = navItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  return (
    <aside className="w-64 bg-white border-r border-secondary h-screen sticky top-0 flex flex-col transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-gray-900">CareAccess</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-accent text-white shadow-md shadow-accent/20' 
                  : 'text-gray-600 hover:bg-accent/5 hover:text-accent'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-accent'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-secondary">
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-secondary-muted flex items-center justify-center text-accent font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-600 hover:bg-danger/5 hover:text-danger rounded-xl transition-colors group"
        >
          <LogOut className="w-5 h-5 text-gray-400 group-hover:text-danger" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
