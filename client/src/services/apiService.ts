import { ApiResponse } from '@/types'
import { apiClient } from '@/utils'

export default class ApiService<T> {
  constructor(entitySlug: string) {
    this.entitySlug = entitySlug
  }

  private entitySlug: string

  getOne = async (id: string): Promise<ApiResponse<T>> => {
    return await apiClient.get(this.entitySlug + '/' + id)
  }

  getList = async (): Promise<ApiResponse<T[]>> => {
    return await apiClient.get(this.entitySlug)
  }

  create = async (
    body: Omit<T, 'id' | 'created' | 'updated'>,
  ): Promise<ApiResponse<T>> => {
    const request = await apiClient.post(this.entitySlug, {
      method: 'POST',
      body: JSON.stringify(body),
    })

    const response = await request.data()
    return response
  }

  update = async (
    body: Omit<Partial<T>, 'id' | 'created' | 'updated'>,
  ): Promise<ApiResponse<T>> => {
    const request = await apiClient.patch(this.entitySlug + '/' + body.id, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
    const response = await request.data()
    return response
  }

  delete = async (id: string): Promise<void> => {
    const request = await apiClient.delete(this.entitySlug + '/' + id, {
      method: 'DELETE',
    })
    const response = await request.data()
    return response
  }
}
