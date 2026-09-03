import type { CreateProjectInput, UpdateProjectInput } from "../types.js";
import pool from "../db/db.js";

const createProjectService = async ({
  title,
  description,
  imageUrl,
  liveLink,
  githubLink,
  sortOrder = 0,
}: CreateProjectInput) => {
  const result = await pool.query(
    `
      INSERT INTO projects (
        title,
        description,
        image_url,
        live_link,
        github_link,
        sort_order
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
    [
      title,
      description,
      imageUrl,
      liveLink ?? null,
      githubLink ?? null,
      sortOrder,
    ],
  );

  return result.rows[0];
};

const getProjectsService = async () => {
  const result = await pool.query(`
    SELECT *
    FROM projects
    ORDER BY sort_order ASC, created_at DESC
  `);

  return result.rows;
};

const getProjectByIdService = async (id: number) => {
  const result = await pool.query(
    `
      SELECT *
      FROM projects
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const updateProjectService = async (
  id: number,
  {
    title,
    description,
    imageUrl,
    liveLink,
    githubLink,
    sortOrder,
  }: UpdateProjectInput,
) => {
  const result = await pool.query(
    `
      UPDATE projects
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        image_url = COALESCE($3, image_url),
        live_link = COALESCE($4, live_link),
        github_link = COALESCE($5, github_link),
        sort_order = COALESCE($6, sort_order),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `,
    [
      title ?? null,
      description ?? null,
      imageUrl ?? null,
      liveLink ?? null,
      githubLink ?? null,
      sortOrder ?? null,
      id,
    ],
  );

  return result.rows[0];
};

export {
  createProjectService,
  getProjectsService,
  getProjectByIdService,
  updateProjectService,
};
