import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children, showSidebar = true }) => {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith("/chat/");

  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className={`flex-1 ${isChatRoute ? "overflow-hidden" : "overflow-y-auto"}`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
export default Layout;
