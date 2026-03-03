import userThemeStore from "../store/userThemsStore";

const PageLoader = () => {
  const { theme } = userThemeStore();
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
      data-thems={theme}
    >
      {/* Spinner + Logo */}
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full border-4 border-transparent border-t-fuchsia-500 border-r-indigo-500 animate-spin"
          data-thems={theme}
        ></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl">
            <span className="text-white text-xl font-extrabold">
              <img src="/public/app-logo.png" className="w-50" alt="applogo" />
            </span>
          </div>
        </div>
      </div>

      {/* Text */}
      <p className="mt-6 text-slate-400 text-sm tracking-widest animate-pulse">
        Loading HelloDude...
      </p>
    </div>
  );
};

export default PageLoader;
