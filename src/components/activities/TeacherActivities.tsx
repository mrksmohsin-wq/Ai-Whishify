import React, { useRef } from 'react';
import { Award, BookOpen, Sparkles, Printer, CheckCircle } from 'lucide-react';

interface TeacherChalkboardProps {
  teacherName: string;
  subject?: string;
  school?: string;
}

export const TeacherChalkboardActivity: React.FC<TeacherChalkboardProps> = ({
  teacherName,
  subject = 'Inspiration & Wisdom',
  school = 'School of Life',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2 border border-emerald-200">
        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
        Classroom of Gratitude
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
        To Our Beloved Teacher
      </h2>

      {/* Realistic Chalkboard */}
      <div className="relative w-full bg-slate-800 rounded-xl p-6 md:p-8 border-8 border-amber-900 shadow-2xl text-left overflow-hidden">
        {/* Chalk dust texture */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* Vintage Desk Apple in corner */}
        <div className="absolute top-4 right-4 flex flex-col items-center">
          <span className="text-3xl drop-shadow-md">🍎</span>
          <span className="text-[10px] text-emerald-300 font-mono">#1 Teacher</span>
        </div>

        {/* Chalk writing */}
        <div className="relative z-10 font-handwriting text-2xl md:text-3xl text-emerald-100 leading-relaxed">
          <p className="text-amber-200">Date: Today & Always</p>
          <p className="text-white mt-2">Lesson of the Day:</p>
          <p className="text-emerald-200 text-xl md:text-2xl mt-1">
            "A truly great teacher is hard to find, difficult to part with, and impossible to forget."
          </p>

          <div className="mt-6 pt-4 border-t border-slate-600 flex flex-col gap-1">
            <span className="text-white font-bold text-2xl">Mentor: {teacherName}</span>
            <span className="text-slate-300 text-lg">Subject: {subject}</span>
            <span className="text-emerald-300 text-base">{school}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TeacherCertificateProps {
  teacherName: string;
  senderName: string;
  school?: string;
}

export const TeacherCertificateActivity: React.FC<TeacherCertificateProps> = ({
  teacherName,
  senderName,
  school = 'Academy of Lifelong Learning',
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 mb-2 border border-amber-200">
        <Award className="w-3.5 h-3.5 text-amber-600" />
        Honorary Recognition
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Official Certificate of Excellence
      </h2>
      <p className="text-xs text-slate-600 mb-4">
        Conferred with deep gratitude for shaping the future
      </p>

      {/* Diploma Card */}
      <div className="relative w-full bg-amber-50/95 border-8 border-double border-amber-600/70 rounded-xl p-6 md:p-8 shadow-2xl text-center">
        {/* Certificate Golden Seal */}
        <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border-2 border-amber-600 shadow-md flex items-center justify-center">
          <Award className="w-8 h-8 text-amber-900" />
        </div>

        <div className="text-xs uppercase tracking-widest font-extrabold text-amber-800">
          World's Best Teacher Award
        </div>
        <div className="text-xs text-slate-500 mt-0.5">THIS IS PROUDLY PRESENTED TO</div>

        {/* Teacher Name */}
        <div className="font-script text-3xl md:text-4xl font-extrabold text-amber-950 my-4 border-b-2 border-amber-300 pb-2 inline-block px-6">
          {teacherName}
        </div>

        <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-sm mx-auto">
          For inspiring curiosity, sparking imagination, and instilling a lifelong love of learning. Your wisdom and patience have made an eternal impact.
        </p>

        {/* Signatures */}
        <div className="mt-6 pt-4 border-t border-amber-200 flex justify-between items-end px-4 text-left">
          <div>
            <div className="font-handwriting text-xl text-slate-800">{senderName}</div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Presented By</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1 justify-end">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Mentor
            </div>
            <div className="text-[10px] text-slate-500">{new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-300 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
        >
          <Printer className="w-3.5 h-3.5 text-slate-600" />
          Print / Save Certificate
        </button>
      </div>
    </div>
  );
};
