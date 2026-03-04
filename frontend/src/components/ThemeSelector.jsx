import userThemeStore from "../store/userThemsStore";
import { PaletteIcon } from "lucide-react";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const ThemeSelector = () => {
  const { theme, setTheme } = userThemeStore();
  return (
    <div className="dropdown dropdown-end">
      {/* Trigger Button */}
      <button className="btn btn-ghost btn-sm rounded-full">
        <PaletteIcon className="size-5" />
      </button>

      {/* Dropdown */}
      <div className="dropdown-content mt-3 z-[1] w-72 max-h-96 overflow-y-auto rounded-2xl bg-base-200 shadow-2xl p-3">
        <h3 className="px-3 pb-2 text-sm font-semibold opacity-60">
          Choose Theme
        </h3>

        <ul className="menu menu-sm gap-1">
          {THEMES.map((t) => (
            <li key={t}>
              <button
                onClick={() => setTheme(t)}
                data-theme={t}
                className={`flex items-center justify-between rounded-xl px-3 py-2 capitalize transition-all duration-200
              ${
                theme === t
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300"
              }`}
              >
                {/* Theme Name */}
                <span className="font-medium">{t}</span>

                {/* Real Theme Preview */}
                <div className="flex gap-1">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="w-3 h-3 rounded-full bg-accent"></span>
                  <span className="w-3 h-3 rounded-full bg-neutral"></span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThemeSelector;
