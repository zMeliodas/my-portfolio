import type { TechCardProps } from "@/types";

import { getTechnologyIconUrl } from "@/utils/getTechnologyIconUrl";

const TechCard = ({
  name,
  iconSlug,
  iconHex,
}: TechCardProps) => {
  return (
    <div className="flex flex-col items-center gap-4 bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-6 transition-colors duration-200">
      <div className="w-14 h-14 rounded-lg bg-backgroundColor border border-borderColor flex items-center justify-center shrink-0">
        <img
          src={getTechnologyIconUrl(
            name,
            iconSlug,
            iconHex,
          )}
          alt={`${name} icon`}
          className="w-8 h-8"
        />
      </div>

      <p className="text-draculaPink font-mono text-xl text-center">
        {name}
      </p>
    </div>
  );
};

export default TechCard;