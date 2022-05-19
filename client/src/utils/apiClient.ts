import axios from 'react-native-axios'

/**
 * Makes an API call to the server
 */
export const apiClient = axios.create({
  baseURL: process.env.API_URL,
  Accept: 'application/json',
  // remove dirty fix
  headers: { Authorization: `Token ${process.env.API_KEY}` },
})
