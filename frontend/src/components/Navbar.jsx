import { userAuthUser } from "../hooks/userAuthUser.js";
import { Link } from "react-router-dom";
import { BellIcon, LogOutIcon, HomeIcon } from "lucide-react";
import userLogout from "../hooks/userLogout.js";
import ThemeSelector from "./ThemeSelector.jsx";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authData } = userAuthUser();
  const { logoutMutation } = userLogout();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="backdrop-blur-lg bg-white/10 dark:bg-base-200/30 border-b border-white/10 sticky top-0 z-30 h-20 flex items-center shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div>
              <img src="/app-logo.png" className="w-20" alt="nav-logo" />
            </div>
            <span className="text-lg font-extrabold tracking-wide bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              <img src="/app-name-logo.png" alt="name-logo" className="w-20" />
            </span>
          </Link>

          <div className="flex items-center ml-auto gap-3">
            {/* ✅ ThemeSelector beside hamburger (Mobile only) */}
            <div className="lg:hidden">
              <ThemeSelector />
            </div>

            {/* ✅ Mobile Hamburger */}
            <button
              onClick={toggleMenu}
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            {isOpen && (
              <div className="lg:hidden absolute top-20 right-4 w-56 bg-base-200/95 backdrop-blur-md shadow-xl rounded-xl p-4 space-y-3 z-50">
                <Link to="/" className="flex items-center gap-2">
                  <HomeIcon className="size-5 ml-3" />
                  Home
                </Link>
                <Link
                  to="/notificationpage"
                  className="flex items-center gap-2"
                >
                  <BellIcon className="size-5 ml-3" />
                  Notifications
                </Link>

                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-7 rounded-full">
                      <img
                        src={authData?.user?.profilePic || undefined}
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <Link to="/profile">
                    <span>Profile</span>
                  </Link>
                </div>

                <button
                  className="flex items-center gap-2 text-error"
                  onClick={logoutMutation}
                >
                  <LogOutIcon className="size-5 ml-3" />
                  Logout
                </button>
              </div>
            )}

            {/* ✅ Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/notificationpage">
                <button className="btn btn-ghost btn-circle">
                  <BellIcon className="size-5 text-base-content opacity-70" />
                </button>
              </Link>

              <ThemeSelector />

              <div className="avatar">
                <div className="w-9 rounded-full p-[1.5px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                  <Link to="/profile">
                    <img
                      src={authData?.user?.profilePic || undefined}
                      alt="User Avatar"
                      className="object-cover bg-white rounded-full"
                    />
                  </Link>
                </div>
              </div>

              <button
                className="btn btn-ghost btn-circle"
                onClick={logoutMutation}
              >
                <LogOutIcon className="size-5 text-base-content opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
