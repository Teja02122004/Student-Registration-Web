/**
 * Course Management & Catalog (Page 4)
 * Dynamic XML retrieval, real-time search, category filters,
 * toggle between Course Cards Grid & Detailed Table View, and course selection.
 */

import React, { useState, useMemo } from 'react';
import { Course, Student, ActivePage } from '../types/index.ts';
import { 
  Search, 
  Grid, 
  Table as TableIcon, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  FileCode2, 
  Check, 
  Eye, 
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';

interface CoursesPageProps {
  courses: Course[];
  currentStudent: Student | null;
  onSelectCourse: (courseCode: string) => void;
  onViewCourseDetails: (course: Course) => void;
  setActivePage: (page: ActivePage) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  currentStudent,
  onSelectCourse,
  onViewCourseDetails,
  setActivePage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Extract distinct categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => set.add(c.category));
    return ['All', ...Array.from(set)];
  }, [courses]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return courses.filter((c) => {
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [courses, searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold mb-2">
            <FileCode2 className="w-3.5 h-3.5" />
            <span>XML Dataset: <code>data/courses.xml</code></span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Course Catalog &amp; Degree Programs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse, inspect syllabi, and enroll in university programs. Parsed dynamically via XML engine.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-3">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Cards Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Detailed Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code (e.g. IT101), course title, department..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Results count */}
          <div className="text-xs text-slate-500 whitespace-nowrap">
            Showing <strong className="text-slate-900 font-mono">{filteredCourses.length}</strong> of{' '}
            <strong className="text-slate-900 font-mono">{courses.length}</strong> programs
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: CARDS GRID */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = currentStudent?.selectedCourseCode === course.code;

            return (
              <div
                key={course.code}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-700 font-mono">
                      {course.code}
                    </span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-1">
                    {course.name}
                  </h3>

                  <div className="text-xs font-semibold text-indigo-600 mb-3">
                    {course.department}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Highlights box */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Eligibility:</span>
                      <span className="font-medium text-slate-700 text-right max-w-[65%] truncate">
                        {course.eligibility}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                      <span className="text-slate-400">Annual Tuition:</span>
                      <span className="font-bold text-slate-900 font-mono tabular-nums text-sm">
                        {course.feeFormatted}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewCourseDetails(course)}
                    className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => onSelectCourse(course.code)}
                    disabled={isEnrolled}
                    className={`w-full py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isEnrolled
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Enrolled</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Select Course</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: DETAILED TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Code</th>
                  <th className="py-3.5 px-4">Program Title</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Annual Fee (INR)</th>
                  <th className="py-3.5 px-4">Eligibility</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredCourses.map((c) => {
                  const isEnrolled = currentStudent?.selectedCourseCode === c.code;

                  return (
                    <tr key={c.code} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-blue-700 text-xs">
                        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                          {c.code}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onViewCourseDetails(c)}
                          className="font-bold text-slate-900 hover:text-blue-600 text-left cursor-pointer"
                        >
                          {c.name}
                        </button>
                        <div className="text-xs text-slate-400 mt-0.5">{c.category}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">{c.department}</td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">{c.duration}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap tabular-nums text-xs">
                        {c.feeFormatted}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500 max-w-xs truncate" title={c.eligibility}>
                        {c.eligibility}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onViewCourseDetails(c)}
                            className="p-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg cursor-pointer"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onSelectCourse(c.code)}
                            disabled={isEnrolled}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                              isEnrolled
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {isEnrolled ? 'Enrolled' : 'Select'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">No Matching Courses Found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
