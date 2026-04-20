import React from 'react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="index-page">
      <header className="hero">
        <div className="container">
          <h1>🎾 Tennis AI Coach</h1>
          <p>专业的网球动作分析与训练平台</p>
          <div className="cta-buttons">
            <Link to="/analyze" className="btn btn-primary">开始分析</Link>
            <Link to="/login" className="btn btn-secondary">登录</Link>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2>核心功能</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📹</div>
              <h3>AI动作分析</h3>
              <p>上传视频，AI自动识别骨骼点，与专业球员对比</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>量化评分</h3>
              <p>从姿态、节奏、发力链、稳定性等维度评分</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>训练计划</h3>
              <p>根据分析结果生成个性化训练计划</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>成长追踪</h3>
              <p>记录训练进度，查看能力提升曲线</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>如何使用</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>上传视频</h3>
              <p>拍摄你的网球动作视频并上传</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>AI分析</h3>
              <p>AI自动识别骨骼点并与专业动作对比</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>查看报告</h3>
              <p>获取详细的分析报告和改进建议</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>开始训练</h3>
              <p>按照生成的训练计划进行练习</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Tennis AI Coach. 保留所有权利。</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;