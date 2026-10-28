/**
 * Course Details Modal
 * Deep-dive view displaying full curriculum syllabus, eligibility, career outcomes, and fees.
 */

import React from 'react';
import { Course, Student } from '../types/index.ts';
import { 
  X, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck,
  Check
} from 'lucide-react';

interface CourseDetailsModalProps {
  course: Course | null;
  currentStudent: Student | null;
  onClose: () => void;
  onSelectCourse: (courseCode: string) => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  currentStudent,
  onClose,
  onSelectCourse,
}) => {
  if (!course) return null;

  const isEnrolled = currentStudent?.selectedCourseCode === course.code;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-8">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700 font-mono">
                {course.code}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {course.category}
              </span>
              {course.badge && (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">
                  {course.badge}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">
              {course.name}
            </h2>
            <p className="text-xs font-semibold text-blue-600 mt-0.5">
              {course.department}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-6">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Program Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div>
              <div className="text-[11px] text-slate-400">Duration</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{course.duration}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Tuition Fee</div>
              <div className="text-sm font-bold text-blue-700 font-mono tabular-nums mt-0.5">{course.feeFormatted}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Intake Capacity</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{course.seats} Seats</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Rating</div>
              <div className="text-sm font-bold text-amber-600 flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{course.rating}</span>
              </div>
            </div>
          </div>

          {/* Eligibility Requirement */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
            <GraduationCap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-blue-800 mb-0.5">Academic Eligibility:</strong>
              <span>{course.eligibility}</span>
            </div>
          </div>

          {/* Syllabus Modules */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Curriculum &amp; Syllabus Modules</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.syllabus.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-100 bg-white text-xs text-slate-700 shadow-2xs"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="truncate">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Pathways */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Career Opportunities</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {course.careerOpportunities}
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSelectCourse(course.code);
              onClose();
            }}
            disabled={isEnrolled}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              isEnrolled
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            }`}
          >
            {isEnrolled ? (
              <>
                <Check className="w-4 h-4" />
                <span>Currently Enrolled in this Course</span>
              </>
            ) : (
              <>
                <GraduationCap className="w-4 h-4" />
                <span>Select &amp; Register for {course.code}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
