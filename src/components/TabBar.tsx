import TabButton from "./TabButton";
import { FaCss3, FaHtml5, FaReact } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { BsLayoutSplit } from "react-icons/bs";

const TabBar = () => {
  return (
    <div className="bg-tabBarColor flex w-full h-10 justify-between">
      <div className="flex gap-px">
        <TabButton
          to="/"
          icon={FaReact}
          iconColor="text-reactIconColor"
          fileName="Home.tsx"
        />

        <TabButton
          to="/projects"
          icon={BiLogoTypescript}
          iconColor="text-typeScriptIconColor"
          fileName="projects.ts"
        />

        <TabButton
          to="/techstack"
          icon={FaReact}
          iconColor="text-reactIconColor"
          fileName="TechStack.tsx"
        />

        <TabButton
          icon={FaCss3}
          to="/contacts"
          iconColor="text-cssIconColor"
          fileName="contacts.css"
        />

        <TabButton
          to="/about"
          icon={FaHtml5}
          iconColor="text-htmlIconColor"
          fileName="about.html"
        />
      </div>

      <div className="flex items-center gap-2">
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
