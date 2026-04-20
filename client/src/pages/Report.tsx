import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScoreChart from '../components/ScoreChart';

const Report: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟获取报告数据
    const fetchReport = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockReport = {
          id: id,
          analysisType: 'forehand',
          date: new Date().toLocaleDateString(),
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
          improvementAreas: ['随挥动作', '重心转移'],
          recommendedExercises: [
            '对着镜子练习挥拍动作，观察随挥是否完整',
            '进行步法训练，提高移动速度和稳定性',
            '多进行多球训练，巩固正确的动作定型'
          ],
          comparisonData: {
            yourScore: 7.5,
            professionalScore: 9.5,
            averageScore: 6.8
          },
          historicalData: [
            { date: '2026-04-01', score: 6.2 },
            { date: '2026-04-08', score: 6.8 },
            { date: '2026-04-15', score: 7.5 }
          ]
        };
        
        setReport(mockReport);
      } catch (error) {
        console.error('获取报告失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (isLoading) {
    return <div className="loading">加载中...</div>;
  }

  if (!report) {
    return <div className="error">报告不存在</div>;
  }

  return (
    <div className="report-page">
      <div className="container">
        <h2>分析报告</h2>
        
        <div className="report-header">
          <div className="report-info">
            <h3>{report.analysisType === 'forehand' ? '正手' : 
                 report.analysisType === 'backhand' ? '反手' : 
                 report.analysisType === 'serve' ? '发球' : '截击'}分析报告</h3>
            <p>分析日期: {report.date}</p>
          </div>
          <div className="report-score">
            <div className="score-value">{report.score}/10</div>
            <div className="score-label">总体评分</div>
          </div>
        </div>

        <div className="report-content">
          <div className="score-section">
            <h4>评分详情</h4>
            <div className="score-breakdown">
              {Object.entries(report.breakdown).map(([key, value]) => (
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

          <div className="chart-section">
            <h4>能力对比</h4>
            <ScoreChart comparisonData={report.comparisonData} />
          </div>

          <div className="history-section">
            <h4>历史趋势</h4>
            <div className="history-chart">
              {/* 这里可以添加历史评分趋势图 */}
              <div className="history-data">
                {report.historicalData.map((item: any, index: number) => (
                  <div key={index} className="history-item">
                    <span>{item.date}</span>
                    <span>{item.score}/10</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="suggestions-section">
            <h4>改进建议</h4>
            <ul className="suggestions-list">
              {report.suggestions.map((suggestion: string, index: number) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>

          <div className="exercises-section">
            <h4>推荐练习</h4>
            <ul className="exercises-list">
              {report.recommendedExercises.map((exercise: string, index: number) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;