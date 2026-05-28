import apiClient from '../api/config';
import type { AuthUser } from '../types/auth/auth';
import { authService } from './authService';

export const userService = {
  /**
   * PATCH /api/users/:id
   * Khách/Thợ cập nhật thông tin cá nhân
   */
  updateUserProfile: async (
    id: string,
    data: Partial<AuthUser>
  ): Promise<{ success: boolean; data: AuthUser; message?: string }> => {
    const response = await apiClient.patch<{ success: boolean; data: AuthUser; message?: string }>(
      `/api/users/${id}`,
      data
    );
    return response.data;
  },

  /**
   * GET /api/auth/me
   * Lấy thông tin user hiện tại (alias từ authService)
   */
  getMe: async (): Promise<{ success: boolean; data: AuthUser }> => {
    return await authService.getMe();
  }
};
