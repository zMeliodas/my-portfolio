import logo from "../assets/vscodelogo.png";
import {
  VscError,
  VscWarning,
  VscRemote,
  VscChromeClose,
  VscChromeRestore,
  VscChromeMinimize,
  VscLayoutPanel,
  VscLayoutSidebarLeft,
  VscLayout,
  VscLayoutSidebarRightOff,
} from "react-icons/vsc";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa6";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { PiBracketsCurly } from "react-icons/pi";

const Window = () => {
  return (
    <>
      <div className="bg-windowColor flex w-full items-center px-1 h-8 justify-between">
        <div className="flex">
          <img src={logo} alt="" className="w-5 h-5 ml-1 mr-2" />
          <p className="text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            File
          </p>
          <p className="text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Edit
          </p>
          <p className="text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Selection
          </p>
          <p className="text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            View
          </p>
          <p className="text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Go
          </p>
          <p className="text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Run
          </p>
          <p className="text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Terminal
          </p>
          <p className="text-white text-sm hover:bg-windowHoverColor rounded-md px-2 cursor-pointer">
            Help
          </p>
        </div>

        <div className="flex">
          <button className="hover:bg-windowHoverColor rounded-md mr-2 p-1">
            <FaArrowLeft className="text-white" />
          </button>
          <FaArrowRight className="text-[#52525a] mr-4 mt-1" />

          <button className="bg-searchBarColor border border-searchBarBorderColor rounded-md w-lg h-6 hover:bg-searchBarHoverColor flex items-center content-center justify-center gap-1">
            <IoSearch className="text-white" />
            <p className="text-white text-xs">Cedrick Lemuel F. Cabansag</p>
          </button>
        </div>

        <div className="flex gap-0.5 ml-56">
          <button className="hover:bg-windowHoverColor rounded-md p-0.5">
            <VscLayout className="text-white w-5 h-5" />
          </button>
          <button className="hover:bg-windowHoverColor rounded-md p-0.5">
            <VscLayoutSidebarLeft className="text-white w-5 h-5" />
          </button>
          <button className="hover:bg-windowHoverColor rounded-md p-0.5">
            <VscLayoutPanel className="text-white w-5 h-5" />
          </button>
          <button className="hover:bg-windowHoverColor rounded-md p-0.5">
            <VscLayoutSidebarRightOff className="text-white w-5 h-5" />
          </button>
          <div className="flex ml-4">
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

      <div className="bg-windowColor fixed bottom-0 left-0 right-0 flex flex-row w-full items-center content-center px-1 h-6 justify-between">
        <div className="flex">
          <button className="hover:bg-windowHoverColor py-1 px-2">
            <VscRemote className="text-white" />
          </button>
          <button className="hover:bg-windowHoverColor py-1 px-1 flex items-center content-center gap-0.5">
            <VscError className="text-white" />
            <p className="text-white text-xs">0</p>
            <VscWarning className="text-white ml-1" />
            <p className="text-white text-xs">0</p>
          </button>

          <button className="hover:bg-windowHoverColor ml-1 py-1 px-1 flex items-center content-center gap-1">
            <BsGlobe className="text-white" />
            <p className="text-white text-xs">Connected to Discord</p>
          </button>
        </div>

        <div className="flex flex-row-reverse">
          <button className="hover:bg-windowHoverColor ml-1 py-1 px-1 flex items-center content-center gap-1">
            <IoNotificationsOutline className="text-white" />
          </button>

          <button className="hover:bg-windowHoverColor ml-1 py-1 px-1 flex items-center content-center gap-1">
            <FaCheck className="text-white" />
            <p className="text-white text-xs">Prettier</p>
          </button>

          <button className="hover:bg-windowHoverColor ml-1 py-1 px-1 flex items-center content-center gap-1">
            <PiBracketsCurly className="text-white" />
            <p className="text-white text-xs">TypeScript JSX</p>
          </button>

          <button className="hover:bg-windowHoverColor ml-1 py-1 px-1 flex items-center content-center gap-1">
            <p className="text-white text-xs">CRLF</p>
          </button>

          <button className="hover:bg-windowHoverColor ml-1 py-1 px-1 flex items-center content-center gap-1">
            <p className="text-white text-xs">UTF-8</p>
          </button>

          <button className="hover:bg-windowHoverColor ml-1 py-1 px-1 flex items-center content-center gap-1">
            <p className="text-white text-xs">Spaces: 2</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Window;
