import logo from "../assets/vscodelogo.png";
import {
  VscChromeClose,
  VscChromeRestore,
  VscChromeMinimize,
  VscLayoutPanel,
  VscLayoutSidebarLeft,
  VscLayout,
  VscLayoutSidebarRightOff,
} from "react-icons/vsc";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoSearch, IoChatboxOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const TitleBar = () => {
  return (
    <div className="bg-windowColor flex items-center h-8 w-full">
      <img src={logo} alt="" className="w-5 h-5 ml-2" />
      <div className="flex w-full items-center px-1 h-8 justify-between md:gap-3 md:justify-between">
        <div className="flex items-center">
          <p className="hidden xl:block text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            File
          </p>
          <p className="hidden xl:block text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Edit
          </p>
          <p className="hidden xl:block text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Selection
          </p>
          <p className="hidden xl:block text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            View
          </p>
          <p className="hidden xl:block text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Go
          </p>
          <p className="hidden xl:block text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Run
          </p>
          <p className="hidden xl:block text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Terminal
          </p>
          <p className="hidden xl:block text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Help
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden xl:flex items-center gap-2">
            <button className="hover:bg-windowHoverColor rounded-md p-1">
              <FaArrowLeft className="text-white" />
            </button>
            <FaArrowRight className="text-[#52525a]" />
          </div>

          <div className="flex items-center justify-center content-center gap-2">
            <button className="hidden bg-searchBarColor border border-searchBarBorderColor rounded-md w-56 sm:w-md md:w-lg h-6 hover:bg-searchBarHoverColor xl:flex items-center content-center justify-center gap-1">
              <IoSearch className="hidden xl:block text-white" />
              <p className="text-white text-xs font-mono">
                Cedrick Lemuel F. Cabansag
              </p>
            </button>
            <p className="text-white text-xs font-mono xl:hidden">
              Cedrick Lemuel F. Cabansag
            </p>
          </div>

          <div className="hidden xl:flex items-center justify-center content-center gap-2">
            <div className="flex items-center px-1.5 py-1 rounded-full hover:bg-searchBarHoverColor gap-0.5">
              <IoChatboxOutline className="text-white" />
              <IoIosArrowDown className="text-white w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="flex items-center shrink-0">
          <div className="hidden xl:flex items-center gap-2">
            <button className="hover:bg-windowHoverColor rounded-md">
              <VscLayout className="text-white w-5 h-5" />
            </button>
            <button className="hover:bg-windowHoverColor rounded-md">
              <VscLayoutSidebarLeft className="text-white w-5 h-5" />
            </button>
            <button className="hover:bg-windowHoverColor rounded-md">
              <VscLayoutPanel className="text-white w-5 h-5" />
            </button>
            <button className="hover:bg-windowHoverColor rounded-md">
              <VscLayoutSidebarRightOff className="text-white w-5 h-5" />
            </button>
          </div>

          <div className="hidden xl:flex items-center ml-4">
            <button className="hover:bg-windowHoverColor py-1.5 px-3">
              <VscChromeMinimize className="text-white w-5 h-5" />
            </button>
            <button className="hover:bg-windowHoverColor py-1.5 px-3">
              <VscChromeRestore className="text-white w-5 h-5" />
            </button>
            <button className="hover:bg-red-500 py-1.5 px-3">
              <VscChromeClose className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
