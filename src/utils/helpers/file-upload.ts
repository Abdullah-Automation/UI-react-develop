import { UploadsApi, IPart } from '~/api';
import {
  LIMIST_SIZE_OF_UPLOAD_FILE,
  LIMIT_DURATION_OF_UPLOAD_FILE,
} from '~/config';

export class FileUploader {
  chunkSize: number;
  threadsQuantity: number;
  file: any;
  fileName: string;
  fileToReturn: string;
  aborted: boolean;
  uploadedSize: number;
  progressCache: any;
  activeConnections: any;
  parts: IPart[];
  uploadedParts: any[];
  fileId: string;
  fileKey: string;
  fileUuid: string;
  duration: 0;
  thumbnail: '';
  onProgressFn: (param: any) => void;
  onErrorFn: (e: any) => void;

  constructor(options: {
    chunkSize?: number;
    threadsQuantity?: any;
    file: any;
    fileName: any;
  }) {
    // this must be bigger than or equal to 5MB,
    // otherwise AWS will respond with:
    // "Your proposed upload is smaller than the minimum allowed size"
    this.chunkSize = options.chunkSize || 1024 * 1024 * 5;
    // number of parallel uploads
    this.threadsQuantity = Math.min(options.threadsQuantity || 5, 15);
    this.file = options.file;
    this.fileName = options.fileName;
    this.aborted = false;
    this.uploadedSize = 0;
    this.progressCache = {};
    this.activeConnections = {};
    this.parts = [];
    this.uploadedParts = [];
    this.fileId = '';
    this.fileKey = '';
    this.fileUuid = '';
    this.duration = 0;
    this.thumbnail = '';
    this.onProgressFn = () => {};
    this.onErrorFn = (error: any) => {
      console.error(error);
    };
  }

  start() {
    this.initialize();
  }

  async initialize() {
    try {
      // adding the the file extension (if present) to fileName
      let { fileName } = this;
      const fullFileName = this.fileName;
      const ext = this.file.name.split('.').pop();
      if (ext) {
        fileName += `.${ext}`;
      }

      // initializing the multipart request
      const videoInitializationUploadInput = {
        name: fileName,
      };
      const initializeReponse = await UploadsApi.initializeMultiPartUpload(
        videoInitializationUploadInput
      );

      const AWSFileDataOutput = initializeReponse;

      this.fileId = AWSFileDataOutput.fileId;
      this.fileKey = AWSFileDataOutput.fileKey;
      this.fileUuid = AWSFileDataOutput.fileUuid;
      this.fileToReturn = fullFileName;

      // retrieving the pre-signed URLs
      const numberOfparts = Math.ceil(this.file.size / this.chunkSize);

      const AWSMultipartFileDataInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: numberOfparts,
      };

      const urlsResponse = await UploadsApi.getMultipartPreSignedUrls(
        AWSMultipartFileDataInput
      );

      const newParts = urlsResponse.parts;
      this.parts.push(...newParts);

      this.sendNext();
    } catch (error) {
      await this.complete(error);
    }
  }

  sendNext() {
    const activeConnections = Object.keys(this.activeConnections).length;

    if (activeConnections >= this.threadsQuantity) {
      return;
    }

    if (!this.parts.length) {
      if (!activeConnections) {
        this.complete(undefined);
      }

      return;
    }

    const part = this.parts.pop();
    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);

      const sendChunkStarted = () => {
        this.sendNext();
      };

      this.sendChunk(chunk, part, sendChunkStarted)
        .then(() => {
          this.sendNext();
        })
        .catch(error => {
          this.parts.push(part);

          this.complete(error);
        });
    }
  }

  async complete(error: any | undefined) {
    if (error && !this.aborted) {
      this.onErrorFn(error);
      return;
    }

    if (error) {
      this.onErrorFn(error);
      return;
    }

    try {
      await this.sendCompleteRequest();
    } catch (error) {
      this.onErrorFn(error);
    }
  }

  async sendCompleteRequest() {
    if (this.fileId && this.fileKey) {
      const videoFinalizationMultiPartInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: this.uploadedParts,
      };

      const res = await UploadsApi.finalizeMultipartUpload(
        videoFinalizationMultiPartInput
      );

      this.duration = res.duration;
      this.thumbnail = res.thumbnail;
      this.onProgressFn({
        fileId: this.fileId,
        fileKey: this.fileKey,
        fileUuid: this.fileUuid,
        duration: this.duration,
        thumbnail: this.thumbnail,
      });
    }
  }

  sendChunk(chunk: any, part: IPart, sendChunkStarted: () => void) {
    return new Promise<void>((resolve, reject) => {
      this.upload(chunk, part, sendChunkStarted)
        .then(status => {
          if (status !== 200) {
            reject(new Error('Failed chunk upload'));
            return;
          }

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  handleProgress(part: string | number, event: { type: string; loaded: any }) {
    if (this.file) {
      if (
        event.type === 'progress' ||
        event.type === 'error' ||
        event.type === 'abort'
      ) {
        this.progressCache[part] = event.loaded;
      }

      if (event.type === 'uploaded') {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      const inProgress = Object.keys(this.progressCache)
        .map(Number)
        .reduce((memo, id) => (memo += this.progressCache[id]), 0);

      const sent = Math.min(this.uploadedSize + inProgress, this.file.size);

      const total = this.file.size;

      const percentage = Math.round((sent / total) * 100);

      this.onProgressFn({
        sent,
        total,
        percentage,
        fileId: this.fileId,
        fileKey: this.fileKey,
        fileUuid: this.fileUuid,
        duration: this.duration,
        thumbnail: this.thumbnail,
      });
    }
  }

  upload(
    file: Document | XMLHttpRequestBodyInit | null | undefined,
    part: { PartNumber: number; signedUrl: string | URL },
    sendChunkStarted: () => void
  ) {
    // uploading each part with its pre-signed URL
    return new Promise((resolve, reject) => {
      if (this.fileId && this.fileKey) {
        const xhr = new XMLHttpRequest();
        this.activeConnections[part.PartNumber - 1] = xhr;

        sendChunkStarted();

        const progressListener = this.handleProgress.bind(
          this,
          part.PartNumber - 1
        );

        xhr.upload.addEventListener('progress', progressListener);

        xhr.addEventListener('error', progressListener);
        xhr.addEventListener('abort', progressListener);
        xhr.addEventListener('loadend', progressListener);

        xhr.open('PUT', part.signedUrl);

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const ETag = xhr.getResponseHeader('ETag');

            if (ETag) {
              const uploadedPart = {
                PartNumber: part.PartNumber,
                ETag: ETag.replaceAll('"', ''),
              };

              this.uploadedParts.push(uploadedPart);

              resolve(xhr.status);
              delete this.activeConnections[part.PartNumber - 1];
            }
          }
        };

        xhr.onerror = error => {
          reject(error);
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.onabort = () => {
          reject(new Error('Upload canceled by user'));
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.send(file);
      }
    });
  }

  onProgress(onProgress: any) {
    this.onProgressFn = onProgress;
    return this;
  }

  onError(onError: (e: any) => void) {
    this.onErrorFn = onError;
    return this;
  }

  abort() {
    Object.keys(this.activeConnections)
      .map(Number)
      .forEach(id => {
        this.activeConnections[id].abort();
      });

    this.aborted = true;
  }
}

export const validateFileSize = (files: File[]) => {
  let isValidated = true;
  files.forEach(file => {
    const fileSizeInGB = file.size / 1024 / 1024 / 1024; // Convert size to GB

    if (fileSizeInGB > LIMIST_SIZE_OF_UPLOAD_FILE) {
      isValidated = false;
    }
  });

  return isValidated;
};

export const validateFileDuration = async (files: File[]) => {
  const durationPromises = files.map(async file => {
    const duration: any = await getMediaDuration(file);

    return duration < LIMIT_DURATION_OF_UPLOAD_FILE;
  });

  const durations = await Promise.all(durationPromises);

  return durations.every(isValid => isValid);
};

export const getMediaDuration = async (file: File) => {
  return new Promise(resolve => {
    const objectURL = URL.createObjectURL(file);

    // Create a hidden audio element to get the duration
    const audio = new Audio();
    audio.src = objectURL;
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);

      // Cleanup after getting the duration
      URL.revokeObjectURL(objectURL);
    });

    // Load the audio to trigger the 'loadedmetadata' event
    audio.load();
  });
};
