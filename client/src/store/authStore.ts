import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  level: string;
  avatar: string;
  joinDate: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功响应
      const mockUser: User = {
        id: 'user-1',
        name: '张三',
        email: email,
        level: 'L3',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20player%20avatar&image_size=square',
        joinDate: '2026-01-01'
      };
      
      const mockToken = 'mock-token';
      
      // 保存到localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      set({ user: mockUser, token: mockToken, isLoading: false });
    } catch (error) {
      set({ error: '登录失败，请检查邮箱和密码', isLoading: false });
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },
  
  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  
  clearError: () => {
    set({ error: null });
  },
}));