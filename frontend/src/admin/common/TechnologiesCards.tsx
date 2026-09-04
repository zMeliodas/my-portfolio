import { useCallback, useEffect, useState } from "react";

import { FaSpinner } from "react-icons/fa";

import {
  createTechnology,
  deleteTechnology,
  getTechnologies,
  updateTechnology,
} from "@/services/technology.service";

import type { Technology } from "@/types";
import { getTechnologyIconUrl } from "@/utils/getTechnologyIconUrl";

const TechnologiesCards = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchTechnologies = useCallback(async () => {
    try {
      const data = await getTechnologies();

      setTechnologies(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

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
    setName("");
    setSortOrder("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const parsedSortOrder = Number(sortOrder);

    if (!name.trim()) {
      setError("Technology name is required.");
      return;
    }

    if (!Number.isInteger(parsedSortOrder) || parsedSortOrder < 1) {
      setError("Sort order must be a positive integer.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingId !== null) {
        await updateTechnology(editingId, name.trim(), parsedSortOrder);

        setMessage("Technology updated successfully.");
      } else {
        await createTechnology(name.trim(), parsedSortOrder);

        setMessage("Technology added successfully.");
      }

      resetForm();

      await fetchTechnologies();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (technology: Technology) => {
    setEditingId(technology.id);
    setName(technology.name);
    setSortOrder(String(technology.sort_order));

    setError("");
    setMessage("");
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this technology?",
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await deleteTechnology(id);

      if (editingId === id) {
        resetForm();
      }

      setMessage("Technology deleted successfully.");

      await fetchTechnologies();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <FaSpinner className="animate-spin text-draculaPink text-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={handleSubmit}
        className="bg-cardColor border border-borderColor rounded-lg p-5 flex flex-col gap-4"
      >
        <p className="text-draculaPink font-mono text-lg">
          {editingId !== null ? "Edit Technology" : "Add Technology"}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Technology name"
            disabled={isSubmitting}
            className="flex-1 bg-backgroundColor border border-borderColor rounded-md px-3 py-2 text-white font-mono text-sm outline-none focus:border-draculaPink disabled:opacity-50"
          />

          <input
            type="number"
            min="1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            placeholder="Sort order"
            disabled={isSubmitting}
            className="sm:w-32 bg-backgroundColor border border-borderColor rounded-md px-3 py-2 text-white font-mono text-sm outline-none focus:border-draculaPink disabled:opacity-50"
          />
        </div>

        {error && <p className="text-red-400 font-mono text-xs">{error}</p>}

        {message && (
          <p className="text-green-400 font-mono text-xs">{message}</p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 bg-draculaPink text-white font-mono text-sm rounded-md px-4 py-2 transition-all duration-300 cursor-pointer hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting && <FaSpinner className="animate-spin" />}

            {editingId !== null ? "Save" : "Add"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              disabled={isSubmitting}
              className="text-white/60 border border-borderColor font-mono text-sm rounded-md px-4 py-2 hover:text-white transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {technologies.map((technology) => (
          <div
            key={technology.id}
            className="bg-cardColor border border-borderColor hover:border-draculaPink rounded-lg p-5 flex gap-4 items-center transition-colors duration-200"
          >
            <div className="w-12 h-12 rounded-md bg-backgroundColor border border-borderColor flex items-center justify-center shrink-0">
              <img
                src={getTechnologyIconUrl(
                  technology.name,
                  technology.icon_slug,
                  technology.icon_hex,
                )}
                alt={`${technology.name} icon`}
                className="w-7 h-7"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-draculaPink font-mono text-base sm:text-lg">
                {technology.name}
              </p>

              <p className="text-white/40 font-mono text-xs mt-1">
                Sort order: {technology.sort_order}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleEdit(technology)}
                className="text-xs font-mono text-white/60 border border-borderColor rounded-md px-3 py-1.5 transition-colors cursor-pointer hover:text-white hover:border-draculaPink"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(technology.id)}
                className="text-xs font-mono text-red-400 border border-red-400/40 rounded-md px-3 py-1.5 transition-colors cursor-pointer hover:bg-red-400/10 hover:border-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {technologies.length === 0 && (
          <p className="text-white/40 font-mono text-sm">
            No technologies added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default TechnologiesCards;
