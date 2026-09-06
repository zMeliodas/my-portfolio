import type { CurrentAdminResponse, LoginResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

const loginAdmin = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to login.");
  }

  return data as LoginResponse;
};

const logoutAdmin = async () => {
  const response = await fetch(`${API_URL}/admin/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to logout.");
  }

  return data;
};

const getCurrentAdmin = async () => {
  const response = await fetch(`${API_URL}/admin/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Not authenticated.");
  }

  return data as CurrentAdminResponse;
};

export { loginAdmin, logoutAdmin, getCurrentAdmin };
