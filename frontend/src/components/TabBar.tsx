import TabButton from "./TabButton";
import { FaCss3, FaHtml5, FaReact } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { BsLayoutSplit } from "react-icons/bs";
import type { ButtonTypes } from "@/types";

const TabBar = () => {

  const tabs: ButtonTypes[] = [
    {
      key: "/",
      icon: FaReact,
      iconColor: "text-reactIconColor",
      fileName: "Home.tsx",
    },
    {
      key: "/projects",
      icon: BiLogoTypescript,
      iconColor: "text-typeScriptIconColor",
      fileName: "projects.ts",
    },
    {
      key: "/techstack",
      icon: FaReact,
      iconColor: "text-reactIconColor",
      fileName: "Techstack.tsx",
    },
    {
      key: "/contacts",
      icon: FaCss3,
      iconColor: "text-cssIconColor",
      fileName: "Contacts.css",
    },
    {
      key: "/about",
      icon: FaHtml5,
      iconColor: "text-htmlIconColor",
      fileName: "about.html",
    },
  ];

  return (
    <div className="bg-tabBarColor flex w-full h-10 justify-between overflow-scroll no-scrollbar">
      <div className="flex gap-px">
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            link={tab.key}
            icon={tab.icon}
            iconColor={tab.iconColor}
            fileName={tab.fileName}
          />
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-2">
        <button className="hover:bg-explorerHoverColor p-1 rounded-md">
          <BsLayoutSplit className="text-white" />
        </button>

        <button className="text-white hover:bg-explorerHoverColor px-1 mr-2 rounded-md">
          ⋯
        </button>
      </div>
    </div>
  );
};

export default TabBar;
