import { EVENT_NAMES } from '~/config';

export const trackPage = (pageName?: string, properties?: any) => {
  // @ts-ignore
  window?.analytics?.page(pageName, properties);
};

export const trackFileUploaded = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.FILE_UPLOADED, properties);
};

export const trackTranscribe = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.TRANSCRIBE_MEDIA, properties);
};

export const trackTranscriptionEdit = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.TRANSCRIBE_EDIT, properties);
};

export const trackTranslationEdit = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.TRANSLATE_EDIT, properties);
};

export const trackTranslate = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.TRANSLATE_MEDIA, properties);
};

export const trackRegenerateTranslate = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.REGENERATE_TRANSLATE_MEDIA, properties);
};

export const trackShareProject = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.SHARED_PROJECT, properties);
};

export const trackDub = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.DUB_MEDIA, properties);
};

export const trackRegenerateDub = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.REGENERATE_DUB_MEDIA, properties);
};

type IExport = {
  title?: string
  exportURL?: string
  fileType?: string
  file?: string
}

export const trackExport = (properties: Partial<IExport>) => {
  // @ts-ignore
  window?.analytics?.track(`${EVENT_NAMES.EXPORT_MEDIA} ${properties.title}`, properties);
};

type UserTraits = {
  id?: number;
  email?: string;
  name?: string;
};

export const trackUserIdentify = (traits: UserTraits) => {
  // @ts-ignore
  window?.analytics?.identify(traits.id, {
    email: traits.email,
    name: traits.name,
  });
};

export const trackScreenResolution = (properties: any) => {
  // @ts-ignore
  window?.analytics?.track(EVENT_NAMES.SCREEN_RESOLUTION, properties);
};

export const trackVideoSeekClick = () => {
  window?.analytics?.track(EVENT_NAMES.VIDEO_SEEK, {});
};

export const trackVideoSeekWset = () => {
  window?.analytics?.track(EVENT_NAMES.VIDEO_SEEK_TIME, {});
};

