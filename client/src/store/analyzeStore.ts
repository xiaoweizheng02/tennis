import { create } from 'zustand';

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

interface AnalyzeState {
  currentAnalysis: AnalysisResult | null;
  analysisHistory: AnalysisHistory[];
  isAnalyzing: boolean;
  error: string | null;
  startAnalysis: (videoFile: File, analysisType: string) => Promise<void>;
  getAnalysisResult: (id: string) => Promise<void>;
  getAnalysisHistory: () => Promise<void>;
  clearCurrentAnalysis: () => void;
  clearError: () => void;
}

export const useAnalyzeStore = create<AnalyzeState>((set) => ({
  currentAnalysis: null,
  analysisHistory: [],
  isAnalyzing: false,
  error: null,
  
  startAnalysis: async (videoFile, analysisType) => {
    set({ isAnalyzing: true, error: null });
    
    try {
      // 模拟分析过程
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 模拟分析结果
      const mockResult: AnalysisResult = {
        id: `analysis-${Date.now()}`,
        score: 7.5,
        breakdown: {
          posture: 8.0,
          rhythm: 7.0,
          powerChain: 7.5,
          stability: 8.0
        },
        suggestions: [
          '击球点可以更靠前',
          '随挥动作不够完整',
          '重心转移需要加强'
        ],
        skeletonData: {
          keypoints: Array(33).fill(0).map((_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            score: Math.random() * 0.5 + 0.5
          }))
        },
        createdAt: new Date().toISOString()
      };
      
      set({ currentAnalysis: mockResult, isAnalyzing: false });
    } catch (error) {
      set({ error: '分析失败，请重试', isAnalyzing: false });
    }
  },
  
  getAnalysisResult: async (id) => {
    set({ isAnalyzing: true, error: null });
    
    try {
      // 模拟获取分析结果
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟分析结果
      const mockResult: AnalysisResult = {
        id: id,
        score: 7.5,
        breakdown: {
          posture: 8.0,
          rhythm: 7.0,
          powerChain: 7.5,
          stability: 8.0
        },
        suggestions: [
          '击球点可以更靠前',
          '随挥动作不够完整',
          '重心转移需要加强'
        ],
        skeletonData: {
          keypoints: Array(33).fill(0).map((_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            score: Math.random() * 0.5 + 0.5
          }))
        },
        createdAt: new Date().toISOString()
      };
      
      set({ currentAnalysis: mockResult, isAnalyzing: false });
    } catch (error) {
      set({ error: '获取分析结果失败', isAnalyzing: false });
    }
  },
  
  getAnalysisHistory: async () => {
    set({ isAnalyzing: true, error: null });
    
    try {
      // 模拟获取分析历史
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟分析历史
      const mockHistory: AnalysisHistory[] = [
        {
          id: 'analysis-1',
          analysisType: 'forehand',
          score: 8.2,
          createdAt: '2026-04-18T10:00:00Z'
        },
        {
          id: 'analysis-2',
          analysisType: 'backhand',
          score: 7.5,
          createdAt: '2026-04-15T14:30:00Z'
        },
        {
          id: 'analysis-3',
          analysisType: 'serve',
          score: 8.5,
          createdAt: '2026-04-10T09:15:00Z'
        }
      ];
      
      set({ analysisHistory: mockHistory, isAnalyzing: false });
    } catch (error) {
      set({ error: '获取分析历史失败', isAnalyzing: false });
    }
  },
  
  clearCurrentAnalysis: () => {
    set({ currentAnalysis: null });
  },
  
  clearError: () => {
    set({ error: null });
  },
}));