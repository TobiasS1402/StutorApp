import axios from 'react-native-axios'

export const apiClient = axios.create({
  baseURL: process.env.API_URL,
  Accept: 'application/json',
  // remove dirty fix
  headers: { Authorization: `Token ${process.env.API_KEY}` },
})
