import { API_URL, fetchWithAuth } from './auth'

export interface Category {
  id: string
  title: string
  description: string
  iconUrl?: string | null
  priority?: string | null
  status?: string | null
}

export interface CategoryListResponse {
  items: Category[]
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export const getCategories = async (status?: string): Promise<Category[]> => {
  const params = new URLSearchParams()
  if (status) {
    params.append('status', status)
  }

  const response = await fetchWithAuth(
    `${API_URL}/categories${params.toString() ? `?${params.toString()}` : ''}`,
    {
      method: 'GET',
    }
  )

  const data: ApiResponse<CategoryListResponse> = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Lấy danh sách danh mục thất bại')
  }

  return data.data.items || []
}