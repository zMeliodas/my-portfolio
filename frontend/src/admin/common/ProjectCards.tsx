import { useCallback, useEffect, useRef, useState } from "react";

import { FaSpinner } from "react-icons/fa";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/services/project.service";

import { getTechnologies } from "@/services/technology.service";

import type { Project, Technology } from "@/types";
import { getTechnologyIconUrl } from "@/utils/getTechnologyIconUrl";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProjectCards = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const [showAddProject, setShowAddProject] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [sortOrder, setSortOrder] = useState("0");

  const [image, setImage] = useState<File | null>(null);

  const [selectedTechnologyIds, setSelectedTechnologyIds] = useState<number[]>(
    [],
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchProjects = useCallback(async () => {
    try {
      const data = await getProjects();

      setProjects(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, []);

  const fetchTechnologies = useCallback(async () => {
    try {
      const data = await getTechnologies();

      setTechnologies(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      await Promise.all([fetchProjects(), fetchTechnologies()]);

      setIsLoading(false);
    };

    loadData();
  }, [fetchProjects, fetchTechnologies]);

  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLiveLink("");
    setGithubLink("");
    setSortOrder("0");
    setImage(null);
    setSelectedTechnologyIds([]);
    setEditingProject(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTechnologyChange = (technologyId: number) => {
    setSelectedTechnologyIds((current) => {
      if (current.includes(technologyId)) {
        return current.filter((id) => id !== technologyId);
      }

      return [...current, technologyId];
    });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);

    setTitle(project.title);
    setDescription(project.description);
    setLiveLink(project.live_link ?? "");
    setGithubLink(project.github_link ?? "");
    setSortOrder(String(project.sort_order));

    setSelectedTechnologyIds(
      project.techStack.map((technology) => technology.id),
    );

    setImage(null);
    setError("");
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setShowAddProject(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (!description.trim()) {
      setError("Project description is required.");
      return;
    }

    if (!editingProject && !image) {
      setError("Project image is required.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder) || parsedSortOrder < 0) {
      setError("Sort order must be a valid non-negative integer.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title.trim());

    formData.append("description", description.trim());

    formData.append("sortOrder", String(parsedSortOrder));

    formData.append("techStack", JSON.stringify(selectedTechnologyIds));

    if (editingProject) {
      formData.append("liveLink", liveLink.trim());

      formData.append("githubLink", githubLink.trim());
    } else {
      if (liveLink.trim()) {
        formData.append("liveLink", liveLink.trim());
      }

      if (githubLink.trim()) {
        formData.append("githubLink", githubLink.trim());
      }
    }

    // Optional during update.
    if (image) {
      formData.append("image", image);
    }

    setIsSubmitting(true);

    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);

        setMessage("Project updated successfully.");
      } else {
        await createProject(formData);

        setMessage("Project added successfully.");
      }

      await fetchProjects();

      resetForm();
      setShowAddProject(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();

    setError("");
    setShowAddProject(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <FaSpinner className="animate-spin text-draculaPink text-2xl" />
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await deleteProject(id);

      setMessage("Project deleted successfully.");

      if (editingProject?.id === id) {
        resetForm();
        setShowAddProject(false);
      }

      await fetchProjects();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-mono text-lg">Projects</p>

          <p className="text-white/40 font-mono text-xs mt-1">
            Manage the projects shown on your portfolio.
          </p>
        </div>

        {!showAddProject && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              setError("");
              setMessage("");
              setShowAddProject(true);
            }}
            className="text-white text-xs sm:text-sm font-mono bg-draculaPink rounded-md py-2 px-4 shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl active:scale-95"
          >
            + Add Project
          </button>
        )}
      </div>

      {message && <p className="text-green-400 font-mono text-xs">{message}</p>}

      {showAddProject && (
        <form
          onSubmit={handleSubmit}
          className="bg-cardColor border border-borderColor rounded-lg p-5 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-draculaPink font-mono text-lg">
              {editingProject ? "Edit Project" : "Add Project"}
            </p>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="text-white/50 font-mono text-xs cursor-pointer hover:text-white transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 font-mono text-xs">Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              placeholder="FLOE COMBAT"
              className="bg-backgroundColor border border-borderColor rounded-md px-3 py-2.5 text-white font-mono text-sm outline-none focus:border-draculaPink disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 font-mono text-xs">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              placeholder="Project description..."
              rows={4}
              className="resize-none bg-backgroundColor border border-borderColor rounded-md px-3 py-2.5 text-white font-mono text-sm outline-none focus:border-draculaPink disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 font-mono text-xs">
                Live Link
              </label>

              <input
                type="url"
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
                disabled={isSubmitting}
                placeholder="https://..."
                className="bg-backgroundColor border border-borderColor rounded-md px-3 py-2.5 text-white font-mono text-sm outline-none focus:border-draculaPink disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 font-mono text-xs">
                GitHub Link
              </label>

              <input
                type="url"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                disabled={isSubmitting}
                placeholder="https://github.com/..."
                className="bg-backgroundColor border border-borderColor rounded-md px-3 py-2.5 text-white font-mono text-sm outline-none focus:border-draculaPink disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 font-mono text-xs">
              Sort Order
            </label>

            <input
              type="number"
              min="0"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              disabled={isSubmitting}
              className="w-full sm:w-32 bg-backgroundColor border border-borderColor rounded-md px-3 py-2.5 text-white font-mono text-sm outline-none focus:border-draculaPink disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/60 font-mono text-xs">
              Tech Stack
            </label>

            {technologies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => {
                  const isSelected = selectedTechnologyIds.includes(
                    technology.id,
                  );

                  return (
                    <button
                      key={technology.id}
                      type="button"
                      onClick={() => handleTechnologyChange(technology.id)}
                      disabled={isSubmitting}
                      className={`flex items-center gap-2 border rounded-md px-3 py-2 font-mono text-xs transition-colors disabled:opacity-50 ${
                        isSelected
                          ? "border-draculaPink bg-draculaPink/10 text-white"
                          : "border-borderColor text-white/50 hover:text-white hover:border-draculaPink"
                      }`}
                    >
                      <img
                        src={getTechnologyIconUrl(
                          technology.name,
                          technology.icon_slug,
                          technology.icon_hex,
                        )}
                        alt={`${technology.name} icon`}
                        className="w-4 h-4"
                      />

                      {technology.name}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-white/40 font-mono text-xs">
                No technologies available.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 font-mono text-xs">
              Project Image
              {editingProject && (
                <span className="text-white/30"> (optional)</span>
              )}
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.svg"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              disabled={isSubmitting}
              className="text-white/60 font-mono text-xs file:mr-4 file:border-0 file:rounded-md file:bg-draculaPink file:text-white file:px-4 file:py-2 file:font-mono file:text-xs file:cursor-pointer"
            />

            {image && (
              <p className="text-white/40 font-mono text-xs">
                New image: {image.name}
              </p>
            )}

            {editingProject && !image && (
              <p className="text-white/30 font-mono text-xs">
                Leave empty to keep the current image.
              </p>
            )}
          </div>

          {error && <p className="text-red-400 font-mono text-xs">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 text-white text-sm font-mono bg-draculaPink rounded-md py-2.5 px-5 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100"
            >
              {isSubmitting && <FaSpinner className="animate-spin" />}

              {isSubmitting
                ? editingProject
                  ? "Saving..."
                  : "Adding..."
                : editingProject
                  ? "Save Changes"
                  : "Add Project"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="text-white/60 text-sm font-mono border border-borderColor rounded-md py-2.5 px-5 cursor-pointer hover:text-white hover:border-draculaPink transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-5 flex gap-4 items-start transition-colors duration-200"
          >
            <div className="w-12 h-12 rounded-md bg-backgroundColor border border-borderColor flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={`${SERVER_URL}${project.image_url}`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-draculaPink font-mono text-base sm:text-lg">
                {project.title}
              </p>

              <p className="text-white/60 font-mono text-xs sm:text-sm mt-1">
                {project.description}
              </p>

              {project.live_link && (
                <p className="text-white/30 font-mono text-xs mt-2 truncate">
                  {project.live_link}
                </p>
              )}

              {project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.techStack.map((technology) => (
                    <span
                      key={technology.id}
                      className="text-[10px] font-mono text-white/60 border border-borderColor rounded-md px-2 py-1"
                    >
                      {technology.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleEdit(project)}
                className="text-xs font-mono text-white/60 border border-borderColor rounded-md px-3 py-1.5 transition-colors cursor-pointer hover:text-white hover:border-draculaPink"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(project.id)}
                className="text-xs font-mono text-red-400 border border-red-400/40 rounded-md px-3 py-1.5 transition-colors cursor-pointer hover:bg-red-400/10 hover:border-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && !showAddProject && (
          <p className="text-white/40 font-mono text-sm">
            No projects added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectCards;
