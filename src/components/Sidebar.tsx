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
    id: "files",
    icon: VscFiles,
    isBottom: false,
  },
  {
    id: "search",
    icon: IoIosSearch,
    isBottom: false,
  },
  {
    id: "source-control",
    icon: VscSourceControl,
    isBottom: false,
  },
  {
    id: "debug",
    icon: VscDebugAlt,
    isBottom: false,
  },
  {
    id: "extensions",
    icon: VscExtensions,
    isBottom: false,
  },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-sideBarBgColor w-14 h-full items-center justify-between">
      <div className="flex flex-col items-center gap-2">
        {buttons.map((button) => (
          <SidebarButton
            key={button.id}
            icon={button.icon}
            isBottom={button.isBottom}
          />
        ))}
      </div>

      <div className="flex flex-col-reverse items-center gap-2">
        <SidebarButton key="settings" icon={IoMdSettings} isBottom={true} />
        <SidebarButton key="profile" icon={CgProfile} isBottom={true} />
      </div>
    </div>
  );
};

export default Sidebar;
