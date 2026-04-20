import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ScoreChartProps {
  comparisonData: {
    yourScore: number;
    professionalScore: number;
    averageScore: number;
  };
}

const ScoreChart: React.FC<ScoreChartProps> = ({ comparisonData }) => {
  const data = {
    labels: ['姿态', '节奏', '发力链', '稳定性'],
    datasets: [
      {
        label: '你的评分',
        data: [8.0, 7.0, 7.5, 8.0],
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
      },
      {
        label: '专业评分',
        data: [9.5, 9.0, 9.5, 9.0],
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 2,
      },
      {
        label: '平均评分',
        data: [6.5, 6.0, 6.5, 6.8],
        backgroundColor: 'rgba(155, 89, 182, 0.2)',
        borderColor: 'rgba(155, 89, 182, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  return (
    <div className="score-chart">
      <Radar data={data} options={options} />
      <div className="chart-summary">
        <div className="summary-item">
          <span className="summary-label">你的评分:</span>
          <span className="summary-value">{comparisonData.yourScore}/10</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">专业评分:</span>
          <span className="summary-value">{comparisonData.professionalScore}/10</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">平均评分:</span>
          <span className="summary-value">{comparisonData.averageScore}/10</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;