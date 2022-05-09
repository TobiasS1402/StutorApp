import useApi from '@hooks/useApi'
import { Lesson } from '@/types'

/**
 * Get lessons from given course
 * @param courseId
 * @constructor
 */
const GetLessonsForCourse = (courseId: number) => {
  const { result } = useApi<Lesson[]>({
    method: 'GET',
    url: `/lessons/course/${courseId}`,
  })

  return result
}

/**
 * Get lesson from given lessonId
 * @param lessonId
 * @constructor
 */
const GetLesson = (lessonId: number) => {
  const { result } = useApi<Lesson>({
    method: 'GET',
    url: `/lessons/${lessonId}`,
  })

  return result
}

export { GetLessonsForCourse, GetLesson }
