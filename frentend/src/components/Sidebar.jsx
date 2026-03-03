import { Link, useLocation } from "react-router-dom";
import { userAuthUser } from "../hooks/userAuthUser";
import { HomeIcon, UserIcon, BellIcon } from "lucide-react";

const Sidebar = () => {
  const { authData } = userAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      {/* App Logo (from SignUpPage) */}
      <div className="flex items-center justify-center h-20 border-b border-base-300  lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <div>
            <img src="/public/app-logo.png" className="w-20" alt="nav-logo" />
          </div>
          <img src="/app-name-logo.png" alt="name-logo" className="w-20" />
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 flex flex-col gap-4">
        {/* Navigation Links */}
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""}`}
        >
          <UserIcon className="size-5 text-base-content opacity-70" />
          <span className="text-sm">Friends</span>
        </Link>
        <Link
          to="/notificationpage"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notificationpage" ? "btn-active" : ""}`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span className="text-sm">Notifications</span>
        </Link>
      </nav>
      {/* User Profile at the bottom */}
      <Link to="/profile">
        <div className="mt-auto px-4 py-6">
          <div className="flex items-center gap-3 bg-white/40 backdrop-blur rounded-lg p-3 shadow-lg border border-black">
            {/* Placeholder avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
              <img
                src={authData?.user?.profilePic || undefined}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold text-base-content">
                {authData.user.name}
              </div>
              <div className="text-xs text-base-content/70">
                {authData.user.email}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
