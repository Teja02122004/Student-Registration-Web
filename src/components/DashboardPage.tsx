/**
 * Student Dashboard Page (Page 5)
 * Protected view showing personalized greeting, Student ID, Profile Card,
 * Enrolled Course Card with syllabus breakdown, profile editor modal, and logout.
 */

import React, { useState } from 'react';
import { Student, Course, ActivePage } from '../types/index.ts';
import { updateStudentProfile } from '../utils/storage.ts';
import { 
  User, 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Phone, 
  Mail, 
  Building2, 
  MapPin, 
  Edit3, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  X,
  AlertCircle
} from 'lucide-react';

interface DashboardPageProps {
  currentStudent: Student | null;
  courses: Course[];
  setActivePage: (page: ActivePage) => void;
  onLogout: () => void;
  onProfileUpdated: (updated: Student) => void;
  onViewCourseDetails: (course: Course) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentStudent,
  courses,
  setActivePage,
  onLogout,
  onProfileUpdated,
  onViewCourseDetails,
}) => {
  // If not logged in, show access guard
  if (!currentStudent) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-['Outfit'] mb-2">
          Authentication Required
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          You must be logged in to access the protected Student Dashboard.
        </p>
        <button
          onClick={() => setActivePage('login')}
          className="px-6 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
        >
          Proceed to Student Login
        </button>
      </div>
    );
  }

  // Find enrolled course
  const enrolledCourse = courses.find((c) => c.code === currentStudent.selectedCourseCode);

  // Edit profile modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(currentStudent.fullName);
  const [editPhone, setEditPhone] = useState(currentStudent.phone);
  const [editGender, setEditGender] = useState(currentStudent.gender);
  const [editAddress, setEditAddress] = useState(currentStudent.address || '');
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditSuccess(null);

    if (!editName.trim() || editName.trim().length < 2) {
      setEditError('Please enter a valid legal name.');
      return;
    }

    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(editPhone.trim())) {
      setEditError('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    const res = updateStudentProfile(currentStudent.id, {
      fullName: editName.trim(),
      phone: editPhone.trim(),
      gender: editGender,
      address: editAddress.trim(),
    });

    if (res.success && res.student) {
      setEditSuccess('Profile records updated successfully!');
      onProfileUpdated(res.student);
      setTimeout(() => {
        setEditModalOpen(false);
        setEditSuccess(null);
      }, 1200);
    } else {
      setEditError(res.message);
    }
  };

  const formattedDate = new Date(currentStudent.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* 1. WELCOME HERO BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Active Student Matriculation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit']">
              Welcome back, {currentStudent.fullName}!
            </h1>
            <p className="text-sm text-indigo-200 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>Student ID: <strong className="text-white font-mono">{currentStudent.studentId}</strong></span>
              <span>·</span>
              <span>Department: <strong>{currentStudent.department}</strong></span>
              <span>·</span>
              <span>Admitted: <strong>{formattedDate}</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditName(currentStudent.fullName);
                setEditPhone(currentStudent.phone);
                setEditGender(currentStudent.gender);
                setEditAddress(currentStudent.address || '');
                setEditModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer border border-slate-700"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN GRID (Enrolled Course & Profile Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Enrolled Course Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                    Enrolled Degree Program
                  </h3>
                  <p className="text-xs text-slate-500">Official curriculum and matriculation record</p>
                </div>
              </div>

              <button
                onClick={() => setActivePage('courses')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                Change Program
              </button>
            </div>

            {enrolledCourse ? (
              <div className="space-y-6">
                
                {/* Course Header Info */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-700 text-white font-mono">
                      {enrolledCourse.code}
                    </span>
                    <span className="text-xs font-medium text-slate-600 bg-white/80 px-2.5 py-1 rounded border border-blue-200/50">
                      {enrolledCourse.duration}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 font-['Outfit'] mt-1">
                    {enrolledCourse.name}
                  </h4>
                  <div className="text-xs font-semibold text-blue-700 mt-0.5 mb-3">
                    {enrolledCourse.department}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {enrolledCourse.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-blue-200/60 text-xs">
                    <div>
                      <span className="text-slate-500 block">Annual Tuition:</span>
                      <span className="font-bold text-slate-900 font-mono text-sm tabular-nums">
                        {enrolledCourse.feeFormatted}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Eligibility Met:</span>
                      <span className="font-medium text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Syllabus Modules */}
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Course Syllabus Topics
                  </h5>
                  <div className="space-y-2">
                    {enrolledCourse.syllabus.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60 text-xs text-slate-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {i + 1}
                        </span>
                        <span className="font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Details link */}
                <div className="pt-2">
                  <button
                    onClick={() => onViewCourseDetails(enrolledCourse)}
                    className="w-full py-2.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Complete Program Specifications &amp; Outcomes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-sm text-slate-500 mb-4">No enrolled program detected.</p>
                <button
                  onClick={() => setActivePage('courses')}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg"
                >
                  Browse Course Catalog
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Student Profile Card & Shortcuts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                    Student Profile
                  </h3>
                  <p className="text-xs text-slate-500">Verified credentials</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditName(currentStudent.fullName);
                  setEditPhone(currentStudent.phone);
                  setEditGender(currentStudent.gender);
                  setEditAddress(currentStudent.address || '');
                  setEditModalOpen(true);
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                title="Edit profile information"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Full Name</span>
                <span className="font-bold text-slate-800">{currentStudent.fullName}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Student ID</span>
                <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {currentStudent.studentId}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Email Address</span>
                <span className="font-medium text-slate-700 truncate max-w-[200px]" title={currentStudent.email}>
                  {currentStudent.email}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Phone Number</span>
                <span className="font-medium text-slate-700">+91 {currentStudent.phone}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Gender</span>
                <span className="font-medium text-slate-700">{currentStudent.gender}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Date of Birth</span>
                <span className="font-medium text-slate-700">{currentStudent.dateOfBirth || 'Not specified'}</span>
              </div>

              <div className="py-1.5">
                <span className="text-slate-400 block mb-1">Residential Address</span>
                <span className="font-medium text-slate-700 leading-relaxed block bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {currentStudent.address || 'No residential address recorded.'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Courses Shortcut */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Other Recommended Programs</span>
              <button
                onClick={() => setActivePage('courses')}
                className="text-blue-600 hover:underline normal-case text-xs font-medium cursor-pointer"
              >
                View all ({courses.length})
              </button>
            </h4>

            <div className="space-y-2">
              {courses
                .filter((c) => c.code !== currentStudent.selectedCourseCode)
                .slice(0, 3)
                .map((rc) => (
                  <button
                    key={rc.code}
                    onClick={() => onViewCourseDetails(rc)}
                    className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 font-mono">
                          {rc.code}
                        </span>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {rc.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">{rc.department} · {rc.duration}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 font-['Outfit']">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                <span>Edit Student Profile</span>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            {editSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{editSuccess}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  10-Digit Indian Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 rounded-r-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender
                </label>
                <select
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Residential Address
                </label>
                <textarea
                  rows={3}
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  placeholder="Street, City, State, PIN"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer shadow-sm"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
