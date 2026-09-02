const ProjectCards = () => {
  return (
    <div className="bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-5 flex gap-4 items-start transition-colors duration-200">
      <div className="w-12 h-12 rounded-md bg-backgroundColor border border-borderColor flex items-center justify-center shrink-0">
        <span className="text-draculaPink font-mono text-lg font-bold">F</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-draculaPink font-mono text-base sm:text-lg">
          FLOE COMBAT
        </p>
        <p className="text-white/60 font-mono text-xs sm:text-sm mt-1">
          A modern martial arts e-commerce website for FLOE Combat, featuring
          BJJ apparel, athlete highlights, customer reviews, and a bold visual
          identity.
        </p>
        <p className="text-white/30 font-mono text-xs mt-2 truncate">
          https://floecombat-web.apps.skwtr.com/
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
  );
};

export default ProjectCards;
