
const TechnologiesCards = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-5 flex gap-4 items-start transition-colors duration-200">
        <div className="w-12 h-12 rounded-md bg-[#1f4f78] flex items-center justify-center shrink-0">
          <span className="text-white font-mono text-sm font-bold">⚛</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-draculaPink font-mono text-base sm:text-lg">React</p>
          <p className="text-white/60 font-mono text-xs sm:text-sm mt-1">
            A JavaScript library for building fast, component-based user
            interfaces with reusable components.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="text-xs font-mono text-white/60 border border-borderColor rounded-md px-3 py-1.5">
            Edit
          </button>
          <button className="text-xs font-mono text-white/60 border border-borderColor rounded-md px-3 py-1.5">
            Delete
          </button>
        </div>
      </div>     
    </div>
  );
};

export default TechnologiesCards;