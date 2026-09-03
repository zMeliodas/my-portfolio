import type { Request, Response } from "express";
import type { UpdateTechnologyInput } from "../types.js";

import {
  createTechnologyService,
  deleteTechnologyService,
  getTechnologiesService,
  getTechnologyByIdService,
  getTechnologyByNameService,
  updateTechnologyService,
} from "../services/technology.service.js";
import { findTechnologyIcon } from "../utils/findTechnologyIcon.js";

const getTechnologiesController = async (_req: Request, res: Response) => {
  try {
    const technologies = await getTechnologiesService();

    return res.status(200).json({
      message: "Technologies fetched successfully.",
      result: technologies,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch technologies.",
    });
  }
};

const createTechnologyController = async (req: Request, res: Response) => {
  try {
    const { name, sortOrder } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Technology name is required.",
      });
    }

    const trimmedName = name.trim();

    const existingTechnology = await getTechnologyByNameService(trimmedName);

    if (existingTechnology) {
      return res.status(409).json({
        message: "Technology already exists.",
      });
    }

    const icon = findTechnologyIcon(name);

    if (!icon) {
      return res.status(400).json({
        message: `No icon found for "${name}".`,
      });
    }

    const technology = await createTechnologyService({
      name,
      iconSlug: icon.slug,
      iconHex: icon.hex,
      sortOrder: Number(sortOrder) || 0,
    });

    return res.status(201).json({
      message: "Technology created successfully.",
      result: technology,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create technology.",
    });
  }
};

const updateTechnologyController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid technology ID.",
      });
    }

    const technology = await getTechnologyByIdService(id);

    if (!technology) {
      return res.status(404).json({
        message: "Technology not found.",
      });
    }

    const { name, sortOrder } = req.body;

    let parsedSortOrder: number | undefined;

    if (sortOrder !== undefined) {
      parsedSortOrder = Number(sortOrder);

      if (!Number.isInteger(parsedSortOrder) || parsedSortOrder < 1) {
        return res.status(400).json({
          message: "Sort order must be a positive integer.",
        });
      }
    }

    const updateData: UpdateTechnologyInput = {
      ...(parsedSortOrder !== undefined && {
        sortOrder: parsedSortOrder,
      }),
    };

    if (name !== undefined) {
      const trimmedName = name.trim();

      if (!trimmedName) {
        return res.status(400).json({
          message: "Technology name cannot be empty.",
        });
      }

      const existingTechnology = await getTechnologyByNameService(
        trimmedName,
        id,
      );

      if (existingTechnology) {
        return res.status(409).json({
          message: "Technology already exists.",
        });
      }

      const icon = findTechnologyIcon(trimmedName);

      if (!icon) {
        return res.status(400).json({
          message: `No icon found for "${trimmedName}".`,
        });
      }

      updateData.name = trimmedName;
      updateData.iconSlug = icon.slug;
      updateData.iconHex = icon.hex;
    }

    const updatedTechnology = await updateTechnologyService(id, updateData);

    return res.status(200).json({
      message: "Technology updated successfully.",
      result: updatedTechnology,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update technology.",
    });
  }
};

const deleteTechnologyController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid technology ID.",
      });
    }

    const technology = await getTechnologyByIdService(id);

    if (!technology) {
      return res.status(404).json({
        message: "Technology not found.",
      });
    }

    const deletedTechnology = await deleteTechnologyService(id);

    return res.status(200).json({
      message: "Technology deleted successfully.",
      result: deletedTechnology,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete technology.",
    });
  }
};

export {
  getTechnologiesController,
  createTechnologyController,
  updateTechnologyController,
  deleteTechnologyController,
};
