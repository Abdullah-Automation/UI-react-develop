import {
  ORIGIN_VOICES,
  LanguagesLabel,
  LanguageVariants,
  LANGUAGE_NOT_SPEED_UP,
} from '~/config';

export const getVoiceLabel = (code: string) => {
  return (
    [
      ...ORIGIN_VOICES,
      { id: 2, code: 'customized', label: 'Multiple voices' },
    ].filter(voice => voice.code === code)[0]?.label || '-'
  );
};

export function getLanguageLabel(key: string) {
  const lowercaseKey = key.toUpperCase();
  //   @ts-ignore
  return LanguagesLabel[lowercaseKey] || key;
}

export const getLanguageInfo = (code: string) => {
  return (
    LanguageVariants.filter(variant => variant.code === code)[0] || {
      lang: '-',
      dialect: '-',
    }
  );
};

export const sortLanguage = (list: any[], field: string) => {
  // Sort the array based on the 'label' property
  return list.sort((a, b) => {
    // Convert labels to lowercase for case-insensitive sorting
    const labelA = a[field].toLowerCase();
    const labelB = b[field].toLowerCase();

    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    // Labels are equal, compare by 'code' property
    return a.code.localeCompare(b.code);
  });
};

export const getPercentageBetweenGaps = (
  transcriptionLength: number,
  translationLength: number
) => {
  if (translationLength === 0 || transcriptionLength === 0) {
    return 0;
  }

  if (translationLength > transcriptionLength) {
    const percentage =
      ((translationLength - transcriptionLength) / transcriptionLength) * 100;

    return percentage;
  }

  if (translationLength < transcriptionLength) {
    return (
      ((transcriptionLength - translationLength) / transcriptionLength) * 100
    );
  }

  return 0;
};

export const isValideSpeedUpLanguage = (language: string) => {
  return !LANGUAGE_NOT_SPEED_UP.includes(language);
};

export const getDynamicLanguageLabel = (languages: any[], code: string) => {
  return languages.filter(language => language.code === code)[0]?.label || '';
};
