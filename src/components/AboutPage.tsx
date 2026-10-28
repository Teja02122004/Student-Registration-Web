/**
 * About Page (Page 6)
 * Project Introduction, Aim, Objectives, Tech Stack, and System Benefits.
 */

import React from 'react';
import { ActivePage } from '../types/index.ts';
import { 
  Info, 
  Target, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  FileCode2, 
  Database, 
  Cpu, 
  Globe, 
  ArrowRight,
  Code2
} from 'lucide-react';

interface AboutPageProps {
  setActivePage: (page: ActivePage) => void;
  onOpenPhpExplorer: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setActivePage,
  onOpenPhpExplorer,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-3">
          <Info className="w-3.5 h-3.5" />
          <span>Academic Portal System Overview</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
          About StudentHub Portal
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          An institutional-grade Student Registration and Course Management System engineered with secure session-based authentication, structured XML course storage, and prepared SQL database interactions.
        </p>
      </div>

      {/* Aim & Objectives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Project Aim */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-['Outfit'] mb-3">
              Project Aim
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              The primary aim of StudentHub is to eliminate legacy paper-based university admission workflows by delivering an automated, secure, and accessible digital portal. It unifies prospective applicant registration, course exploration, and matriculation management into a single responsive web interface.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
            <strong className="text-slate-900 block">Core Mission Statement:</strong>
            <span>Provide zero-latency admissions with cryptographically hardened authentication and portable XML curriculum metadata.</span>
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-['Outfit'] mb-4">
            System Objectives
          </h2>

          <div className="space-y-3.5 text-xs text-slate-600">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold mt-0.5">1</div>
              <div>
                <strong className="text-slate-900 block font-semibold">Automated Registration &amp; Validation:</strong>
                <span>Multi-field client &amp; server validation for email format, 10-digit Indian phone, password strength, and duplicate accounts.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold mt-0.5">2</div>
              <div>
                <strong className="text-slate-900 block font-semibold">Decoupled XML Course Storage:</strong>
                <span>Store course codes, fees in INR (₹), eligibility, duration, and syllabi inside portable XML files without requiring database migrations.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold mt-0.5">3</div>
              <div>
                <strong className="text-slate-900 block font-semibold">Cryptographically Secure Authentication:</strong>
                <span>Zero plaintext password exposure. Leverages BCRYPT / SHA-256 password hashing with session regeneration against fixation.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold mt-0.5">4</div>
              <div>
                <strong className="text-slate-900 block font-semibold">Personalized Protected Dashboard:</strong>
                <span>Real-time matriculation verification, enrolled program breakdown, profile editor, and session-protected user state.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Technologies Used Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Full Architecture</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
            Technologies Powering the Application
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <Globe className="w-7 h-7 text-orange-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">HTML5</h4>
            <span className="text-[11px] text-slate-500">Semantic Layout</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <Layers className="w-7 h-7 text-blue-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">CSS3 / BS5</h4>
            <span className="text-[11px] text-slate-500">Responsive UI</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <Cpu className="w-7 h-7 text-amber-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">JavaScript</h4>
            <span className="text-[11px] text-slate-500">Live DOM Filter</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <Code2 className="w-7 h-7 text-indigo-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">PHP 8+</h4>
            <span className="text-[11px] text-slate-500">Server Controller</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <FileCode2 className="w-7 h-7 text-purple-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">XML</h4>
            <span className="text-[11px] text-slate-500">SimpleXML Feed</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <Database className="w-7 h-7 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">MySQL / PDO</h4>
            <span className="text-[11px] text-slate-500">Prepared SQL</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            Want to inspect the native PHP 8+ files or import the MySQL schema?
          </div>
          <button
            onClick={onOpenPhpExplorer}
            className="px-4 py-2 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer flex items-center gap-1.5"
          >
            <Code2 className="w-4 h-4 text-sky-400" />
            <span>Open PHP Source Explorer</span>
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Institutional Value</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
            Benefits of the StudentHub System
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-2">
              Eliminates Admission Bottlenecks
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enables hundreds of prospective applicants to register simultaneously with real-time Student ID issuance and instant email deduplication.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <FileCode2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-2">
              Decoupled Curriculum Management
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Departments can update tuition fees, seat capacities, and syllabi directly inside <code>courses.xml</code> without altering backend code or restarting databases.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-2">
              Enterprise Grade Security
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Guards against common web vulnerabilities with CSRF token generation, output sanitization (XSS defense), and PDO prepared statements.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
