import React, { useState, useEffect } from 'react';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // 模拟获取用户信息
    const fetchUserInfo = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: 'user-1',
          name: '张三',
          email: 'zhangsan@example.com',
          level: 'L3',
          avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20player%20avatar&image_size=square',
          joinDate: '2026-01-01'
        };
        
        const mockStats = {
          totalAnalyses: 12,
          totalPlans: 3,
          completedPlans: 2,
          averageScore: 7.8,
          bestScore: 9.2,
          recentActivities: [
            { date: '2026-04-18', activity: '完成正手分析', score: 8.2 },
            { date: '2026-04-15', activity: '完成反手分析', score: 7.5 },
            { date: '2026-04-10', activity: '开始新的训练计划' }
          ]
        };
        
        setUser(mockUser);
        setStats(mockStats);
      } catch (error) {
        console.error('获取用户信息失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (isLoading) {
    return <div className="loading">加载中...</div>;
  }

  if (!user || !stats) {
    return <div className="error">用户信息不存在</div>;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h2>个人中心</h2>
        
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={user.avatar} alt="用户头像" />
          </div>
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-level">等级: {user.level}</p>
            <p className="join-date">加入时间: {user.joinDate}</p>
          </div>
          <button className="btn btn-secondary" onClick={handleLogout}>
            退出登录
          </button>
        </div>

        <div className="stats-section">
          <h4>统计数据</h4>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalAnalyses}</div>
              <div className="stat-label">总分析次数</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.totalPlans}</div>
              <div className="stat-label">总训练计划</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.completedPlans}</div>
              <div className="stat-label">已完成计划</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.averageScore}</div>
              <div className="stat-label">平均评分</div>
            </div>
          </div>
        </div>

        <div className="activities-section">
          <h4>最近活动</h4>
          <div className="activities-list">
            {stats.recentActivities.map((activity: any, index: number) => (
              <div key={index} className="activity-item">
                <div className="activity-date">{activity.date}</div>
                <div className="activity-content">
                  <p>{activity.activity}</p>
                  {activity.score && <span className="activity-score">评分: {activity.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h4>账户设置</h4>
          <div className="settings-list">
            <div className="setting-item">
              <span>修改密码</span>
              <button className="btn btn-sm">修改</button>
            </div>
            <div className="setting-item">
              <span>个人信息</span>
              <button className="btn btn-sm">编辑</button>
            </div>
            <div className="setting-item">
              <span>通知设置</span>
              <button className="btn btn-sm">设置</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;