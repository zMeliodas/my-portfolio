import Card from "@/components/Card";
import PLANTITOTITA from "@/assets/PLANTITOTITA.png";
import FLOE from "@/assets/FLOE.svg";
import tbh from "@/assets/tbh.svg";
import { type CardTypes } from "@/types";

const Projects = () => {
  const cards: CardTypes[] = [
    {
      imageSrc: FLOE,
      title: "FLOE COMBAT",
      description:
        "A modern martial arts e-commerce website for FLOE Combat, featuring BJJ apparel, athlete highlights, customer reviews, and a bold visual identity inspired by combat sports culture.",

      link: "https://floecombat-web.apps.skwtr.com/",
    },
    {
      imageSrc: "",
      title: "GymSync",
      description:
        "A gym membership management web app that helps gym staff track members, membership statuses, subscriptions, and check-ins through a simple and organized dashboard.",

      link: "https://github.com/zMeliodas/gym-membership-management-system",
    },
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

      <div className="grid auto-rows-fr gap-4 w-full pb-8 mt-8 px-4 xl:px-24 grid-cols-[repeat(auto-fill,384px)]">
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
