import { useEffect, useState } from "react";
import TechCard from "@/components/TechCard";
import { getTechnologies } from "../services/technology.service";
import type { Technology } from "@/types";

const TechStack = () => {
  const [techs, setTechs] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await getTechnologies();

        setTechs(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTechnologies();
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

      {isLoading && (
        <p className="text-white/60 font-mono px-8 xl:px-24 mt-8">
          Loading technologies...
        </p>
      )}

      {error && (
        <p className="text-red-400 font-mono px-8 xl:px-24 mt-8">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,160px)] pb-8 mt-8 px-4 xl:px-24">
          {techs.map((tech) => (
            <TechCard
              key={tech.id}
              name={tech.name}
              iconSlug={tech.icon_slug}
              iconHex={tech.icon_hex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TechStack;