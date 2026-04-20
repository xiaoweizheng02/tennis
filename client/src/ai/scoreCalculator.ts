import { scoringCriteria } from './tennisRules';

interface Keypoint {
  x: number;
  y: number;
  score: number;
}

interface SkeletonData {
  keypoints: Keypoint[];
}

interface ScoreBreakdown {
  posture: number;
  rhythm: number;
  powerChain: number;
  stability: number;
}

interface ScoreResult {
  score: number;
  breakdown: ScoreBreakdown;
  suggestions: string[];
}

class ScoreCalculator {
  // 计算总体评分
  calculateScore(skeletonData: SkeletonData, actionType: string): ScoreResult {
    const breakdown = this.calculateBreakdown(skeletonData, actionType);
    const score = this.calculateTotalScore(breakdown);
    const suggestions = this.generateSuggestions(breakdown, actionType);

    return {
      score,
      breakdown,
      suggestions,
    };
  }

  // 计算各维度评分
  private calculateBreakdown(skeletonData: SkeletonData, actionType: string): ScoreBreakdown {
    const { keypoints } = skeletonData;

    // 计算姿态评分
    const posture = this.calculatePostureScore(keypoints, actionType);

    // 计算节奏评分
    const rhythm = this.calculateRhythmScore(keypoints, actionType);

    // 计算发力链评分
    const powerChain = this.calculatePowerChainScore(keypoints, actionType);

    // 计算稳定性评分
    const stability = this.calculateStabilityScore(keypoints, actionType);

    return {
      posture,
      rhythm,
      powerChain,
      stability,
    };
  }

  // 计算总体评分
  private calculateTotalScore(breakdown: ScoreBreakdown): number {
    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(breakdown).forEach(([key, value]) => {
      const criterion = scoringCriteria[key as keyof typeof scoringCriteria];
      if (criterion) {
        totalScore += value * criterion.weight;
        totalWeight += criterion.weight;
      }
    });

    return totalWeight > 0 ? Math.round(totalScore * 10) / 10 : 0;
  }

  // 计算姿态评分
  private calculatePostureScore(keypoints: Keypoint[], actionType: string): number {
    // 这里实现姿态评分的具体逻辑
    // 例如：检查身体各部位的位置和角度
    
    // 模拟评分
    return 8.0;
  }

  // 计算节奏评分
  private calculateRhythmScore(keypoints: Keypoint[], actionType: string): number {
    // 这里实现节奏评分的具体逻辑
    // 例如：分析动作的时机和流畅度
    
    // 模拟评分
    return 7.0;
  }

  // 计算发力链评分
  private calculatePowerChainScore(keypoints: Keypoint[], actionType: string): number {
    // 这里实现发力链评分的具体逻辑
    // 例如：分析力量从腿部到手臂的传递
    
    // 模拟评分
    return 7.5;
  }

  // 计算稳定性评分
  private calculateStabilityScore(keypoints: Keypoint[], actionType: string): number {
    // 这里实现稳定性评分的具体逻辑
    // 例如：分析身体的平衡和稳定性
    
    // 模拟评分
    return 8.0;
  }

  // 生成改进建议
  private generateSuggestions(breakdown: ScoreBreakdown, actionType: string): string[] {
    const suggestions: string[] = [];

    // 根据各维度评分生成建议
    if (breakdown.posture < 7.5) {
      suggestions.push('身体姿势需要调整，保持正确的击球姿态');
    }

    if (breakdown.rhythm < 7.5) {
      suggestions.push('动作节奏需要改进，注意击球时机');
    }

    if (breakdown.powerChain < 7.5) {
      suggestions.push('发力链需要优化，加强力量传递');
    }

    if (breakdown.stability < 7.5) {
      suggestions.push('身体稳定性需要提高，加强核心力量');
    }

    // 根据动作类型生成特定建议
    switch (actionType) {
      case 'forehand':
        suggestions.push('击球点可以更靠前');
        suggestions.push('随挥动作不够完整');
        break;
      case 'backhand':
        suggestions.push('握拍方式需要调整');
        suggestions.push('身体转动不够充分');
        break;
      case 'serve':
        suggestions.push('抛球高度需要调整');
        suggestions.push('手臂挥动轨迹需要优化');
        break;
      case 'volley':
        suggestions.push('拍面角度需要调整');
        suggestions.push('身体重心需要降低');
        break;
    }

    return suggestions;
  }

  // 计算两个点之间的角度
  calculateAngle(
    point1: { x: number; y: number },
    point2: { x: number; y: number },
    point3: { x: number; y: number }
  ): number {
    const radians = Math.atan2(point3.y - point2.y, point3.x - point2.x) -
      Math.atan2(point1.y - point2.y, point1.x - point2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) {
      angle = 360.0 - angle;
    }
    return angle;
  }

  // 计算两个点之间的距离
  calculateDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ): number {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }

  // 检查点是否在理想范围内
  isInIdealRange(value: number, idealRange: [number, number]): boolean {
    return value >= idealRange[0] && value <= idealRange[1];
  }
}

export default new ScoreCalculator();