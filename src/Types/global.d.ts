export {}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      trackingIdOrEventName: string,
      params?: {
        [key: string]: string | number | boolean | object | undefined
      }
    ) => void
  }
}
