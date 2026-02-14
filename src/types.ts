import type { ReactNode } from "react";
import { type IconType } from "react-icons";

export interface ButtonProps {
  icon: IconType;
  iconColor: string;
  fileName: string;
  link: string;
}

export interface ButtonTypes {
  key: string;
  icon: IconType;
  iconColor: string;
  fileName: string;
}

export interface SidebarButtonTypes {
  key?: string;
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
