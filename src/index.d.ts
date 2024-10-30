export {};

declare global {
  interface Window {
    analytics: {
      track: (event: string, properties: unknown) => void
    };
  }
}