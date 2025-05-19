import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SongRow from '../components/SongRow';
import { allSongs } from '../data/songs';
import { Song } from '../types';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = allSongs.filter(song => 
      song.title.toLowerCase().includes(query) || 
      song.artist.toLowerCase().includes(query) || 
      song.album.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-purple-900 to-background pb-20">
      <Header showSearch onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="px-6 py-6">
        <h1 className="text-white text-3xl font-bold mb-6">Search</h1>
        
        {searchQuery.trim() === '' ? (
          <div className="text-center py-12">
            <p className="text-textSecondary text-lg">Search for songs, artists, or albums</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-textSecondary text-lg">No results found for "{searchQuery}"</p>
          </div>
        ) : (
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
                {searchResults.map((song, index) => (
                  <SongRow key={song.id} song={song} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
