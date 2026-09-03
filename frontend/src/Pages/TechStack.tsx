import { useEffect, useState } from "react";
import TechCard from "@/components/TechCard";

import {
  SiJavascript,
  SiReact,
  SiTypescript,
  SiExpress,
  SiPostgresql,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";

import {
  siJavascript,
  siReact,
  siTypescript,
  siExpress,
  siPostgresql,
  siTailwindcss,
  siSupabase,
} from "simple-icons";
import type { Technology } from "@/types";

const iconMap = {
  SiReact: {
    Icon: SiReact,
    color: `#${siReact.hex}`,
  },

  SiTypescript: {
    Icon: SiTypescript,
    color: `#${siTypescript.hex}`,
  },

  SiExpress: {
    Icon: SiExpress,
    color: `#${siExpress.hex}`,
  },

  SiPostgresql: {
    Icon: SiPostgresql,
    color: `#${siPostgresql.hex}`,
  },

  SiTailwindcss: {
    Icon: SiTailwindcss,
    color: `#${siTailwindcss.hex}`,
  },

  SiSupabase: {
    Icon: SiSupabase,
    color: `#${siSupabase.hex}`,
  },

  SiJavascript: {
    Icon: SiJavascript,
    color: `#${siJavascript.hex}`,
  },
};

const TechStack = () => {
  const [techs, setTechs] = useState<Technology[]>([]);

  useEffect(() => {
    const getTechnologies = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/technologies`,
      );

      const data = await response.json();

      setTechs(data.result);
    };

    getTechnologies();
  }, []);

  return (
    <div className="bg-backgroundColor w-full h-full pb-16 overflow-auto custom-scroll">
      <div className="flex flex-col max-w-4xl pt-8 px-8 xl:px-24 gap-4">
        <h1 className="text-draculaPink text-4xl font-medium font-mono">
          My Tech Stack
        </h1>

        <p className="text-white font-medium font-mono sm:text-sm xl:text-xl">
          These are the technologies I use to build modern, scalable, and
          user-focused web applications.
        </p>
      </div>

      <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,160px)] pb-8 mt-8 px-4 xl:px-24">
        {techs.map((tech) => {
          const iconData = iconMap[tech.icon_key as keyof typeof iconMap];

          if (!iconData) return null;

          const Icon = iconData.Icon;

          return (
            <TechCard
              key={tech.id}
              icon={
                <Icon className="w-8 h-8" style={{ color: iconData.color }} />
              }
              name={tech.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;
