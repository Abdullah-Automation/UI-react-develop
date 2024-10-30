import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from 'react';

interface ISpeakerContextProps {
  speakersCtx: string[];
  setSpeakersCtx: (speakersCtx: string[]) => void;
}

export const SpeakersContext = createContext<ISpeakerContextProps>({
  speakersCtx: [],
  // @ts-ignore
  setSpeakersCtx: (speakersCtx: string[]) => {},
});

interface ISpeakersProviderProps {
  children: ReactNode;
}

export const SpeakersProvider: React.FC<ISpeakersProviderProps> = ({
  children,
}) => {
  const [speakersCtx, setSpeakersCtx] = useState<string[]>([]);
  const speakersProviderValue = useMemo(
    () => ({ speakersCtx, setSpeakersCtx }),
    [speakersCtx, setSpeakersCtx]
  );

  return (
    <SpeakersContext.Provider value={speakersProviderValue}>
      {children}
    </SpeakersContext.Provider>
  );
};

export const useSpeakers = (): ISpeakerContextProps =>
  useContext(SpeakersContext);
