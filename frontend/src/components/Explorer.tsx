import { RiArrowDownSLine } from "react-icons/ri";
import ExplorerButton from "./ExplorerButton";
import { BiLogoTypescript } from "react-icons/bi";
import { FaCss3, FaHtml5, FaReact } from "react-icons/fa";
import { type ButtonTypes } from "@/types";

const Explorer = () => {
  const buttons: ButtonTypes[] = [
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
    <div className="hidden lg:flex flex-col bg-explorerBgColor w-64 h-full items-center">
      <div className="flex gap-2 items-center w-full justify-between px-4 py-2">
        <p className="text-white text-xs">EXPLORER</p>
        <button className="text-white hover:bg-explorerHoverColor px-1 rounded-md">
          ⋯
        </button>
      </div>

      <div className="flex items-center bg-explorerFolderHighlightColor gap-2 w-full px-1 py-0.5">
        <button className="flex items-center">
          <RiArrowDownSLine className="text-white w-5 h-5" />
          <p className="text-white font-bold text-xs">MY-PORTFOLIO</p>
        </button>
      </div>

      <div className="flex flex-col items-center bg-explorerBgColor w-full">
        {buttons.map((button) => (
          <ExplorerButton
            key={button.key}
            link={button.key}
            icon={button.icon}
            iconColor={button.iconColor}
            fileName={button.fileName}
          />
        ))}
      </div>
    </div>
  );
};

export default Explorer;
