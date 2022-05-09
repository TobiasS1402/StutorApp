import { URL } from 'react-native-url-polyfill'

/**
 * Parse a given url and returns a token from the url to the login page
 * @param url
 * @param param
 */
export const urlParamParser = (url: string, param: string): string | null => {
  const tokenURl = new URL(url)
  return tokenURl.searchParams.get(param)
}
