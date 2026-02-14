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
      title: "GymSync",
      description: "Coming Soon!",
      link: "https://github.com/zMeliodas",
    },
  ];

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

      <div className="grid w-full gap-4 grid-cols-[repeat(auto-fit,minmax(190px,1fr))] pb-8 mt-8 px-8 xl:px-24">
        {cards.map((card) => (
          <Card
            key={card.title}
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
