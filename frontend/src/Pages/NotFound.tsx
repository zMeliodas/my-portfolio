import { Link } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-backgroundColor w-full min-h-full px-4 py-12 gap-6 text-center">
      <p className="font-mono text-draculaPink text-7xl md:text-8xl font-bold">
        404
      </p>

      <div className="flex flex-col gap-2">
        <h1 className="font-mono text-white text-xl md:text-2xl font-medium">
          Page not found
        </h1>
        <p className="font-mono text-white/60 text-sm md:text-base max-w-md">
          The file you're looking for doesn't exist, or it may have been
          moved.
        </p>
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 text-white text-xs sm:text-sm font-mono bg-draculaPink shadow-lg rounded-md py-2 sm:py-3 px-4 sm:px-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <VscArrowLeft /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;