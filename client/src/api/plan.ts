import client from './client';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  description: string;
}

interface WeeklyPlan {
  week: number;
  focus: string;
  exercises: Exercise[];
}

interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // 周
  weeklyPlans: WeeklyPlan[];
  createdAt: string;
  status: 'active' | 'completed' | 'pending';
}

export const planApi = {
  // 创建训练计划
  createPlan: async (data: {
    name: string;
    description: string;
    duration: number;
    analysisId: string;
  }): Promise<TrainingPlan> => {
    return client.post('/plan', data);
  },

  // 获取训练计划
  getPlan: async (id: string): Promise<TrainingPlan> => {
    return client.get(`/plan/${id}`);
  },

  // 获取用户的所有训练计划
  getPlans: async (): Promise<TrainingPlan[]> => {
    return client.get('/plan');
  },

  // 更新训练计划
  updatePlan: async (id: string, data: Partial<TrainingPlan>): Promise<TrainingPlan> => {
    return client.put(`/plan/${id}`, data);
  },

  // 删除训练计划
  deletePlan: async (id: string): Promise<{ success: boolean }> => {
    return client.delete(`/plan/${id}`);
  },

  // 标记训练计划为完成
  completePlan: async (id: string): Promise<TrainingPlan> => {
    return client.put(`/plan/${id}/complete`);
  },

  // 获取推荐的训练计划
  getRecommendedPlans: async (analysisType: string): Promise<TrainingPlan[]> => {
    return client.get(`/plan/recommended?type=${analysisType}`);
  },
};