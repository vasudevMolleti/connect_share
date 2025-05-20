
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Bookmark, Heart, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon: Icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start py-6 px-3 rounded-lg",
          isActive
            ? "bg-emerald-600/20 text-emerald-500 font-medium"
            : "text-gray-400 hover:text-white hover:bg-emerald-500/10"
        )}
      >
        <Icon className={cn("h-5 w-5 mr-3", isActive ? "text-emerald-500" : "")} />
        <span className="font-medium">{label}</span>
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed bottom-6 left-6 z-50 bg-emerald-600 text-white rounded-full shadow-lg md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar for mobile and desktop */}
      <div 
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 w-64 bg-gradient-to-b from-hive-dark to-hive-black/90 border-r border-hive-gray/50 pt-16 transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="space-y-1">
            <SidebarLink icon={Home} label="Home" to="/" />
            <SidebarLink icon={Users} label="Friends" to="/friends" />
            <SidebarLink icon={Heart} label="Liked Posts" to="/liked" />
            <SidebarLink icon={Bookmark} label="Saved" to="/saved" />
          </div>

          <div className="mt-auto">
            <SidebarLink icon={Settings} label="Settings" to="/settings" />
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-emerald-600/20 to-teal-600/10 border border-emerald-500/10">
            <h4 className="text-sm font-medium text-emerald-400 mb-2">Connect Share Pro</h4>
            <p className="text-xs text-gray-400 mb-3">Unlock premium features with our subscription plan.</p>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8">
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
