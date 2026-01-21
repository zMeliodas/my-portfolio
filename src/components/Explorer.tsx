import { RiArrowDownSLine } from "react-icons/ri";
import ExplorerButton from "./ExplorerButton";
import { FaReact } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { FaCss3 } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";

const Explorer = () => {
  return (
    <div className="bg-explorerBgColor w-64 h-217 flex flex-col items-center">
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
        <ExplorerButton
          icon={FaReact}
          iconColor="text-reactIconColor"
          fileName="Home.tsx"
        />

        <ExplorerButton
          icon={FaReact}
          iconColor="text-reactIconColor"
          fileName="TechStack.tsx"
        />

        <ExplorerButton
          icon={BiLogoTypescript}
          iconColor="text-typeScriptIconColor"
          fileName="projects.ts"
        />

        <ExplorerButton
          icon={FaCss3}
          iconColor="text-cssIconColor"
          fileName="contacts.css"
        />

        <ExplorerButton
          icon={FaHtml5}
          iconColor="text-htmlIconColor"
          fileName="about.html"
        />
      </div>
    </div>
  );
};

export default Explorer;
