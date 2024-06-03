import normalize from 'normalize-url'

export const normalizeURL = (url: string) =>
  normalize(url, {
    removeQueryParameters: true,
    stripHash: true,
    stripWWW: true,
  })
