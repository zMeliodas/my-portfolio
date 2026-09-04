import { access, unlink } from "node:fs/promises";
import path from "node:path";
import pool from "../db/db.js";

const uploadPdfService = async (file: Express.Multer.File) => {
  const result = await pool.query(
    `
      INSERT INTO resume (
        id,
        original_name,
        updated_at
      )
      VALUES (
        1,
        $1,
        CURRENT_TIMESTAMP
      )

      ON CONFLICT (id)
      DO UPDATE SET
        original_name = EXCLUDED.original_name,
        updated_at = CURRENT_TIMESTAMP

      RETURNING
        original_name,
        updated_at
    `,
    [file.originalname],
  );

  const resume = result.rows[0];

  return {
    filename: file.filename,
    originalName: resume.original_name,
    size: file.size,
    url: "/uploads/pdfs/resume.pdf",
    updatedAt: resume.updated_at,
  };
};

const uploadProjectImageService = (file: Express.Multer.File) => {
  return {
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    url: `/uploads/projects/${file.filename}`,
  };
};

const deleteProjectImageService = async (imageUrl: string) => {
  const filename = path.basename(imageUrl);

  const filePath = path.join(process.cwd(), "uploads", "projects", filename);

  try {
    await unlink(filePath);
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code === "ENOENT") {
      return;
    }

    throw error;
  }
};

const getResumeService = async () => {
  const result = await pool.query(`
    SELECT
      original_name,
      updated_at
    FROM resume
    WHERE id = 1
  `);

  const resume = result.rows[0];

  if (!resume) {
    return undefined;
  }

  const filePath = path.resolve("uploads", "pdfs", "resume.pdf");

  try {
    await access(filePath);
  } catch {
    return undefined;
  }

  return resume;
};

export {
  uploadPdfService,
  uploadProjectImageService,
  deleteProjectImageService,
  getResumeService,
};
