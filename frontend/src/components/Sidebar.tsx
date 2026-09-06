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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

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
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSettingsClick = () => {
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }
    setShowProfileMenu((prev) => !prev);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/admin");
    } else {
      navigate("/admin/login");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
      navigate("/admin/login");
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className="relative" ref={menuRef}>
          <SidebarButton
            icon={IoMdSettings}
            isBottom={true}
            onClick={handleSettingsClick}
          />

          {isLoggedIn && showProfileMenu && (
            <div className="absolute left-full bottom-0 ml-2 bg-cardColor border border-borderColor rounded-md shadow-lg p-1 min-w-28 z-50">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left font-mono text-sm text-red-400 px-3 py-2 rounded hover:bg-white/5 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <SidebarButton
          icon={CgProfile}
          isBottom={true}
          onClick={handleProfileClick}
        />
      </div>
    </div>
  );
};

export default Sidebar;
