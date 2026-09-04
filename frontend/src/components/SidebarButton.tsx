import { NavLink } from "react-router-dom";

import type { SidebarButtonTypes } from "@/types";

const SidebarButton = ({
  icon: Icon,
  isBottom,
  to,
  onClick,
}: SidebarButtonTypes) => {
  const baseClass = isBottom
    ? "text-sideBarItemColor focus:text-white hover:text-white px-3 py-2 w-full flex justify-center"
    : "text-sideBarItemColor focus:bg-sideBarHoverColor border-l-2 border-transparent focus:border-sideBarFocusColor focus:text-white hover:text-white px-3 py-2 w-full flex justify-center";

  const activeClass = isBottom
    ? "text-white"
    : "bg-sideBarHoverColor border-sideBarFocusColor text-white";

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : ""}`
        }
      >
        <Icon className="w-6 h-6 md:w-7 md:h-7" />
      </NavLink>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClass}
    >
      <Icon className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
};

export default SidebarButton;