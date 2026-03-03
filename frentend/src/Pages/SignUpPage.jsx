import { useState } from "react";
import { Link } from "react-router-dom";
import userSignup from "../hooks/userSignup";
import userThemeStore from "../store/userThemsStore";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [accepted, setAccepted] = useState(false);
  const { theme } = userThemeStore();
  const { isPending, error, signupMutation } = userSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"
      style={{ backgroundImage: "url('/logo.png')" }}
    >
      {/* Background glow */}
      <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl top-[-80px] left-[-80px] animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse"></div>

      {/* 🔥 Single Glass Card (Only One Border) */}
      <div className="relative w-full max-w-5xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-10 border border-white/20 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col gap-4  sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src="/bg-logo.png" className="w-50" alt="logo" />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white/80 text-sm">Already a user?</span>
            <Link to="/loginpage">
              <button className="px-5 py-2 rounded-full bg-white text-purple-600 font-semibold shadow hover:scale-105 transition-all duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Form Section (NO BORDER, NO BOX) */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                className="w-full bg-white/15 text-white px-4 py-3 rounded-xl border border-white/10 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />

              <input
                type="email"
                required
                placeholder="Email Address"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                className="w-full bg-white/15 text-white px-4 py-3 rounded-xl border border-white/10 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />

              <input
                type="password"
                required
                placeholder="Password (min 6 characters)"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                className="w-full bg-white/15 text-white px-4 py-3 rounded-xl border border-white/10 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />

              <div className="flex items-center gap-2 text-white/80 text-sm">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="accent-pink-500 w-4 h-4"
                />
                I agree to Terms & Conditions
              </div>

              {error && (
                <div className="bg-red-500/20 text-red-200 px-4 py-2 rounded-lg text-sm">
                  {error.response?.data?.message || "Something went wrong"}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-purple-700 font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing Up...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          {/* Image Section (NO BORDER, NO BOX) */}
          <div className="hidden md:flex flex-col items-center justify-center text-center">
            <img
              src="/nav-logo-1.png"
              alt="online calling"
              className="w-72 mb-6 hover:scale-105 transition duration-300"
            />
            <h3 className="text-xl font-semibold text-white">
              Connect Instantly
            </h3>
            <p className="text-white/70 mt-3 text-sm">
              Secure, fast, and high-quality online calling experience.
            </p>
          </div>
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

export default Signup;
