import pool from "../db/db.js";

const getAdminByUsernameService = async (
  username: string,
) => {
  const result = await pool.query(
    `
      SELECT *
      FROM admins
      WHERE username = $1
      LIMIT 1
    `,
    [username],
  );

  return result.rows[0];
};

export { getAdminByUsernameService };