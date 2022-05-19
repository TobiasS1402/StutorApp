import useApi from '@hooks/useApi'
import { User } from '@/types'

/**
 * Get user information
 * @constructor
 */
const GetMe = () => {
  const { result } = useApi<User>({
    method: 'GET',
    url: `/users/me`,
  })

  return result
}

export { GetMe }
