import { IExport } from '~/components/domain';

export const USER_TOKEN = 'USER_TOKEN';
export const USER_AUTH = 'USER_AUTH';
export const PROJECT_ACCESSED_LANGUAGE = 'PROJECT_ACCESSED_LANGUAGE';
export const ITEMS_PER_PAGE = 100;
export const MIN_SPEED_UP_PERCENTAGE = 20;
export const LIMIT_SPEED_UP_TRANSCRIPTION_COUNT = 150;
export const LIMIST_SIZE_OF_UPLOAD_FILE = 1.5;
export const LIMIT_DURATION_OF_UPLOAD_FILE = 7200; // File Duration limit is 2 hours

export const ALLOWED_VIDEO_FILE_TYPES = [
  '.aac',
  '.amr',
  '.flac',
  '.m4a',
  '.mp4',
  '.mpeg',
  '.mkv',
  '.aif',
  '.aiff',
  '.mov',
  '.avi',
  '.mpg',
  '.ogg',
  '.ogv',
  '.webm',
];

export const ALLOWED_AUDIO_FILE_TYPES = ['.mp3', '.wmv', '.wav', '.wma'];

export enum Status {
  Complete = 'COMPLETE',
  Submitted = 'SUBMITTED',
  Processing = 'PROCESSING',
  MLComplete = 'MLCOMPLETE',
  Error = 'ERROR',
}

export const STATUS_VALUES = [
  Status.Submitted,
  Status.Processing,
  Status.MLComplete,
];

export const LanguagesLabel = {
  EN: 'English',
  ES_LA: 'Spanish - Latin (ES-LA)',
  ES_ES: 'Spanish (ES)',
  ES: 'Spanish (ES)',
  PT_BR: 'Portuguese - Brazilian (PT-BR)',
  PT_PT: 'Portuguese - European (PT-PT)',
  JA: 'Japanese',
  AR: 'Arabic',
  KO: 'Korean',
  ZH: 'Chinese',
  FR: 'French',
  IT: 'Italian',
  DE: 'German',
  NL: 'Dutch',
};

export const LanguageVariants = [
  { code: 'es_la', lang: 'Spanish', dialect: 'Latin', letterWidth: 380 / 50 },
  {
    code: 'es_la_prod',
    lang: 'Spanish',
    dialect: 'Latin - Prod',
    letterWidth: 380 / 50,
  },
  {
    code: 'es_la_dev',
    lang: 'Spanish',
    dialect: 'Latin - Dev-X',
    letterWidth: 380 / 50,
  },
  {
    code: 'es_la_ipa',
    lang: 'Spanish',
    dialect: 'IPA Spanish',
    letterWidth: 380 / 50,
  },
  {
    code: 'es_lax',
    lang: 'Spanish',
    dialect: 'Latin Dev-X1',
    letterWidth: 380 / 50,
  },
  { code: 'es_es', lang: 'Spanish', dialect: 'Spanish', letterWidth: 380 / 50 },
  {
    code: 'pt_pt',
    lang: 'Portuguese',
    dialect: 'Europoean',
    letterWidth: 380 / 50,
  },
  {
    code: 'pt_br',
    lang: 'Portuguese',
    dialect: 'Brazilian',
    letterWidth: 380 / 50,
  },
  {
    code: 'pt_dev',
    lang: 'Portuguese',
    dialect: 'Dev-X',
    letterWidth: 380 / 50,
  },
  {
    code: 'en',
    lang: 'English',
    dialect: 'English',
    letterWidth: 380 / 55,
  },
  { code: 'en_prod', lang: 'English', dialect: 'Prod', letterWidth: 380 / 55 },
  { code: 'en_dev', lang: 'English', dialect: 'Dev-X', letterWidth: 380 / 55 },
  {
    code: 'en_usx',
    lang: 'English',
    dialect: 'US Dev-X1',
    letterWidth: 380 / 55,
  },
  {
    code: 'en_us_ipa',
    lang: 'English',
    dialect: 'IPA English',
    letterWidth: 380 / 55,
  },
  { code: 'zh', lang: 'Chinese', dialect: 'Chinese', letterWidth: 380 / 25 },
  { code: 'ar', lang: 'Arabic', dialect: 'Arabic', letterWidth: 380 / 50 },
  { code: 'ko', lang: 'Korean', dialect: 'Korean', letterWidth: 380 / 36 },
  { code: 'ja', lang: 'Japanese', dialect: 'Japanese', letterWidth: 380 / 30 },
  { code: 'de', lang: 'German', dialect: 'German', letterWidth: 380 / 50 },
  { code: 'it', lang: 'Italian', dialect: 'Italian', letterWidth: 380 / 50 },
  { code: 'fr', lang: 'French', dialect: 'French', letterWidth: 380 / 50 },
  { code: 'nl', lang: 'Dutch', dialect: 'Dutch', letterWidth: 380 / 50 },
  {
    code: 'zh_dev',
    lang: 'Chinese',
    dialect: 'Chinese Dev-X',
    letterWidth: 380 / 25,
  },
  {
    code: 'ar_dev',
    lang: 'Arabic',
    dialect: 'Arabic Dev-X',
    letterWidth: 380 / 50,
  },
  {
    code: 'ko_dev',
    lang: 'Korean',
    dialect: 'Korean Dev-X',
    letterWidth: 380 / 36,
  },
  {
    code: 'ja_dev',
    lang: 'Japanese',
    dialect: 'Japanese Dev-X',
    letterWidth: 380 / 30,
  },
  {
    code: 'de_dev',
    lang: 'German',
    dialect: 'German Dev-X',
    letterWidth: 380 / 50,
  },
  {
    code: 'it_dev',
    lang: 'Italian',
    dialect: 'Italian Dev-X',
    letterWidth: 380 / 50,
  },
  {
    code: 'fr_dev',
    lang: 'French',
    dialect: 'French Dev-X',
    letterWidth: 380 / 50,
  },
  {
    code: 'nl_dev',
    lang: 'Dutch',
    dialect: 'Dutch Dev-X',
    letterWidth: 380 / 50,
  },
  {
    code: 'hi',
    lang: 'Hindi',
    dialect: 'Hindi',
    letterWidth: 380 / 50,
  },
  {
    code: 'hi_dev',
    lang: 'Hindi',
    dialect: 'Hindi - Dev-X',
    letterWidth: 380 / 50,
  },
];

export const LANGUAGE_ACCENTS = [
  'pt_pt',
  'pt_br',
  'en',
  'en_prod',
  'en_dev',
  'en_us_ips',
  'en_usx',
  'es_lax',
  'ar',
  'ar_dev',
  'ko',
  'ko_dev',
  'ja',
  'ja_dev',
  'zh',
  'zh_dev',
  'de',
  'it',
  'de_dev',
  'it_dev',
  'es_la',
  'es_es',
  'es_la_prod',
  'es_la_ipa',
  'es_la_dev',
  'fr',
  'nl',
  'fr_dev',
  'nl_dev',
  'hi',
  'hi_dev',
];

export const SPANISH_ACCENTS = [
  'es_la',
  'es_es',
  'es_la_prod',
  'es_la_dev',
  'es_la_ipa',
  'es_lax',
];

export const LANGUAGE_NOT_SPEED_UP = ['ja'];

export const DEFAULT_VOICE_OVER_TEXT =
  "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do. Once or twice she had peeped into the book her sister was reading. But it had no pictures or conversations in it. 'What is the use of a book,' thought Alice 'without pictures or conversation?'";

export const ORIGIN_VOICES = [
  { id: 0, code: 'source', label: 'Original speaker' },
  { id: 1, code: 'native', label: 'Native speaker' },
];

export const VOICES = [
  { id: 0, code: 'source', label: 'Original speaker' },
  { id: 1, code: 'native', label: 'Native speaker' },
  {
    id: 2,
    code: 'customized',
    label: 'Customize',
    hasDivider: true,
    icon: true,
  },
];

export const SPANISH_EXPORT_OPTIONS: IExport[] = [
  { title: 'Video', desc: 'MP4', icon: 'VideoIcon', exportURL: '' },
  {
    title: 'Video, Speaker Only Audio',
    desc: 'MP4',
    icon: 'VideoIcon',
    exportURL: '',
  },
  { title: 'Audio', desc: '.mp3', icon: 'AudioIcon', exportURL: '' },
  {
    title: 'Speaker Only Audio',
    desc: '.mp3',
    icon: 'AudioIcon',
    exportURL: '',
  },
  { title: 'Text', desc: '.txt', icon: 'TextIcon', exportURL: '' },
  { title: 'Subtitles', desc: '.srt', icon: 'CaptionIcon', exportURL: '' },
  { title: 'Translation Json', desc: '.json', icon: 'TextIcon', exportURL: '' },
  {
    title: 'Segment Timings Json',
    desc: '.json',
    icon: 'TextIcon',
    exportURL: '',
  },
];

export const ENGLISH_EXPORT_OPTIONS: IExport[] = [
  { title: 'Text', desc: '.txt', icon: 'TextIcon', exportURL: '' },
  { title: 'Captions', desc: '.srt', icon: 'CaptionIcon', exportURL: '' },
  { title: 'Transcript Json', desc: '.json', icon: 'TextIcon', exportURL: '' },
];
