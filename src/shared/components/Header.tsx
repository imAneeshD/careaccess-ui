'use client';

import React from 'react';
import { Bell, Search, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/shared/auth/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-secondary sticky top-0 z-10 px-8 flex items-center justify-between">
      {/* ... search ... */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search patients, reports, or users..." 
            className="w-full bg-base border border-secondary rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-base rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white" />
        </button>
        <button className="p-2 text-gray-500 hover:bg-base rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="h-8 w-px bg-secondary mx-2" />
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-accent font-medium">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold ring-1 ring-accent/20">
              {user?.name?.charAt(0)}
            </div>
          </div>

          <button 
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-danger hover:bg-danger/5 rounded-lg transition-all group"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
