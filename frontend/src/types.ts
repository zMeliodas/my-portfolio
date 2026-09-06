import type { ReactNode } from "react";
import { type IconType } from "react-icons";

export interface ButtonProps {
  icon: IconType;
  iconColor: string;
  fileName: string;
  link: string;
}

export type SidebarButtonProps = {
  icon: IconType;
  isBottom: boolean;
  to?: string;
};

export interface ButtonTypes {
  key: string;
  icon: IconType;
  iconColor: string;
  fileName: string;
}

export type SidebarButtonTypes = {
  key?: string;
  icon: IconType;
  isBottom: boolean;
  to?: string;
  onClick?: () => void;
};

export type CardTypes = {
  imageSrc?: string;
  title: string;
  description: string;
  githubLink?: string;
  liveLink?: string;
  techStack?: string[];
  icon?: ReactNode;
};

export type TechCardProps = {
  name: string;
  iconSlug: string;
  iconHex: string;
};

export type Technology = {
  id: number;
  name: string;
  icon_slug: string;
  icon_hex: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type TechnologyResponse = {
  message: string;
  result: Technology;
};

export type TechnologiesResponse = {
  message: string;
  result: Technology[];
};

export type ProjectTechnology = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  live_link: string | null;
  github_link: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  techStack: ProjectTechnology[];
};

export type ProjectsResponse = {
  message: string;
  result: Project[];
};

export type ProjectResponse = {
  message: string;
  result: Project;
};

export type Admin = {
  id: number;
  username: string;
};

export type LoginResponse = {
  message: string;
  result: {
    admin: Admin;
  };
};

export type CurrentAdminResponse = {
  message: string;
  result: {
    admin: {
      id: number;
      username: string;
    };
  };
};

export type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

export type Resume = {
  originalName: string;
  url: string;
  updatedAt: string;
};

export type ResumeResponse = {
  message: string;
  result: Resume;
};
