import React, { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX,
  Heart, Repeat, Shuffle, Maximize2, ListMusic
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatTime';

const NowPlaying: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    volume,
    currentTime,
    duration,
    togglePlay, 
    nextSong, 
    prevSong,
    setVolume,
    seekTo,
    toggleLike,
    isLiked
  } = usePlayer();
  
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  if (!currentSong) {
    return (
      <div className="bg-surface border-t border-divider h-20 px-4 flex items-center justify-center text-textSecondary">
        <p>No song playing</p>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="bg-surface border-t border-divider h-20 px-4 flex items-center justify-between">
      {/* Song Info */}
      <div className="flex items-center w-1/3">
        <div className="hidden sm:block h-14 w-14 mr-3 flex-shrink-0">
          <img 
            src={currentSong.cover} 
            alt={currentSong.title} 
            className="h-full w-full object-cover rounded"
          />
        </div>
        <div className="truncate">
          <h4 className="text-white text-sm font-medium truncate">{currentSong.title}</h4>
          <p className="text-textSecondary text-xs truncate">{currentSong.artist}</p>
        </div>
        <button 
          className={`ml-4 ${isLiked(currentSong.id) ? 'text-primary' : 'text-textSecondary'}`}
          onClick={() => toggleLike(currentSong.id)}
        >
          <Heart size={16} fill={isLiked(currentSong.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      {/* Player Controls */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-4 mb-1">
          <button className="text-textSecondary hover:text-white transition-colors">
            <Shuffle size={16} />
          </button>
          <button 
            className="text-textSecondary hover:text-white transition-colors"
            onClick={prevSong}
          >
            <SkipBack size={20} />
          </button>
          <button 
            className="bg-white rounded-full p-2 text-black hover:scale-105 transition-transform"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            className="text-textSecondary hover:text-white transition-colors"
            onClick={nextSong}
          >
            <SkipForward size={20} />
          </button>
          <button className="text-textSecondary hover:text-white transition-colors">
            <Repeat size={16} />
          </button>
        </div>
        
        <div className="w-full flex items-center gap-2">
          <span className="text-textSecondary text-xs">{formatTime(currentTime)}</span>
          <div 
            className="flex-grow h-1 bg-secondary rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100"></div>
            </div>
          </div>
          <span className="text-textSecondary text-xs">{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Volume & Extra Controls */}
      <div className="flex items-center justify-end gap-3 w-1/3">
        <button className="text-textSecondary hover:text-white transition-colors md:flex hidden">
          <ListMusic size={20} />
        </button>
        <div className="relative md:flex hidden items-center">
          <button 
            className="text-textSecondary hover:text-white transition-colors"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            {getVolumeIcon()}
          </button>
          
          {showVolumeSlider && (
            <div 
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-24 h-1 bg-secondary rounded-full cursor-pointer"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
              onClick={(e) => {
                const slider = e.currentTarget;
                const rect = slider.getBoundingClientRect();
                const clickPosition = e.clientX - rect.left;
                const percentage = clickPosition / rect.width;
                setVolume(Math.max(0, Math.min(1, percentage)));
              }}
            >
              <div 
                className="h-full bg-primary rounded-full relative"
                style={{ width: `${volume * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        <button className="text-textSecondary hover:text-white transition-colors md:flex hidden">
          <Maximize2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default NowPlaying;
