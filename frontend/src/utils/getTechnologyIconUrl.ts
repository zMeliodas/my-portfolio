const getTechnologyIconUrl = (
  name: string,
  iconSlug: string,
  iconHex: string,
) => {
  if (name.toLowerCase() === "java") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg";
  }

  return `https://cdn.simpleicons.org/${iconSlug}/${iconHex}`;
};

export { getTechnologyIconUrl };