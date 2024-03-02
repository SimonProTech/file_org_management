'use client';

import { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.playbackRate = 1; // Adjust the playback rate as needed
    }

    const handleVideoEnd = () => {
      setTimeout(() => {
        const animationElement = document.getElementById('animationTarget');
        animationElement?.classList.add('fadeInAnimation');
      }, 1000); // Adjust the delay as needed
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
    }

    // Cleanup: remove event listener
    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  return (
    <div className="background-video">
      <div className="fixed left-0 top-0 bg-black/50 w-full h-full z-50" />
      <video ref={videoRef} autoPlay muted loop>
        <source src="../assets/bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundAnimation;
