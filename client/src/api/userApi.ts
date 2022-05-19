import useApi from '@hooks/useApi'
import { User } from '@/types'

const GetMe = () => {
  const { result } = useApi<User>({
    method: 'GET',
    url: `/users/me`,
  })

  return result
}

export { GetMe }
