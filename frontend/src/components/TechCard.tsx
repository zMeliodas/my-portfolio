import type { TechCardProps } from "@/types";

const TechCard = ({ icon, name }: TechCardProps) => {
  return (
    <div className="flex flex-col items-center gap-4 bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-6 transition-colors duration-200">
      <div className="w-14 h-14 rounded-lg bg-backgroundColor border border-borderColor flex items-center justify-center shrink-0">
        {icon}
      </div>
      <p className="text-draculaPink font-mono text-xl text-center">{name}</p>
    </div>
  );
};

export default TechCard;
