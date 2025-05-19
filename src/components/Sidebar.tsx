import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, Music } from 'lucide-react';
import { playlists } from '../data/songs';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-black w-64 flex-shrink-0 h-full overflow-y-auto hidden md:block">
      <div className="p-6">
        <div className="flex items-center gap-2 text-white mb-8">
          <Music size={32} className="text-primary" />
          <span className="text-xl font-bold">Musicify</span>
        </div>
        
        <nav className="mb-8">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className={`flex items-center gap-4 p-2 rounded-md transition-colors ${
                  isActive('/') ? 'bg-surface text-white' : 'text-textSecondary hover:text-white'
                }`}
              >
                <Home size={24} />
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/search" 
                className={`flex items-center gap-4 p-2 rounded-md transition-colors ${
                  isActive('/search') ? 'bg-surface text-white' : 'text-textSecondary hover:text-white'
                }`}
              >
                <Search size={24} />
                <span className="font-medium">Search</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/library" 
                className={`flex items-center gap-4 p-2 rounded-md transition-colors ${
                  isActive('/library') ? 'bg-surface text-white' : 'text-textSecondary hover:text-white'
                }`}
              >
                <Library size={24} />
                <span className="font-medium">Your Library</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="mb-6">
          <div className="flex items-center gap-4 p-2 text-textSecondary hover:text-white cursor-pointer transition-colors">
            <PlusSquare size={24} />
            <span className="font-medium">Create Playlist</span>
          </div>
          <Link 
            to="/liked" 
            className={`flex items-center gap-4 p-2 rounded-md transition-colors ${
              isActive('/liked') ? 'bg-surface text-white' : 'text-textSecondary hover:text-white'
            }`}
          >
            <Heart size={24} />
            <span className="font-medium">Liked Songs</span>
          </Link>
        </div>
        
        <div className="border-t border-divider pt-4">
          <h3 className="text-textSecondary font-bold mb-4 text-sm uppercase tracking-wider">Playlists</h3>
          <ul className="space-y-2">
            {playlists.map(playlist => (
              <li key={playlist.id}>
                <Link 
                  to={`/playlist/${playlist.id}`} 
                  className={`block p-2 rounded-md transition-colors ${
                    isActive(`/playlist/${playlist.id}`) ? 'bg-surface text-white' : 'text-textSecondary hover:text-white'
                  }`}
                >
                  {playlist.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
