import React, { createContext, useState, useContext } from 'react';

// Define an interface for the context value
interface VideoPlayerContextValue {
  trackedInfo: any;
  handleTrackSegment: (trackInfo: any) => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextValue | null>(null);

export const useVideoPlayerContext = (): VideoPlayerContextValue => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    // Handle the case when context is null
    throw new Error(
      'useVideoPlayerContext must be used within a VideoPlayerProvider'
    );
  }
  return context;
};

// Define the type for the props of VideoPlayerProvider
interface VideoPlayerProviderProps {
  children: React.ReactNode;
}

export const VideoPlayerProvider = ({ children }: VideoPlayerProviderProps) => {
  const [trackedInfo, setTrackedInfo] = useState<any>({
    trackedTime: 0,
    type: 'segment',
    endTrackedTIme: 0,
  });

  const handleTrackSegment = (trackInfo: any) => {
    if (JSON.stringify(trackedInfo) !== JSON.stringify(trackInfo)) {
      setTrackedInfo(trackInfo);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <VideoPlayerContext.Provider value={{ trackedInfo, handleTrackSegment }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
