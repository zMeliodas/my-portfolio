import {
  VscSourceControl,
  VscFiles,
  VscDebugAlt,
  VscExtensions,
} from "react-icons/vsc";
import { IoMdSettings, IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className="bg-sideBarBgColor w-14 h-217 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-2">
        <button className="focus:bg-sideBarHoverColor focus:border-l-2 border-sideBarFocusColor text-sideBarItemColor focus:text-white hover:text-white px-2.5 py-2 w-full flex justify-center">
          <VscFiles className="w-7 h-7" />
        </button>
        <button className="focus:bg-sideBarHoverColor focus:border-l-2 border-sideBarFocusColor text-sideBarItemColor focus:text-white hover:text-white px-2.5 py-2 w-full flex justify-center">
          <IoIosSearch className="w-7 h-7" />
        </button>
        <button className="focus:bg-sideBarHoverColor focus:border-l-2 border-sideBarFocusColor text-sideBarItemColor focus:text-white hover:text-white px-2.5 py-2 w-full flex justify-center">
          <VscSourceControl className="w-7 h-7" />
        </button>
        <button className="focus:bg-sideBarHoverColor focus:border-l-2 border-sideBarFocusColor text-sideBarItemColor focus:text-white hover:text-white px-2.5 py-2 w-full flex justify-center">
          <VscDebugAlt className="w-7 h-7" />
        </button>
        <button className="focus:bg-sideBarHoverColor focus:border-l-2 border-sideBarFocusColor text-sideBarItemColor focus:text-white hover:text-white px-2.5 py-2 w-full flex justify-center">
          <VscExtensions className="w-7 h-7" />
        </button>
      </div>

      <div className="flex flex-col-reverse items-center gap-2">
        <button className="text-sideBarItemColor focus:text-white hover:text-white px-2.5 py-2 w-full flex justify-center">
          <IoMdSettings className="w-7 h-7" />
        </button>
        <button className="text-sideBarItemColor focus:text-white hover:text-white px-2.5 py-2 w-full flex justify-center">
          <CgProfile className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
