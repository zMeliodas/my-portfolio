import type { Request, Response } from "express";

import {
  createProjectService,
  getProjectByIdService,
  getProjectsService,
  updateProjectService,
} from "../services/project.service.js";
import type { UpdateProjectInput } from "../types.js";
import {
  deleteProjectImageService,
  deleteProjectService,
} from "../services/upload.service.js";

const createProjectController = async (req: Request, res: Response) => {
  try {
    const { title, description, liveLink, githubLink, sortOrder } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Project image is required.",
      });
    }

    const imageUrl = `/uploads/projects/${req.file.filename}`;

    const project = await createProjectService({
      title,
      description,
      imageUrl,
      ...(liveLink !== undefined && { liveLink }),
      ...(githubLink !== undefined && { githubLink }),
      sortOrder: Number(sortOrder) || 0,
    });

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
      return res.status(400).json({
        message: "Invalid project ID.",
      });
    }

    const project = await getProjectByIdService(id);

    if (!project) {
      if (req.file) {
        await deleteProjectImageService(
          `/uploads/projects/${req.file.filename}`,
        );
      }

      return res.status(404).json({
        message: "Project not found.",
      });
    }

    const { title, description, liveLink, githubLink, sortOrder } = req.body;

    const updateData: UpdateProjectInput = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(liveLink !== undefined && { liveLink }),
      ...(githubLink !== undefined && { githubLink }),

      ...(req.file && {
        imageUrl: `/uploads/projects/${req.file.filename}`,
      }),

      ...(sortOrder !== undefined && {
        sortOrder: Number(sortOrder),
      }),
    };

    const updatedProject = await updateProjectService(id, updateData);

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
