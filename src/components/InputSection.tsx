import React, { useState } from 'react';
import { CourseInput, DeliveryMethod } from '../types/evaluation';
import { PRESET_COURSES, PresetCourse } from '../data/presets';
import { Sparkles, BookOpen, Target, Clock, Users, Building, AlertCircle, FileText, ChevronDown } from 'lucide-react';

interface InputSectionProps {
  onGenerate: (input: CourseInput) => void;
  isLoading: boolean;
  initialInput?: CourseInput;
}

export const InputSection: React.FC<InputSectionProps> = ({
  onGenerate,
  isLoading,
  initialInput,
}) => {
  const [courseTitle, setCourseTitle] = useState(initialInput?.courseTitle || '');
  const [targetAudience, setTargetAudience] = useState(initialInput?.targetAudience || '');
  const [trainingPeriod, setTrainingPeriod] = useState(initialInput?.trainingPeriod || '16시간 (2일)');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(initialInput?.deliveryMethod || 'offline');
  const [trainingObjectives, setTrainingObjectives] = useState(initialInput?.trainingObjectives || '');
  const [trainingContents, setTrainingContents] = useState(initialInput?.trainingContents || '');
  const [businessContext, setBusinessContext] = useState(initialInput?.businessContext || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSelectPreset = (preset: PresetCourse) => {
    setCourseTitle(preset.input.courseTitle);
    setTargetAudience(preset.input.targetAudience);
    setTrainingPeriod(preset.input.trainingPeriod);
    setDeliveryMethod(preset.input.deliveryMethod);
    setTrainingObjectives(preset.input.trainingObjectives);
    setTrainingContents(preset.input.trainingContents);
    setBusinessContext(preset.input.businessContext || '');
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingObjectives.trim()) {
      setErrorMsg('교육 목표를 입력해 주세요. (또는 상단 추천 예시를 선택해 보세요)');
      return;
    }
    if (!trainingContents.trim()) {
      setErrorMsg('교육 내용(커리큘럼)을 입력해 주세요.');
      return;
    }

    setErrorMsg(null);
    onGenerate({
      courseTitle: courseTitle.trim() || '역량 강화 교육과정',
      targetAudience: targetAudience.trim() || '교육 대상자 전원',
      trainingPeriod: trainingPeriod.trim() || '16시간',
      deliveryMethod,
      trainingObjectives: trainingObjectives.trim(),
      trainingContents: trainingContents.trim(),
      businessContext: businessContext.trim(),
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* Top Banner with Presets */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-xs mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Kirkpatrick 4-Level Evaluation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            교육 목표와 교육 내용을 입력하면<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-teal-200 to-emerald-300">
              1단계부터 4단계 평가 체계
            </span>를 자동으로 완성합니다
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            반응 평가(설문지), 학습 평가(퀴즈 & 수행 루브릭), 행동 평가(30/60일 현업 적용 체크리스트), 결과 평가(비즈니스 KPI & ROI 프레임워크)를 원클릭으로 설계하세요.
          </p>

          {/* Quick Presets */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center space-x-2 mb-2 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <span>빠른 예시 불러오기 (원클릭 테스트):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_COURSES.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs font-medium border border-white/15 transition-all text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                  <span>[{preset.tag}] {preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-2.5">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{errorMsg}</p>
              <p className="text-xs text-red-600 mt-0.5">상단의 추천 예시 버튼을 누르면 기본 정보가 자동으로 채워집니다.</p>
            </div>
          </div>
        )}

        {/* Row 1: Course Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              교육 과정명 <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="예: 신임 팀장을 위한 성과 코칭 & 피드백 스킬 과정"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              교육 대상자
            </label>
            <div className="relative">
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="예: 선임 1~2년차 신임 팀장 30명"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              교육 방식 및 시간
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value as DeliveryMethod)}
                className="px-2.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs text-slate-900 font-medium"
              >
                <option value="offline">오프라인 집체</option>
                <option value="online">온라인(라이브/VOD)</option>
                <option value="blended">블렌디드 러닝</option>
                <option value="hybrid">하이브리드</option>
              </select>
              <input
                type="text"
                value={trainingPeriod}
                onChange={(e) => setTrainingPeriod(e.target.value)}
                placeholder="예: 16시간 (2일)"
                className="px-2.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Core Inputs (Objectives & Contents) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Objectives */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Target className="w-4 h-4 text-blue-600" />
                <span>교육 목표 (Training Objectives) <span className="text-rose-500">*</span></span>
              </label>
              <span className="text-xs text-slate-400">행동/역량 중심 SMART 목표 권장</span>
            </div>
            <textarea
              rows={6}
              value={trainingObjectives}
              onChange={(e) => setTrainingObjectives(e.target.value)}
              placeholder={`예시:
1. GROW 코칭 대화 모델 4단계를 체득하여 1on1 면담 시 열린 질문을 80% 이상 활용할 수 있다.
2. SBI(Situation-Behavior-Impact) 피드백 기법을 통해 갈등 없이 행동 변화를 유도할 수 있다.
3. 팀원별 동기부여 유형을 분석하고 맞춤형 성장 계획(IDP)을 수립할 수 있다.`}
              className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400 leading-relaxed font-mono text-xs sm:text-sm"
            />
            <p className="text-xs text-slate-500">
              💡 <strong>Tip:</strong> 구체적인 달성 기준(%, 행동 동사)이 포함될수록 2단계 시험 문제와 3단계 행동 평가표의 정확도가 극대화됩니다.
            </p>
          </div>

          {/* Training Contents */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>교육 내용 및 커리큘럼 (Training Contents) <span className="text-rose-500">*</span></span>
              </label>
              <span className="text-xs text-slate-400">모듈별 주요 주제 및 실습</span>
            </div>
            <textarea
              rows={6}
              value={trainingContents}
              onChange={(e) => setTrainingContents(e.target.value)}
              placeholder={`예시:
[모듈 1] 2026 성과관리 패러다임 변화 (평가자에서 코치로)
[모듈 2] 질문과 경청의 기술 - GROW 코칭 4단계 대화 실습
[모듈 3] 행동 중심 피드백 - SBI 모델 기반 실전 롤플레잉
[모듈 4] 주간 1on1 면담 프로토콜 및 팀원 성장 로드맵(IDP) 작성 실습
[모듈 5] 현업 적용 30일 실천 서약서 및 액션 플랜 수립`}
              className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400 leading-relaxed font-mono text-xs sm:text-sm"
            />
            <p className="text-xs text-slate-500">
              💡 <strong>Tip:</strong> 실습, 롤플레잉, 프로젝트 등 수행 요소가 명시되면 2단계 실기 평가 루브릭이 자동 최적화됩니다.
            </p>
          </div>
        </div>

        {/* Business Context (Optional) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
            <Building className="w-3.5 h-3.5 text-slate-500" />
            <span>조직 배경 및 비즈니스 문제의식 (선택 사항)</span>
          </label>
          <input
            type="text"
            value={businessContext}
            onChange={(e) => setBusinessContext(e.target.value)}
            placeholder="예: 조직 개편 후 신임 팀장의 피드백 부재로 인한 조기 퇴사율 증가 및 프로젝트 납기 지연 방지"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* CTA Button */}
        <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            ✓ 1단계(반응) · 2단계(학습) · 3단계(행동) · 4단계(결과/ROI) 완결형 패키지 생성
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all flex items-center space-x-2.5 ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 active:scale-[0.99] shadow-blue-500/25'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>4단계 교육평가 체계 자동 설계 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>커크패트릭 1~4단계 평가 자동 생성하기</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
