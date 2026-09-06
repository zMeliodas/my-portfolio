import * as icons from "simple-icons";

import type { SimpleIcon } from "simple-icons";

const normalizeName = (value: string) => {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const findTechnologyIcon = (
  name: string,
):
  | {
      slug: string;
      hex: string;
    }
  | undefined => {
  const normalizedName = normalizeName(name);

  // Devicon fallback
  if (normalizedName === "java") {
    return {
      slug: "java",
      hex: "F89820",
    };
  }

  const icon = Object.values(icons).find((value): value is SimpleIcon => {
    if (
      typeof value !== "object" ||
      value === null ||
      !("title" in value) ||
      !("slug" in value)
    ) {
      return false;
    }

    return (
      normalizeName(value.title) === normalizedName ||
      normalizeName(value.slug) === normalizedName
    );
  });

  if (!icon) {
    return undefined;
  }

  return {
    slug: icon.slug,
    hex: icon.hex,
  };
};

export { findTechnologyIcon };
