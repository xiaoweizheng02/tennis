// 常量配置

// 动作类型
export const ACTION_TYPES = {
  FOREHAND: 'forehand',
  BACKHAND: 'backhand',
  SERVE: 'serve',
  VOLLEY: 'volley',
} as const;

export type ActionType = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];

// 动作类型显示名称
export const ACTION_TYPE_NAMES = {
  [ACTION_TYPES.FOREHAND]: '正手',
  [ACTION_TYPES.BACKHAND]: '反手',
  [ACTION_TYPES.SERVE]: '发球',
  [ACTION_TYPES.VOLLEY]: '截击',
};

// 用户等级
export const USER_LEVELS = {
  L1: '初学者',
  L2: '进阶者',
  L3: '中级',
  L4: '高级',
  L5: '专业',
} as const;

export type UserLevel = keyof typeof USER_LEVELS;

// 评分维度
export const SCORE_DIMENSIONS = {
  POSTURE: 'posture',
  RHYTHM: 'rhythm',
  POWER_CHAIN: 'powerChain',
  STABILITY: 'stability',
} as const;

export type ScoreDimension = typeof SCORE_DIMENSIONS[keyof typeof SCORE_DIMENSIONS];

// 评分维度显示名称
export const SCORE_DIMENSION_NAMES = {
  [SCORE_DIMENSIONS.POSTURE]: '姿态',
  [SCORE_DIMENSIONS.RHYTHM]: '节奏',
  [SCORE_DIMENSIONS.POWER_CHAIN]: '发力链',
  [SCORE_DIMENSIONS.STABILITY]: '稳定性',
};

// API端点
export const API_ENDPOINTS = {
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  PROFILE: '/user/profile',
  CHANGE_PASSWORD: '/user/password',
  LOGOUT: '/user/logout',
  ANALYZE_VIDEO: '/analyze/video',
  ANALYSIS_RESULT: (id: string) => `/analyze/${id}`,
  ANALYSIS_HISTORY: '/analyze/history',
  DELETE_ANALYSIS: (id: string) => `/analyze/${id}`,
  PROFESSIONAL_ACTIONS: '/analyze/professional-actions',
  CREATE_PLAN: '/plan',
  GET_PLAN: (id: string) => `/plan/${id}`,
  GET_PLANS: '/plan',
  UPDATE_PLAN: (id: string) => `/plan/${id}`,
  DELETE_PLAN: (id: string) => `/plan/${id}`,
  COMPLETE_PLAN: (id: string) => `/plan/${id}/complete`,
  RECOMMENDED_PLANS: (type: string) => `/plan/recommended?type=${type}`,
};

// 文件上传配置
export const FILE_UPLOAD_CONFIG = {
  MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_VIDEO_TYPES: [
    'video/mp4',
    'video/mov',
    'video/avi',
    'video/wmv',
    'video/flv',
    'video/mkv',
  ],
  ALLOWED_IMAGE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ],
};

// 训练计划配置
export const TRAINING_PLAN_CONFIG = {
  DEFAULT_DURATION: 4, // 默认4周
  MAX_DURATION: 12, // 最大12周
  MIN_DURATION: 1, // 最小1周
};

// 骨骼点索引
export const BODY_PARTS = {
  NOSE: 0,
  LEFT_EYE: 1,
  RIGHT_EYE: 2,
  LEFT_EAR: 3,
  RIGHT_EAR: 4,
  LEFT_SHOULDER: 5,
  RIGHT_SHOULDER: 6,
  LEFT_ELBOW: 7,
  RIGHT_ELBOW: 8,
  LEFT_WRIST: 9,
  RIGHT_WRIST: 10,
  LEFT_HIP: 11,
  RIGHT_HIP: 12,
  LEFT_KNEE: 13,
  RIGHT_KNEE: 14,
  LEFT_ANKLE: 15,
  RIGHT_ANKLE: 16,
} as const;