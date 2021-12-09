import { apiClient } from '@utils/apiClient'
import { ICourse } from '@/types'

const getCourses = () => apiClient.get<ICourse[]>('/courses')

export default {
  getCourses,
}
