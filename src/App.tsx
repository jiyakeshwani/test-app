import {
  BarChart2,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users
} from "lucide-react";
import { useState } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Dashboard } from "./Dashboard";

// Navigation items config
const navItems = [

  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Invoices", icon: FileText, path: "/invoices" },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Reports", icon: BarChart2, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 md:bg-[#fceefb] bg-white shadow flex-col">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-[#6a4fc6] p-6">Sparkonomy</h1>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map(({ name, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                active
                  ? "bg-indigo-100 text-[#6a4fc6] font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          );
        })}
      </nav>

      {/* Only Logout in desktop bottom */}
      <div className="px-4 py-4">
        <Link
          to="/logout"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#6a4fc6] text-white hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </div>
  );
}

function MobileHeader() {
  const location = useLocation();
  const activeItem = navItems.find((item) => item.path === location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-[#fceefb] flex items-center justify-between px-4 py-3 z-40">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-[#444CD3]">S</h1>

      {/* Active Page */}
      <h2 className="text-lg font-semibold">{activeItem?.name || "Page"}</h2>

      {/* Avatar */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold"
        >
            <figure>
          <img src="/Avatar.png" alt="" className="" />
        </figure>
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
            {navItems.map(({ name, icon: Icon, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            ))}
            <Link
              to="/logout"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-0 py-6 md:bg-white bg-[#fceefb] mt-6 rounded-t-2xl md:rounded-none md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}

// Pages
function HomePage() {
  return <h2 className="text-xl font-semibold">Home Page</h2>;
}
function DashboardPage() {
  return <Dashboard />;
}
function InvoicesPage() {
  return <h2 className="text-xl font-semibold">Invoices Page</h2>;
}
function ClientsPage() {
  return <h2 className="text-xl font-semibold">Clients Page</h2>;
}
function ReportsPage() {
  return <h2 className="text-xl font-semibold">Reports Page</h2>;
}
function SettingsPage() {
  return <h2 className="text-xl font-semibold">Settings Page</h2>;
}
function LogoutPage() {
  return <h2 className="text-xl font-semibold">You have been logged out</h2>;
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
