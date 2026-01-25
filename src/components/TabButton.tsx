import { type ButtonProps } from "../types";
import { Link } from "react-router-dom";

const TabButton = ({ icon: Icon, iconColor, fileName, to }: ButtonProps) => {
  return (
    <Link
      to={to}
      className="flex items-center content-center bg-tabButtonColor focus:bg-tabButtonFocusedColor focus:border-t border-sideBarFocusColor gap-1 w-32 h-10 py-0.5"
    >
      <Icon className={`ml-2 mt-0.5 ${iconColor}`} />
      <p className="text-white text-sm">{fileName}</p>
    </Link>
  );
};

export default TabButton;
