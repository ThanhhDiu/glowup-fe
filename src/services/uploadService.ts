import apiClient from '../api/config';

export const uploadService = {
  /**
   * POST /api/upload/image
   * Upload ảnh avatar, CCCD, banner (1 file)
   */
  uploadImage: async (
    file: File
  ): Promise<{ success: boolean; data: { url: string }; message?: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post<{ success: boolean; data: { url: string }; message?: string }>(
      '/api/upload/image',
      formData
    );
    return response.data;
  },

  /**
   * POST /api/upload/images
   * Upload nhiều ảnh
   */
  uploadImages: async (
    files: File[]
  ): Promise<{ success: boolean; data: { urls: string[] }; message?: string }> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    const response = await apiClient.post<{ success: boolean; data: { urls: string[] }; message?: string }>(
      '/api/upload/images',
      formData
    );
    return response.data;
  }
};
