import client from './client';

interface AnalysisRequest {
  videoFile: File;
  analysisType: string; // forehand, backhand, serve, volley
}

interface AnalysisResult {
  id: string;
  score: number;
  breakdown: {
    posture: number;
    rhythm: number;
    powerChain: number;
    stability: number;
  };
  suggestions: string[];
  skeletonData: {
    keypoints: Array<{
      x: number;
      y: number;
      score: number;
    }>;
  };
  createdAt: string;
}

interface AnalysisHistory {
  id: string;
  analysisType: string;
  score: number;
  createdAt: string;
}

export const analyzeApi = {
  // 上传并分析视频
  analyzeVideo: async (formData: FormData): Promise<AnalysisResult> => {
    return client.post('/analyze/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 获取分析结果
  getAnalysisResult: async (id: string): Promise<AnalysisResult> => {
    return client.get(`/analyze/${id}`);
  },

  // 获取分析历史
  getAnalysisHistory: async (): Promise<AnalysisHistory[]> => {
    return client.get('/analyze/history');
  },

  // 删除分析记录
  deleteAnalysis: async (id: string): Promise<{ success: boolean }> => {
    return client.delete(`/analyze/${id}`);
  },

  // 获取专业动作标准库
  getProfessionalActions: async (): Promise<Array<{
    id: string;
    type: string;
    name: string;
    videoUrl: string;
    skeletonData: any;
  }>> => {
    return client.get('/analyze/professional-actions');
  },
};