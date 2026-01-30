import Card from "@/components/Card";
import PLANTITOTITA from "@/assets/PLANTITOTITA.png";
import tbh from "@/assets/tbh.svg";
import { type CardTypes } from "@/types";

const Projects = () => {
  const cards: CardTypes[] = [
    {
      imageSrc: PLANTITOTITA,
      title: "PLANTITOTITA",
      description:
        "An Augmented Reality-Integrated Mobile Application with Comprehensive Plant Information and Care Guidance",

      link: "https://github.com/zMeliodas/PLANTITOTITA",
    },
    {
      imageSrc: tbh,
      title: "TBH",
      description:
        "An app where users can share anonymous confessions, compliments, and honest thoughts with friends.",

      link: "https://github.com/zMeliodas/tbh-confession-app",
    },
    {
      imageSrc: "",
      title: "Blog App",
      description:
        "A simple blog website where users can create blog posts with images and interact with other users by commenting on their posts.",
      link: "https://github.com/zMeliodas/simple-blog",
    },
    {
      imageSrc: "",
      title: "Fitness Client Tracker",
      description: "Coming Soon!",
      link: "https://github.com/zMeliodas",
    },
  ];

  return (
    <div className="bg-backgroundColor w-full max-h-210 pb-16 overflow-auto custom-scroll">
      <div className="flex flex-col max-w-4xl pt-8 px-24 gap-4">
        <h1 className="text-draculaPink text-4xl font-medium font-mono">
          My Projects
        </h1>
        <p className="text-white text-xl font-medium font-mono">
          Here's a collection of my recent work. These projects showcase my
          skills in web development, design, and problem-solving.
        </p>
      </div>

      <div className="flex flex-wrap mt-8 gap-6 w-full px-24">
        {cards.map((card) => (
          <Card
            imageSrc={card.imageSrc}
            title={card.title}
            description={card.description}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
