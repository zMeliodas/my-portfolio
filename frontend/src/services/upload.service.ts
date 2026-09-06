import type { Resume, ResumeResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

const getResume = async (): Promise<Resume> => {
  const response = await fetch(`${API_URL}/uploads/pdf`);

  const data: ResumeResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch resume.");
  }

  return data.result;
};

const uploadResumePdf = async (file: File): Promise<Resume> => {
  const formData = new FormData();

  formData.append("pdf", file);

  const response = await fetch(`${API_URL}/uploads/pdf`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data: ResumeResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload resume.");
  }

  return data.result;
};

export { uploadResumePdf, getResume };
