import { apiClient } from '@utils/apiClient'
import { useState } from 'react'
import { Service } from '@/types'

export default <T>(): [(url: string) => void, Service<T>] => {
  const [result, setResult] = useState<Service<T>>({
    status: 'loading',
  })

  const getResponseTest = async (url: string) => {
    try {
      const res = await apiClient<T>(url)
      setResult({ status: 'loaded', payload: res })
    } catch (error) {
      if (error instanceof Error) {
        setResult({ status: 'error', error })
      }
    }
  }

  return [getResponseTest, result]
}
