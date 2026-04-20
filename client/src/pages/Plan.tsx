import React, { useState, useEffect } from 'react';

const Plan: React.FC = () => {
  const [trainingPlan, setTrainingPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    // 模拟获取训练计划
    const fetchPlan = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockPlan = {
          id: 'plan-1',
          name: '正手强化计划',
          duration: 4,
          weeklyPlans: [
            {
              week: 1,
              focus: '基础姿势',
              exercises: [
                {
                  name: '挥拍练习',
                  sets: 3,
                  reps: 10,
                  description: '对着镜子练习正手挥拍，注意姿势正确性'
                },
                {
                  name: '步法训练',
                  sets: 2,
                  reps: 15,
                  description: '练习左右移动步法，提高到位率'
                }
              ]
            },
            {
              week: 2,
              focus: '击球点控制',
              exercises: [
                {
                  name: '定点击球',
                  sets: 3,
                  reps: 8,
                  description: '在指定区域内击球，提高准确性'
                },
                {
                  name: '多球训练',
                  sets: 4,
                  reps: 12,
                  description: '连续击球练习，提高稳定性'
                }
              ]
            },
            {
              week: 3,
              focus: '发力链优化',
              exercises: [
                {
                  name: '核心力量训练',
                  sets: 3,
                  reps: 15,
                  description: '平板支撑、仰卧起坐等核心训练'
                },
                {
                  name: '完整动作练习',
                  sets: 3,
                  reps: 10,
                  description: '从准备到随挥的完整动作练习'
                }
              ]
            },
            {
              week: 4,
              focus: '实战应用',
              exercises: [
                {
                  name: '实战对抗',
                  sets: 2,
                  reps: 3,
                  description: '与搭档进行实战对抗练习'
                },
                {
                  name: '录像分析',
                  sets: 1,
                  reps: 1,
                  description: '录制自己的动作并进行分析'
                }
              ]
            }
          ]
        };
        
        setTrainingPlan(mockPlan);
      } catch (error) {
        console.error('获取训练计划失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlan();
  }, []);

  if (isLoading) {
    return <div className="loading">加载中...</div>;
  }

  if (!trainingPlan) {
    return <div className="error">训练计划不存在</div>;
  }

  const currentWeekPlan = trainingPlan.weeklyPlans.find((plan: any) => plan.week === currentWeek);

  return (
    <div className="plan-page">
      <div className="container">
        <h2>训练计划</h2>
        
        <div className="plan-header">
          <h3>{trainingPlan.name}</h3>
          <p>总时长: {trainingPlan.duration} 周</p>
        </div>

        <div className="week-selector">
          {trainingPlan.weeklyPlans.map((plan: any) => (
            <button
              key={plan.week}
              className={`week-btn ${currentWeek === plan.week ? 'active' : ''}`}
              onClick={() => setCurrentWeek(plan.week)}
            >
              第 {plan.week} 周
            </button>
          ))}
        </div>

        {currentWeekPlan && (
          <div className="week-plan">
            <h4>第 {currentWeek} 周: {currentWeekPlan.focus}</h4>
            <div className="exercises-list">
              {currentWeekPlan.exercises.map((exercise: any, index: number) => (
                <div key={index} className="exercise-card">
                  <h5>{exercise.name}</h5>
                  <div className="exercise-details">
                    <span>组数: {exercise.sets}</span>
                    <span>次数: {exercise.reps}</span>
                  </div>
                  <p className="exercise-description">{exercise.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="plan-actions">
          <button className="btn btn-primary">开始训练</button>
          <button className="btn btn-secondary">调整计划</button>
        </div>
      </div>
    </div>
  );
};

export default Plan;