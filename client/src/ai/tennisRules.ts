// 网球专业规则库
// 包含各种网球动作的标准参数和评分标准

export interface TennisAction {
  type: string;
  name: string;
  description: string;
  keyPoints: {
    name: string;
    description: string;
    idealRange: [number, number]; // 理想角度范围或位置范围
  }[];
  commonMistakes: {
    name: string;
    description: string;
    correction: string;
  }[];
}

// 正手动作标准
export const forehandAction: TennisAction = {
  type: 'forehand',
  name: '正手抽击',
  description: '网球基本技术之一，用于击打身体右侧的来球',
  keyPoints: [
    {
      name: '握拍方式',
      description: '推荐使用半西方式握拍',
      idealRange: [0, 0],
    },
    {
      name: '准备姿势',
      description: '双脚与肩同宽，膝盖微屈，重心降低',
      idealRange: [0, 0],
    },
    {
      name: '引拍',
      description: '转肩引拍，球拍后摆，拍面打开',
      idealRange: [0, 0],
    },
    {
      name: '击球点',
      description: '位于身体前方，腰部高度',
      idealRange: [0, 0],
    },
    {
      name: '随挥',
      description: '球拍随球方向挥出，完成随挥动作',
      idealRange: [0, 0],
    },
  ],
  commonMistakes: [
    {
      name: '击球点太后',
      description: '击球点位于身体后方，影响击球效果',
      correction: '提前准备，步法到位，确保击球点在身体前方',
    },
    {
      name: '随挥不完整',
      description: '随挥动作不充分，影响击球力量和控制',
      correction: '练习完整的随挥动作，确保球拍充分跟进',
    },
    {
      name: '重心转移不足',
      description: '击球时重心没有从后脚转移到前脚',
      correction: '练习重心转移，击球时向前迈步，重心前移',
    },
  ],
};

// 反手动作标准
export const backhandAction: TennisAction = {
  type: 'backhand',
  name: '反手抽击',
  description: '用于击打身体左侧的来球，有单手和双手两种方式',
  keyPoints: [
    {
      name: '握拍方式',
      description: '单手反手使用东方式或大陆式握拍，双手反手使用半西方式',
      idealRange: [0, 0],
    },
    {
      name: '准备姿势',
      description: '双脚与肩同宽，膝盖微屈，重心降低',
      idealRange: [0, 0],
    },
    {
      name: '引拍',
      description: '转肩引拍，球拍后摆，拍面打开',
      idealRange: [0, 0],
    },
    {
      name: '击球点',
      description: '位于身体前方，腰部高度',
      idealRange: [0, 0],
    },
    {
      name: '随挥',
      description: '球拍随球方向挥出，完成随挥动作',
      idealRange: [0, 0],
    },
  ],
  commonMistakes: [
    {
      name: '握拍不正确',
      description: '握拍方式不当，影响击球效果',
      correction: '调整握拍方式，确保手腕稳定',
    },
    {
      name: '身体转动不够',
      description: '击球时身体转动不充分，影响力量发挥',
      correction: '加强转肩练习，提高身体协调性',
    },
    {
      name: '步法移动不足',
      description: '步法到位不及时，影响击球点选择',
      correction: '加强步法训练，提高移动速度和准确性',
    },
  ],
};

// 发球动作标准
export const serveAction: TennisAction = {
  type: 'serve',
  name: '发球',
  description: '比赛开始的击球动作，分为平击发球、上旋发球和切削发球',
  keyPoints: [
    {
      name: '握拍方式',
      description: '使用大陆式握拍',
      idealRange: [0, 0],
    },
    {
      name: '抛球',
      description: '抛球高度适中，位于身体前方',
      idealRange: [0, 0],
    },
    {
      name: '引拍',
      description: '手臂后摆，身体向后倾斜',
      idealRange: [0, 0],
    },
    {
      name: '击球',
      description: '在最高点击球，充分利用身体力量',
      idealRange: [0, 0],
    },
    {
      name: '随挥',
      description: '球拍随球方向挥出，完成随挥动作',
      idealRange: [0, 0],
    },
  ],
  commonMistakes: [
    {
      name: '抛球不稳定',
      description: '抛球高度和位置不一致，影响击球稳定性',
      correction: '练习抛球动作，确保抛球高度和位置稳定',
    },
    {
      name: '手臂发力不足',
      description: '击球时手臂力量不足，影响发球速度',
      correction: '加强手臂力量训练，提高发球力量',
    },
    {
      name: '身体协调不好',
      description: '身体各部位协调不一致，影响发球效果',
      correction: '练习完整的发球动作，提高身体协调性',
    },
  ],
};

// 截击动作标准
export const volleyAction: TennisAction = {
  type: 'volley',
  name: '截击',
  description: '在球落地前击球的动作，通常在网前使用',
  keyPoints: [
    {
      name: '握拍方式',
      description: '使用大陆式握拍',
      idealRange: [0, 0],
    },
    {
      name: '准备姿势',
      description: '双脚分开，膝盖微屈，重心降低，球拍举在身前',
      idealRange: [0, 0],
    },
    {
      name: '击球',
      description: '在球反弹前击球，拍面控制球的方向',
      idealRange: [0, 0],
    },
    {
      name: '随挥',
      description: '随挥动作简短，保持身体平衡',
      idealRange: [0, 0],
    },
  ],
  commonMistakes: [
    {
      name: '拍面角度不当',
      description: '拍面角度控制不好，影响球的方向',
      correction: '练习拍面控制，根据来球调整拍面角度',
    },
    {
      name: '身体重心过高',
      description: '击球时身体重心过高，影响稳定性',
      correction: '降低身体重心，保持平衡',
    },
    {
      name: '反应速度慢',
      description: '反应速度不够快，无法及时击球',
      correction: '加强反应速度训练，提高判断能力',
    },
  ],
};

// 所有动作标准
export const tennisActions: TennisAction[] = [
  forehandAction,
  backhandAction,
  serveAction,
  volleyAction,
];

// 获取动作标准
export const getActionStandard = (type: string): TennisAction | undefined => {
  return tennisActions.find(action => action.type === type);
};

// 评分标准
export const scoringCriteria = {
  posture: {
    weight: 0.25,
    description: '身体姿势的正确性',
  },
  rhythm: {
    weight: 0.25,
    description: '动作的节奏感和时机',
  },
  powerChain: {
    weight: 0.3,
    description: '力量传递的有效性',
  },
  stability: {
    weight: 0.2,
    description: '动作的稳定性和平衡性',
  },
};