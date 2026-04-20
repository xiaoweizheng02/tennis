import React, { useState, useRef } from 'react';
import VideoUpload from '../components/VideoUpload';
import SkeletonCanvas from '../components/SkeletonCanvas';
import LoadingOverlay from '../components/LoadingOverlay';

const Analyze: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisType, setAnalysisType] = useState('forehand'); // forehand, backhand, serve, volley
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);

    try {
      // 模拟分析过程
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 模拟分析结果
      const mockResult = {
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
          // 模拟骨骼点数据
          keypoints: Array(33).fill(0).map((_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            score: Math.random() * 0.5 + 0.5
          }))
        }
      };

      setAnalysisResult(mockResult);
    } catch (error) {
      console.error('分析失败:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="analyze-page">
      <div className="container">
        <h2>动作分析</h2>
        
        <div className="analysis-section">
          <div className="upload-section">
            <h3>上传视频</h3>
            <VideoUpload onFileUpload={handleFileUpload} />
            
            {selectedFile && (
              <div className="file-preview">
                <h4>预览</h4>
                <video
                  ref={videoRef}
                  src={URL.createObjectURL(selectedFile)}
                  controls
                  className="preview-video"
                />
              </div>
            )}
          </div>

          <div className="analysis-controls">
            <div className="form-group">
              <label htmlFor="analysis-type">分析类型</label>
              <select
                id="analysis-type"
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value)}
              >
                <option value="forehand">正手</option>
                <option value="backhand">反手</option>
                <option value="serve">发球</option>
                <option value="volley">截击</option>
              </select>
            </div>
            
            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
            >
              {isAnalyzing ? '分析中...' : '开始分析'}
            </button>
          </div>
        </div>

        {analysisResult && (
          <div className="analysis-result">
            <h3>分析结果</h3>
            <div className="score-card">
              <div className="score-value">{analysisResult.score}/10</div>
              <div className="score-label">总体评分</div>
            </div>
            
            <div className="score-breakdown">
              <h4>评分详情</h4>
              <div className="score-items">
                {Object.entries(analysisResult.breakdown).map(([key, value]) => (
                  <div key={key} className="score-item">
                    <span className="score-item-label">
                      {key === 'posture' ? '姿态' : 
                       key === 'rhythm' ? '节奏' : 
                       key === 'powerChain' ? '发力链' : '稳定性'}
                    </span>
                    <span className="score-item-value">{value}/10</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="suggestions">
              <h4>改进建议</h4>
              <ul>
                {analysisResult.suggestions.map((suggestion: string, index: number) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
            
            <div className="skeleton-preview">
              <h4>骨骼点分析</h4>
              <SkeletonCanvas skeletonData={analysisResult.skeletonData} />
            </div>
          </div>
        )}
      </div>
      
      {isAnalyzing && <LoadingOverlay message="正在分析视频..." />}
    </div>
  );
};

export default Analyze;