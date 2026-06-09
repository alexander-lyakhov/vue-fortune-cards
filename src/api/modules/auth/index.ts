import axiosInstance from '@/api/axiosInstance'

const authService = {
  login() {
    return axiosInstance.post('/api/auth/login')
  }
}
export default authService
