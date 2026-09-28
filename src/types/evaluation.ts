export type DeliveryMethod = 'offline' | 'online' | 'hybrid' | 'blended';

export interface CourseInput {
  courseTitle: string;
  targetAudience: string;
  trainingPeriod: string;
  deliveryMethod: DeliveryMethod;
  trainingObjectives: string;
  trainingContents: string;
  businessContext?: string;
}

export interface MatrixItem {
  level: number;
  name: string;
  subtitle: string;
  target: string;
  timing: string;
  method: string;
  benchmark: string;
  color: string;
}

export interface LikertQuestion {
  id: string;
  text: string;
  category: string;
  scaleMax: number;
}

export interface OpenQuestion {
  id: string;
  question: string;
  intent: string;
}

export interface ActionThreshold {
  scoreRange: string;
  status: string;
  actionGuidance: string;
}

export interface Level1ReactionData {
  title: string;
  purpose: string;
  targetScore: number;
  timing: string;
  categories: {
    categoryName: string;
    questions: LikertQuestion[];
  }[];
  openQuestions: OpenQuestion[];
  actionThresholds: ActionThreshold[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  targetObjective: string;
}

export interface RubricCriterion {
  id: string;
  dimension: string;
  weight: number;
  levels: {
    high: string; // 상 (우수)
    medium: string; // 중 (보통)
    low: string; // 하 (미흡)
  };
}

export interface Level2LearningData {
  title: string;
  purpose: string;
  passingScore: number;
  knowledgeQuiz: QuizQuestion[];
  performanceRubric: {
    taskTitle: string;
    taskDescription: string;
    criteria: RubricCriterion[];
  };
  prePostComparisonGuide: string;
}

export interface BehaviorItem {
  id: string;
  competency: string;
  actionItem: string;
  measurementMethod: string;
  frequencyGoal: string;
  selfScorePrompt: string;
  managerScorePrompt: string;
}

export interface ActionPlanStep {
  period: string;
  actionGoal: string;
  deliverableOrEvidence: string;
  supportNeeded: string;
}

export interface Level3BehaviorData {
  title: string;
  purpose: string;
  evaluationTiming: string;
  evaluators: string[];
  behaviorItems: BehaviorItem[];
  actionPlan: {
    title: string;
    steps: ActionPlanStep[];
    managerFollowUpChecklist: string[];
  };
}

export interface BusinessKPI {
  id: string;
  kpiName: string;
  type: '정량(Quantitative)' | '정성(Qualitative)';
  baselineValue: string;
  targetValue: string;
  dataSource: string;
  isolationMethod: string;
}

export interface CostOrBenefitItem {
  id: string;
  name: string;
  amount: number;
  basis: string;
}

export interface Level4ResultsData {
  title: string;
  purpose: string;
  measurementPeriod: string;
  businessKPIs: BusinessKPI[];
  roiFramework: {
    formulaExplanation: string;
    benefits: CostOrBenefitItem[];
    costs: CostOrBenefitItem[];
    contributionRate: number; // e.g. 50%
  };
  implementationRoadmap: {
    phase: string;
    timeline: string;
    milestone: string;
    responsible: string;
  }[];
}

export interface EvaluationPlan {
  id: string;
  createdAt: string;
  courseInput: CourseInput;
  executiveSummary: string;
  matrixSummary: MatrixItem[];
  level1: Level1ReactionData;
  level2: Level2LearningData;
  level3: Level3BehaviorData;
  level4: Level4ResultsData;
}
