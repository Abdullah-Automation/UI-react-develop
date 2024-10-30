import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';

import { useTranslation } from './useTranslation';
import { useTranslate } from './translate';
import { useExport } from './export';
import { useToast } from './toast';

jest.mock('@tanstack/react-query');
jest.mock('~/api');
jest.mock('./translate');
jest.mock('./export');
jest.mock('./toast');

// Mocking Translation object
const translationDataMock = {
  status: 'COMPLETE',
  language: 'en',
  isDraft: false,
  dub: [
    {
      status: 'COMPLETE',
      language: 'en',
      medias: [
        {
          category: 'audio',
          uri: 'http://example.com/audio',
          format: 'mp3',
          id: '1',
        },
        {
          category: 'audio',
          uri: 'http://example.com/audio.vocals',
          format: 'mp3',
          id: '3',
        },
        {
          category: 'video',
          uri: 'http://example.com/video',
          format: 'mp4',
          id: '2',
        },
        {
          category: 'video',
          uri: 'http://example.com/video.vocals',
          format: 'mp4',
          id: '4',
        },
      ],
    },
  ],
  translationSegments: [],
  regionalAccents: [],
  translationText: 'Hello',
  medias: [
    {
      category: 'text',
      uri: '',
      format: 'srt',
      id: '3',
    },
    {
      category: 'audio',
      uri: 'vocals',
      format: 'mp3',
      id: '1',
    },
  ],
  isDubUpdated: true,
};

// Mocking targetLang
const targetLangMock = 'en';

describe('useTranslation hook', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: translationDataMock,
      isLoading: false,
    });
    (useTranslate as jest.Mock).mockReturnValue({
      targetLang: targetLangMock,
      isTranslated: 'progress',
      setIsDub: jest.fn(),
      setIsTranslated: jest.fn(),
      setIsDubUpdated: jest.fn(),
      setIsTranscriptionUpdated: jest.fn(),
    });
    (useExport as jest.Mock).mockReturnValue({
      setDubTextURL: jest.fn(),
      setDubAudioURL: jest.fn(),
      setDubSpeakerOnlyAudioURL: jest.fn(),
      setDubSrtURL: jest.fn(),
      setDubVideoURL: jest.fn(),
      getExportURL: jest.fn(),
    });
    (useToast as jest.Mock).mockReturnValue({
      showSuccessToast: jest.fn(),
    });
  });

  it('should correctly initialize the hook', () => {
    const { result } = renderHook(() =>
      useTranslation({
        translationId: '1',
        mediaCategory: 'video',
        enabledTranslationsAPI: false,
      })
    );

    expect(result.current.isTranslationLoading).toBeFalsy();
    expect(result.current.translation).toEqual(translationDataMock);
    expect(result.current.mediaId).toEqual('1');
    expect(result.current.mediaVocalsId).toEqual('3');
  });

  it('should correctly call setEnabledDubAPI', () => {
    const { result } = renderHook(() =>
      useTranslation({
        translationId: '1',
        mediaCategory: 'video',
        enabledTranslationsAPI: false,
      })
    );

    act(() => {
      result.current.setEnabledDubAPI(true);
    });

    expect(result.current.setEnabledDubAPI).toBeTruthy();
  });

  it('should call getExportURL with correct parameters', () => {
    renderHook(() =>
      useTranslation({
        translationId: '1',
        mediaCategory: 'video',
        enabledTranslationsAPI: false,
      })
    );

    expect(useExport().getExportURL).toBeCalledWith('1', 'getDubAudioURL');
    expect(useExport().getExportURL).toBeCalledWith('2', 'getDubVideoURL');
    expect(useExport().getExportURL).toBeCalledWith('3', 'getDubSrtURL');
    expect(useExport().getExportURL).toBeCalledWith(
      '4',
      'getDubVideoAudioOnlyURL'
    );
  });

  // Add more test scenarios...
});
