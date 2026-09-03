import type { CreateTechnologyInput, UpdateTechnologyInput } from "../types.js";

import pool from "../db/db.js";

const getTechnologiesService = async () => {
  const result = await pool.query(`
    SELECT *
    FROM technologies
    ORDER BY sort_order ASC, created_at ASC
  `);

  return result.rows;
};

const getTechnologyByIdService = async (id: number) => {
  const result = await pool.query(
    `
      SELECT *
      FROM technologies
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const createTechnologyService = async ({
  name,
  iconSlug,
  iconHex,
  sortOrder = 0,
}: CreateTechnologyInput) => {
  const result = await pool.query(
    `
      INSERT INTO technologies (
        name,
        icon_slug,
        icon_hex,
        sort_order
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [name, iconSlug, iconHex, sortOrder],
  );

  return result.rows[0];
};

const updateTechnologyService = async (
  id: number,
  { name, iconSlug, iconHex, sortOrder }: UpdateTechnologyInput,
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const currentResult = await client.query(
      `
        SELECT id, sort_order
        FROM technologies
        WHERE id = $1
        FOR UPDATE
      `,
      [id],
    );

    const currentTechnology = currentResult.rows[0];

    if (!currentTechnology) {
      await client.query("ROLLBACK");
      return undefined;
    }

    const currentSortOrder = currentTechnology.sort_order;

    if (sortOrder !== undefined && sortOrder !== currentSortOrder) {
      const targetResult = await client.query(
        `
          SELECT id
          FROM technologies
          WHERE sort_order = $1
            AND id != $2
          FOR UPDATE
        `,
        [sortOrder, id],
      );

      const targetTechnology = targetResult.rows[0];

      if (targetTechnology) {
        await client.query(
          `
            UPDATE technologies
            SET
              sort_order = $1,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
          `,
          [currentSortOrder, targetTechnology.id],
        );
      }
    }

    const result = await client.query(
      `
        UPDATE technologies
        SET
          name = COALESCE($1, name),
          icon_slug = COALESCE($2, icon_slug),
          icon_hex = COALESCE($3, icon_hex),
          sort_order = COALESCE($4, sort_order),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING *
      `,
      [name ?? null, iconSlug ?? null, iconHex ?? null, sortOrder ?? null, id],
    );

    await client.query("COMMIT");

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const deleteTechnologyService = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM technologies
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0];
};

const getTechnologyByNameService = async (name: string, excludeId?: number) => {
  const result = await pool.query(
    `
      SELECT *
      FROM technologies
      WHERE LOWER(name) = LOWER($1)
        AND ($2::int IS NULL OR id != $2)
      LIMIT 1
    `,
    [name, excludeId ?? null],
  );

  return result.rows[0];
};

export {
  getTechnologiesService,
  createTechnologyService,
  updateTechnologyService,
  getTechnologyByIdService,
  deleteTechnologyService,
  getTechnologyByNameService,
};
