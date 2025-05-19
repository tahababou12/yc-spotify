import React from 'react';
import { Play } from 'lucide-react';
import { Playlist } from '../types';
import { Link } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const { playSong } = usePlayer();
  
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist);
    }
  };

  return (
    <Link 
      to={`/playlist/${playlist.id}`}
      className="bg-surface p-4 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors group"
    >
      <div className="relative mb-4">
        <img 
          src={playlist.cover} 
          alt={playlist.name} 
          className="w-full aspect-square object-cover rounded shadow-lg"
        />
        <button 
          className="absolute bottom-2 right-2 bg-primary text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
          onClick={handlePlay}
        >
          <Play size={20} fill="currentColor" />
        </button>
      </div>
      <h3 className="text-white font-bold truncate">{playlist.name}</h3>
      <p className="text-textSecondary text-sm mt-1 line-clamp-2">{playlist.description}</p>
    </Link>
  );
};

export default PlaylistCard;
