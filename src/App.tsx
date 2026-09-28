/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CourseInput, EvaluationPlan } from './types/evaluation';
import { PRESET_COURSES } from './data/presets';
import { generateEvaluationPlanFallback } from './utils/fallbackGenerator';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { SummaryMatrix } from './components/SummaryMatrix';
import { Level1ReactionView } from './components/Level1ReactionView';
import { Level2LearningView } from './components/Level2LearningView';
import { Level3BehaviorView } from './components/Level3BehaviorView';
import { Level4ResultsView } from './components/Level4ResultsView';
import { ExportModal } from './components/ExportModal';
import { KirkpatrickGuideModal } from './components/KirkpatrickGuideModal';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
  Printer,
  Download,
  AlertCircle,
  Award,
} from 'lucide-react';

export default function App() {
  // Pre-seed with the first rich leadership coaching course so user immediately sees a complete evaluation system
  const defaultPreset = PRESET_COURSES[0];
  const [plan, setPlan] = useState<EvaluationPlan | null>(() =>
    generateEvaluationPlanFallback(defaultPreset.input)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'level1' | 'level2' | 'level3' | 'level4'>('overview');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showInputSection, setShowInputSection] = useState(true);
  const [notification, setNotification] = useState<{ type: 'info' | 'success'; message: string } | null>(null);

  const handleGenerate = async (input: CourseInput) => {
    setIsLoading(true);
    setNotification(null);

    try {
      const response = await fetch('/api/evaluate/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.plan) {
        setPlan(data.plan);
        setActiveTab('overview');
        setShowInputSection(false);
        setNotification({
          type: 'success',
          message: data.source === 'gemini-3.8-flash'
            ? '✨ Gemini AI가 교육 목표와 커리큘럼을 정밀 분석하여 1~4단계 맞춤 평가를 완성했습니다!'
            : '✓ 최적화된 HRD 평가 설계 엔진으로 1~4단계 맞춤 평가를 완성했습니다.',
        });
        window.scrollTo({ top: 380, behavior: 'smooth' });
      } else {
        throw new Error('No plan returned');
      }
    } catch (err) {
      console.warn('API error, switching to smart local generator:', err);
      // Seamless local fallback
      const fallbackPlan = generateEvaluationPlanFallback(input);
      setPlan(fallbackPlan);
      setActiveTab('overview');
      setShowInputSection(false);
      setNotification({
        type: 'info',
        message: '✓ 입력하신 교육 목표와 내용을 바탕으로 1~4단계 교육 평가 체계가 완성되었습니다.',
      });
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowInputSection(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <Header
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        hasPlan={!!plan}
        onReset={handleReset}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast / Notification Banner */}
        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-sm flex items-center justify-between shadow-xs no-print animate-in fade-in duration-300">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold">{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-xs text-blue-700 hover:text-blue-950 font-bold ml-4"
            >
              닫기
            </button>
          </div>
        )}

        {/* Input Section (Collapsible when plan exists) */}
        <div className="no-print">
          {plan && (
            <div className="mb-4 flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>현재 생성된 교육과정:</span>
                <span className="font-bold text-slate-900 text-sm">{plan.courseInput.courseTitle}</span>
              </div>
              <button
                onClick={() => setShowInputSection(!showInputSection)}
                className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>{showInputSection ? '입력창 접기' : '새 과정 입력하기'}</span>
                {showInputSection ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}

          {showInputSection && (
            <InputSection
              onGenerate={handleGenerate}
              isLoading={isLoading}
              initialInput={plan?.courseInput || defaultPreset.input}
            />
          )}
        </div>

        {/* Evaluation Output Workspace */}
        {plan && (
          <div className="space-y-6">
            {/* Summary Matrix Navigation */}
            <SummaryMatrix
              plan={plan}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Level Views based on Active Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Levels Preview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Level 1 Summary Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Level 1: 반응 평가 (Reaction)
                      </span>
                      <button
                        onClick={() => setActiveTab('level1')}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                      >
                        <span>상세 설문지 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {plan.level1.purpose}
                    </p>
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1.5 text-xs text-emerald-900">
                      <div>
                        <strong>설문 구성:</strong> {plan.level1.categories.length}개 영역, 총{' '}
                        {plan.level1.categories.reduce((a, c) => a + c.questions.length, 0)}문항 (5점 리커트)
                      </div>
                      <div>
                        <strong>질적 문항:</strong> 주관식 정성 질문 {plan.level1.openQuestions.length}개
                      </div>
                      <div>
                        <strong>목표 기준:</strong> 평균 {plan.level1.targetScore}점 이상 달성
                      </div>
                    </div>
                  </div>

                  {/* Level 2 Summary Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Level 2: 학습 평가 (Learning)
                      </span>
                      <button
                        onClick={() => setActiveTab('level2')}
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <span>시험·루브릭 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {plan.level2.purpose}
                    </p>
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1.5 text-xs text-blue-900">
                      <div>
                        <strong>지식 진단:</strong> 객관식 4지선다 {plan.level2.knowledgeQuiz.length}문항 (정답/해설 제공)
                      </div>
                      <div>
                        <strong>수행 평가:</strong> {plan.level2.performanceRubric.taskTitle} (
                        {plan.level2.performanceRubric.criteria.length}대 평가 기준 상/중/하 루브릭)
                      </div>
                      <div>
                        <strong>합격 기준:</strong> {plan.level2.passingScore}점 이상
                      </div>
                    </div>
                  </div>

                  {/* Level 3 Summary Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        Level 3: 행동 평가 (Behavior)
                      </span>
                      <button
                        onClick={() => setActiveTab('level3')}
                        className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center space-x-1"
                      >
                        <span>행동 체크리스트 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {plan.level3.purpose}
                    </p>
                    <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1.5 text-xs text-indigo-900">
                      <div>
                        <strong>관찰 지표:</strong> 현업 구체 행동 {plan.level3.behaviorItems.length}개 지표
                      </div>
                      <div>
                        <strong>평가 방식:</strong> 본인 자가진단 및 부서장 관찰 다면평가
                      </div>
                      <div>
                        <strong>전이 계획:</strong> {plan.level3.actionPlan.title} (60일 3단계 로드맵)
                      </div>
                    </div>
                  </div>

                  {/* Level 4 Summary Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        Level 4: 결과 평가 & ROI (Results)
                      </span>
                      <button
                        onClick={() => setActiveTab('level4')}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center space-x-1"
                      >
                        <span>KPI & ROI 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {plan.level4.purpose}
                    </p>
                    <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-1.5 text-xs text-purple-900">
                      <div>
                        <strong>조직 KPI:</strong> {plan.level4.businessKPIs.length}개 핵심 지표 (정량/정성 매핑)
                      </div>
                      <div>
                        <strong>ROI 프레임워크:</strong> 편익·비용 산출 근거 및 교육 기여도 분리 모델
                      </div>
                      <div>
                        <strong>측정 기간:</strong> {plan.level4.measurementPeriod}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Print Layout for full document when window.print() is called */}
                <div className="hidden print:block space-y-8">
                  <div className="print-break-before">
                    <Level1ReactionView data={plan.level1} onUpdate={(u) => setPlan({ ...plan, level1: u })} />
                  </div>
                  <div className="print-break-before">
                    <Level2LearningView data={plan.level2} onUpdate={(u) => setPlan({ ...plan, level2: u })} />
                  </div>
                  <div className="print-break-before">
                    <Level3BehaviorView data={plan.level3} onUpdate={(u) => setPlan({ ...plan, level3: u })} />
                  </div>
                  <div className="print-break-before">
                    <Level4ResultsView data={plan.level4} onUpdate={(u) => setPlan({ ...plan, level4: u })} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'level1' && (
              <Level1ReactionView
                data={plan.level1}
                onUpdate={(u) => setPlan({ ...plan, level1: u })}
              />
            )}

            {activeTab === 'level2' && (
              <Level2LearningView
                data={plan.level2}
                onUpdate={(u) => setPlan({ ...plan, level2: u })}
              />
            )}

            {activeTab === 'level3' && (
              <Level3BehaviorView
                data={plan.level3}
                onUpdate={(u) => setPlan({ ...plan, level3: u })}
              />
            )}

            {activeTab === 'level4' && (
              <Level4ResultsView
                data={plan.level4}
                onUpdate={(u) => setPlan({ ...plan, level4: u })}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-800">
              Kirkpatrick 4-Level Training Evaluation System
            </span>
            <span>| Donald Kirkpatrick & Jack Phillips Model Grounded</span>
          </div>
          <div className="text-slate-400">
            교육 목표와 내용에 기반한 과학적 교육 효과성 분석 솔루션
          </div>
        </div>
      </footer>

      {/* Export / Download Modal */}
      {plan && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          plan={plan}
          onImportPlan={(imported) => {
            setPlan(imported);
            setIsExportOpen(false);
          }}
        />
      )}

      {/* Kirkpatrick Guide Modal */}
      <KirkpatrickGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
