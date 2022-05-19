import useApi from '@hooks/useApi'
import { Course } from '@/types'

const GetCoursesForStudy = (studyId: number) => {
  const { result } = useApi<Course[]>({
    method: 'GET',
    url: `/courses/study/${studyId}`,
  })

  return result
}

export { GetCoursesForStudy }
