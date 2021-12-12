import { useState } from 'react'
import { Service } from '@/types'

export default <Type>(apiFunc: Function) => {
  // TODO: convert json main key to results
  // interface Entity {
  //   results: Type
  // }

  const [result, setResult] = useState<Service<Type>>({
    status: 'loading',
  })

  const requestApi = async (...args) => {
    await apiFunc(...args)
      .then((response) => response.data)
      .then((response) => setResult({ status: 'loaded', payload: response }))
      .catch((error) => setResult({ status: 'error', error }))
  }

  return { result, requestApi }
}
