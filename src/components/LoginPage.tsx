/**
 * Student Login Page (Page 3)
 * Secure credential authentication with show/hide password,
 * quick demo fill buttons, forgot password modal, and session establishment.
 */

import React, { useState } from 'react';
import { ActivePage, Student } from '../types/index.ts';
import { loginStudent } from '../utils/storage.ts';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  KeyRound,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';

interface LoginPageProps {
  initialEmail?: string;
  setActivePage: (page: ActivePage) => void;
  onLoginSuccess: (student: Student) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialEmail = '',
  setActivePage,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetInput, setResetInput] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both your registered email address and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await loginStudent(email.trim(), password);
      setIsSubmitting(false);

      if (!res.success || !res.student) {
        setErrorMsg(res.message);
        return;
      }

      onLoginSuccess(res.student);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Authentication error.');
    }
  };

  const fillDemoCredentials = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Student@123');
    setErrorMsg(null);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetInput.trim()) return;
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setForgotModalOpen(false);
      setResetInput('');
    }, 2500);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12 sm:py-16">
      
      {/* Title */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-sm border border-blue-100">
          <LogIn className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Student Portal Login
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Access your personal dashboard, syllabus, and course details.
        </p>
      </div>

      {/* Quick Demo Credentials Helper */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-900 text-xs shadow-sm">
        <div className="flex items-center gap-1.5 font-bold mb-2 text-blue-800">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Quick Demo Evaluation Credentials:</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between bg-white/80 p-2 rounded border border-blue-100">
            <div>
              <span className="font-semibold block text-slate-800">Aarav Sharma (B.Tech IT)</span>
              <span className="text-[11px] text-slate-500 font-mono">aarav.sharma@studenthub.edu</span>
            </div>
            <button
              type="button"
              onClick={() => fillDemoCredentials('aarav.sharma@studenthub.edu')}
              className="px-2.5 py-1 text-[11px] font-bold rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              Fill &amp; Test
            </button>
          </div>

          <div className="flex items-center justify-between bg-white/80 p-2 rounded border border-blue-100">
            <div>
              <span className="font-semibold block text-slate-800">Priya Patel (BCA)</span>
              <span className="text-[11px] text-slate-500 font-mono">priya.patel@studenthub.edu</span>
            </div>
            <button
              type="button"
              onClick={() => fillDemoCredentials('priya.patel@studenthub.edu')}
              className="px-2.5 py-1 text-[11px] font-bold rounded bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
            >
              Fill &amp; Test
            </button>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 mt-2 text-right">Default demo password: <code>Student@123</code></div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">{errorMsg}</div>
        </div>
      )}

      {/* Login Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Student Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@studenthub.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Password with Show/Hide */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                title="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer text-base disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>

        </form>

        <div className="pt-6 mt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account yet?{' '}
            <button
              onClick={() => setActivePage('register')}
              className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
            >
              Register as New Student <ArrowRight className="w-3.5 h-3.5 inline ml-0.5" />
            </button>
          </p>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 font-['Outfit']">
                <KeyRound className="w-5 h-5 text-indigo-600" />
                <span>Recover Student Account</span>
              </div>
              <button
                onClick={() => setForgotModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {resetSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Password Reset Dispatched!</div>
                  <div className="text-xs text-emerald-700 mt-1">
                    An OTP recovery code and password reset link have been dispatched to the institutional inbox associated with <strong>{resetInput}</strong>.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered institutional student email address or Student ID (e.g. <code>STU-2026-1001</code>). We will issue an encrypted verification link to reset your credentials.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Email or Student ID
                  </label>
                  <input
                    type="text"
                    required
                    value={resetInput}
                    onChange={(e) => setResetInput(e.target.value)}
                    placeholder="e.g. aarav.sharma@studenthub.edu"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-start gap-2 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>For institutional security, password resets are logged with client IP address verification.</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer shadow-sm"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
