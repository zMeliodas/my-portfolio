import type { Request, Response } from "express";
import type { UpdateProjectInput } from "../types.js";

import {
  createProjectService,
  deleteProjectService,
  getProjectByIdService,
  getProjectsService,
  setProjectTechnologiesService,
  updateProjectService,
  validateTechnologyIdsService,
} from "../services/project.service.js";

import { deleteProjectImageService } from "../services/upload.service.js";

const cleanupUploadedImage = async (req: Request) => {
  if (!req.file) return;

  try {
    await deleteProjectImageService(`/uploads/projects/${req.file.filename}`);
  } catch (error) {
    console.error("Failed to clean up uploaded project image:", error);
  }
};

const parseTechnologyIds = (techStack: unknown): number[] | undefined => {
  if (techStack === undefined) {
    return undefined;
  }

  let parsed: unknown;

  try {
    parsed = typeof techStack === "string" ? JSON.parse(techStack) : techStack;
  } catch {
    return undefined;
  }

  if (
    !Array.isArray(parsed) ||
    !parsed.every((id) => typeof id === "number" && Number.isInteger(id))
  ) {
    return undefined;
  }

  return parsed;
};

const createProjectController = async (req: Request, res: Response) => {
  try {
    const { title, description, liveLink, githubLink, sortOrder, techStack } =
      req.body;

    if (!title || !description) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Title and description are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Project image is required.",
      });
    }

    const technologyIds =
      techStack !== undefined ? parseTechnologyIds(techStack) : [];

    if (technologyIds === undefined) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Tech stack must be an array of valid technology IDs.",
      });
    }

    const technologiesExist = await validateTechnologyIdsService(technologyIds);

    if (!technologiesExist) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "One or more technologies do not exist.",
      });
    }

    const parsedSortOrder = sortOrder !== undefined ? Number(sortOrder) : 0;

    if (!Number.isInteger(parsedSortOrder) || parsedSortOrder < 0) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Sort order must be a valid non-negative integer.",
      });
    }

    const imageUrl = `/uploads/projects/${req.file.filename}`;

    const project = await createProjectService({
      title,
      description,
      imageUrl,

      ...(liveLink !== undefined && {
        liveLink,
      }),

      ...(githubLink !== undefined && {
        githubLink,
      }),

      sortOrder: parsedSortOrder,
    });

    await setProjectTechnologiesService(project.id, technologyIds);

    return res.status(201).json({
      message: "Project created successfully.",
      result: project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create project.",
    });
  }
};

const getProjectsController = async (_req: Request, res: Response) => {
  try {
    const projects = await getProjectsService();

    return res.status(200).json({
      message: "Projects fetched successfully.",
      result: projects,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch projects.",
    });
  }
};

const updateProjectController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    const project = await getProjectByIdService(id);

    if (!project) {
      await cleanupUploadedImage(req);

      return res.status(404).json({
        message: "Project not found.",
      });
    }

    const { title, description, liveLink, githubLink, sortOrder, techStack } =
      req.body;

    let technologyIds: number[] | undefined;

    if (techStack !== undefined) {
      technologyIds = parseTechnologyIds(techStack);

      if (technologyIds === undefined) {
        await cleanupUploadedImage(req);

        return res.status(400).json({
          message: "Tech stack must be an array of valid technology IDs.",
        });
      }

      const technologiesExist =
        await validateTechnologyIdsService(technologyIds);

      if (!technologiesExist) {
        await cleanupUploadedImage(req);

        return res.status(400).json({
          message: "One or more technologies do not exist.",
        });
      }
    }

    let parsedSortOrder: number | undefined;

    if (sortOrder !== undefined) {
      parsedSortOrder = Number(sortOrder);

      if (!Number.isInteger(parsedSortOrder) || parsedSortOrder < 0) {
        await cleanupUploadedImage(req);

        return res.status(400).json({
          message: "Sort order must be a valid non-negative integer.",
        });
      }
    }

    const updateData: UpdateProjectInput = {
      ...(title !== undefined && {
        title,
      }),

      ...(description !== undefined && {
        description,
      }),

      ...(liveLink !== undefined && {
        liveLink,
      }),

      ...(githubLink !== undefined && {
        githubLink,
      }),

      ...(req.file && {
        imageUrl: `/uploads/projects/${req.file.filename}`,
      }),

      ...(parsedSortOrder !== undefined && {
        sortOrder: parsedSortOrder,
      }),
    };

    const updatedProject = await updateProjectService(id, updateData);

    if (technologyIds !== undefined) {
      await setProjectTechnologiesService(id, technologyIds);
    }

    if (req.file && project.image_url) {
      try {
        await deleteProjectImageService(project.image_url);
      } catch (error) {
        console.error("Failed to delete old project image:", error);
      }
    }

    return res.status(200).json({
      message: "Project updated successfully.",
      result: updatedProject,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update project.",
    });
  }
};

const deleteProjectController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    const project = await getProjectByIdService(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    const deletedProject = await deleteProjectService(id);

    if (project.image_url) {
      try {
        await deleteProjectImageService(project.image_url);
      } catch (error) {
        console.error("Failed to delete project image:", error);
      }
    }

    return res.status(200).json({
      message: "Project deleted successfully.",
      result: deletedProject,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete project.",
    });
  }
};

export {
  createProjectController,
  getProjectsController,
  updateProjectController,
  deleteProjectController,
};
