import { useEffect, useState } from 'react'
import { Service } from '@/types'

export const useApi = <Type>(apiFunc: Function) => {
  // TODO: convert json main key to results
  //   // interface Entity {
  //   //   results: Type
  //   // }

  const [result, setResult] = useState<Service<Type>>({
    status: 'loading',
  })

  useEffect(
    (...args) => {
      apiFunc(...args)
        .then((response) => response.data)
        .then((response) => setResult({ status: 'loaded', payload: response }))
        .catch((error) => setResult({ status: 'error', error }))
    },
    [apiFunc],
  )

  return result
}
