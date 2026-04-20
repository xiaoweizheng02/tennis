import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 模拟用户数据
const users = [
  {
    id: 'user-1',
    name: '张三',
    email: 'zhangsan@example.com',
    password: bcrypt.hashSync('123456', 10),
    level: 'L3',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20player%20avatar&image_size=square',
    joinDate: '2026-01-01',
  },
];

const JWT_SECRET = 'your-secret-key';

export const userController = {
  // 登录
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // 查找用户
      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({ error: '邮箱或密码错误' });
      }
      
      // 验证密码
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: '邮箱或密码错误' });
      }
      
      // 生成token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      
      // 返回用户信息和token
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          level: user.level,
          avatar: user.avatar,
          joinDate: user.joinDate,
        },
      });
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  },
  
  // 注册
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      
      // 检查邮箱是否已存在
      if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: '邮箱已被注册' });
      }
      
      // 创建新用户
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        level: 'L1',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20player%20avatar&image_size=square',
        joinDate: new Date().toISOString().split('T')[0],
      };
      
      users.push(newUser);
      
      // 生成token
      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });
      
      res.json({
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          level: newUser.level,
          avatar: newUser.avatar,
          joinDate: newUser.joinDate,
        },
      });
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  },
  
  // 获取用户信息
  getProfile: async (req: Request, res: Response) => {
    try {
      // 从token中获取用户ID
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: '未授权' });
      }
      
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = users.find(u => u.id === decoded.userId);
      
      if (!user) {
        return res.status(404).json({ error: '用户不存在' });
      }
      
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        level: user.level,
        avatar: user.avatar,
        joinDate: user.joinDate,
      });
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  },
  
  // 更新用户信息
  updateProfile: async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: '未授权' });
      }
      
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const userIndex = users.findIndex(u => u.id === decoded.userId);
      
      if (userIndex === -1) {
        return res.status(404).json({ error: '用户不存在' });
      }
      
      // 更新用户信息
      users[userIndex] = {
        ...users[userIndex],
        ...req.body,
      };
      
      res.json(users[userIndex]);
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  },
  
  // 修改密码
  changePassword: async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: '未授权' });
      }
      
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const userIndex = users.findIndex(u => u.id === decoded.userId);
      
      if (userIndex === -1) {
        return res.status(404).json({ error: '用户不存在' });
      }
      
      const { oldPassword, newPassword } = req.body;
      
      // 验证旧密码
      const isPasswordValid = bcrypt.compareSync(oldPassword, users[userIndex].password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: '旧密码错误' });
      }
      
      // 更新密码
      users[userIndex].password = bcrypt.hashSync(newPassword, 10);
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  },
  
  // 登出
  logout: async (req: Request, res: Response) => {
    // 由于使用的是JWT，登出操作在客户端完成（删除token）
    // 这里可以添加一些额外的逻辑，比如将token加入黑名单
    res.json({ success: true });
  },
};