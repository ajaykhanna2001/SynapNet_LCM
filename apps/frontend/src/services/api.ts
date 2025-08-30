import axios, { AxiosResponse } from 'axios'
import { ApiResponse, PaginatedResponse } from '@fleetops/shared'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  async login(email: string, password: string): Promise<{
    access_token: string
    user: any
  }> {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async getProfile(): Promise<any> {
    const response = await api.get('/auth/profile')
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}

export const calendarService = {
  async getEvents(params?: {
    eventType?: string
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<any>> {
    const response = await api.get('/calendar/events', { params })
    return response.data
  },

  async exportEvents(eventType?: string): Promise<Blob> {
    const response = await api.get('/calendar/export', {
      params: { eventType },
      responseType: 'blob',
    })
    return response.data
  },

  async createEvent(eventData: any): Promise<ApiResponse<any>> {
    const response = await api.post('/calendar/events', eventData)
    return response.data
  },
}

export const contractsService = {
  async getContracts(params?: {
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<any>> {
    const response = await api.get('/contracts', { params })
    return response.data
  },
}

export const lifecycleService = {
  async getCatalogEntries(params?: {
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<any>> {
    const response = await api.get('/lifecycle/catalog', { params })
    return response.data
  },
}

export const assetsService = {
  async getAssets(params?: {
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<any>> {
    const response = await api.get('/assets', { params })
    return response.data
  },
}

export default api