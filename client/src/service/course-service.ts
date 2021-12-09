import { useEffect, useState } from 'react'
import { ICourse, Service } from '@/types'

export interface Courses {
  courses: ICourse[]
}

const useCoursesService = () => {
  const [result, setResult] = useState<Service<Courses>>({
    status: 'loading',
  })

  useEffect(() => {
    fetch(`${process.env.API_URL}/courses`, {
      headers: new Headers({
        Authorization: `Token ${process.env.API_KEY}`,
        Accept: 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((response) => setResult({ status: 'loaded', payload: response }))
      .catch((error) => setResult({ status: 'error', error }))
  }, [])

  return result
}

export default useCoursesService
