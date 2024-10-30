export interface ITextToSpeech {
  name: String;
  isDeleted: Boolean;
  voiceType?: String;
  mlVoiceId: String;
  languageVariants: Array<string>;
}
