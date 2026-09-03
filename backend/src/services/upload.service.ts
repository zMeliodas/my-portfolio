import { unlink } from "node:fs/promises";
import path from "node:path";
import pool from "../db/db.js";

const uploadPdfService = (file: Express.Multer.File) => {
  return {
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    url: "/uploads/pdfs/resume.pdf",
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

const addProjectTechnologiesService = async (
  projectId: number,
  technologyIds: number[],
) => {
  for (const technologyId of technologyIds) {
    await pool.query(
      `
        INSERT INTO project_technologies (
          project_id,
          technology_id
        )
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `,
      [projectId, technologyId],
    );
  }
};

export {
  uploadPdfService,
  uploadProjectImageService,
  deleteProjectImageService,
  deleteProjectService,
  addProjectTechnologiesService
};
