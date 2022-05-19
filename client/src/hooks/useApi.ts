import { apiClient } from '@utils/apiClient'
import { useEffect, useState } from 'react'
import AxiosRequestConfig from 'react-native-axios'
import { Service } from '@/types'

/**
 * Makes a call to the server and most likely then to the DB
 * @param axiosParams
 */
const useApi = <T>(axiosParams: AxiosRequestConfig) => {
  const [result, setResult] = useState<Service<T>>({
    status: 'loading',
  })

  /**
   * Makes an API call with the information from the parameters
   * Call is made with axios
   * @param params/axiosParams
   */
  const fetchData = async (params: AxiosRequestConfig) => {
    await apiClient
      .request(params)
      .then((response) => response.data)
      .then((response) => setResult({ status: 'loaded', payload: response }))
      .catch((error) => setResult({ status: 'error', error }))
  }

  /**
   * Calls the function fetchData
   */
  const sendData = () => {
    fetchData(axiosParams)
  }

  /**
   * Never been called to
   */
  useEffect(() => {
    if (axiosParams.method === 'GET' || axiosParams.method === 'get') {
      fetchData(axiosParams)
    }
  }, [])

  return { result, sendData }
}

export default useApi
