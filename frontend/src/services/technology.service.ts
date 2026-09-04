import type {
  TechnologiesResponse,
  Technology,
  TechnologyResponse,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

const getTechnologies = async (): Promise<Technology[]> => {
  const response = await fetch(`${API_URL}/technologies`);

  const data: TechnologiesResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch technologies.",
    );
  }

  return data.result;
};

const createTechnology = async (
  name: string,
  sortOrder: number,
): Promise<Technology> => {
  const response = await fetch(`${API_URL}/technologies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      sortOrder,
    }),
  });

  const data: TechnologyResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create technology.",
    );
  }

  return data.result;
};

const updateTechnology = async (
  id: number,
  name: string,
  sortOrder: number,
): Promise<Technology> => {
  const response = await fetch(
    `${API_URL}/technologies/${id}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        sortOrder,
      }),
    },
  );

  const data: TechnologyResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update technology.",
    );
  }

  return data.result;
};

const deleteTechnology = async (
  id: number,
): Promise<Technology> => {
  const response = await fetch(
    `${API_URL}/technologies/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data: TechnologyResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete technology.",
    );
  }

  return data.result;
};

export {
  getTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
};