import { CourseInput, EvaluationPlan } from '../types/evaluation';

export function generateEvaluationPlanFallback(input: CourseInput): EvaluationPlan {
  const objectives = input.trainingObjectives
    .split('\n')
    .map(s => s.trim().replace(/^[\d.-]+\s*/, ''))
    .filter(Boolean);

  const mainObjective1 = objectives[0] || '핵심 원리 및 핵심 스킬 습득';
  const mainObjective2 = objectives[1] || '현업 실무 적용 프로세스 체화';
  const mainObjective3 = objectives[2] || '문제 해결 및 성과 창출 역량 제고';

  const title = input.courseTitle || '역량 강화 교육과정';
  const audience = input.targetAudience || '교육 대상자 전원';

  return {
    id: 'eval-' + Date.now(),
    createdAt: new Date().toISOString(),
    courseInput: input,
    executiveSummary: `본 평가는 [${title}] 과정의 교육적 효과성과 현업 비즈니스 임팩트를 측정하기 위해 설계된 커크패트릭(Kirkpatrick) 4단계 통합 평가 체계입니다. 교육 종료 직후의 만족도(1단계: 반응)부터 지식·스킬 습득도(2단계: 학습), 현업 복귀 30~60일 후의 구체적 행동 전이(3단계: 행동), 그리고 최종적으로 조직의 생산성 향상 및 비용 절감 등 비즈니스 성과(4단계: 결과/ROI)를 유기적으로 연계하여 지속 가능한 성과 창출을 견인합니다.`,
    matrixSummary: [
      {
        level: 1,
        name: '1단계: 반응 평가',
        subtitle: 'Reaction & Engagement',
        target: '학습자 전원 (' + audience + ')',
        timing: '교육 종료 직후 (모바일 설문)',
        method: '5점 리커트 척도 만족도 설문 및 정성 의견',
        benchmark: '평균 4.3점 이상 / 5.0점 만점',
        color: 'emerald',
      },
      {
        level: 2,
        name: '2단계: 학습 평가',
        subtitle: 'Learning & Mastery',
        target: '학습자 전원',
        timing: '교육 중 및 종료 시점',
        method: '지식 진단 퀴즈 & 실기 실습 루브릭 평가',
        benchmark: '80점 이상 합격 (사전 대비 +25%p 향상)',
        color: 'blue',
      },
      {
        level: 3,
        name: '3단계: 행동 평가',
        subtitle: 'Behavior & Transfer',
        target: '학습자 본인 및 직속 부서장(팀장)',
        timing: '교육 수료 후 30일 ~ 60일',
        method: '현업 적용 다면 체크리스트 & 액션플랜 점검',
        benchmark: '행동 전이도 80% 이상 지속 유지',
        color: 'indigo',
      },
      {
        level: 4,
        name: '4단계: 결과 평가',
        subtitle: 'Business Results & ROI',
        target: '조직 단위 및 부서 핵심 KPI',
        timing: '교육 수료 후 3개월 ~ 6개월',
        method: '비즈니스 성과 지표(KPI) 분석 및 ROI 산출',
        benchmark: '목표 KPI 달성 및 순 ROI 150% 이상',
        color: 'purple',
      },
    ],
    level1: {
      title: '1단계: 반응 평가 (Reaction & Engagement)',
      purpose: '교육 프로그램의 적합성, 강사 전문성, 학습 환경, 그리고 현업 적용에 대한 학습자의 기대와 몰입 수준을 종합적으로 측정합니다.',
      targetScore: 4.3,
      timing: '교육 종료 15분 전 온라인/모바일 설문 링크 배포',
      categories: [
        {
          categoryName: '교육 내용 및 커리큘럼',
          questions: [
            {
              id: 'l1-q1',
              category: '교육 내용 및 커리큘럼',
              text: `본 교육은 제시된 교육 목표('${mainObjective1}')를 달성하기에 체계적으로 구성되었다.`,
              scaleMax: 5,
            },
            {
              id: 'l1-q2',
              category: '교육 내용 및 커리큘럼',
              text: '교육 내용의 난이도는 대상자의 직무 수준에 적절하였으며, 실무 연계성이 높았다.',
              scaleMax: 5,
            },
            {
              id: 'l1-q3',
              category: '교육 내용 및 커리큘럼',
              text: '이론 설명과 실습/사례 분석의 비율이 적절하여 학습 몰입을 유지할 수 있었다.',
              scaleMax: 5,
            },
          ],
        },
        {
          categoryName: '교수자(강사) 역량 및 전달력',
          questions: [
            {
              id: 'l1-q4',
              category: '교수자(강사) 역량 및 전달력',
              text: '강사는 해당 분야에 대한 전문 지식과 풍부한 실무 경험을 바탕으로 강의를 진행하였다.',
              scaleMax: 5,
            },
            {
              id: 'l1-q5',
              category: '교수자(강사) 역량 및 전달력',
              text: '학습자의 질문에 성실히 답변하고, 원활한 피드백과 상호작용을 유도하였다.',
              scaleMax: 5,
            },
          ],
        },
        {
          categoryName: '현업 적용 기대도 및 유용성',
          questions: [
            {
              id: 'l1-q6',
              category: '현업 적용 기대도 및 유용성',
              text: `학습한 내용('${mainObjective2}')은 나의 실제 업무 성과 향상에 직접적인 도움이 될 것이다.`,
              scaleMax: 5,
            },
            {
              id: 'l1-q7',
              category: '현업 적용 기대도 및 유용성',
              text: '교육 종료 후 30일 이내에 본 과정에서 배운 핵심 도구 및 방법론을 실무에 적용할 의향이 있다.',
              scaleMax: 5,
            },
            {
              id: 'l1-q8',
              category: '현업 적용 기대도 및 유용성',
              text: '본 교육 과정을 동일 직무의 동료나 후배에게 적극 추천하고 싶다.',
              scaleMax: 5,
            },
          ],
        },
      ],
      openQuestions: [
        {
          id: 'l1-oq1',
          question: '본 교육 과정 중 실무에 가장 유익했거나 인상 깊었던 모듈과 그 이유는 무엇입니까?',
          intent: '핵심 성공 모듈 도출 및 향후 심화 과정 기획 반영',
        },
        {
          id: 'l1-oq2',
          question: '배운 내용을 현업에 적용할 때 예상되는 장애 요인(시간, 시스템, 부서 지원 등)은 무엇입니까?',
          intent: '3단계 행동 전이 저해 요인 사전 발굴 및 지원 대책 수립',
        },
        {
          id: 'l1-oq3',
          question: '향후 본 교육의 완성도를 높이기 위해 보완하거나 추가되었으면 하는 사항을 자유롭게 제안해 주십시오.',
          intent: '차기 과정 운영 및 콘텐츠 개선 피드백 확보',
        },
      ],
      actionThresholds: [
        {
          scoreRange: '4.5점 이상',
          status: '탁월 (Excellence)',
          actionGuidance: '교육 모범 사례로 사내 전파, 정규 필수 과정 지정 및 심화 과정 개설 검토',
        },
        {
          scoreRange: '4.0 ~ 4.4점',
          status: '양호 (Satisfactory)',
          actionGuidance: '기본 목표 달성. 정성 의견을 분석하여 미흡 문항(평균 3.8점 이하 문항) 중심 부분 보완',
        },
        {
          scoreRange: '3.5 ~ 3.9점',
          status: '개선 필요 (Needs Improvement)',
          actionGuidance: '강사 전달력 또는 커리큘럼 난이도 재조정, 실습 시간 확대 및 학습자 사전 진단 강화',
        },
        {
          scoreRange: '3.5점 미만',
          status: '위험 (Critical)',
          actionGuidance: '과정 운영 중단 및 원인 심층 인터뷰(FGI) 실시, 강사진 교체 또는 교육 설계 전면 재검토',
        },
      ],
    },
    level2: {
      title: '2단계: 학습 평가 (Learning & Mastery)',
      purpose: '교육을 통해 학습자가 목표했던 지식, 기술, 프로세스를 명확하게 습득하였는지를 객관식 테스트 및 실무 수행 루브릭으로 다면 평가합니다.',
      passingScore: 80,
      knowledgeQuiz: [
        {
          id: 'l2-q1',
          question: `다음 중 [${title}]에서 제시한 핵심 개념 및 원칙에 대한 설명으로 가장 올바른 것은?`,
          options: [
            '단기적인 문제 해결에만 집중하고 중장기적 표준화는 생략한다.',
            `체계적인 프로세스를 준수하여 '${mainObjective1}'의 원칙을 바탕으로 단계별 실행 계획을 수립해야 한다.`,
            '모든 결정을 직관에 의존하며 데이터 기반 분석은 최소화한다.',
            '개인 단위로만 업무를 처리하고 부서 간 협업이나 피드백은 지양한다.',
          ],
          correctAnswerIndex: 1,
          explanation: `본 과정의 핵심 원칙은 단계별 표준 프로세스를 기반으로 체계적인 실행과 피드백을 진행하는 것입니다. (${mainObjective1})`,
          targetObjective: mainObjective1,
        },
        {
          id: 'l2-q2',
          question: `실무 적용 상황에서 '${mainObjective2}'를 구현하기 위한 첫 번째 핵심 단계는 무엇인가?`,
          options: [
            '현황 및 장애 요인을 객관적으로 데이터로 진단하고 구체적인 실행 목표를 합의한다.',
            '즉각적인 결과 도출을 위해 검증되지 않은 새로운 방식을 즉시 배포한다.',
            '기존의 모든 업무 절차를 예고 없이 전면 폐기한다.',
            '상급자에게 모든 판단을 위임하고 별도의 분석 절차를 거치지 않는다.',
          ],
          correctAnswerIndex: 0,
          explanation: '현업 적용의 성공을 위해서는 현재 상태의 데이터 기반 진단과 명확한 목표 합의가 선행되어야 합니다.',
          targetObjective: mainObjective2,
        },
        {
          id: 'l2-q3',
          question: '본 교육에서 다룬 도구 및 방법론을 활용할 때 오류를 방지하기 위한 체크리스트 항목으로 적절하지 않은 것은?',
          options: [
            '수행 전 필수 입력 데이터 및 사전 조건을 재확인한다.',
            '결과물에 대한 정량적/정성적 검증 기준을 사전에 설정한다.',
            '일정이 촉박한 경우 핵심 검증 단계를 생략하고 최종 승인 절차를 건너뛴다.',
            '수행 과정에서 발견된 예외 상황을 기록하고 사후 개선 항목으로 등록한다.',
          ],
          correctAnswerIndex: 2,
          explanation: '일정이 촉박하더라도 핵심 검증 단계를 생략하는 것은 품질 결함 및 재작업 리스크를 초래하므로 금지됩니다.',
          targetObjective: mainObjective3,
        },
        {
          id: 'l2-q4',
          question: `다음 상황 시나리오에서 학습한 기술('${mainObjective3}')을 가장 효과적으로 적용한 사례는?`,
          options: [
            '문제가 발생했을 때 개인의 책임으로 돌리고 추가 조치를 취하지 않은 경우',
            '근본 원인을 다각도로 분석(5-Why, 원인분석표 등)하여 재발 방지 매뉴얼을 작성하고 팀에 공유한 경우',
            '기존 관행만을 고수하며 교육에서 배운 새로운 기법의 도입을 거부한 경우',
            '결과물에 대한 동료 검토 없이 단독으로 최종 완료 처리한 경우',
          ],
          correctAnswerIndex: 1,
          explanation: '근본 원인 분석과 재발 방지 매뉴얼화, 그리고 팀 내 지식 공유가 교육 목표에 부합하는 모범 적용 사례입니다.',
          targetObjective: mainObjective3,
        },
      ],
      performanceRubric: {
        taskTitle: `[실기 과제] ${title} 실전 시나리오 기반 수행 계획서 및 결과물 작성`,
        taskDescription: '제시된 실무 가상 케이스 또는 본인의 실제 부서 과제를 바탕으로 교육에서 학습한 프레임워크와 도구를 적용하여 1건의 완결된 실행 결과물(또는 분석 보고서)을 제출하고 상호 평가합니다.',
        criteria: [
          {
            id: 'rub-c1',
            dimension: '개념 이해 및 원칙 적용의 정확성',
            weight: 30,
            levels: {
              high: `교육에서 다룬 핵심 원리('${mainObjective1}')와 도구를 누락 없이 정확하게 해석하고 케이스에 최적화하여 적용함.`,
              medium: '핵심 도구의 대부분을 올바르게 적용하였으나 일부 디테일한 원칙 적용에서 경미한 보완점이 있음.',
              low: '교육 원리에 대한 이해가 부족하여 엉뚱한 방법론을 적용하거나 필수 구성 항목이 다수 누락됨.',
            },
          },
          {
            id: 'rub-c2',
            dimension: '실무 문제 해결 및 현실 타당성',
            weight: 40,
            levels: {
              high: '현실적인 제약조건을 고려한 실현 가능한 솔루션을 도출하였으며, 논리적 근거와 기대 효과가 매우 구체적임.',
              medium: '솔루션의 타당성은 인정되나, 실행 단계에서의 세부 리스크 대응 방안이 다소 추상적임.',
              low: '비현실적인 가정에 의존하거나 실제 업무 환경에서 적용하기 어려운 일방적 해결책을 제시함.',
            },
          },
          {
            id: 'rub-c3',
            dimension: '산출물 완성도 및 전달력',
            weight: 30,
            levels: {
              high: '정해진 양식과 가이드라인을 완벽히 준수하였으며, 시각화 및 논리 전개가 명료하여 타인이 즉시 활용 가능함.',
              medium: '양식을 준수하였으나 표현이 다소 장황하거나 시각적 구조화가 일부 미흡함.',
              low: '형식적 요건을 충족하지 못하였고, 내용 전달이 불명확하여 추가 설명 없이는 이해하기 어려움.',
            },
          },
        ],
      },
      prePostComparisonGuide: '교육 시작 전 사전 지식 진단(10문항)과 수료 직후 사후 진단(동일 또는 동등 문항)을 실시하여 개인별 및 부서별 점수 향상 폭(Normalized Gain)을 산출합니다. 평균 +25점 이상의 성취도 향상을 목표로 합니다.',
    },
    level3: {
      title: '3단계: 행동 평가 (Behavior & Transfer)',
      purpose: '교육에서 배운 지식과 스킬이 일회성 학습에 그치지 않고, 수료 후 실제 업무 현장에서 지속적인 행동 변화(Learning Transfer)로 발현되는지를 다면적으로 추적합니다.',
      evaluationTiming: '교육 수료 후 30일차(1차 자가 점검) 및 60일차(2차 부서장 관찰 평가)',
      evaluators: ['학습자 본인 (자가 진단)', '직속 부서장 / 팀장 (관찰자 평가)', '협업 동료 (참고 지표)'],
      behaviorItems: [
        {
          id: 'l3-b1',
          competency: '목표 및 프로세스 표준 준수',
          actionItem: `업무 착수 시 교육에서 학습한 '${mainObjective1}' 프로세스에 따라 체크리스트를 점검하고 작업 순서를 준수한다.`,
          measurementMethod: '산출물 검토 및 프로세스 준수율 확인',
          frequencyGoal: '관련 업무 수행 시 90% 이상 적용',
          selfScorePrompt: '나는 업무 수행 시 교육에서 배운 표준 프로세스를 의식적으로 적용하고 있는가?',
          managerScorePrompt: '팀원은 업무 진행 시 교육받은 표준 프로세스를 일관되게 실천하고 있는가?',
        },
        {
          id: 'l3-b2',
          competency: '핵심 도구 및 방법론 실무 활용',
          actionItem: `실무 과제 해결 시 본 과정의 전용 도구/프레임워크('${mainObjective2}')를 주 2회 이상 능동적으로 활용한다.`,
          measurementMethod: '실제 활용 문서/파일 및 도구 사용 로그 확인',
          frequencyGoal: '주 2회 이상 정기적 활용',
          selfScorePrompt: '나는 과거의 관행 대신 교육에서 배운 새로운 기법을 주도적으로 시도하는가?',
          managerScorePrompt: '팀원이 새로운 도구와 방법론을 실제 업무에 효과적으로 접목하고 있는가?',
        },
        {
          id: 'l3-b3',
          competency: '품질 검증 및 지속적 개선 활동',
          actionItem: '결과물 제출 전 사전 검증 기준에 따른 자체 리뷰를 수행하고, 발생한 이슈를 기록하여 개선안을 제안한다.',
          measurementMethod: '자체 리뷰 체크리스트 제출 및 개선 제안 건수',
          frequencyGoal: '월 1건 이상 개선 아이디어 반영',
          selfScorePrompt: '나는 결과물의 완성도를 높이기 위해 사전 검증 기준을 철저히 검토하는가?',
          managerScorePrompt: '팀원의 작업 오류나 재작업 빈도가 교육 전 대비 눈에 띄게 감소하였는가?',
        },
        {
          id: 'l3-b4',
          competency: '팀 내 지식 공유 및 전파',
          actionItem: `교육에서 습득한 핵심 노하우와 유용한 팁을 팀 미팅이나 사내 위키에 공유하여 팀 전체의 역량 향상에 기여한다.`,
          measurementMethod: '팀 미팅 브리핑 1회 및 지식 공유 자료 등록',
          frequencyGoal: '수료 후 30일 이내 팀 공유회 1회 실시',
          selfScorePrompt: '나는 학습한 내용을 동료들에게 공유하고 팀 업무 방식 개선을 함께 논의하였는가?',
          managerScorePrompt: '팀원이 교육 내용을 팀원들과 적극적으로 공유하여 긍정적 시너지를 내고 있는가?',
        },
      ],
      actionPlan: {
        title: `${title} 60일 현업 실천 로드맵 (Action Plan)`,
        steps: [
          {
            period: '1~2주차: 시도 및 적응',
            actionGoal: '학습 도구 설치/서식 템플릿 세팅 및 소규모 일상 업무 1건에 시범 적용',
            deliverableOrEvidence: '첫 번째 시범 적용 결과물 및 자체 회고 노트',
            supportNeeded: '부서장의 초기 시도 격려 및 업무 우선순위 배려',
          },
          {
            period: '3~4주차: 루틴화 및 전파',
            actionGoal: '정규 주요 프로젝트로 적용 범위 확대 및 팀 미팅에서 실천 팁 15분 브리핑',
            deliverableOrEvidence: '팀 공유 발표 자료 및 개선 전/후 비교 자료',
            supportNeeded: '팀원의 참여 유도 및 중간 피드백 제공',
          },
          {
            period: '5~8주차: 성과화 및 표준화',
            actionGoal: '현업 적용 성과 측정, 부서 매뉴얼 반영 및 60일 행동 다면평가 실시',
            deliverableOrEvidence: '최종 현업 적용 보고서 및 정량적 개선 데이터',
            supportNeeded: '부서장의 60일 다면평가 작성 및 우수 실천자 포상 추천',
          },
        ],
        managerFollowUpChecklist: [
          '수료 1주일 이내 학습자와 1:1 면담을 통해 개인별 현업 실천 계획서(Action Plan)를 승인했는가?',
          '수료 30일 시점에 주간 미팅에서 적용 현황을 점검하고 장애 요인을 함께 해결해 주었는가?',
          '수료 60일 시점에 3단계 행동 평가표를 성실히 작성하고 피드백을 전달하였는가?',
        ],
      },
    },
    level4: {
      title: '4단계: 결과 평가 (Business Results & ROI)',
      purpose: '교육 프로그램이 조직의 비즈니스 핵심 지표(KPI) 개선에 기여한 정량적·정성적 기여도를 평가하고, 교육 투자 대비 비용 편익(ROI)을 산출합니다.',
      measurementPeriod: '교육 수료 후 3개월 ~ 6개월 누적 데이터 집계',
      businessKPIs: [
        {
          id: 'l4-kpi1',
          kpiName: '핵심 업무 처리 시간 (Lead Time) 단축',
          type: '정량(Quantitative)',
          baselineValue: '건당 평균 14.5시간 소요',
          targetValue: '건당 평균 9.5시간 이하 (34% 단축)',
          dataSource: 'ERP / 업무 관리 시스템 로그',
          isolationMethod: '교육 이수자 그룹 vs 미이수자 대조군 비교 분석',
        },
        {
          id: 'l4-kpi2',
          kpiName: '업무 오류율 및 재작업(Rework) 발생률',
          type: '정량(Quantitative)',
          baselineValue: '월 평균 6.2% 결함 발생',
          targetValue: '월 평균 2.5% 이하로 감축 (60% 개선)',
          dataSource: '품질 관리 시스템 / 고객 클레임 접수 대장',
          isolationMethod: '담당 부서장 인터뷰를 통한 교육 기여도 가중치 산정 (추정법)',
        },
        {
          id: 'l4-kpi3',
          kpiName: '내부 이해관계자 및 고객 만족도',
          type: '정성(Qualitative)',
          baselineValue: '72점 / 100점',
          targetValue: '88점 이상 (16점 상승)',
          dataSource: '분기별 내부 고객 만족도 서베이',
          isolationMethod: '과정 수료 전후 동일 설문 항목 추이 분석',
        },
        {
          id: 'l4-kpi4',
          kpiName: '우수 개선 사례 발굴 및 자산화 건수',
          type: '정량(Quantitative)',
          baselineValue: '반기 0건 (문서화 부재)',
          targetValue: '반기 12건 이상 사내 우수 사례 등록',
          dataSource: '사내 지식 관리 포털(KMS)',
          isolationMethod: '교육 연계 실천 프로젝트 제출물 전수 집계',
        },
      ],
      roiFramework: {
        formulaExplanation: '순 ROI (%) = [(총 화폐적 편익 × 교육 기여도) - 총 교육 투자 비용] ÷ 총 교육 투자 비용 × 100',
        contributionRate: 50,
        benefits: [
          {
            id: 'ben-1',
            name: '업무 시간 단축에 따른 인건비 절감 효과',
            amount: 42000000,
            basis: '교육생 30명 × 월 12시간 단축 × 시간당 통상임금 2.5만원 × 6개월 = 45,000,000원',
          },
          {
            id: 'ben-2',
            name: '오류 및 재작업 감소에 따른 비용 손실 방지',
            amount: 28000000,
            basis: '월 재작업 비용 500만원 × 60% 절감 × 6개월 = 18,000,000원 + 클레임 보상 방지 10,000,000원',
          },
          {
            id: 'ben-3',
            name: '신규 기회 창출 및 생산성 증대 기여액',
            amount: 25000000,
            basis: '고객 대응 신속화 및 솔루션 품질 향상으로 인한 추가 매출 기여 추정액',
          },
        ],
        costs: [
          {
            id: 'cost-1',
            name: '전문 강사료 및 교재/라이선스 비용',
            amount: 8500000,
            basis: '전문 강사 2일 강사료 600만원 + 교재/소프트웨어 라이선스 250만원',
          },
          {
            id: 'cost-2',
            name: '교육장 대관 및 운영 진행비',
            amount: 3500000,
            basis: '워크숍 장소 대관, 다과, 운영 물품비',
          },
          {
            id: 'cost-3',
            name: '참가자 교육 시간 기회비용 (인건비)',
            amount: 12000000,
            basis: '교육 참가자 30명 × 16시간 × 시간당 통상임금 2.5만원',
          },
        ],
      },
      implementationRoadmap: [
        {
          phase: '준비기 (D-14 ~ D-Day)',
          timeline: '교육 시작 2주 전 ~ 교육 당일',
          milestone: '사전 역량 진단 실시, 1·2단계 평가 문항 확정 및 시스템 등록',
          responsible: 'HRD 교육 기획팀 & 과정 강사진',
        },
        {
          phase: '실행기 (D+0 ~ D+3)',
          timeline: '교육 종료 당일 ~ 3일 이내',
          milestone: '1단계 반응평가 수렴, 2단계 퀴즈/과제 채점 및 1차 결과 피드백',
          responsible: '교육 운영자 & 학습자 전원',
        },
        {
          phase: '전이기 (D+30 ~ D+60)',
          timeline: '교육 수료 1~2개월',
          milestone: '30일 자가점검, 60일 부서장 행동 관찰 다면평가 및 액션플랜 성과 검토',
          responsible: '학습자 & 직속 팀장(부서장)',
        },
        {
          phase: '성과화기 (D+90 ~ D+180)',
          timeline: '교육 수료 3~6개월',
          milestone: '4단계 비즈니스 KPI 지표 산출, ROI 분석 리포트 발행 및 경영진 보고',
          responsible: 'HRD팀, 재무/기획팀, 현업 부서장',
        },
      ],
    },
  };
}
