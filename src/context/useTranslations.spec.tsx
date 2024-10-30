import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useTranscription } from './useTranscription';
import { useTranslate } from './translate';
import { useTranslations } from './useTranslations';

jest.mock('next/router');
jest.mock('@tanstack/react-query');
jest.mock('./translate');
jest.mock('~/context/useTranscription');
jest.mock('~/api');

describe('useTranslations', () => {
  it('fetches translations data and updates state', async () => {
    const mockTranscriptionId = '655d739150ece3002ef465ff';
    const mockProjectId = '655d739150ece3002ef465ff';
    const mockTranslationsData = [
      {
        isEdited: false,
        isDraft: false,
        isDubUpdated: true,
        medias: [],
        language: 'es_la',
        status: 'COMPLETE',
        transcription: '655d739150ece3002ef465ff',
        createdAt: '2023-11-22T03:24:36.031Z',
        updatedAt: '2023-12-12T16:26:32.323Z',
        translationText:
          '\n     Speaker 1 - 0.080000  --> 2.720000\n     Aquí Ryan, aquí Brooks probando.\n  ',
        translationSegments: [
          {
            retainAudio: false,
            wordDetails: [],
            speaker: 'Speaker 1',
            startTime: 0.08,
            endTime: 2.72,
            content: 'Aquí Ryan, aquí Brooks probando.',
            translation: '655d747450ece3002ef4674b',
            speedupFactor: 1,
            wordsPerMin: 157.3201869593,
            textLengthRatio: 0.8648648648648649,
            dubStartTime: 0.08,
            dubEndTime: 1.986939,
            pauseFillingRate: 0,
            createdAt: '2023-12-12T16:26:31.266Z',
            updatedAt: '2023-12-12T16:26:31.266Z',
            id: '657889b7ee2643002eaee12d',
          },
        ],
        dub: [
          {
            voiceMatchingMode: 'source',
            isDubUpdated: false,
            medias: [],
            translation: '655d747450ece3002ef4674b',
            language: 'es_la',
            status: 'COMPLETE',
            createdAt: '2023-12-04T17:54:30.740Z',
            updatedAt: '2023-12-04T18:06:59.958Z',
            id: '656e12569a9ad4002e6f14d2',
          },
          {
            voiceMatchingMode: 'source',
            isDubUpdated: true,
            medias: [],
            translation: '655d747450ece3002ef4674b',
            language: 'es_la_prod',
            status: 'COMPLETE',
            createdAt: '2023-12-12T16:25:35.984Z',
            updatedAt: '2023-12-12T16:26:30.420Z',
            id: '6578897fee2643002eaee01c',
          },
        ],
        id: '655d747450ece3002ef4674b',
      },
      {
        isEdited: false,
        isDraft: false,
        isDubUpdated: false,
        medias: ['6583943683a7e32879998695', '6583943883a7e3287999871a'],
        language: 'en',
        status: 'COMPLETE',
        transcription: '655d739150ece3002ef465ff',
        createdAt: '2023-12-21T01:25:51.727Z',
        updatedAt: '2023-12-21T01:26:17.118Z',
        translationText:
          '\n     Speaker 1 - 0.080000  --> 2.720000\n     This is Ryan, This is brooks testing.\n  ',
        translationSegments: [
          {
            retainAudio: false,
            wordDetails: [],
            speaker: 'Speaker 1',
            startTime: 5.6,
            endTime: 10.34,
            content: 'This is good for testing video and audio.',
            translation: '6583941f19fc65002ec6ab89',
            createdAt: '2023-12-21T01:26:16.149Z',
            updatedAt: '2023-12-21T01:26:16.149Z',
            id: '6583943819fc65002ec6ac5c',
          },
        ],
        dub: [],
        id: '6583941f19fc65002ec6ab89',
      },
    ];

    (useRouter as jest.Mock).mockReturnValue({
      query: { projectId: mockProjectId },
    });

    // Mock the useTranslate and useTranscription hooks
    (useTranslate as jest.Mock).mockReturnValue({
      isTranslated: 'progress',
      targetLang: 'en',
      setIsEdited: jest.fn(),
    });

    const mockRefetchTranscription = jest.fn();
    (useTranscription as jest.Mock).mockReturnValue({
      refetchTranscription: mockRefetchTranscription,
    });

    (useQuery as jest.Mock).mockReturnValueOnce({
      data: mockTranslationsData,
      isLoading: false,
    });

    let result;

    await act(async () => {
      result = renderHook(() => useTranslations());
    });

    const { enabledTranslationsAPI } = result.result.current;

    expect(useQuery).toHaveBeenCalledWith(
      [`getTranslationsBy_${true}progress`, true, 'progress'],
      expect.any(Function),
      expect.any(Object)
    );

    expect(enabledTranslationsAPI).toEqual(false);
    expect(mockRefetchTranscription).toHaveBeenCalled();
  });
});
