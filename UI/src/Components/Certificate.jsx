import { useRef } from "react";
import { useAuth } from "../context/AuthContext";

const Certificate = ({ courseName, completionDate }) => {
  const { profile } = useAuth();
  const certRef = useRef(null);

  const studentName = profile
    ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
    : "Student Name";

  const date = completionDate
    ? new Date(completionDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <div className="flex flex-col items-center py-10 px-4 font-sans">

      {/* Certificate Card */}
      <div
        ref={certRef}
        className="relative w-full max-w-3xl border-8 border-double border-purple-800 rounded-2xl bg-white shadow-2xl overflow-hidden"
        style={{ minHeight: "480px" }}
      >

        {/* Top decorative bar */}
        <div className="h-4 w-full bg-gradient-to-r from-purple-900 via-purple-500 to-purple-900" />

        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.04 }}
        >
          <span
            className="text-purple-900 font-black"
            style={{ fontSize: "140px", transform: "rotate(-30deg)", whiteSpace: "nowrap" }}
          >
            LEARNESTA
          </span>
        </div>

        {/* Corner ornaments (pure CSS) */}
        <div className="absolute top-6 left-6 w-10 h-10 border-t-4 border-l-4 border-purple-300 rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-10 h-10 border-t-4 border-r-4 border-purple-300 rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-b-4 border-l-4 border-purple-300 rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b-4 border-r-4 border-purple-300 rounded-br-lg" />

        {/* Content */}
        <div className="flex flex-col items-center px-12 py-10 text-center gap-4">

          {/* Logo / Brand */}
          <div className="text-purple-900 font-black tracking-widest text-2xl mb-2">
            LEARNESTA
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-light text-gray-700 tracking-wide" style={{ fontFamily: "serif" }}>
            Certificate of Completion
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full max-w-sm my-1">
            <div className="flex-1 h-px bg-purple-300" />
            <div className="text-purple-400 text-xl">✦</div>
            <div className="flex-1 h-px bg-purple-300" />
          </div>

          {/* Body */}
          <p className="text-gray-500 text-base">
            This is to certify that
          </p>

          {/* Student name */}
          <p
            className="text-purple-800 font-bold"
            style={{ fontSize: "36px", fontFamily: "serif", letterSpacing: "0.03em" }}
          >
            {studentName}
          </p>

          <p className="text-gray-500 text-base">
            has successfully completed the course
          </p>

          {/* Course name */}
          <p className="text-2xl font-semibold text-gray-800 mt-1 mb-1">
            {courseName || "Course Name"}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full max-w-sm my-1">
            <div className="flex-1 h-px bg-purple-300" />
            <div className="text-purple-400 text-xl">✦</div>
            <div className="flex-1 h-px bg-purple-300" />
          </div>

          {/* Date + Signature row */}
          <div className="flex justify-between items-end w-full max-w-lg mt-4">

            <div className="text-center">
              <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Date of Completion</p>
              <p className="text-gray-700 font-medium text-sm border-b border-gray-300 pb-1 px-4">
                {date}
              </p>
            </div>

            <div className="text-purple-700 font-black text-lg tracking-widest" style={{ fontFamily: "serif" }}>
              ✦ LEARNESTA ✦
            </div>

            <div className="text-center">
              <p className="text-gray-500 font-semibold text-sm border-b border-gray-400 pb-1 px-4">
                Learnesta Admin
              </p>
              <p className="text-gray-400 text-xs tracking-widest uppercase mt-1">Authorised Signatory</p>
            </div>

          </div>

        </div>

        {/* Bottom decorative bar */}
        <div className="h-4 w-full bg-gradient-to-r from-purple-900 via-purple-500 to-purple-900" />

      </div>

      {/* Share / Print hint */}
      <p className="mt-6 text-sm text-gray-400">
        Use your browser's <strong>Print → Save as PDF</strong> to download this certificate.
      </p>

    </div>
  );
};

export default Certificate;
