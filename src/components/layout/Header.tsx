
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ className, username = "User" }) => {
  return (
    <header className={cn("h-16 border-b flex items-center px-6 sticky top-0 z-50 bg-background/95 backdrop-blur-sm", className)}>
      <div className="flex-1 flex items-center">
        <div className="text-lg font-semibold text-primary">Flow Bridge Manager</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-[200px] md:w-[300px] rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="h-9 w-9 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors">
            <Bell className="h-4 w-4 text-foreground" />
          </button>
          
          <div className="flex items-center space-x-2 border-l pl-2 ml-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium hidden md:inline-block">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
