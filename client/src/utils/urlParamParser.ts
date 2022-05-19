import { URL } from 'react-native-url-polyfill'

export const urlParamParser = (url: string, param: string): string | null => {
  const tokenURl = new URL(url)
  return tokenURl.searchParams.get(param)
}
