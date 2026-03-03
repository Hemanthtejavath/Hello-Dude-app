import { useState } from "react";
import userLogin from "../hooks/userLogin";
import { Link } from "react-router-dom";
import userThemeStore from "../store/userThemsStore";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { isPending, error, loginMutation } = userLogin();
  const { theme } = userThemeStore();

  const handlelogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 background"
      data-theme={theme}
      style={{ backgroundImage: "url('/logo.png')" }}
    >
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl top-[-80px] left-[-80px] animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse"></div>

      {/* Single Glass Card */}
      <div className="relative w-full max-w-4xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-10 border border-white/20 animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Form Section */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center md:text-left mb-8">
            Login to HelloDude
          </h2>

          <form className="space-y-6" onSubmit={handlelogin}>
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full bg-white/15 text-white px-4 py-3 rounded-xl border border-white/10 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full bg-white/15 text-white px-4 py-3 rounded-xl border border-white/10 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            {error && (
              <div className="bg-red-500/20 text-red-200 px-4 py-2 rounded-lg text-sm">
                {error.response?.data?.message || "Login failed"}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-white text-purple-700 font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-60"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center md:text-left text-white/80 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signuppage"
              className="text-white font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Image Section (No Border Box) */}
        <div className="hidden md:flex flex-col items-center justify-center text-center">
          <img
            src="/public/bg-logo.png"
            alt="login visual"
            className="w-100 mb-6 hover:scale-105 transition duration-300"
          />
          <h3 className="text-xl font-semibold text-white">Welcome Back!</h3>
          <p className="text-white/70 text-sm mt-3">
            Secure, fast, and high-quality online calling experience.
          </p>
        </div>
      </div>

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
