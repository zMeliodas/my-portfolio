import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";

import { getResume, uploadResumePdf } from "@/services/upload.service";

import type { Resume } from "@/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ResumeSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResume();

        setResume(data);
        setError("");
      } catch (error) {
        setResume(null);

        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, []);

  const handleReplaceClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setError("");
    setMessage("");
    setIsUploading(true);

    try {
      const updatedResume = await uploadResumePdf(file);

      setResume(updatedResume);

      setMessage(
        resume
          ? "Resume replaced successfully."
          : "Resume uploaded successfully.",
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsUploading(false);

      e.target.value = "";
    }
  };

  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl flex justify-center py-10">
        <FaSpinner className="animate-spin text-draculaPink text-2xl" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="bg-cardColor border border-borderColor rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-14 rounded-md bg-backgroundColor border border-borderColor flex items-center justify-center text-draculaPink font-mono text-[10px] font-bold shrink-0">
            PDF
          </div>

          <div className="flex-1 min-w-0 w-full">
            <p className="text-white font-mono text-sm sm:text-base break-all">
              {resume?.originalName ?? "No resume uploaded"}
            </p>

            {resume && (
              <p className="text-white/40 font-mono text-xs mt-1">
                Uploaded{" "}
                {new Date(resume.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            )}

            {message && (
              <p className="text-green-400 font-mono text-xs mt-2">{message}</p>
            )}

            {error && (
              <p className="text-red-400 font-mono text-xs mt-2">{error}</p>
            )}

            <div className="flex gap-2 mt-4 flex-wrap">
              {resume && (
                <a
                  href={`${SERVER_URL}${resume.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none text-white text-xs sm:text-sm font-mono bg-draculaPink rounded-md py-3 px-6 min-w-26 shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-110 active:scale-95"
                >
                  Download
                </a>
              )}

              <button
                type="button"
                onClick={handleReplaceClick}
                disabled={isUploading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-mono bg-transparent border border-draculaPink rounded-md py-2 px-4 min-w-26 shadow-lg transition-all duration-300 hover:bg-draculaPink/10 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100 cursor-pointer"
              >
                {isUploading && <FaSpinner className="animate-spin" />}

                {isUploading ? "Uploading..." : resume ? "Replace" : "Upload"}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
