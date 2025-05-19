import React from 'react';
import Header from '../components/Header';
import PlaylistCard from '../components/PlaylistCard';
import { playlists } from '../data/songs';
import { usePlayer } from '../context/PlayerContext';
import SongRow from '../components/SongRow';

const Home: React.FC = () => {
  const { recentlyPlayed } = usePlayer();
  
  // Get recently played songs
  const recentSongs = recentlyPlayed
    .map(id => playlists.flatMap(p => p.songs).find(s => s.id === id))
    .filter(Boolean)
    .slice(0, 5);

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-blue-900 to-background pb-20">
      <Header />
      
      <main className="px-6 py-6">
        <section className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-6">Good afternoon</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.slice(0, 6).map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>
        
        {recentSongs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-white text-2xl font-bold mb-4">Recently played</h2>
            <div className="bg-surface bg-opacity-60 rounded-md overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-divider text-textSecondary text-sm">
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3">Title</th>
                    <th className="p-3 hidden md:table-cell">Album</th>
                    <th className="p-3 text-right pr-6">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSongs.map((song, index) => (
                    song && <SongRow key={song.id} song={song} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        
        <section>
          <h2 className="text-white text-2xl font-bold mb-4">Made for you</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
