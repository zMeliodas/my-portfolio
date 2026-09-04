import type { Project, ProjectResponse, ProjectsResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/projects`);

  const data: ProjectsResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch projects.");
  }

  return data.result;
};

const createProject = async (formData: FormData): Promise<Project> => {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data: ProjectResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create project.");
  }

  return data.result;
};

const updateProject = async (
  id: number,
  formData: FormData,
): Promise<Project> => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data: ProjectResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update project.");
  }

  return data.result;
};

const deleteProject = async (id: number): Promise<Project> => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data: ProjectResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete project.");
  }

  return data.result;
};

export { getProjects, createProject, updateProject, deleteProject };
