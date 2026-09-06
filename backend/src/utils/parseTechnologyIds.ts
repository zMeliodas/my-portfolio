const parseTechnologyIds = (
  techStack: unknown,
): number[] | undefined => {
  if (techStack === undefined) {
    return undefined;
  }

  let parsed: unknown;

  try {
    parsed =
      typeof techStack === "string"
        ? JSON.parse(techStack)
        : techStack;
  } catch {
    return undefined;
  }

  if (
    !Array.isArray(parsed) ||
    !parsed.every(
      (id) =>
        typeof id === "number" &&
        Number.isInteger(id),
    )
  ) {
    return undefined;
  }

  return [...new Set(parsed)];
};

export { parseTechnologyIds };