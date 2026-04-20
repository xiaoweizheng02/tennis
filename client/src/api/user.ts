import client from './client';

interface User {
  id: string;
  name: string;
  email: string;
  level: string;
  avatar: string;
  joinDate: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const userApi = {
  // 登录
  login: async (data: LoginData): Promise<LoginResponse> => {
    return client.post('/user/login', data);
  },

  // 注册
  register: async (data: RegisterData): Promise<LoginResponse> => {
    return client.post('/user/register', data);
  },

  // 获取用户信息
  getProfile: async (): Promise<User> => {
    return client.get('/user/profile');
  },

  // 更新用户信息
  updateProfile: async (data: Partial<User>): Promise<User> => {
    return client.put('/user/profile', data);
  },

  // 修改密码
  changePassword: async (data: {
    oldPassword: string;
    newPassword: string;
  }): Promise<{ success: boolean }> => {
    return client.put('/user/password', data);
  },

  // 登出
  logout: async (): Promise<{ success: boolean }> => {
    return client.post('/user/logout');
  },
};