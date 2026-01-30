import { type ButtonProps } from "../types";
import { Link } from "react-router-dom";

const ExplorerButton = ({
  icon: Icon,
  iconColor,
  fileName,
  to,
  onClick,
  isSelected,
}: ButtonProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center content-center gap-1 w-full hover:bg-explorerHoverItemColor ${isSelected ? "bg-explorerHoverItemColor" : "bg-transparent"} py-0.5`}
    >
      <Icon className={`ml-8 ${iconColor}`} />
      <p className="text-white text-sm">{fileName}</p>
    </Link>
  );
};

export default ExplorerButton;
