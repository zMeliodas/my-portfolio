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