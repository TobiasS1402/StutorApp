import { useState } from 'react'
import { Service } from '@/types'

export default (apiFunc: Function) => {
  // TODO pass type reference
  const [result, setResult] = useState<Service<any>>({
    status: 'loading',
  })

  const request = async (...args) => {
    await apiFunc(...args)
      .then((response) => response.data)
      .then((response) => setResult({ status: 'loaded', payload: response }))
      .catch((error) => setResult({ status: 'error', error }))
  }

  return {
    request,
    result,
  }
}
