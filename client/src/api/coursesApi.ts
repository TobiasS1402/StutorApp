import useApi from '@hooks/useApi'
import { Course } from '@/types'

/**
 * Gets courses from given study
 * @param studyId
 * @constructor
 */
const GetCoursesForStudy = (studyId: number) => {
  const { result } = useApi<Course[]>({
    method: 'GET',
    url: `/courses/study/${studyId}`,
  })

  return result
}

export { GetCoursesForStudy }
