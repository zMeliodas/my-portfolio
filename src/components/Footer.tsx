import { VscError, VscWarning, VscRemote } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { PiBracketsCurly } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="bg-windowColor flex flex-row max-w-full items-center content-center px-1 h-6 justify-between">
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

        <button className="hidden hover:bg-windowHoverColor ml-1 py-1 px-1 sm:flex items-center content-center gap-1">
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

        <button className="hidden hover:bg-windowHoverColor ml-1 py-1 px-1 sm:flex items-center content-center gap-1">
          <PiBracketsCurly className="text-white" />
          <p className="text-white text-xs">TypeScript JSX</p>
        </button>

        <button className="hidden hover:bg-windowHoverColor ml-1 py-1 px-1 sm:flex items-center content-center gap-1">
          <p className="text-white text-xs">CRLF</p>
        </button>

        <button className="hidden hover:bg-windowHoverColor ml-1 py-1 px-1 sm:flex items-center content-center gap-1">
          <p className="text-white text-xs">UTF-8</p>
        </button>

        <button className="hidden hover:bg-windowHoverColor ml-1 py-1 px-1 sm:flex items-center content-center gap-1">
          <p className="text-white text-xs">Spaces: 2</p>
        </button>
      </div>
    </div>
  );
};

export default Footer;
