import React from 'react';
import { Heart, Play, Clock } from 'lucide-react';
import Header from '../components/Header';
import SongRow from '../components/SongRow';
import { allSongs } from '../data/songs';
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatTime';

const LikedSongs: React.FC = () => {
  const { likedSongs, playSong } = usePlayer();
  
  const likedSongsList = allSongs.filter(song => likedSongs.includes(song.id));
  const totalDuration = likedSongsList.reduce((total, song) => total + song.duration, 0);
  
  const handlePlayAll = () => {
    if (likedSongsList.length > 0) {
      playSong(likedSongsList[0]);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-pink-900 to-background pb-20">
      <Header />
      
      <div className="px-6 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
          <div className="w-48 h-48 flex-shrink-0 shadow-xl bg-gradient-to-br from-pink-700 to-pink-900 flex items-center justify-center">
            <Heart size={64} className="text-white" />
          </div>
          <div>
            <p className="text-white text-sm uppercase font-bold">Playlist</p>
            <h1 className="text-white text-5xl font-bold mt-2 mb-4">Liked Songs</h1>
            <div className="text-textSecondary text-sm mt-2">
              <span>{likedSongsList.length} songs • </span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>
        
        {/* Play Button & Songs */}
        <div className="mb-6">
          <button 
            className="bg-primary text-black rounded-full py-3 px-8 font-bold hover:scale-105 transition-transform"
            onClick={handlePlayAll}
            disabled={likedSongsList.length === 0}
          >
            <Play size={20} className="inline mr-1" fill="currentColor" />
            Play
          </button>
        </div>
        
        {likedSongsList.length === 0 ? (
          <div className="text-center py-12 bg-surface bg-opacity-30 rounded-md">
            <Heart size={48} className="text-textSecondary mx-auto mb-4" />
            <h2 className="text-white text-xl font-bold mb-2">Songs you like will appear here</h2>
            <p className="text-textSecondary">Save songs by tapping the heart icon</p>
          </div>
        ) : (
          <div className="bg-surface bg-opacity-30 rounded-md overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-divider text-textSecondary text-sm">
                  <th className="p-3 w-12 text-center">#</th>
                  <th className="p-3">Title</th>
                  <th className="p-3 hidden md:table-cell">Album</th>
                  <th className="p-3 text-right pr-6">
                    <Clock size={16} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {likedSongsList.map((song, index) => (
                  <SongRow key={song.id} song={song} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
