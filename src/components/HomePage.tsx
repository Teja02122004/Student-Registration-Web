/**
 * Home Page (Page 1)
 * Hero, Statistics, Features, Popular Courses & Call to Action
 */

import React from 'react';
import { Course, ActivePage } from '../types/index.ts';
import { 
  UserPlus, 
  BookOpen, 
  ShieldCheck, 
  FileCode2, 
  Smartphone, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Users,
  Award,
  Layers,
  GraduationCap,
  Clock,
  IndianRupee,
  Cpu,
  Binary,
  Brain
} from 'lucide-react';

interface HomePageProps {
  courses: Course[];
  setActivePage: (page: ActivePage) => void;
  onSelectCourse: (courseCode: string) => void;
  onViewCourseDetails: (course: Course) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  courses,
  setActivePage,
  onSelectCourse,
  onViewCourseDetails,
}) => {
  const featured = courses.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pt-12 sm:pt-20 pb-20 sm:pb-28 border-b border-indigo-900/30">
        
        {/* Subtle Ambient Light Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-sky-300 border border-blue-400/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Next-Generation Academic Portal 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.12]">
                Welcome to <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">StudentHub</span>
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-indigo-200">
                Learn More. Achieve More.
              </p>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                A complete university portal allowing students to register online, log in securely, explore industry-accredited courses stored in XML, and manage their matriculation on a personal dashboard.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActivePage('register')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer text-base"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Student Registration</span>
                </button>
                <button
                  onClick={() => setActivePage('courses')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-base"
                >
                  <BookOpen className="w-5 h-5 text-sky-400" />
                  <span>Explore Courses</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>BCRYPT Password Hash</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <FileCode2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>XML Data Engine</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Instant Matriculation</span>
                </div>
              </div>

            </div>

            {/* Right Visual Card / University Portal Simulation */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glow Backdrop */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-xl"></div>

                <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-left">
                  
                  {/* Card Header */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 border border-indigo-700/40 mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-white/20 text-white uppercase tracking-wider">
                        Portal Live
                      </span>
                      <span className="text-xs text-sky-300 font-mono">Academic Year 2026-27</span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-['Outfit']">Institutional Student Matrix</h3>
                    <p className="text-xs text-slate-300">Unified Central Registrar System</p>
                  </div>

                  {/* Metrics preview */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                      <div className="text-xs text-slate-400 mb-1">Enrolled Students</div>
                      <div className="text-2xl font-bold text-white font-mono tabular-nums">2,480+</div>
                      <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                        <CheckCircle className="w-3 h-3" /> Real-time Verified
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                      <div className="text-xs text-slate-400 mb-1">Available Courses</div>
                      <div className="text-2xl font-bold text-sky-400 font-mono tabular-nums">{courses.length} Programs</div>
                      <div className="text-[11px] text-slate-400 mt-1">via data/courses.xml</div>
                    </div>
                  </div>

                  {/* Sample Quick Action Banner */}
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Need Registration Support?</div>
                      <div className="text-[11px] text-slate-400">Admissions desk available online</div>
                    </div>
                    <button
                      onClick={() => setActivePage('contact')}
                      className="px-3 py-1.5 text-xs font-medium text-sky-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            <div className="text-center pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-['Outfit'] tabular-nums">
                {courses.length}+
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-1">Available Courses</div>
              <div className="text-xs text-slate-500 mt-0.5">Parsed dynamically from XML</div>
            </div>

            <div className="text-center pt-4 lg:pt-0 lg:pl-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-700 font-['Outfit'] tabular-nums">
                100%
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-1">Easy Registration</div>
              <div className="text-xs text-slate-500 mt-0.5">Under 2 minutes with instant validation</div>
            </div>

            <div className="text-center pt-4 lg:pt-0 lg:pl-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-['Outfit'] tabular-nums">
                2,400+
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-1">Student Community</div>
              <div className="text-xs text-slate-500 mt-0.5">Active learners across departments</div>
            </div>

            <div className="text-center pt-4 lg:pt-0 lg:pl-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-700 font-['Outfit'] tabular-nums">
                24/7
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-1">Student-Friendly Portal</div>
              <div className="text-xs text-slate-500 mt-0.5">Responsive mobile &amp; tablet view</div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Core Portal Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] mt-3">
            Engineered for Modern Academic Institutions
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Every feature is designed with real-world rigor: multi-field validation, zero plaintext credential storage, and portable XML course storage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <UserPlus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">
              Student Registration
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Complete registration form validating student email, 10-digit Indian phone numbers, password confirmation, and automated Student ID assignment.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">
              Secure Login &amp; Session
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cryptographic password verification, session regeneration against fixation attacks, show/hide password toggle, and protected dashboard routes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <FileCode2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">
              Course Management (XML)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dynamic XML parsing for course fees in INR (₹), eligibility, duration, syllabus modules, real-time search filtering, and one-click enrollment.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">
              Responsive Design
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Engineered with clean CSS layout principles, smooth hover transitions, accessible touch targets, and beautiful typography across all devices.
            </p>
          </div>

        </div>
      </section>

      {/* 4. POPULAR COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Academic Curriculum</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
              Featured Degree Programs
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore highlighted courses stored in <code>data/courses.xml</code>.
            </p>
          </div>
          <button
            onClick={() => setActivePage('courses')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <span>View All Programs ({courses.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((course) => (
            <div
              key={course.code}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-700 font-mono">
                    {course.code}
                  </span>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {course.duration}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-1 line-clamp-1">
                  {course.name}
                </h3>
                
                <p className="text-xs font-medium text-indigo-600 mb-2">
                  {course.department}
                </p>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {course.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Tuition</span>
                    <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                      {course.feeFormatted}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {course.seats} Seats
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewCourseDetails(course)}
                    className="w-full py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onSelectCourse(course.code)}
                    className="w-full py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-8 sm:p-14 text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit']">
              Begin Your Academic Journey Today
            </h2>
            <p className="text-base text-indigo-200 leading-relaxed">
              Registration is open for the upcoming academic session. Create your student account in under two minutes, pick your course, and access your student dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setActivePage('register')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-indigo-900 bg-white hover:bg-indigo-50 shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-5 h-5 text-indigo-600" />
                <span>Register for 2026 Admissions</span>
              </button>
              <button
                onClick={() => setActivePage('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Talk to Admissions Counselor</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
