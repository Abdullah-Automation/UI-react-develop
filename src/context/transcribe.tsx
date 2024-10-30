import { createContext, useState, useContext } from 'react';

interface ITranscribeProviderProps {
  children: React.ReactNode;
}

interface ITranscribeContextProps {
  currentSourceLang: string;
  setCurrentSourceLang: (sourceLang: string) => void;
  showVideoSection: boolean;
  setShowVideoSection: (val: boolean) => void;
}

export const TranscribeContext = createContext<ITranscribeContextProps>({
  currentSourceLang: '',
  // @ts-ignore
  setCurrentSourceLang: (sourceLang: string) => {},
  showVideoSection: true,
  // @ts-ignore
  setShowVideoSection: (value: boolean) => {},
});

export const TranscribeProvider: React.FC<ITranscribeProviderProps> = ({
  children,
}) => {
  const [currentSourceLang, setCurrentSourceLang] = useState<string>('');
  const [showVideoSection, setShowVideoSection] = useState<boolean>(true);

  return (
    <TranscribeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentSourceLang,
        setCurrentSourceLang,
        showVideoSection,
        setShowVideoSection,
      }}
    >
      {children}
    </TranscribeContext.Provider>
  );
};

export const useTranscribe = (): ITranscribeContextProps =>
  useContext(TranscribeContext);
