// 数学工具函数

// 计算两个点之间的距离
export const calculateDistance = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
};

// 计算三个点形成的角度
export const calculateAngle = (
  point1: { x: number; y: number },
  point2: { x: number; y: number },
  point3: { x: number; y: number }
): number => {
  const radians = Math.atan2(point3.y - point2.y, point3.x - point2.x) -
    Math.atan2(point1.y - point2.y, point1.x - point2.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360.0 - angle;
  }
  return angle;
};

// 计算两点之间的斜率
export const calculateSlope = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number => {
  if (point2.x === point1.x) {
    return Infinity;
  }
  return (point2.y - point1.y) / (point2.x - point1.x);
};

// 计算两点之间的方向角（与x轴的夹角）
export const calculateDirection = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number => {
  const radians = Math.atan2(point2.y - point1.y, point2.x - point1.x);
  let degrees = (radians * 180.0) / Math.PI;
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
};

// 线性插值
export const linearInterpolation = (
  start: number,
  end: number,
  factor: number
): number => {
  return start + (end - start) * factor;
};

// 限制值在指定范围内
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// 计算平均值
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

// 计算标准差
export const calculateStandardDeviation = (values: number[]): number => {
  if (values.length <= 1) return 0;
  const mean = calculateAverage(values);
  const squaredDifferences = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / (values.length - 1);
  return Math.sqrt(variance);
};

// 检查值是否在指定范围内
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// 计算两点之间的中点
export const calculateMidpoint = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): { x: number; y: number } => {
  return {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2
  };
};

// 计算点到直线的距离
export const distanceToLine = (
  point: { x: number; y: number },
  lineStart: { x: number; y: number },
  lineEnd: { x: number; y: number }
): number => {
  const A = point.y - lineStart.y;
  const B = lineEnd.x - lineStart.x;
  const C = lineStart.x * lineEnd.y - lineEnd.x * lineStart.y;
  return Math.abs(A * lineEnd.x + B * point.y + C) / Math.sqrt(A * A + B * B);
};