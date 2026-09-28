import { CourseInput } from '../types/evaluation';

export interface PresetCourse {
  id: string;
  name: string;
  category: string;
  tag: string;
  input: CourseInput;
}

export const PRESET_COURSES: PresetCourse[] = [
  {
    id: 'leadership-coaching',
    name: '신임 팀장을 위한 성과 코칭 & 피드백 스킬',
    category: '리더십 / HRD',
    tag: '성과관리',
    input: {
      courseTitle: '신임 팀장 성과 코칭 및 1on1 면담 스킬 향상 과정',
      targetAudience: '선임 1~2년 차 신임 팀장 및 파트장 (총 30명)',
      trainingPeriod: '16시간 (2일 집체 교육)',
      deliveryMethod: 'offline',
      trainingObjectives: `1. 성과관리 프로세스(목표수립-중간점검-피드백-평가) 전 과정을 이해하고 현업에 100% 적용할 수 있다.
2. GROW 코칭 대화 모델 4단계를 체득하여 팀원과의 1on1 면담 시 열린 질문과 경청을 80% 이상 활용할 수 있다.
3. 부정적 피드백 상황에서도 감정적 갈등 없이 SBI(Situation-Behavior-Impact) 피드백 기법을 적용하여 행동 변화를 이끌어낼 수 있다.
4. 팀원별 동기부여 유형을 진단하고 맞춤형 성장 개발 계획(IDP)을 수립할 수 있다.`,
      trainingContents: `[모듈 1] 2026 뉴노멀 리더십과 성과관리 패러다임 변화 (평가자에서 코치로)
[모듈 2] 질문과 경청의 기술 - GROW 코칭 모델 4단계 실습 및 대화 스크립트 작성
[모듈 3] 행동 중심 피드백 기술 - SBI 모델 기반 실전 롤플레잉 및 갈등 조정
[모듈 4] 주간 1on1 정기 면담 프로토콜 및 팀원 성장 로드맵(IDP) 설계 실습
[모듈 5] 현업 적용 액션 플랜(30일 실천 서약서 작성)`,
      businessContext: '조직 개편 후 신임 관리자의 피드백 부재로 인한 팀원 몰입도 저하 및 조기 퇴사율 상승 방지',
    },
  },
  {
    id: 'ai-automation',
    name: '생성형 AI 기반 실무 업무 자동화 & 바이브코딩',
    category: '디지털 / IT',
    tag: '생산성 혁신',
    input: {
      courseTitle: '생성형 AI와 노코드/바이브코딩을 활용한 업무 자동화 마스터 과정',
      targetAudience: '기획, 마케팅, 인사, 재무 등 비개발 직군 실무자 (총 40명)',
      trainingPeriod: '12시간 (온/오프라인 블렌디드)',
      deliveryMethod: 'blended',
      trainingObjectives: `1. 프롬프트 엔지니어링 5대 원칙을 습득하여 업무 문서 작성 및 데이터 요약 시간을 50% 이상 단축할 수 있다.
2. AI 코딩 보조도구(바이브코딩)를 활용하여 일상적인 반복 엑셀/데이터 처리 스크립트 및 웹 프로토타입을 직접 제작할 수 있다.
3. 사내 보안 가이드라인과 AI 윤리 규정을 준수하며 안전하게 업무에 AI를 접목할 수 있다.
4. 부서별 맞춤형 업무 자동화 파이프라인 1건 이상을 기획하고 실제 동작 가능한 결과물로 구현할 수 있다.`,
      trainingContents: `[모듈 1] 실무자를 위한 최신 LLM 생태계 이해 및 사내 보안 안전 가이드
[모듈 2] 고성과를 내는 실전 프롬프트 테크닉 (Role-Task-Context-Constraint)
[모듈 3] 텍스트/표/보고서 자동 생성 및 회의록 기반 Action Item 자동 추출
[모듈 4] 비개발자도 만드는 데이터 분석 & 웹 자동화 (자연어 코딩 실습)
[모듈 5] 부서별 1인 1자동화 프로젝트 기획 및 데모 발표회`,
      businessContext: '반복적인 서류 작업 및 수작업 데이터 집계로 인한 야근 증가와 본질적 기획 업무 시간 부족 해소',
    },
  },
  {
    id: 'b2b-sales',
    name: 'B2B 솔루션 세일즈 및 고객 협상 클로징 스킬',
    category: '영업 / 마케팅',
    tag: '매출 극대화',
    input: {
      courseTitle: 'B2B 솔루션 컨설팅 세일즈 및 거절 극복 협상 전략',
      targetAudience: '영업대표 및 기술영업(SE) 담당자 25명',
      trainingPeriod: '14시간 (온라인 라이브 6시간 + 오프라인 8시간)',
      deliveryMethod: 'hybrid',
      trainingObjectives: `1. 고객의 잠재 니즈를 발굴하는 SPIN 질문법을 숙달하여 초기 리드 전환율을 25% 이상 향상시킬 수 있다.
2. 단순 가격 경쟁을 탈피하고 고객사 ROI 관점의 차별화된 가치 제안서(Value Proposition)를 작성할 수 있다.
3. 고객의 거절 및 예산 삭감 요구에 대응하는 4단계 거절 극복 프로세스를 체화할 수 있다.
4. 의사결정권자(C-Level) 매핑 및 단계별 클로징 전략을 수립하여 수주 성공률을 20%p 개선할 수 있다.`,
      trainingContents: `[모듈 1] B2B 구매자 심리 분석과 솔루션 세일즈 프로세스 재정의
[모듈 2] 고객 페인포인트 발굴을 위한 SPIN 질문 전략 실습
[모듈 3] 고객 비즈니스 임팩트 중심의 차별화 제안서 작성 기법
[모듈 4] 가격 저항 및 경쟁사 비교 극복을 위한 윈윈 협상 시뮬레이션
[모듈 5] 파이프라인 관리 및 딜 클로징 로드맵 구축`,
      businessContext: '경쟁 심화로 인한 수주 성공률 하락 및 고객의 단가 인하 압박에 대응하기 위한 솔루션 영업력 강화',
    },
  },
  {
    id: 'smart-quality',
    name: '스마트 제조공정 품질 불량 제로화 & 6시그마 문제해결',
    category: '생산 / 품질',
    tag: '품질 혁신',
    input: {
      courseTitle: '제조공정 이상 징후 감지 및 불량 근인 분석(RCA) 실무 과정',
      targetAudience: '생산기술, 품질관리(QC/QA), 공정 엔지니어 20명',
      trainingPeriod: '20시간 (3일 집중 워크숍)',
      deliveryMethod: 'offline',
      trainingObjectives: `1. 제조 공정 데이터 기반의 통계적 공정관리(SPC) 관리도를 올바르게 해석하고 이상 징후를 조기 감지할 수 있다.
2. 5-Why 및 특성요인도(Fishbone)를 활용하여 공정 불량의 근본 원인(Root Cause)을 정확히 규명할 수 있다.
3. FMEA(고장형태 영향분석) 기법을 적용하여 신규 라인 위험 우선순위(RPN)를 정량 평가하고 개선 대책을 수립할 수 있다.
4. 개선 전후 Cpk(공정능력지수)를 1.33 이상으로 유지하는 사후 표준화 가이드를 완성할 수 있다.`,
      trainingContents: `[모듈 1] 스마트 팩토리 공정 품질 패러다임과 데이터 기반 품질 보증
[모듈 2] 공정 산포 관리와 SPC 관리도 해석 실무
[모듈 3] 불량 원인 추적 기법 (5-Why, 특성요인도, 재현 테스트 기법)
[모듈 4] FMEA를 통한 잠재 고장 예방 및 위험도 평가 실습
[모듈 5] 현장 실제 불량 케이스 스터디 및 개선 보고서(A3 리포트) 작성`,
      businessContext: '신제품 양산 초기 공정 불안정으로 인한 불량률 상승(2.8%) 및 납기 지연 리스크 해소',
    },
  },
];
