export interface InitializeUploadSchema {
  fileId: string;
  fileKey: string;
  fileUuid: string;
}

export interface IUpload {
  name: string;
}

export interface IPreSignedUrls {
  fileKey: string;
  fileId: string;
  parts: number;
}

export interface IPart {
  signedUrl: string;
  PartNumber: number;
}

export interface PartsSchema {
  parts: IPart[];
}

export interface IFinalizeUpload {
  fileKey: string;
  fileId: string;
  parts: IPart[];
}
