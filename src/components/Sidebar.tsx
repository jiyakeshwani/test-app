import { LogOut } from "lucide-react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

function Sidebar({
  navItems,
}: {
  navItems: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
  }[];
}) {
  const items = useMemo(() => navItems, []);

  return (
    <div className="hidden md:flex fixed top-0 left-0 h-svh w-64 md:bg-[#fceefb] bg-white shadow flex-col">
      <h1 className="text-2xl font-bold text-[#6a4fc6] p-6">Sparkonomy</h1>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto" aria-label="Main">
        {items.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2",
                isActive
                  ? "bg-indigo-100 text-[#6a4fc6] font-semibold"
                  : "hover:bg-gray-100",
              ].join(" ")
            }
            aria-label={name}
          >
            <Icon className="w-5 h-5" aria-hidden />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4">
        <NavLink
          to="/logout"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#6a4fc6] text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" aria-hidden />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
}
export default Sidebar;
