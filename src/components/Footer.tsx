/**
 * Footer Component
 * Professional university portal footer with campus admissions details and tech badges
 */

import React from 'react';
import { ActivePage } from '../types/index.ts';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Code2, 
  ExternalLink,
  ShieldCheck,
  FileCode
} from 'lucide-react';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onOpenPhpExplorer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenPhpExplorer }) => {
  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                Student<span className="text-sky-400">Hub</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
              Comprehensive student registration, secure session authentication, and dynamic XML course management architecture. Engineered for academic institutions.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2.5 py-1 text-xs rounded-md bg-blue-950 text-blue-300 border border-blue-800/60 font-medium">
                PHP 8+ Backend
              </span>
              <span className="px-2.5 py-1 text-xs rounded-md bg-purple-950 text-purple-300 border border-purple-800/60 font-medium">
                XML Catalog
              </span>
              <span className="px-2.5 py-1 text-xs rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-medium">
                PDO MySQL / SQLite
              </span>
              <span className="px-2.5 py-1 text-xs rounded-md bg-amber-950 text-amber-300 border border-amber-800/60 font-medium">
                BCRYPT Hashed
              </span>
            </div>

            <button
              onClick={onOpenPhpExplorer}
              className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <FileCode className="w-4 h-4" />
              <span>Inspect PHP Source Code &amp; Download ZIP</span>
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
                  Portal Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Course Catalog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Project
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Admissions
                </button>
              </li>
            </ul>
          </div>

          {/* Student Hub Portal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Student Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('login')} className="hover:text-white transition-colors cursor-pointer">
                  Student Login
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('register')} className="hover:text-white transition-colors cursor-pointer">
                  Online Registration
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Student Dashboard
                </button>
              </li>
              <li>
                <a 
                  href="/data/courses.xml" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Raw XML Feed</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Admissions Office */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Campus Admissions
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>StudentHub Academic Complex, Knowledge Boulevard, Bengaluru, Karnataka - 560100</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+91 800-456-7890 (Toll-Free)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>admissions@studenthub.edu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM IST</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>&copy; {new Date().getFullYear()} StudentHub Management System. Academic Capstone Project.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Prepared Statements</span>
            <span>·</span>
            <span>SimpleXML Engine</span>
            <span>·</span>
            <span>Responsive Layout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
