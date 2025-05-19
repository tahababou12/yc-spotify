import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Menu, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileNav from './MobileNav';

interface HeaderProps {
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  showSearch = false, 
  onSearch = () => {}, 
  searchQuery = '' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <>
      <header className="bg-background bg-opacity-95 backdrop-blur-sm sticky top-0 z-10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="md:hidden text-white mr-4"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => navigate(-1)}
              className="bg-black bg-opacity-70 rounded-full p-1 text-white"
              aria-label="Go back"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => navigate(1)}
              className="bg-black bg-opacity-70 rounded-full p-1 text-white"
              aria-label="Go forward"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {showSearch && (
            <div className="relative ml-4 flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={20} className="text-textSecondary" />
              </div>
              <input
                type="search"
                className="block w-full p-2 pl-10 text-sm rounded-full bg-surface text-white focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Search for songs, artists..."
                value={localSearchQuery}
                onChange={handleSearchChange}
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <button className="bg-black rounded-full p-1 text-white">
            <User size={24} />
          </button>
        </div>
      </header>
      
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
};

export default Header;
