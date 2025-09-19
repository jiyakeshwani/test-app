import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function MobileHeader({
  navItems,
}: {
  navItems: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
  }[];
}) {
  const location = useLocation();
  const activeItem = navItems.find((item) => item.path === location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-[#fceefb] flex items-center justify-between px-4 py-3 z-40">
      <h1 className="text-2xl font-bold text-[#444CD3]" aria-label="Sparkonomy">
        S
      </h1>

      <h2 className="text-lg font-semibold" aria-live="polite">
        {activeItem?.name ?? "Page"}
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold focus:outline-none focus:ring-2 focus:ring-offset-2"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="Open menu"
        >
          <figure>
            <img src="/Avatar.png" alt="User avatar" className="rounded-full" />
          </figure>
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg py-2 z-50"
          >
            {navItems.map(({ name, icon: Icon, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-2 px-4 py-2 hover:bg-gray-100",
                    isActive ? "font-semibold text-[#6a4fc6]" : "",
                  ].join(" ")
                }
                role="menuitem"
                aria-label={name}
              >
                <Icon className="w-4 h-4" aria-hidden />
                <span>{name}</span>
              </NavLink>
            ))}
            <NavLink
              to="/logout"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              role="menuitem"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" aria-hidden />
              <span>Logout</span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
export default MobileHeader;
