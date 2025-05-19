import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NowPlaying from './components/NowPlaying';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import PlaylistView from './pages/PlaylistView';
import LikedSongs from './pages/LikedSongs';
import { PlayerProvider } from './context/PlayerContext';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="flex flex-col h-screen bg-background text-textPrimary">
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/playlist/:id" element={<PlaylistView />} />
              <Route path="/liked" element={<LikedSongs />} />
            </Routes>
          </div>
          <NowPlaying />
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
