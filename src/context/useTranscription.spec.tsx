import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, NextRouter } from 'next/router';

import { useSpeakers } from './speakers';
import { useExport } from './export';
import { useTranscription } from './useTranscription';

jest.mock('next/router');
jest.mock('@tanstack/react-query');
jest.mock('./speakers');
jest.mock('./export');
jest.mock('~/api');

type RouterMockReturnValue = { query: { projectId: string } };

const useRouterMock = useRouter as jest.Mock<
  NextRouter,
  [],
  RouterMockReturnValue
>;

describe('useTranscription', () => {
  it('fetches transcription data and updates context and exports', async () => {
    const mockTranscriptionId = '655d747450ece3002ef4674b';
    const mockProjectId = '655d739150ece3002ef465ff';
    const mockTranscriptionData = {
      speakers: ['Speaker 1'],
      ignoredPronunciationWords: [],
      isEdited: true,
      medias: [],
      language: 'en',
      status: 'COMPLETE',
      baseContent: '655d739050ece3002ef465fd',
      customizedVoiceMatchingSpeakers: [],
      createdAt: '2023-11-22T03:20:49.064Z',
      updatedAt: '2023-12-21T01:26:15.630Z',
      transcriptionText: '\n     Speaker 1 - 0.080000  --> 2.720000\n  ',
      transcriptionSegments: [
        {
          retainAudio: false,
          wordDetails: [],
          speaker: 'Speaker 1',
          startTime: 0.08,
          endTime: 2.72,
          content: 'This is Ryan, This is brooks testing.',
          transcription: '655d739150ece3002ef465ff',
          id: '6583943719fc65002ec6ac4a',
        },
      ],
      id: '655d739150ece3002ef465ff',
    };

    useRouterMock.mockReturnValue({
      query: { projectId: mockProjectId },
    });

    (useQuery as jest.Mock).mockReturnValueOnce({
      data: mockTranscriptionData,
      isLoading: false,
      refetch: jest.fn(),
    });

    const mockSetSpeakersCtx = jest.fn();
    const mockSetTextURL = jest.fn();
    const mockSetSrtURL = jest.fn();
    const mockSetTranscriptURL = jest.fn();

    (useSpeakers as jest.Mock).mockReturnValue({
      setSpeakersCtx: mockSetSpeakersCtx,
    });

    (useExport as jest.Mock).mockReturnValue({
      setTextURL: mockSetTextURL,
      setSrtURL: mockSetSrtURL,
      setTranscriptURL: mockSetTranscriptURL,
    });

    let result;

    await act(async () => {
      result = renderHook(() =>
        useTranscription({ transcriptionId: mockTranscriptionId })
      );
    });

    const { transcription, isTranscriptionLoading, refetchTranscription } =
      result.result.current;

    expect(useQuery).toHaveBeenCalledWith(
      [`getTranscriptionBy${mockProjectId}`],
      expect.any(Function),
      expect.any(Object)
    );

    expect(transcription.status).toEqual('COMPLETE');
    expect(isTranscriptionLoading).toEqual(false);
    expect(mockSetSpeakersCtx).toHaveBeenCalledWith(['Speaker 1']);
    expect(mockSetTextURL).toHaveBeenCalledWith(
      '\n     Speaker 1 - 0.080000  --> 2.720000\n  '
    );

    await act(async () => {
      refetchTranscription();
    });
    expect(result.result.current.isTranscriptionLoading).toEqual(false);
  });
});
