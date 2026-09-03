import "dotenv/config";

import { hash } from "@node-rs/argon2";
import pool from "../db/db.js";

const seedAdmin = async () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "ADMIN_USERNAME and ADMIN_PASSWORD are required.",
    );
  }

  const existingAdmin = await pool.query(
    `
      SELECT id
      FROM admins
      WHERE username = $1
    `,
    [username],
  );

  if (existingAdmin.rows.length > 0) {
    console.log("Admin already exists.");
    return;
  }

  const passwordHash = await hash(password);

  await pool.query(
    `
      INSERT INTO admins (
        username,
        password_hash
      )
      VALUES ($1, $2)
    `,
    [username, passwordHash],
  );

  console.log("Admin created successfully.");
};

seedAdmin()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });