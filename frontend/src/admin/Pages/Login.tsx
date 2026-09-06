import { loginAdmin } from "@/services/admin.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "../../auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading: isAuthLoading, refreshAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && isLoggedIn) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthLoading, isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await loginAdmin(username, password);
      await refreshAuth();
      navigate("/admin");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-full bg-backgroundColor">
        <FaSpinner className="animate-spin text-draculaPink text-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-backgroundColor w-full min-h-full px-4 py-12">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-bold text-draculaPink text-3xl md:text-4xl">
            Admin Login
          </h1>

          <p className="font-mono text-white/60 text-sm">
            Sign in to manage your portfolio content.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-cardColor border border-borderColor rounded-lg p-6 sm:p-8"
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-white/70 text-xs">Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              disabled={isLoading}
              className="bg-backgroundColor border border-borderColor rounded-md px-3 py-2.5 text-white font-mono text-sm outline-none focus:border-draculaPink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-white/70 text-xs">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="bg-backgroundColor border border-borderColor rounded-md px-3 py-2.5 text-white font-mono text-sm outline-none focus:border-draculaPink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {error && (
            <p className="font-mono text-red-400 text-xs -mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 text-white text-sm font-mono bg-draculaPink shadow-lg rounded-md py-2.5 px-4 mt-2 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isLoading && <FaSpinner className="animate-spin text-base" />}
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
