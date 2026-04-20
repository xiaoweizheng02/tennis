# Tennis AI Coach - 智能网球教练系统

一个专业的网球动作分析与训练平台，通过AI技术帮助网球爱好者提升技术水平。

## 项目架构

```
/tennis-ai-coach
 ├── /client                 # 前端（React + TypeScript）
 │   ├── /src
 │   │   ├── /pages          # 核心页面
 │   │   ├── /components     # 通用组件
 │   │   ├── /api            # API封装
 │   │   ├── /ai             # AI相关功能
 │   │   ├── /store          # 状态管理
 │   │   ├── /utils          # 工具函数
 │   │   ├── /config         # 配置文件
 │   │   └── App.tsx
 │   └── package.json
 │
 ├── /server                 # 后端（Node.js + Express）
 │   ├── /src
 │   │   ├── /controllers    # 控制器
 │   │   ├── /services       # 服务
 │   │   ├── /models         # 数据模型
 │   │   ├── /routes          # 路由
 │   │   └── server.ts
 │   └── package.json
 │
 └── /ai-service             # AI推理服务
     ├── pose_estimation.py
     └── tennis_model.pth
```

## 核心功能

### 1. 用户系统
- 注册/登录
- 个人档案管理
- 水平定级（L1-L5）
- 成长时间线
- 历史视频库

### 2. 动作分析核心
- 视频/照片上传
- AI骨骼点识别（2D/3D）
- 专业球员标准库对比
- 同屏视频对比
- 角度/时序/击球点偏差标注
- 量化评分（姿态、节奏、发力链、稳定性）

### 3. 智能教学
- 自动生成纠错报告
- 针对性训练计划
- 分级课程库
- 易错动作示范与纠正

### 4. 成长体系
- 训练打卡
- 进度曲线
- 能力雷达图
- 阶段性测评
- 等级晋升

## 技术栈

### 前端
- React 18
- TypeScript
- React Router
- Zustand (状态管理)
- Axios (API请求)
- MediaPipe (姿态检测)
- TensorFlow.js (AI推理)
- Chart.js (数据可视化)
- Framer Motion (动画效果)

### 后端
- Node.js
- Express
- MongoDB (数据存储)
- JWT (身份验证)
- Multer (文件上传)

### AI服务
- MediaPipe Pose
- TensorFlow
- OpenCV

## 快速开始

### 前端开发
```bash
cd client
npm install
npm run dev
```

### 后端开发
```bash
cd server
npm install
npm run dev
```

### 构建生产版本
```bash
# 构建前端
cd client
npm run build

# 构建后端
cd ../server
npm run build
```

## 部署

### 前端部署
- 静态网站托管（Vercel、Netlify、GitHub Pages）
- 容器化部署（Docker）

### 后端部署
- 云服务器（AWS、GCP、阿里云）
- PaaS平台（Heroku、Render）
- 容器化部署（Docker + Kubernetes）

## API文档

### 用户接口
- `POST /api/user/login` - 登录
- `POST /api/user/register` - 注册
- `GET /api/user/profile` - 获取用户信息
- `PUT /api/user/profile` - 更新用户信息
- `PUT /api/user/password` - 修改密码

### 分析接口
- `POST /api/analyze/video` - 上传并分析视频
- `GET /api/analyze/:id` - 获取分析结果
- `GET /api/analyze/history` - 获取分析历史
- `DELETE /api/analyze/:id` - 删除分析记录
- `GET /api/analyze/professional-actions` - 获取专业动作库

### 计划接口
- `POST /api/plan` - 创建训练计划
- `GET /api/plan/:id` - 获取训练计划
- `GET /api/plan` - 获取所有训练计划
- `PUT /api/plan/:id` - 更新训练计划
- `DELETE /api/plan/:id` - 删除训练计划
- `PUT /api/plan/:id/complete` - 标记计划完成
- `GET /api/plan/recommended` - 获取推荐计划

## 项目特点

1. **专业的网球动作分析**：基于MediaPipe和专业网球知识，提供准确的动作评估
2. **个性化训练计划**：根据分析结果自动生成针对性的训练计划
3. **可视化数据展示**：通过图表和骨骼点可视化，直观展示动作问题
4. **完整的成长体系**：记录训练进度，追踪能力提升
5. **响应式设计**：支持桌面端和移动端

## 未来规划

1. **实时分析**：支持实时视频流分析
2. **3D动作重建**：提供更直观的3D动作展示
3. **社区功能**：用户可以分享训练成果和经验
4. **教练指导**：接入专业教练在线指导
5. **多语言支持**：支持中英文等多语言

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT