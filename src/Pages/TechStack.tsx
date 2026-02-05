import { type CardTypes } from "@/types";
import Card from "@/components/Card";
import {
  SiJavascript,
  SiReact,
  SiTypescript,
  SiExpress,
  SiPostgresql,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";

const TechStack = () => {
  const cards: CardTypes[] = [
    {
      icon: <SiReact className="text-reactIconColor w-8 h-8" />,
      title: "React",
      description:
        "A JavaScript library for building fast, component-based user interfaces with reusable components.",
    },
    {
      icon: <SiTypescript className="text-typeScriptIconColor w-8 h-8" />,
      title: "TypeScript",
      description:
        "A statically typed superset of JavaScript that improves code reliability and maintainability.",
    },
    {
      icon: <SiExpress className="text-white w-8 h-8" />,
      title: "Express.js",
      description:
        "A lightweight Node.js framework for building RESTful APIs and scalable backend services.",
    },
    {
      icon: <SiPostgresql className="text-postgreSQLIconColor w-8 h-8" />,
      title: "PostgreSQL",
      description:
        "A powerful relational database known for data integrity, performance, and advanced querying.",
    },
    {
      icon: <SiTailwindcss className="text-tailwindIconColor w-8 h-8" />,
      title: "Tailwind",
      description:
        "A utility-first CSS framework for rapidly building responsive and modern user interfaces.",
    },
    {
      icon: <SiSupabase className="text-supabaseIconColor w-8 h-8" />,
      title: "Supabase",
      description:
        "An open-source backend platform offering authentication, real-time databases, and storage.",
    },
    {
      icon: <SiJavascript className="text-javascriptIconColor w-8 h-8" />,
      title: "JavaScript",
      description:
        "The core programming language of the web, used to create dynamic and interactive user experiences.",
    },
  ];

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

      <div className="flex flex-wrap mt-8 gap-6 w-full px-8 xl:px-24">
        {cards.map((card) => (
          <Card
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
