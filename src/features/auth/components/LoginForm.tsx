'use client';

import React, { useState } from 'react';
import { useAuth } from '@/shared/auth/AuthContext';
import { authService } from '../services/authService';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import { Lock, Mail } from 'lucide-react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);
      login(response.token, response.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-none ring-1 ring-secondary/50">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
          <Lock className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">Please enter your details to sign in</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-600 cursor-pointer">
            <input type="checkbox" className="rounded border-secondary text-accent focus:ring-accent mr-2" />
            Remember me
          </label>
          <a href="#" className="text-accent hover:underline font-medium">Forgot password?</a>
        </div>

        <Button type="submit" className="w-full h-11 text-base font-semibold" isLoading={isLoading}>
          Sign In
        </Button>
      </form>
    </Card>
  );
};
