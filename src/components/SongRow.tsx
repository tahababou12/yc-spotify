import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { Song } from '../types';
import { formatTime } from '../utils/formatTime';
import { usePlayer } from '../context/PlayerContext';

interface SongRowProps {
  song: Song;
  index: number;
  playlistId?: string;
}

const SongRow: React.FC<SongRowProps> = ({ song, index, playlistId }) => {
  const { 
    currentSong, 
    isPlaying, 
    playSong, 
    pauseSong, 
    toggleLike, 
    isLiked,
    currentPlaylist
  } = usePlayer();
  
  const isCurrentSong = currentSong?.id === song.id;
  const isCurrentPlaylist = currentPlaylist?.id === playlistId;
  
  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentSong && isPlaying) {
      pauseSong();
    } else {
      playSong(song);
    }
  };
  
  const handleRowClick = () => {
    if (isCurrentSong && isPlaying) {
      pauseSong();
    } else {
      playSong(song);
    }
  };

  return (
    <tr 
      className={`group hover:bg-white hover:bg-opacity-10 ${isCurrentSong ? 'bg-white bg-opacity-20' : ''} transition-colors cursor-pointer`}
      onClick={handleRowClick}
    >
      <td className="p-3 w-12 text-center">
        <div className="relative flex items-center justify-center">
          <span className={`group-hover:hidden ${isCurrentSong ? 'hidden' : 'block'} text-textSecondary`}>
            {index + 1}
          </span>
          <button 
            className={`group-hover:block ${isCurrentSong && isPlaying ? 'block' : 'hidden'} text-white`}
            onClick={handlePlayPause}
          >
            {isCurrentSong && isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </td>
      <td className="p-3">
        <div className="flex items-center">
          <img 
            src={song.cover} 
            alt={song.title} 
            className="w-10 h-10 mr-3 rounded"
          />
          <div>
            <p className={`font-medium ${isCurrentSong ? 'text-primary' : 'text-white'}`}>{song.title}</p>
            <p className="text-textSecondary text-sm">{song.artist}</p>
          </div>
        </div>
      </td>
      <td className="p-3 text-textSecondary hidden md:table-cell">{song.album}</td>
      <td className="p-3 text-right pr-6">
        <div className="flex items-center justify-end gap-6">
          <button 
            className={`${isLiked(song.id) ? 'text-primary' : 'text-textSecondary opacity-0 group-hover:opacity-100'} transition-opacity`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(song.id);
            }}
          >
            <Heart size={16} fill={isLiked(song.id) ? 'currentColor' : 'none'} />
          </button>
          <span className="text-textSecondary">{formatTime(song.duration)}</span>
        </div>
      </td>
    </tr>
  );
};

export default SongRow;
