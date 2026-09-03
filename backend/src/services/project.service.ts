import type { CreateProjectInput, UpdateProjectInput } from "../types/types.js";
import pool from "../db/db.js";

const createProjectService = async (
  {
    title,
    description,
    imageUrl,
    liveLink,
    githubLink,
    sortOrder = 0,
  }: CreateProjectInput,
  technologyIds: number[],
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const projectResult = await client.query(
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

    const project = projectResult.rows[0];

    if (technologyIds.length > 0) {
      await client.query(
        `
          INSERT INTO project_technologies (
            project_id,
            technology_id
          )
          SELECT $1, UNNEST($2::int[])
        `,
        [project.id, technologyIds],
      );
    }

    await client.query("COMMIT");

    return project;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
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
  technologyIds?: number[],
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const projectResult = await client.query(
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

    const updatedProject = projectResult.rows[0];

    if (!updatedProject) {
      await client.query("ROLLBACK");
      return undefined;
    }

    // Only update technologies if techStack was provided.
    if (technologyIds !== undefined) {
      await client.query(
        `
          DELETE FROM project_technologies
          WHERE project_id = $1
        `,
        [id],
      );

      if (technologyIds.length > 0) {
        await client.query(
          `
            INSERT INTO project_technologies (
              project_id,
              technology_id
            )
            SELECT $1, UNNEST($2::int[])
            ON CONFLICT DO NOTHING
          `,
          [id, technologyIds],
        );
      }
    }

    await client.query("COMMIT");

    return updatedProject;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getProjectsService = async () => {
  const result = await pool.query(`
    SELECT
      p.*,

      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', t.id,
              'name', t.name
            )
            ORDER BY t.sort_order ASC
          )
          FROM project_technologies pt
          JOIN technologies t
            ON t.id = pt.technology_id
          WHERE pt.project_id = p.id
        ),
        '[]'::json
      ) AS "techStack"

    FROM projects p
    ORDER BY p.sort_order ASC, p.created_at DESC
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

const deleteProjectService = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM projects
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0];
};

const validateTechnologyIdsService = async (technologyIds: number[]) => {
  if (technologyIds.length === 0) {
    return true;
  }

  const uniqueIds = [...new Set(technologyIds)];

  const result = await pool.query(
    `
      SELECT id
      FROM technologies
      WHERE id = ANY($1::int[])
    `,
    [uniqueIds],
  );

  return result.rows.length === uniqueIds.length;
};

const getProjectByTitleService = async (title: string, excludeId?: number) => {
  const result = await pool.query(
    `
      SELECT *
      FROM projects
      WHERE LOWER(title) = LOWER($1)
        AND ($2::int IS NULL OR id != $2)
      LIMIT 1
    `,
    [title, excludeId ?? null],
  );

  return result.rows[0];
};

export {
  createProjectService,
  updateProjectService,
  getProjectsService,
  getProjectByIdService,
  deleteProjectService,
  validateTechnologyIdsService,
  getProjectByTitleService,
};
