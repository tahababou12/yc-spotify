import React from 'react';
import Header from '../components/Header';
import { playlists } from '../data/songs';
import PlaylistCard from '../components/PlaylistCard';

const Library: React.FC = () => {
  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-green-900 to-background pb-20">
      <Header />
      
      <main className="px-6 py-6">
        <h1 className="text-white text-3xl font-bold mb-6">Your Library</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Library;
