import type { TabsProps } from "../adminTypes";

const Tabs = ({ activeTab, onChange }: TabsProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onChange("resume")}
        className={`flex items-center gap-2 text-xs sm:text-sm font-mono rounded-md py-2 sm:py-3 px-4 sm:px-6 shadow-lg ${
          activeTab === "resume"
            ? "bg-draculaPink text-white"
            : "bg-transparent border border-draculaPink text-white"
        }`}
      >
        Resume
      </button>
      <button
        onClick={() => onChange("projects")}
        className={`flex items-center gap-2 text-xs sm:text-sm font-mono rounded-md py-2 sm:py-3 px-4 sm:px-6 shadow-lg ${
          activeTab === "projects"
            ? "bg-draculaPink text-white"
            : "bg-transparent border border-draculaPink text-white"
        }`}
      >
        Projects
      </button>
      <button
        onClick={() => onChange("techstack")}
        className={`flex items-center gap-2 text-xs sm:text-sm font-mono rounded-md py-2 sm:py-3 px-4 sm:px-6 shadow-lg ${
          activeTab === "techstack"
            ? "bg-draculaPink text-white"
            : "bg-transparent border border-draculaPink text-white"
        }`}
      >
        Tech Stack
      </button>
    </div>
  );
};

export default Tabs;