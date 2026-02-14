import { type ButtonProps } from "../types";
import { Link, useLocation } from "react-router-dom";

const TabButton = ({ icon: Icon, iconColor, fileName, link }: ButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Link
      to={link}
      className={`flex items-center content-center ${isActive ? "bg-tabButtonFocusedColor border-t border-sideBarFocusColor" : "bg-tabButtonColor"} gap-1 w-32 h-10 py-0.5`}
    >
      <Icon className={`ml-2 mt-0.5 ${iconColor}`} />
      <p className="text-white text-sm">{fileName}</p>
    </Link>
  );
};

export default TabButton;
