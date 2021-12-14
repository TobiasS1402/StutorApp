import { useEffect, useState } from 'react'
import ApiService from './apiService'
import { Course, Service } from '@/types'

export const GetCourses = () => {
  const [result, setResult] = useState<Service<Course[]>>({
    status: 'loading',
  })

  const service = new ApiService<Course>('/courses')

  useEffect(() => {
    service
      .getList()
      .then((response) => response.data)
      .then((response) => setResult({ status: 'loaded', payload: response }))
      .catch((error) => setResult({ status: 'error', error }))
  }, [])

  return result
}
