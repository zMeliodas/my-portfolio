import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { getProjects } from "@/services/project.service";

import type {
  CardTypes,
  Project,
} from "@/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();

        setProjects(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const cards: CardTypes[] = projects.map((project) => ({
    imageSrc: `${SERVER_URL}${project.image_url}`,
    title: project.title,
    description: project.description,
    liveLink: project.live_link ?? undefined,
    githubLink: project.github_link ?? undefined,

    techStack: project.techStack.map(
      (technology) => technology.name,
    ),
  }));

  return (
    <div className="bg-backgroundColor w-full h-full">
      <div className="flex flex-col pt-8 px-8 max-w-4xl 2xl:px-24 gap-4">
        <h1 className="text-draculaPink text-4xl font-medium font-mono lg:text-4xl">
          My Projects
        </h1>

        <p className="text-white font-medium font-mono sm:text-sm xl:text-xl">
          Here's a collection of my recent work. These projects showcase my
          skills in web development, design, and problem-solving.
        </p>
      </div>

      {isLoading && (
        <p className="text-white/60 font-mono px-8 xl:px-24 mt-8">
          Loading projects...
        </p>
      )}

      {error && (
        <p className="text-red-400 font-mono px-8 xl:px-24 mt-8">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid auto-rows-fr gap-4 w-full pb-8 mt-8 px-4 xl:px-24 grid-cols-[repeat(auto-fill,384px)]">
          {cards.map((card) => (
            <Card
              key={card.title}
              {...card}
            />
          ))}
        </div>
      )}

      {!isLoading &&
        !error &&
        cards.length === 0 && (
          <p className="text-white/40 font-mono px-8 xl:px-24 mt-8">
            No projects available.
          </p>
        )}
    </div>
  );
};

export default Projects;