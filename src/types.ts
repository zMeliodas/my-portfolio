import type { ReactNode } from "react";
import { type IconType } from "react-icons";

export interface ButtonProps {
  icon: IconType;
  iconColor: string;
  fileName: string;
  to: string;
  onClick: () => void;
  isSelected: boolean;
}

export type TabType = "home" | "projects" | "techstack" | "contacts" | "about";

export interface ButtonTypes {
  key: string;
  tab: TabType;
  icon: IconType;
  iconColor: string;
  fileName: string;
}

export interface SidebarButtonTypes {
  icon: IconType;
  isBottom: boolean;
}

export interface CardTypes {
  icon?: ReactNode;
  imageSrc?: string;
  link?: string;
  title: string;
  description: string;
}
