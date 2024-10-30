import { AxiosInstance } from 'axios';

import { transcriptionUrl } from '~/config';

import { axios } from '../axiosInstance';

import {
  ITranscription,
  IUpdateTranscription,
  ISegmentDelete,
  ISegment,
  IUpdateSegment,
} from './TranscriptionSchema';

class Transcription {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  createTranscription = async (param: ITranscription): Promise<any> =>
    this.requestInstance.post(transcriptionUrl.CREATE_TRANSCRIPTION, param);

  updateTranscription = async (
    transcriptionId: string,
    param: IUpdateTranscription
  ): Promise<any> =>
    this.requestInstance.patch(
      transcriptionUrl.UPDATE_TRANSCRIPTION(transcriptionId),
      param
    );

  bulkUpdateTranscriptionSegments = async (
    transcriptionId: string,
    segmentId: string,
    param: any
  ): Promise<any> =>
    this.requestInstance.patch(
      transcriptionUrl.BULK_UPDATE_TRANSCRIPTION_SEGMENTS(
        transcriptionId,
        segmentId
      ),
      param
    );

  getTranscriptionById = async (transcriptionId: string): Promise<any> =>
    this.requestInstance.get(
      transcriptionUrl.GET_TRANSCRIPTION(transcriptionId)
    );

  createTranscriptionSegment = async (
    transcriptionId: string,
    param: ISegment[]
  ): Promise<any> =>
    this.requestInstance.post(
      transcriptionUrl.CREATE_TRANSCRIPTION_SEGMENT(transcriptionId),
      param
    );

  updateTranscriptionSegment = async (
    transcriptionId: string,
    param: IUpdateSegment[]
  ): Promise<any> =>
    this.requestInstance.patch(
      transcriptionUrl.UPDATE_TRANSCRIPTION_SEGMENT(transcriptionId),
      param
    );

  deleteTranscriptionSegment = async (
    transcriptionId: string,
    param: ISegmentDelete[]
  ): Promise<any> =>
    this.requestInstance.delete(
      transcriptionUrl.DELETE_TRANSCRIPTION_SEGMENT(transcriptionId),
      {
        data: param,
      }
    );

  editTranscriptionSegment = async (
    transcriptionId: string,
    param: ISegment[]
  ): Promise<any> =>
    this.requestInstance.post(
      transcriptionUrl.EDIT_TRANSCRIPTION_SEGMENT(transcriptionId),
      param
    );

  updateAllTranscriptSegments = async (
    transcriptionId: string,
    param: ISegment[]
  ): Promise<any> =>
    this.requestInstance.post(
      transcriptionUrl.UPDATE_ALL_TRANSCRIPTION_SEGMENTS(transcriptionId),
      param
    );

  processTranscriptSRT = async (transcriptionId: string): Promise<any> =>
    this.requestInstance.post(
      transcriptionUrl.PROCESS_TRANSCRIPTION_SRT(transcriptionId)
    );

  uploadTranscriptSegments = async (
    transcriptionId: string,
    file: File // Change the type of the param to File
  ): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the form data

    // Use the form data as the body of the POST request
    return this.requestInstance.post(
      transcriptionUrl.UPLOAD_TRANSCRIPTION_SEGMENTS(transcriptionId),
      formData,
      {
        headers: {
          // Inform the server about the multipart form data
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };

  processTranscriptSegments = async (transcriptionId: string): Promise<any> =>
    this.requestInstance.post(
      transcriptionUrl.PROCESS_TRANSCRIPTION_SEGMENTS(transcriptionId)
    );

  updateCustomSpeakers = async (
    transcriptionId: string,
    param: any
  ): Promise<any> =>
    this.requestInstance.patch(
      transcriptionUrl.UPDATE_CUSTOM_SPEAKERS(transcriptionId),
      param
    );
}

export const TranscriptionApi = new Transcription(axios);
