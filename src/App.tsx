import {
  BarChart2,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon
} from "lucide-react";
import React, { type PropsWithChildren } from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import MobileHeader from "./components/MobileHeader";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

export type NavItem = {
  name: string;
  icon: LucideIcon;
  path: string;
};


const navItems: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Invoices", icon: FileText, path: "/invoices" },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Reports", icon: BarChart2, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];






function Layout({ children }: PropsWithChildren) {

  return (
    <div className="flex h-svh overflow-hidden">

      <Sidebar navItems={navItems} />

    
      <div className="flex-1 flex flex-col md:ml-64">

        <MobileHeader navItems={navItems} />

    
        <main className="flex-1 overflow-y-auto px-0 py-6 md:bg-white bg-[#fceefb] mt-14 md:mt-0 rounded-t-2xl md:rounded-none">
      
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  );
}




const DashboardPage: React.FC = () => <Dashboard />;

const InvoicesPage: React.FC = () => (
  <h2 className="text-xl font-semibold">Invoices Page</h2>
);

const ClientsPage: React.FC = () => (
  <h2 className="text-xl font-semibold">Clients Page</h2>
);

const ReportsPage: React.FC = () => (
  <h2 className="text-xl font-semibold">Reports Page</h2>
);

const SettingsPage: React.FC = () => (
  <h2 className="text-xl font-semibold">Settings Page</h2>
);

const LogoutPage: React.FC = () => (
  <h2 className="text-xl font-semibold">You have been logged out</h2>
);

export default function App(){
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}> 
          <Route index element={<DashboardPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
