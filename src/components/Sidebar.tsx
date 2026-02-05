import {
  VscSourceControl,
  VscFiles,
  VscDebugAlt,
  VscExtensions,
} from "react-icons/vsc";
import { IoMdSettings, IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import SidebarButton from "./SidebarButton";
import type { SidebarButtonTypes } from "@/types";

const buttons: SidebarButtonTypes[] = [
  {
    key: "files",
    icon: VscFiles,
    isBottom: false,
  },
  {
    key: "search",
    icon: IoIosSearch,
    isBottom: false,
  },
  {
    key: "source-control",
    icon: VscSourceControl,
    isBottom: false,
  },
  {
    key: "debug",
    icon: VscDebugAlt,
    isBottom: false,
  },
  {
    key: "extensions",
    icon: VscExtensions,
    isBottom: false,
  },
];

const Sidebar = () => {
  return (
    <div className="bg-sideBarBgColor w-12 md:w-14 h-full flex flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-2">
        {buttons.map((button) => (
          <SidebarButton
            key={button.key}
            icon={button.icon}
            isBottom={button.isBottom}
          />
        ))}
      </div>

      <div className="flex flex-col-reverse items-center gap-2">
        <SidebarButton icon={IoMdSettings} isBottom={true} />
        <SidebarButton icon={CgProfile} isBottom={true} />
      </div>
    </div>
  );
};

export default Sidebar;
