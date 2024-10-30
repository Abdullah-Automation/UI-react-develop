import createCache from '@emotion/cache';

export const createEmotionCache = (): ReturnType<typeof createCache> => {
  return createCache({ key: 'css', prepend: true });
};
