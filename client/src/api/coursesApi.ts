import useApi from '@hooks/useApi'
import { ICourse } from '@/types'

function GetCourses() {
  const [getCourses, result] = useApi<ICourse>()
  getCourses('/courses')
  return result
}

export { GetCourses }
