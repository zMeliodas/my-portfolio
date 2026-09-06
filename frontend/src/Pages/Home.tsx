import { useState } from "react";
import { Link } from "react-router-dom";
import { VscArrowRight } from "react-icons/vsc";
import CodeDisplay from "@/components/CodeDisplay";
import { getResume } from "@/services/upload.service";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Home = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const handleDownloadResume = async () => {
    setIsDownloading(true);
    setDownloadError("");

    try {
      const resume = await getResume();

      const response = await fetch(`${SERVER_URL}${resume.url}`);

      if (!response.ok) {
        throw new Error("Resume file is not available.");
      }

      const blob = await response.blob();

      const fileUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = fileUrl;
      link.download = resume.originalName;

      document.body.appendChild(link);

      link.click();
      link.remove();

      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      if (error instanceof Error) {
        setDownloadError(error.message);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row content-center justify-center items-center gap-12 xl:gap-16 bg-backgroundColor w-full min-h-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="hidden sm:flex items-center shrink-0">
        <CodeDisplay />
      </div>

      <div className="flex flex-col w-full max-w-xl gap-4 sm:gap-6">
        <div className="flex flex-col items-center xl:items-start">
          <h1 className="font-bold text-white text-5xl md:text-6xl lg:text-7xl">
            Cedrick
          </h1>

          <h1 className="font-bold text-draculaPink text-5xl md:text-6xl lg:text-7xl">
            Cabansag
          </h1>
        </div>

        <p className="font-mono text-white text-xl md:text-2xl text-center xl:text-left">
          Full Stack Web Developer
        </p>

        <p className="font-mono text-white text-sm sm:text-base md:text-lg text-center xl:text-left w-full max-w-full">
          I build modern web applications that are responsive, user-centric, and
          built with clean, efficient code.
        </p>

        <div className="flex mt-2 sm:mt-4 justify-center xl:justify-start gap-2">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-white text-xs sm:text-sm font-mono bg-draculaPink shadow-lg rounded-md py-2 sm:py-3 px-4 sm:px-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            View Projects <VscArrowRight />
          </Link>

          <button
            type="button"
            onClick={handleDownloadResume}
            disabled={isDownloading}
            className="flex items-center gap-2 text-white text-xs sm:text-sm font-mono bg-transparent border border-draculaPink shadow-lg rounded-md py-2 sm:py-3 px-4 sm:px-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isDownloading ? "Downloading..." : "Download Resume ↓"}
          </button>
        </div>

        {downloadError && (
          <p className="font-mono text-red-400 text-xs text-center xl:text-left">
            {downloadError}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
