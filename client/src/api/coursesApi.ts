import { apiClient } from '@utils/apiClient'

const getCourses = () => apiClient.get('/courses')

export default {
  getCourses,
}
