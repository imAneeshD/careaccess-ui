import { LoginForm } from '@/features/auth/components/LoginForm';
import { Activity } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white">
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-700">
          CareAccess
        </span>
      </div>
      
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <LoginForm />
        
        <p className="text-center text-gray-500 text-sm mt-8">
          &copy; 2026 CareAccess. All rights reserved.
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -z-10" />
    </div>
  );
}
