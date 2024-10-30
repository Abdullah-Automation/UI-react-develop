import { IContents, IMediaPresigned } from '~/api';

export const baseUrl = process.env.API_URL!;

export const authUrl = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REGISTER_CONFIRMATION: '/auth/register/confirmation',
  REGISTER_RESEND_CODE: '/auth/register/resend-confirmation-code',
  LOGOUT: '/auth/logout',
  REFRESH_TOKENS: '/auth/refresh-tokens',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  SEND_VERIFICATION_EMAIL: '/auth/send-verification-email',
  VERIFY_EMAIL: '/auth/verify-email',
};

export const conversationsUrl = {
  CREATE_CONVERSATION: '/conversations',
  GET_CONVERSATIONS: '/conversations',
  GET_USER_CONVERSATIONS: (userId: string): any =>
    `/conversations/${userId}/conversations`,
  GET_CONVERSATION: (conversationId: string): any =>
    `/conversations/${conversationId}`,
};

export const transcriptionUrl = {
  CREATE_TRANSCRIPTION: `/transcriptions`,
  UPDATE_TRANSCRIPTION: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}`,
  BULK_UPDATE_TRANSCRIPTION_SEGMENTS: (
    transcriptionId: string,
    segmentId: string
  ): any => `/transcriptions/${transcriptionId}/segments/${segmentId}`,
  GET_TRANSCRIPTION: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}`,
  GET_CONVERSATION_TRANSCRIPTIONS: (conversationId: string): any =>
    `/transcriptions/conversation/${conversationId}`,
  CREATE_TRANSCRIPTION_SEGMENT: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}/segments/`,
  UPDATE_TRANSCRIPTION_SEGMENT: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}/segments/`,
  DELETE_TRANSCRIPTION_SEGMENT: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}/segments/`,
  EDIT_TRANSCRIPTION_SEGMENT: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}/editSegments/`,
  UPDATE_ALL_TRANSCRIPTION_SEGMENTS: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}/deleteAndRebuildSegments/`,
  UPLOAD_TRANSCRIPTION_SEGMENTS: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}/uploadSegments/`,
  PROCESS_TRANSCRIPTION_SRT: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}/processSRT/`,
  PROCESS_TRANSCRIPTION_SEGMENTS: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}/processSegments/`,
  UPDATE_CUSTOM_SPEAKERS: (transcriptionId: string): any =>
    `/transcriptions/${transcriptionId}`,
};

export const uploadsUrl = {
  INITIALIZE_MULTIPART_UPLOAD: '/uploads/initialize-multipart-upload',
  GET_MULTIPART_PRESIGNED_URLS: '/uploads/get-multipart-preSigned-urls',
  FINALIZE_MULTIPART_UPLOAD: '/uploads/finalize-multipart-upload',
};

export const usersUrl = {
  CREATE_USER: '/users',
  GETALLUSERS: '/users',
  GETUSER: (userId: string): any => `/users/${userId}`,
  UPDATEUSER: (userId: string): any => `/users/${userId}`,
  DELETEUSER: (userId: string): any => `/users/${userId}`,
  GETUSER_CREDITBALANCE: (userId: string): any => `/users/${userId}/balance`,
};

export const contentUrl = {
  CREATE_CONTENT: '/contents',
  UPDATE_CONTENT: (contentId: string): any => `/contents/${contentId}`,
  GET_CONTENTS: (param: IContents): any =>
    `/contents?owner=${param.owner}&sortBy=${param.sortBy}&limit=${param.limit}&page=${param.page}`,
  GET_CONTENT_BY_ID: (contentId: string): any => `/contents/${contentId}`,
};

export const mediaUrl = {
  GET_CONTENTS: (param: IMediaPresigned): string => {
    let url = `/medias/getMediaPresignedURL?projectId=${param.projectId}`;

    if (param.mediaId) {
      url += `&mediaId=${param.mediaId}`;
    }

    if (param.uri) {
      url += `&uri=${encodeURIComponent(param.uri)}`;
    }

    return url;
  },
};

export const projectsUrl = {
  CREATE_PROJECT: '/projects',
  GET_PROJECTS: '/projects?sortBy=-updatedAt',
  CREATE_PROJECT_AND_TRANSCRIBE: '/projects/createProjectAndTranscribe',
  GET_PROJECT: (projectId: string): string => `/projects/${projectId}`,
  UPDATE_PROJECT: (projectId: string): string => `/projects/${projectId}`,
  DELETE_PROJECT: (projectId: string): string => `/projects/${projectId}`,
};

export const teamsUrl = {
  CREATE_TEAM: '/teams',
  GET_TEAMS: '/teams',
  GET_TEAM: (teamId: string): any => `/teams/${teamId}`,
  UPDATE_TEAM: (teamId: string): any => `/teams/${teamId}`,
  DELETE_TEAM: (teamId: string): any => `/teams/${teamId}`,
};

export const translationUrl = {
  CREATE_TRANSLATION: `/translations`,
  UPDATE_TRANSLATION: (translationId: string): any =>
    `/translations/${translationId}`,
  GET_TRANSLATION: (translationId: string): any =>
    `/translations/${translationId}`,
  BULK_UPDATE_TRANSlATION_SEGMENTS: (translationId: string): any =>
    `/translations/${translationId}/segments`,
  REGENERATE_TRANSlATION: (): any => `translations/regenerateTranslation`,
  TRANSLATE_CONTENT: (): any => `translations/translateContent`,
  GET_TRANSLATIONS: (projectId: string): any =>
    `/translations?project=${projectId}`,
  PROCESS_TRANSLATION_SRT: (translationId: string): any =>
    `/translations/${translationId}/processSRT/`,
  PROCESS_TRANSLATION_SEGMENTS: (translationId: string): any =>
    `/translations/${translationId}/processSegments/`,
  UPLOAD_TRANSlATION_SEGMENTS: (translationId: string): any =>
    `/translations/${translationId}/uploadSegments/`,
  EDIT_TRANSLATION_SEGMENT: (translationId: string): any =>
    `/translations/${translationId}/editSegments/`,
};

export const dubUrl = {
  CREATE_DUB: `/dubs`,
  UPDATE_DUB: (dubId: string): any => `/dubs/${dubId}`,
  GET_DUB: (dubId: string): any => `/dubs/${dubId}`,
  REGENERATE_DUB: (): any => `dubs/regenerateDub`,
  GET_DUBS: `/dubs`,
};

export const transactionsUrl = {
  CREATE_USER_TRANSACTIONS: `/userTransactions`,
  GET_TRANSACTION: (transactionId: string): any =>
    `/userTransactions/${transactionId}`,
  GET_USER_TRANSACTIONS: (userId: string): any =>
    `/userTransactions?user=${userId}`,
};

export const collaborationsUrl = {
  CREATE_USER_COLLABORATIONS: `/collaborations`,
  GET_COLLABORATION_ROLES: `/collaborations/roles`,
  UPDATE_COLLABORATION: (collaborationId: string): any =>
    `/collaborations/${collaborationId}`,
  GENERATE_SHARING_LINK: `/collaborations/generateSharingLink`,
  DELETE_SHARED_PROJECT: `/collaborations/deleteSharedProject`,
  GET_COLLABORATIONS: `/collaborations`,
};

export const voicesUrl = {
  CREATE_VOICE: '/voices?sortBy=-updatedAt',
  GET_VOICE: (voiceId: string): any => `/voices/${voiceId}`,
};

export const voiceoverProjectsUrl = {
  CREATE_VOICEOVER_PROJECT: '/voiceovers?sortBy=-updatedAt',
  GET_VOICEOVER_PROJECT: (voiceoverProjectId: string): any =>
    `/voiceovers/${voiceoverProjectId}`,
  CREATE_VOICEOVER_WITH_TEXTTOSPEECH:
    '/voiceovers/createVoiceOverWithTextToSpeech',
};

export const textToSpeechUrl = {
  CREATE_TEXT_TO_SPEECH: '/texttospeeches?sortBy=-updatedAt',
  GET_TEXT_TO_SPEECH: (textToSpeechesId: string): any =>
    `/texttospeeches/${textToSpeechesId}`,
  DELETE_RECREATE_TEXT_TO_SPEECH: (textToSpeechesId: string): any =>
    `/texttospeeches/${textToSpeechesId}/deleteAndRebuildSegments`,
  GENERATE_TEXT_TO_SPEECH: (texttospeecheId: string, id: string) =>
    `/texttospeeches/${texttospeecheId}/generate/${id}`,
};
