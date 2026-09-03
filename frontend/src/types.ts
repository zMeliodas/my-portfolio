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
