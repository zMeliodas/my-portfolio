
const ResumeSection = () => {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="bg-cardColor border border-borderColor rounded-lg p-6 flex items-start gap-4">
          <div className="w-12 h-14 rounded-md bg-backgroundColor border border-borderColor flex items-center justify-center text-draculaPink font-mono text-[10px] font-bold shrink-0">
            PDF
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-mono text-sm sm:text-base break-all">
              Cedrick_Cabansag_Resume.pdf
            </p>
            <p className="text-white/40 font-mono text-xs mt-1">
              Uploaded Aug 14, 2026
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <button className="flex items-center gap-2 text-white text-xs sm:text-sm font-mono bg-draculaPink shadow-lg rounded-md py-2 px-4">
                Download
              </button>
              <button className="flex items-center gap-2 text-white text-xs sm:text-sm font-mono bg-transparent border border-draculaPink shadow-lg rounded-md py-2 px-4">
                Replace
              </button>
              <button className="flex items-center gap-2 text-red-400 text-xs sm:text-sm font-mono bg-transparent border border-red-400/50 rounded-md py-2 px-4">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
