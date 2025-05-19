import React from 'react';
import { Home, Search, Library, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 md:hidden">
      <div className="flex justify-between items-center p-4 border-b border-divider">
        <h2 className="text-white text-xl font-bold">Menu</h2>
        <button 
          onClick={onClose}
          className="text-white p-2"
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-6">
          <li>
            <Link 
              to="/" 
              className="flex items-center gap-4 text-white text-lg"
              onClick={onClose}
            >
              <Home size={24} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/search" 
              className="flex items-center gap-4 text-white text-lg"
              onClick={onClose}
            >
              <Search size={24} />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/library" 
              className="flex items-center gap-4 text-white text-lg"
              onClick={onClose}
            >
              <Library size={24} />
              <span>Your Library</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
