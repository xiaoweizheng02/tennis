import React, { useRef, useEffect } from 'react';

interface SkeletonCanvasProps {
  skeletonData: {
    keypoints: Array<{
      x: number;
      y: number;
      score: number;
    }>;
  };
}

const SkeletonCanvas: React.FC<SkeletonCanvasProps> = ({ skeletonData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 定义骨骼连接
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 7], // 头部
      [0, 4], [4, 5], [5, 6], [6, 8], // 头部
      [9, 10], // 肩部
      [11, 12], [12, 14], [14, 16], [16, 18], [18, 20], [20, 16], // 右臂
      [11, 13], [13, 15], [15, 17], [17, 19], [19, 17], // 左臂
      [23, 24], [24, 26], [26, 28], [28, 30], [30, 32], [32, 28], // 右腿
      [23, 25], [25, 27], [27, 29], [29, 31], [31, 29]  // 左腿
    ];

    // 绘制骨骼点
    skeletonData.keypoints.forEach((keypoint, index) => {
      if (keypoint.score > 0.5) {
        const x = (keypoint.x / 100) * canvas.width;
        const y = (keypoint.y / 100) * canvas.height;

        // 绘制点
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#3498db';
        ctx.fill();

        // 绘制点编号
        ctx.font = '12px Arial';
        ctx.fillStyle = '#333';
        ctx.fillText(index.toString(), x + 8, y - 8);
      }
    });

    // 绘制骨骼连接
    connections.forEach(([start, end]) => {
      const startKeypoint = skeletonData.keypoints[start];
      const endKeypoint = skeletonData.keypoints[end];

      if (startKeypoint.score > 0.5 && endKeypoint.score > 0.5) {
        const startX = (startKeypoint.x / 100) * canvas.width;
        const startY = (startKeypoint.y / 100) * canvas.height;
        const endX = (endKeypoint.x / 100) * canvas.width;
        const endY = (endKeypoint.y / 100) * canvas.height;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }, [skeletonData]);

  return (
    <div className="skeleton-canvas-container">
      <canvas
        ref={canvasRef}
        width={400}
        height={600}
        className="skeleton-canvas"
      />
    </div>
  );
};

export default SkeletonCanvas;