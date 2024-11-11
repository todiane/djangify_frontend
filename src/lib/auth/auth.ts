import axios from 'axios';

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_URL}/api/auth/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
