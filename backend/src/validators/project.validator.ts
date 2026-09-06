const isValidProjectTitle = (title: unknown): title is string => {
  return typeof title === "string" && title.trim().length > 0;
};

const isValidProjectDescription = (
  description: unknown,
): description is string => {
  return typeof description === "string" && description.trim().length > 0;
};

const isValidSortOrder = (sortOrder: unknown) => {
  if (typeof sortOrder === "string" && !sortOrder.trim()) {
    return false;
  }

  const parsedSortOrder = Number(sortOrder);

  return Number.isInteger(parsedSortOrder) && parsedSortOrder >= 0;
};

const isValidLink = (link: unknown): link is string => {
  return typeof link === "string";
};

export {
  isValidProjectTitle,
  isValidProjectDescription,
  isValidSortOrder,
  isValidLink,
};
