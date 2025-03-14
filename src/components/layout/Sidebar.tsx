
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  TruckIcon, 
  PackageOpen, 
  AlertCircle, 
  Home,
  PackageCheck,
  Gauge,
  Database,
  Table
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active }) => (
  <Link
    to={to}
    className={cn(
      "w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
      active 
        ? "bg-primary text-primary-foreground" 
        : "text-foreground/70 hover:bg-secondary hover:text-foreground"
    )}
  >
    <span className="w-5 h-5">{icon}</span>
    <span>{label}</span>
  </Link>
);

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarItems = [
    { icon: <Home />, label: "Dashboard", to: "/" },
    { icon: <Gauge />, label: "KPI Metrics", to: "/metrics" },
    { icon: <Settings />, label: "Rules Config", to: "/rules" },
    { icon: <PackageOpen />, label: "Receiving", to: "/receiving" },
    { icon: <PackageCheck />, label: "Allocation", to: "/allocation" },
    { icon: <TruckIcon />, label: "Shipments", to: "/shipments" },
    { icon: <AlertCircle />, label: "Exceptions", to: "/exceptions" },
    { icon: <Database />, label: "Data", to: "/data" },
    { icon: <Table />, label: "Raw Data", to: "/raw-data" }, // Add new raw data link
    { icon: <BarChart3 />, label: "Reports", to: "/reports" },
  ];

  return (
    <aside className="w-60 border-r h-full bg-algo-purple flex flex-col">
      <div className="h-16 border-b flex items-center px-6">
        <img 
          src="/lovable-uploads/9e374f71-681f-401d-900b-13eafe7ebb50.png" 
          alt="Algo Logo" 
          className="h-8" 
        />
      </div>
      
      <div className="flex-1 py-4 px-3 space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            active={
              item.to === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.to)
            }
          />
        ))}
      </div>
      
      <div className="p-4 mt-auto border-t">
        <div className="bg-white/10 rounded-lg p-3 text-white/90">
          <p className="text-xs font-medium">Flow-Through %</p>
          <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[65%] rounded-full" />
          </div>
          <p className="mt-1 text-xs text-white/80 text-right">65% Today</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
