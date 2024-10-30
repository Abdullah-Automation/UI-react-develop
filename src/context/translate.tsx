import { createContext, useState, useContext } from 'react';

interface ITranslateProviderProps {
  children: React.ReactNode;
}

interface ITranslateContextProps {
  transcriptionLang: string;
  dubStatus: string;
  dubId: string;
  dubUpdatedAt: string;
  isTranslated: boolean | 'progress';
  isDub: boolean | 'progress';
  isEdit: string;
  targetLang: string;
  targetAccent: string;
  isDubUpdated: boolean;
  isTranscriptionUpdated: boolean;
  dubItems: any[];
  isEdited: boolean;
  showSettings: boolean;
  targetVoice: string;
  langAccents: any[];
  showDubError: boolean;
  mediaId: string;
  mediaVocalsId: string;
  isEditable: boolean;
  setTranscriptionLang: (lang: string) => void;
  setIsEditable: (isEditable: boolean) => void;
  setMediaId: (mediaId: string) => void;
  setMediaVocalsId: (mediaVocalsId: string) => void;
  setShowSettings: (setting: boolean) => void;
  setDubStatus: (status: string) => void;
  setTargetVoice: (targetVoice: string) => void;
  setDubId: (name: string) => void;
  setDubUpdatedAt: (name: string) => void;
  setTargetLang: (name: string) => void;
  setTargetAccent: (name: string) => void;
  setIsTranslated: (handler: boolean | 'progress') => void;
  setIsDub: (handler: boolean | 'progress') => void;
  setIsEdit: (handler: string) => void;
  setIsDubUpdated: (handler: boolean) => void;
  setIsTranscriptionUpdated: (handler: boolean) => void;
  setDubItems: (handler: any[]) => void;
  setLangAccents: (accents: any[]) => void;
  setShowDubError: (value: boolean) => void;
  setIsEdited: (value: boolean) => void;
}

export const TranslateContext = createContext<ITranslateContextProps>({
  transcriptionLang: '',
  dubStatus: '',
  isTranslated: false,
  isDub: false,
  isEdit: '',
  targetLang: '',
  targetAccent: '',
  isDubUpdated: false,
  isEdited: false,
  isTranscriptionUpdated: false,
  dubItems: [],
  langAccents: [],
  showSettings: false,
  targetVoice: '',
  showDubError: false,
  mediaId: '',
  mediaVocalsId: '',
  isEditable: false,
  // @ts-ignore
  setTranscriptionLang: (lang: string) => {},
  // @ts-ignore
  setIsEditable: (isEditable: boolean) => {},
  // @ts-ignore
  setMediaId: (mediaId: string) => {},
  // @ts-ignore
  setMediaVocalsId: (mediaVocalsId: string) => {},
  // @ts-ignore
  setShowSettings: (setting: boolean) => {},
  // @ts-ignore
  setShowDubError: (setting: boolean) => {},
  // @ts-ignore
  setTargetVoice: (targetVoice: string) => {},
  // @ts-ignore
  setDubStatus: (sourceLang: string) => {},
  // @ts-ignore
  setIsTranslated: (name: boolean | 'progress') => {},
  // @ts-ignore
  setIsDub: (handler: boolean | 'progress') => {},
  // @ts-ignore
  setTargetLang: (handler: string) => {},
  // @ts-ignore
  setTargetAccent: (handler: string) => {},
  // @ts-ignore
  setIsDubUpdated: (handler: boolean) => {},
  // @ts-ignore
  setIsEdited: (handler: boolean) => {},
  // @ts-ignore
  setIsTranscriptionUpdated: (handler: boolean) => {},
  // @ts-ignore
  setIsEdit: (handler: string) => {},
  // @ts-ignore
  setDubItems: (handler: []) => {},
  // @ts-ignore
  setLangAccents: (handler: []) => {},
});

export const TranslateProvider: React.FC<ITranslateProviderProps> = ({
  children,
}) => {
  const [transcriptionLang, setTranscriptionLang] = useState<string>('');

  const [isDub, setIsDub] = useState<boolean | 'progress'>(false);
  const [isTranslated, setIsTranslated] = useState<boolean | 'progress'>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [isDubUpdated, setIsDubUpdated] = useState<boolean>(true);
  const [isEdited, setIsEdited] = useState<boolean>(true);
  const [isTranscriptionUpdated, setIsTranscriptionUpdated] =
    useState<boolean>(false);

  const [dubStatus, setDubStatus] = useState<string>('');
  const [dubId, setDubId] = useState<string>('');
  const [dubUpdatedAt, setDubUpdatedAt] = useState<string>('');
  const [isEdit, setIsEdit] = useState<string>('');
  const [showDubError, setShowDubError] = useState<boolean>(false);
  const [mediaId, setMediaId] = useState<string>('');
  const [mediaVocalsId, setMediaVocalsId] = useState<string>('');

  const [targetLang, setTargetLang] = useState<string>('none');
  const [targetAccent, setTargetAccent] = useState<string>('');
  const [targetVoice, setTargetVoice] = useState<string>('native');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [dubItems, setDubItems] = useState<any[]>([]);
  const [langAccents, setLangAccents] = useState<any[]>([]);

  return (
    <TranslateContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        transcriptionLang,
        dubStatus,
        dubId,
        dubUpdatedAt,
        isTranslated,
        targetLang,
        targetAccent,
        isDub,
        isEdit,
        isDubUpdated,
        isTranscriptionUpdated,
        dubItems,
        showDubError,
        isEdited,
        langAccents,
        showSettings,
        targetVoice,
        mediaId,
        mediaVocalsId,
        isEditable,
        setTranscriptionLang,
        setIsEditable,
        setMediaId,
        setMediaVocalsId,
        setLangAccents,
        setShowSettings,
        setTargetVoice,
        setShowDubError,
        setDubId,
        setDubStatus,
        setDubUpdatedAt,
        setIsTranslated,
        setIsDub,
        setIsEdit,
        setIsTranscriptionUpdated,
        setIsDubUpdated,
        setTargetLang,
        setTargetAccent,
        setDubItems,
        setIsEdited,
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};

export const useTranslate = (): ITranslateContextProps =>
  useContext(TranslateContext);
