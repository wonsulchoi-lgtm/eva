import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { generateEvaluationPlanFallback } from './src/utils/fallbackGenerator.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/evaluate/generate', async (req, res) => {
  const input = req.body;

  if (!input || !input.trainingObjectives || !input.trainingContents) {
    return res.status(400).json({
      error: '교육 목표와 교육 내용을 입력해 주세요.',
    });
  }

  const prompt = `
당신은 대한민국 최고 수준의 기업 교육(HRD) 및 평가 전문가입니다.
사용자가 입력한 교육 과정명, 교육 대상, 교육 목표, 교육 내용을 바탕으로, 도널드 커크패트릭(Donald Kirkpatrick)의 4단계 교육평가 모델(Kirkpatrick 4-Level Evaluation Model)에 입각한 종합적이고 체계적인 평가 도구 세트를 JSON 형식으로 생성해 주세요.

[입력 정보]
- 과정명: ${input.courseTitle || '미정'}
- 교육 대상: ${input.targetAudience || '일반 직무자'}
- 교육 기간/시간: ${input.trainingPeriod || '16시간'}
- 교육 방식: ${input.deliveryMethod || 'offline'}
- 교육 목표:
${input.trainingObjectives}
- 교육 내용/커리큘럼:
${input.trainingContents}
- 조직 배경/문제의식: ${input.businessContext || '현업 실무 역량 강화'}

[반드시 준수할 작성 원칙]
1. 1단계(반응 평가): 교육 종료 직후 실시할 5점 리커트 척도 설문 문항(카테고리별: 교육내용/난이도, 강사전문성/전달력, 현업적용기대도 등 최소 8문항 이상), 주관식 정성 질문 3개, 점수 구간별 진단 및 조치 가이드(Action Threshold)를 명확히 작성하세요.
2. 2단계(학습 평가): 교육 내용과 목표를 직접 검증하는 객관식 퀴즈 4문항(문제, 4지선다 보기, 정답 인덱스 0~3, 상세 해설, 연계된 교육 목표 명시)과 실무 수행/실기 과제 루브릭(과제명, 설명, 최소 3개 이상의 평가 기준과 배점, 상/중/하 구체적 행동 기준 기술)을 작성하세요.
3. 3단계(행동 평가): 교육 수료 후 30~60일 시점에 현업에서 관찰할 수 있는 구체적인 행동 체크리스트 항목 4개 이상(역량명, 구체적 관찰 행동, 측정 방식, 목표 빈도, 본인 자가점검 문구, 부서장 관찰 점검 문구), 60일 현업 실천 로드맵(Action Plan: 1~2주, 3~4주, 5~8주)을 작성하세요.
4. 4단계(결과 평가): 본 교육이 기여할 핵심 비즈니스 KPI 4개(정량/정성, baseline 값, target 값, 데이터 수집 출처, 교육 기여도 분리 방법), ROI 산출 프레임워크(총 편익 항목 3개 및 계산 근거 금액, 총 비용 항목 3개 및 계산 근거 금액, 교육 기여도 40~60%), 평가 실행 로드맵(준비기, 실행기, 전이기, 성과화기)을 상세히 작성하세요.

반드시 유효한 JSON 문자열만 응답하세요. JSON 외의 부가 설명이나 백틱(\`\`\`json)은 제외하거나 파싱 가능한 형태로 제공해 주세요.
JSON 스키마 구조:
{
  "executiveSummary": "문자열 (경영진 및 HRD 총괄 요약)",
  "matrixSummary": [
    {
      "level": 1,
      "name": "1단계: 반응 평가",
      "subtitle": "Reaction & Engagement",
      "target": "문자열",
      "timing": "문자열",
      "method": "문자열",
      "benchmark": "문자열",
      "color": "emerald"
    },
    ... (level 1~4)
  ],
  "level1": {
    "title": "1단계: 반응 평가 (Reaction & Engagement)",
    "purpose": "문자열",
    "targetScore": 4.3,
    "timing": "문자열",
    "categories": [
      {
        "categoryName": "문자열",
        "questions": [
          { "id": "l1-q1", "category": "문자열", "text": "문자열", "scaleMax": 5 }
        ]
      }
    ],
    "openQuestions": [
      { "id": "l1-oq1", "question": "문자열", "intent": "문자열" }
    ],
    "actionThresholds": [
      { "scoreRange": "4.5점 이상", "status": "탁월", "actionGuidance": "문자열" }
    ]
  },
  "level2": {
    "title": "2단계: 학습 평가 (Learning & Mastery)",
    "purpose": "문자열",
    "passingScore": 80,
    "knowledgeQuiz": [
      {
        "id": "l2-q1",
        "question": "문자열",
        "options": ["보기1", "보기2", "보기3", "보기4"],
        "correctAnswerIndex": 0,
        "explanation": "문자열",
        "targetObjective": "문자열"
      }
    ],
    "performanceRubric": {
      "taskTitle": "문자열",
      "taskDescription": "문자열",
      "criteria": [
        {
          "id": "rub-1",
          "dimension": "문자열",
          "weight": 30,
          "levels": { "high": "문자열", "medium": "문자열", "low": "문자열" }
        }
      ]
    },
    "prePostComparisonGuide": "문자열"
  },
  "level3": {
    "title": "3단계: 행동 평가 (Behavior & Transfer)",
    "purpose": "문자열",
    "evaluationTiming": "문자열",
    "evaluators": ["학습자 본인", "직속 팀장", "동료"],
    "behaviorItems": [
      {
        "id": "l3-b1",
        "competency": "문자열",
        "actionItem": "문자열",
        "measurementMethod": "문자열",
        "frequencyGoal": "문자열",
        "selfScorePrompt": "문자열",
        "managerScorePrompt": "문자열"
      }
    ],
    "actionPlan": {
      "title": "문자열",
      "steps": [
        {
          "period": "1~2주차",
          "actionGoal": "문자열",
          "deliverableOrEvidence": "문자열",
          "supportNeeded": "문자열"
        }
      ],
      "managerFollowUpChecklist": ["문자열"]
    }
  },
  "level4": {
    "title": "4단계: 결과 평가 (Business Results & ROI)",
    "purpose": "문자열",
    "measurementPeriod": "문자열",
    "businessKPIs": [
      {
        "id": "l4-k1",
        "kpiName": "문자열",
        "type": "정량(Quantitative)",
        "baselineValue": "문자열",
        "targetValue": "문자열",
        "dataSource": "문자열",
        "isolationMethod": "문자열"
      }
    ],
    "roiFramework": {
      "formulaExplanation": "문자열",
      "contributionRate": 50,
      "benefits": [
        { "id": "ben-1", "name": "문자열", "amount": 30000000, "basis": "문자열" }
      ],
      "costs": [
        { "id": "cost-1", "name": "문자열", "amount": 10000000, "basis": "문자열" }
      ]
    },
    "implementationRoadmap": [
      {
        "phase": "문자열",
        "timeline": "문자열",
        "milestone": "문자열",
        "responsible": "문자열"
      }
    ]
  }
}
`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log('No GEMINI_API_KEY provided; utilizing smart domain fallback generator.');
      const fallback = generateEvaluationPlanFallback(input);
      return res.json({ success: true, plan: fallback, source: 'template_engine' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Clean possible markdown code fences
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    const plan = {
      id: 'eval-' + Date.now(),
      createdAt: new Date().toISOString(),
      courseInput: input,
      executiveSummary: parsedData.executiveSummary || '',
      matrixSummary: parsedData.matrixSummary || [],
      level1: parsedData.level1,
      level2: parsedData.level2,
      level3: parsedData.level3,
      level4: parsedData.level4,
    };

    return res.json({ success: true, plan, source: 'gemini-3.8-flash' });
  } catch (error) {
    console.error('Error generating evaluation via Gemini:', error);
    // Graceful fallback to guarantee reliable output
    const fallback = generateEvaluationPlanFallback(input);
    return res.json({
      success: true,
      plan: fallback,
      source: 'fallback_engine',
      note: 'AI 서비스 응답 지연으로 최적화된 스마트 HRD 템플릿 엔진으로 생성되었습니다.',
    });
  }
});

// Serve frontend in production or via Vite in development
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
