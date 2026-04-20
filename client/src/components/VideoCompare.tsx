import React, { useState, useRef, useEffect } from 'react';

interface VideoCompareProps {
  yourVideo: string;
  professionalVideo: string;
}

const VideoCompare: React.FC<VideoCompareProps> = ({ yourVideo, professionalVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const yourVideoRef = useRef<HTMLVideoElement>(null);
  const professionalVideoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (yourVideoRef.current && professionalVideoRef.current) {
      if (isPlaying) {
        yourVideoRef.current.pause();
        professionalVideoRef.current.pause();
      } else {
        yourVideoRef.current.play();
        professionalVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = (e: React.Event) => {
    const video = e.target as HTMLVideoElement;
    setCurrentTime(video.currentTime);
    
    if (yourVideoRef.current && professionalVideoRef.current) {
      // 同步两个视频的播放进度
      if (e.target === yourVideoRef.current) {
        professionalVideoRef.current.currentTime = video.currentTime;
      } else {
        yourVideoRef.current.currentTime = video.currentTime;
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    
    if (yourVideoRef.current && professionalVideoRef.current) {
      yourVideoRef.current.currentTime = time;
      professionalVideoRef.current.currentTime = time;
    }
  };

  return (
    <div className="video-compare">
      <div className="video-grid">
        <div className="video-container">
          <h4>你的动作</h4>
          <video
            ref={yourVideoRef}
            src={yourVideo}
            controls={false}
            onTimeUpdate={handleTimeUpdate}
            className="compare-video"
          />
        </div>
        <div className="video-container">
          <h4>专业动作</h4>
          <video
            ref={professionalVideoRef}
            src={professionalVideo}
            controls={false}
            onTimeUpdate={handleTimeUpdate}
            className="compare-video"
          />
        </div>
      </div>
      
      <div className="video-controls">
        <button 
          className="play-pause-btn"
          onClick={handlePlayPause}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="seek-bar"
        />
        <span className="time-display">
          {currentTime.toFixed(1)}s
        </span>
      </div>
    </div>
  );
};

export default VideoCompare;