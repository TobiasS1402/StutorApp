import useApi from '@hooks/useApi'
import { Lesson } from '@/types'

const GetLessonsForCourse = (courseId: number) => {
  const { result } = useApi<Lesson[]>({
    method: 'GET',
    url: `/lessons/course/${courseId}`,
  })

  return result
}

const GetLesson = (lessonId: number) => {
  const { result } = useApi<Lesson>({
    method: 'GET',
    url: `/lessons/${lessonId}`,
  })

  return result
}

export { GetLessonsForCourse, GetLesson }
