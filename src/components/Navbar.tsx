/**
 * Top Navigation Bar (Deep Blue & Royal Blue Theme)
 */

import React, { useState } from 'react';
import { ActivePage, Student } from '../types/index.ts';
import { 
  GraduationCap, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Code2, 
  ChevronDown,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  currentStudent: Student | null;
  onLogout: () => void;
  onOpenPhpExplorer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  currentStudent,
  onLogout,
  onOpenPhpExplorer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Courses', page: 'courses' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
      {/* Top Banner Notice: PHP Architecture & Interactive Mode */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 px-4 py-1.5 text-xs text-white/90 border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase tracking-wide">
              Full-Stack Architecture
            </span>
            <span className="hidden sm:inline text-slate-200">
              Complete PHP 8+ &amp; XML backend structure generated in <code>/student-management-system/</code>.
            </span>
          </div>
          <button
            onClick={onOpenPhpExplorer}
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-white transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>View PHP Source &amp; Download ZIP</span>
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                Student<span className="text-sky-400">Hub</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.page || (link.page === 'courses' && activePage === 'course-details');
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white bg-slate-800 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {currentStudent ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700/80 transition-colors text-sm font-medium border border-slate-700 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    {currentStudent.fullName.charAt(0)}
                  </div>
                  <span className="max-w-[130px] truncate">{currentStudent.fullName}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50 text-slate-200">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <div className="text-xs text-slate-400">Signed in as</div>
                      <div className="text-sm font-bold text-white truncate">{currentStudent.fullName}</div>
                      <div className="text-xs font-mono text-sky-400">{currentStudent.studentId}</div>
                    </div>
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full px-4 py-2 text-left text-sm flex items-center gap-2.5 hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                      Student Dashboard
                    </button>
                    <button
                      onClick={() => handleNavClick('courses')}
                      className="w-full px-4 py-2 text-left text-sm flex items-center gap-2.5 hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-sky-400" />
                      Course Catalog
                    </button>
                    <div className="border-t border-slate-800 my-1"></div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-sm flex items-center gap-2.5 hover:bg-red-950/40 text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activePage === 'login'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Student Login
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Register Now
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
                activePage === link.page
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 space-y-2">
            {currentStudent ? (
              <>
                <div className="px-3 py-1 text-xs text-slate-400">
                  Signed in as <strong className="text-white">{currentStudent.fullName}</strong> ({currentStudent.studentId})
                </div>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-indigo-400 hover:bg-slate-800"
                >
                  My Student Dashboard
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-red-400 hover:bg-slate-800"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full py-2.5 text-center text-sm font-medium text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700"
                >
                  Student Login
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                >
                  Register Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
