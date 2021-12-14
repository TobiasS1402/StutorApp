import { apiClient } from '@utils/apiClient'
import { useEffect, useState } from 'react'
import AxiosRequestConfig from 'react-native-axios'
import { Service } from '@/types'

const useApi = <T>(axiosParams: AxiosRequestConfig) => {
  const [result, setResult] = useState<Service<T>>({
    status: 'loading',
  })

  const fetchData = async (params: AxiosRequestConfig) => {
    await apiClient
      .request(params)
      .then((response) => response.data)
      .then((response) => setResult({ status: 'loaded', payload: response }))
      .catch((error) => setResult({ status: 'error', error }))
  }

  const sendData = () => {
    fetchData(axiosParams)
  }

  useEffect(() => {
    if (axiosParams.method === 'GET' || axiosParams.method === 'get') {
      fetchData(axiosParams)
    }
  }, [])

  return { result, sendData }
}

export default useApi
