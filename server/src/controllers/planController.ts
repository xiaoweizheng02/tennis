import { Request, Response } from 'express';

// 模拟训练计划数据
const trainingPlans = [
  {
    id: 'plan-1',
    userId: 'user-1',
    name: '正手强化计划',
    description: '针对正手动作的专项训练计划',
    duration: 4,
    weeklyPlans: [
      {
        week: 1,
        focus: '基础姿势',
        exercises: [
          {
            id: 'ex-1',
            name: '挥拍练习',
            sets: 3,
            reps: 10,
            description: '对着镜子练习正手挥拍，注意姿势正确性',
          },
          {
            id: 'ex-2',
            name: '步法训练',
            sets: 2,
            reps: 15,
            description: '练习左右移动步法，提高到位率',
          },
        ],
      },
      {
        week: 2,
        focus: '击球点控制',
        exercises: [
          {
            id: 'ex-3',
            name: '定点击球',
            sets: 3,
            reps: 8,
            description: '在指定区域内击球，提高准确性',
          },
          {
            id: 'ex-4',
            name: '多球训练',
            sets: 4,
            reps: 12,
            description: '连续击球练习，提高稳定性',
          },
        ],
      },
      {
        week: 3,
        focus: '发力链优化',
        exercises: [
          {
            id: 'ex-5',
            name: '核心力量训练',
            sets: 3,
            reps: 15,
            description: '平板支撑、仰卧起坐等核心训练',
          },
          {
            id: 'ex-6',
            name: '完整动作练习',
            sets: 3,
            reps: 10,
            description: '从准备到随挥的完整动作练习',
          },
        ],
      },
      {
        week: 4,
        focus: '实战应用',
        exercises: [
          {
            id: 'ex-7',
            name: '实战对抗',
            sets: 2,
            reps: 3,
            description: '与搭档进行实战对抗练习',
          },
          {
            id: 'ex-8',
            name: '录像分析',
            sets: 1,
            reps: 1,
            description: '录制自己的动作并进行分析',
          },
        ],
      },
    ],
    createdAt: '2026-04-01T09:00:00Z',
    status: 'active' as const,
  },
];

export const planController = {
  // 创建训练计划
  createPlan: async (req: Request, res: Response) => {
    try {
      const { name, description, duration, analysisId } = req.body;
      
      // 生成新的训练计划
      const newPlan = {
        id: `plan-${Date.now()}`,
        userId: 'user-1',
        name,
        description,
        duration,
        weeklyPlans: Array(duration).fill(0).map((_, index) => ({
          week: index + 1,
          focus: `第${index + 1}周训练`,
          exercises: [
            {
              id: `ex-${Date.now()}-${index}-1`,
              name: '挥拍练习',
              sets: 3,
              reps: 10,
              description: '基础挥拍练习',
            },
            {
              id: `ex-${Date.now()}-${index}-2`,
              name: '步法训练',
              sets: 2,
              reps: 15,
              description: '步法移动练习',
            },
          ],
        })),
        createdAt: new Date().toISOString(),
        status: 'active' as const,
      };
      
      trainingPlans.push(newPlan);
      res.json(newPlan);
    } catch (error) {
      res.status(500).json({ error: '创建计划失败' });
    }
  },
  
  // 获取训练计划
  getPlan: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const plan = trainingPlans.find(p => p.id === id);
      
      if (!plan) {
        return res.status(404).json({ error: '计划不存在' });
      }
      
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  },
  
  // 获取用户的所有训练计划
  getPlans: async (req: Request, res: Response) => {
    try {
      // 模拟获取用户ID
      const userId = 'user-1';
      const plans = trainingPlans.filter(p => p.userId === userId);
      
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: '服务器错误' });
    }
  },
  
  // 更新训练计划
  updatePlan: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const planIndex = trainingPlans.findIndex(p => p.id === id);
      
      if (planIndex === -1) {
        return res.status(404).json({ error: '计划不存在' });
      }
      
      // 更新计划
      trainingPlans[planIndex] = {
        ...trainingPlans[planIndex],
        ...req.body,
      };
      
      res.json(trainingPlans[planIndex]);
    } catch (error) {
      res.status(500).json({ error: '更新计划失败' });
    }
  },
  
  // 删除训练计划
  deletePlan: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const planIndex = trainingPlans.findIndex(p => p.id === id);
      
      if (planIndex === -1) {
        return res.status(404).json({ error: '计划不存在' });
      }
      
      trainingPlans.splice(planIndex, 1);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: '删除计划失败' });
    }
  },
  
  // 标记训练计划为完成
  completePlan: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const planIndex = trainingPlans.findIndex(p => p.id === id);
      
      if (planIndex === -1) {
        return res.status(404).json({ error: '计划不存在' });
      }
      
      trainingPlans[planIndex].status = 'completed';
      res.json(trainingPlans[planIndex]);
    } catch (error) {
      res.status(500).json({ error: '更新计划状态失败' });
    }
  },
  
  // 获取推荐的训练计划
  getRecommendedPlans: async (req: Request, res: Response) => {
    try {
      const { type } = req.query;
      
      // 模拟推荐计划
      const recommendedPlans = [
        {
          id: `plan-recommended-${Date.now()}-1`,
          name: `${type === 'forehand' ? '正手' : type === 'backhand' ? '反手' : type === 'serve' ? '发球' : '截击'}专项训练计划`,
          description: `针对${type === 'forehand' ? '正手' : type === 'backhand' ? '反手' : type === 'serve' ? '发球' : '截击'}动作的专项训练计划`,
          duration: 4,
          createdAt: new Date().toISOString(),
          status: 'pending' as const,
        },
      ];
      
      res.json(recommendedPlans);
    } catch (error) {
      res.status(500).json({ error: '获取推荐计划失败' });
    }
  },
};