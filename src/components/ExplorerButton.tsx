import { type ButtonProps } from "../types";

const ExplorerButton = ({
  icon: Icon,
  iconColor,
  fileName,
}: ButtonProps) => {
  return (
    <button className="flex items-center content-center gap-1 w-full hover:bg-explorerHoverItemColor focus:bg-explorerHoverItemColor py-0.5">
      <Icon className={`ml-8 ${iconColor}`} />
      <p className="text-white text-sm">{fileName}</p>
    </button>
  );
};

export default ExplorerButton;
