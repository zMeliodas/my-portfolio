import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const normalize = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
};

export const findTechnologyIcon = (
  name: string,
): SimpleIcon | undefined => {
  const normalizedName = normalize(name);

  return Object.values(icons).find((icon) => {
    const simpleIcon = icon as SimpleIcon;

    return (
      normalize(simpleIcon.title) === normalizedName ||
      normalize(simpleIcon.slug) === normalizedName
    );
  }) as SimpleIcon | undefined;
};