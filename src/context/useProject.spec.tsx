import { renderHook } from '@testing-library/react';
import { useQuery, useMutation, UseQueryResult } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useLocalStorage } from '~/utils/hooks';

import { useProject } from './useProject';
import { useAuth } from './auth';
import { useTranslate } from './translate';

jest.mock('@tanstack/react-query');
jest.mock('~/api');
jest.mock('~/utils/hooks');
jest.mock('./auth');
jest.mock('./translate');

const mockProjectData = {
  translations: [
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
        '\n     Speaker 1 - 0.080000  --> 2.720000\n     Aquí Ryan, aquí Brooks probando.\n ',
      id: '655d747450ece3002ef4674b',
    },
  ],
  isDeleted: false,
  lastAccessed: [],
  kind: 'Project',
  name: 'MARCO WINS ANOTHER $3 MILLION PARLAY. His Special Holiday $100K Giveaway. Week 16 Picks & Best Bets-111.mov',
  owner: {
    pronunciationWords: [],
    role: 'user',
    collaborations: [],
    cognitoUserId: '7c4e8e32-e216-424b-b94b-733ccbf1557c',
    email: 'brooks@speechlab.ai',
    firstName: 'Brooks',
    lastName: 'Chen',
    createdAt: '2023-02-27T18:30:17.404Z',
    updatedAt: '2023-05-05T02:02:23.255Z',
    id: '63fcf6b9c2d480002de5c55a',
  },
  content: {},
  transcription: {
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
    transcriptionText:
      '\n  Speaker 1 - 0.080000  --> 2.720000\n     This is test, This is brooks testing.\n ',
    id: '655d739150ece3002ef465ff',
  },
  projectType: 'account',
  createdAt: '2023-11-22T03:20:49.133Z',
  updatedAt: '2024-01-08T01:42:37.713Z',
  collaboration: null,
  translationVariants: [],
  transcriptionVariants: [],
  id: '655d739150ece3002ef46601',
};

const mockCollaborations = [
  {
    status: 'ACCEPTED',
    project: '6578819fee2643002eaedb9a',
    inviter: '631a3344e4bfe1002e2ec54e',
    inviteeEmail: 'brooks@speechlab.ai',
    role: {
      permissions: ['edit'],
      name: 'viewer',
      createdAt: '2022-12-02T07:29:07.524Z',
      updatedAt: '2022-12-02T07:29:07.524Z',
      id: '6389a943282e38254c2f8080',
    },
    sharingToken:
      '406d6515f54cb93c87242ed433445634f739ebc55050a717841e283c7c6e159797448e110050e060bace6bdc8123fcb47b14a12f8dbfb1df09ef2e5947ef6488',
    createdAt: '2023-12-12T16:26:56.501Z',
    updatedAt: '2023-12-26T02:36:16.594Z',
    id: '657889d0ee2643002eaee179',
  },
  {
    status: 'ACCEPTED',
    project: '6578819fee2643002eaedb9a',
    inviter: '631a3344e4bfe1002e2ec54e',
    inviteeEmail: 'ryan@speechlab.ai',
    role: {
      permissions: ['edit'],
      name: 'viewer',
      createdAt: '2022-12-02T07:29:07.524Z',
      updatedAt: '2022-12-02T07:29:07.524Z',
      id: '6389a943282e38254c2f8080',
    },
    sharingToken:
      '406d6515f54cb93c87242ed433445634f739ebc55050a717841e283c7c6e159797448e110050e060bace6bdc8123fcb47b14a12f8dbfb1df09ef2e5947ef6488',
    createdAt: '2023-12-13T17:54:40.524Z',
    updatedAt: '2023-12-13T17:54:40.931Z',
    id: '6579efe0ee2643002eaf3be8',
  },
];

const useQueryMock = useQuery as jest.Mock<
  UseQueryResult<typeof mockProjectData>
>;

describe('useProject', () => {
  it('fetches project data and collaborations', async () => {
    useQueryMock.mockReturnValueOnce({
      data: mockProjectData,
      refetch: jest.fn(),
      isLoading: false,
    });

    (useMutation as jest.Mock).mockReturnValueOnce({
      mutate: jest.fn(),
    });

    (useMutation as jest.Mock).mockReturnValueOnce({
      data: mockCollaborations,
      onSuccess: jest.fn(),
      onError: jest.fn(),
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { projectId: 'mockedProjectId' },
    });

    (useAuth as jest.Mock).mockReturnValue({
      currentUser: { id: 'mockedUserId', email: 'mockedUserEmail' },
    });

    (useTranslate as jest.Mock).mockReturnValue({
      targetLang: 'en',
      isTranslated: 'progress',
      setIsTranslated: jest.fn(),
      setTargetLang: jest.fn(),
      setTargetAccent: jest.fn(),
      setTargetVoice: jest.fn(),
    });

    (useLocalStorage as jest.Mock).mockReturnValue([[], jest.fn()]);

    const { result, waitForNextUpdate } = renderHook(() => useProject());

    // Wait for the hook to finish its initial data fetching
    await waitForNextUpdate();

    const { project, isReadOnly, isProjectLoading, isOwner } = result.current;

    expect(useQuery).toHaveBeenCalledWith(
      ['getProjectBymockedProjectId'],
      expect.any(Function),
      expect.any(Object)
    );
    expect(useMutation).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Object)
    );
    expect(useMutation).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Object)
    );
    expect(project.projectName).toBeTruthy();
    expect(isReadOnly).toEqual(false);
    expect(isProjectLoading).toEqual(false);
    expect(isOwner).toEqual(true);
  });
});
