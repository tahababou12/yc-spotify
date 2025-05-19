import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Play } from 'lucide-react';
import Header from '../components/Header';
import SongRow from '../components/SongRow';
import { playlists } from '../data/songs';
import { formatTime } from '../utils/formatTime';
import { usePlayer } from '../context/PlayerContext';

const PlaylistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playSong } = usePlayer();
  
  const playlist = playlists.find(p => p.id === id);
  
  if (!playlist) {
    return (
      <div className="flex-1 overflow-auto bg-background">
        <Header />
        <div className="p-8 text-center">
          <p className="text-white text-lg">Playlist not found</p>
        </div>
      </div>
    );
  }
  
  const totalDuration = playlist.songs.reduce((total, song) => total + song.duration, 0);
  
  const handlePlayAll = () => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-indigo-900 to-background pb-20">
      <Header />
      
      <div className="px-6 py-6">
        {/* Playlist Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
          <div className="w-48 h-48 flex-shrink-0 shadow-xl">
            <img 
              src={playlist.cover} 
              alt={playlist.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white text-sm uppercase font-bold">Playlist</p>
            <h1 className="text-white text-5xl font-bold mt-2 mb-4">{playlist.name}</h1>
            <p className="text-textSecondary">{playlist.description}</p>
            <div className="text-textSecondary text-sm mt-2">
              <span>{playlist.songs.length} songs • </span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>
        
        {/* Play Button & Songs */}
        <div className="mb-6">
          <button 
            className="bg-primary text-black rounded-full py-3 px-8 font-bold hover:scale-105 transition-transform"
            onClick={handlePlayAll}
          >
            <Play size={20} className="inline mr-1" fill="currentColor" />
            Play
          </button>
        </div>
        
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
              {playlist.songs.map((song, index) => (
                <SongRow 
                  key={song.id} 
                  song={song} 
                  index={index} 
                  playlistId={playlist.id}
                />
              ))}
            </tbody>
          </table>
        </div>
        
        {/* License Information */}
        <div className="mt-8 border-t border-divider pt-6">
          <h3 className="text-white font-bold mb-2">Music Licensing Information</h3>
          <p className="text-textSecondary text-sm mb-4">
            All music in this playlist is available under Creative Commons or similar open licenses.
            Please respect the terms of each license when using these tracks.
          </p>
          <ul className="text-textSecondary text-xs space-y-1">
            {playlist.songs.map(song => (
              <li key={song.id}>
                "{song.title}" by {song.artist} - {song.attribution}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;
