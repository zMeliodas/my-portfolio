const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-backgroundColor w-full min-h-full px-4 py-12">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-bold text-draculaPink text-3xl md:text-4xl">Admin Login</h1>
          <p className="font-mono text-white/60 text-sm">
            Sign in to manage your portfolio content.
          </p>
        </div>

        <form className="flex flex-col gap-4 bg-cardColor border border-borderColor rounded-lg p-6 sm:p-8">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-white/70 text-xs">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="bg-backgroundColor border border-borderColor rounded-md px-3 py-2.5 text-white font-mono text-sm outline-none focus:border-draculaPink transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-white/70 text-xs">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-backgroundColor border border-borderColor rounded-md px-3 py-2.5 text-white font-mono text-sm outline-none focus:border-draculaPink transition-colors"
            />
          </div>

          <p className="font-mono text-red-400 text-xs -mt-1 hidden">
            Incorrect email or password.
          </p>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 text-white text-sm font-mono bg-draculaPink shadow-lg rounded-md py-2.5 px-4 mt-2 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;