export interface IVoice {
  name: String;
  isDeleted: Boolean;
  voiceType?: String;
  mlVoiceId: String;
  languageVariants: Array<string>;
}
