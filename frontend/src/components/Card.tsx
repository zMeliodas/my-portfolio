import { type CardTypes } from "@/types";
import { VscGithub, VscLinkExternal } from "react-icons/vsc";

const Card = ({
  imageSrc,
  title,
  description,
  githubLink,
  liveLink,
  techStack,
  icon,
}: CardTypes) => {
  const getTitleInitial = (title: string) => {
    if (!title) return "";
    return title.trim().charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-3 bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-6 transition-colors duration-200 w-full h-full">
      <div className="bg-backgroundColor flex items-center justify-center border rounded-lg border-borderColor w-12 h-12 overflow-hidden">
        {imageSrc ? (
          <img
            className="w-full h-full object-contain p-1"
            src={imageSrc}
            alt={title}
          />
        ) : icon ? (
          icon
        ) : (
          <div className="rounded-lg bg-draculaPink text-white flex items-center justify-center text-xl font-semibold font-mono h-full w-full">
            {getTitleInitial(title)}
          </div>
        )}
      </div>

      <h1 className="text-draculaPink font-mono text-2xl">{title}</h1>
      <p className="text-white font-mono text-sm flex-1">{description}</p>

      {techStack && techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono text-draculaPink border border-draculaPink/40 bg-draculaPink/10 rounded-md px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {(githubLink || liveLink) && (
        <div className="flex gap-2 mt-1 flex-wrap">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white text-xs sm:text-sm font-mono bg-draculaPink shadow-lg rounded-md py-2 px-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <VscLinkExternal /> Live
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white text-xs sm:text-sm font-mono bg-transparent border border-borderColor rounded-md py-2 px-4 transform transition-all duration-300 hover:-translate-y-1 hover:border-draculaPink hover:shadow-xl"
            >
              <VscGithub /> GitHub
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
