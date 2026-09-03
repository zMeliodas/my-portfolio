export type CreateProjectInput = {
  title: string;
  description: string;
  imageUrl: string;
  liveLink?: string;
  githubLink?: string;
  sortOrder?: number;
};

export type UpdateProjectInput = {
  title?: string;
  description?: string;
  imageUrl?: string;
  liveLink?: string;
  githubLink?: string;
  sortOrder?: number;
};

export type CreateTechnologyInput = {
  name: string;
  iconSlug: string;
  iconHex: string;
  sortOrder?: number;
};

export type UpdateTechnologyInput = {
  name?: string;
  iconSlug?: string;
  iconHex?: string;
  sortOrder?: number;
};
