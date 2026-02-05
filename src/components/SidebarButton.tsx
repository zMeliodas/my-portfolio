import type { SidebarButtonTypes } from "@/types";

const SidebarButton = ({
  icon: Icon,
  isBottom = false,
}: SidebarButtonTypes) => {
  return isBottom ? (
    <button className="text-sideBarItemColor focus:text-white hover:text-white px-3 py-2 w-full flex justify-center">
      <Icon className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  ) : (
    <button className="text-sideBarItemColor focus:bg-sideBarHoverColor focus:border-l-2 border-sideBarFocusColor focus:text-white hover:text-white px-3 py-2 w-full flex justify-center">
      <Icon className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
};

export default SidebarButton;
