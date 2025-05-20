
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationPopover from '@/components/notification/NotificationPopover';
import MessagePopover from '@/components/message/MessagePopover';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-hive-dark/80 backdrop-blur-md border-b border-hive-gray/50 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 2.5v19M19 2.5v19" />
              <path d="M5 12.5h14" />
              <path d="M12 2.5v19" />
            </svg>
          </div>
          <span className="font-bold text-xl text-white">Connect Share</span>
        </Link>
        
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-hive-gray/50 rounded-lg px-3 py-1.5 flex-1 max-w-xs mx-4"
        >
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-400 w-full"
          />
        </form>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-hive-purple/20">
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          <NotificationPopover />
          <MessagePopover />
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-hive-purple/20">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
