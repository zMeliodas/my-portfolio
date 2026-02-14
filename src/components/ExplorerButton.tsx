import { type ButtonProps } from "../types";
import { Link, useLocation } from "react-router-dom";

const ExplorerButton = ({
  icon: Icon,
  iconColor,
  fileName,
  link,
}: ButtonProps) => {

  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Link
      to={link}
      className={`flex items-center content-center gap-1 w-full hover:bg-explorerHoverItemColor ${isActive ? "bg-explorerHoverItemColor" : "bg-transparent"} py-0.5`}
    >
      <Icon className={`ml-8 ${iconColor}`} />
      <p className="text-white text-sm">{fileName}</p>
    </Link>
  );
};

export default ExplorerButton;
