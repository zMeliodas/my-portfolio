import type { Request, Response } from "express";
import type { UpdateProjectInput } from "../types/types.js";

import {
  createProjectService,
  deleteProjectService,
  getProjectByIdService,
  getProjectByTitleService,
  getProjectsService,
  updateProjectService,
  validateTechnologyIdsService,
} from "../services/project.service.js";

import { deleteProjectImageService } from "../services/upload.service.js";

import {
  isValidLink,
  isValidProjectDescription,
  isValidProjectTitle,
  isValidSortOrder,
} from "../validators/project.validator.js";
import { cleanupUploadedImage } from "../utils/cleanupUploadedImage.js";
import { parseTechnologyIds } from "../utils/parseTechnologyIds.js";

const createProjectController = async (req: Request, res: Response) => {
  try {
    const { title, description, liveLink, githubLink, sortOrder, techStack } =
      req.body;

    if (
      !isValidProjectTitle(title) ||
      !isValidProjectDescription(description)
    ) {
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

    if (sortOrder !== undefined && !isValidSortOrder(sortOrder)) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Sort order must be a valid non-negative integer.",
      });
    }

    if (liveLink !== undefined && !isValidLink(liveLink)) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Live link must be a string.",
      });
    }

    if (githubLink !== undefined && !isValidLink(githubLink)) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "GitHub link must be a string.",
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

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    const parsedSortOrder = sortOrder !== undefined ? Number(sortOrder) : 0;

    const existingProject = await getProjectByTitleService(trimmedTitle);

    if (existingProject) {
      await cleanupUploadedImage(req);

      return res.status(409).json({
        message: "Project already exists.",
      });
    }

    const technologiesExist = await validateTechnologyIdsService(technologyIds);

    if (!technologiesExist) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "One or more technologies do not exist.",
      });
    }

    const imageUrl = `/uploads/projects/${req.file.filename}`;

    const project = await createProjectService(
      {
        title: trimmedTitle,
        description: trimmedDescription,
        imageUrl,

        ...(liveLink !== undefined && {
          liveLink: liveLink.trim(),
        }),

        ...(githubLink !== undefined && {
          githubLink: githubLink.trim(),
        }),

        sortOrder: parsedSortOrder,
      },
      technologyIds,
    );

    return res.status(201).json({
      message: "Project created successfully.",
      result: project,
    });
  } catch (error) {
    await cleanupUploadedImage(req);

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

    if (!Number.isInteger(id) || id < 1) {
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

    const updateData: UpdateProjectInput = {};

    if (title !== undefined && !isValidProjectTitle(title)) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Project title cannot be empty.",
      });
    }

    if (description !== undefined && !isValidProjectDescription(description)) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Description cannot be empty.",
      });
    }

    if (liveLink !== undefined && !isValidLink(liveLink)) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Live link must be a string.",
      });
    }

    if (githubLink !== undefined && !isValidLink(githubLink)) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "GitHub link must be a string.",
      });
    }

    if (sortOrder !== undefined && !isValidSortOrder(sortOrder)) {
      await cleanupUploadedImage(req);

      return res.status(400).json({
        message: "Sort order must be a valid non-negative integer.",
      });
    }

    let technologyIds: number[] | undefined;

    if (techStack !== undefined) {
      technologyIds = parseTechnologyIds(techStack);

      if (technologyIds === undefined) {
        await cleanupUploadedImage(req);

        return res.status(400).json({
          message: "Tech stack must be an array of valid technology IDs.",
        });
      }
    }

    if (title !== undefined) {
      const trimmedTitle = title.trim();

      const existingProject = await getProjectByTitleService(trimmedTitle, id);

      if (existingProject) {
        await cleanupUploadedImage(req);

        return res.status(409).json({
          message: "Project already exists.",
        });
      }

      updateData.title = trimmedTitle;
    }

    if (technologyIds !== undefined) {
      const technologiesExist =
        await validateTechnologyIdsService(technologyIds);

      if (!technologiesExist) {
        await cleanupUploadedImage(req);

        return res.status(400).json({
          message: "One or more technologies do not exist.",
        });
      }
    }

    if (description !== undefined) {
      updateData.description = description.trim();
    }

    if (liveLink !== undefined) {
      updateData.liveLink = liveLink.trim();
    }

    if (githubLink !== undefined) {
      updateData.githubLink = githubLink.trim();
    }

    if (sortOrder !== undefined) {
      updateData.sortOrder = Number(sortOrder);
    }

    if (req.file) {
      updateData.imageUrl = `/uploads/projects/${req.file.filename}`;
    }

    const updatedProject = await updateProjectService(
      id,
      updateData,
      technologyIds,
    );

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
    await cleanupUploadedImage(req);

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
    await cleanupUploadedImage(req);

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
