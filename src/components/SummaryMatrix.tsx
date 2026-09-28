import React from 'react';
import { EvaluationPlan } from '../types/evaluation';
import { Layers, CheckCircle2, TrendingUp, Compass, Calendar, Target, Award, ArrowUpRight } from 'lucide-react';

interface SummaryMatrixProps {
  plan: EvaluationPlan;
  activeTab: 'overview' | 'level1' | 'level2' | 'level3' | 'level4';
  setActiveTab: (tab: 'overview' | 'level1' | 'level2' | 'level3' | 'level4') => void;
}

export const SummaryMatrix: React.FC<SummaryMatrixProps> = ({
  plan,
  activeTab,
  setActiveTab,
}) => {
  const levels = [
    {
      id: 'level1' as const,
      num: '1',
      title: '반응 평가',
      sub: 'Reaction & Engagement',
      tag: '교육 직후',
      tool: '5점 리커트 설문 / eNPS',
      target: '4.3점 이상',
      bgClass: 'from-emerald-500/10 to-teal-500/5 hover:border-emerald-500',
      activeBorder: 'border-emerald-600 ring-2 ring-emerald-500/20',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'level2' as const,
      num: '2',
      title: '학습 평가',
      sub: 'Learning & Mastery',
      tag: '교육 중/종료',
      tool: '지식 퀴즈 & 실기 루브릭',
      target: '80점 이상 (+25%p)',
      bgClass: 'from-blue-500/10 to-cyan-500/5 hover:border-blue-500',
      activeBorder: 'border-blue-600 ring-2 ring-blue-500/20',
      badgeColor: 'bg-blue-100 text-blue-800',
      iconColor: 'text-blue-600',
    },
    {
      id: 'level3' as const,
      num: '3',
      title: '행동 평가',
      sub: 'Behavior & Transfer',
      tag: '수료 30~60일',
      tool: '현업 360 관찰 & 액션플랜',
      target: '행동 전이 80% 달성',
      bgClass: 'from-indigo-500/10 to-purple-500/5 hover:border-indigo-500',
      activeBorder: 'border-indigo-600 ring-2 ring-indigo-500/20',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      iconColor: 'text-indigo-600',
    },
    {
      id: 'level4' as const,
      num: '4',
      title: '결과 평가',
      sub: 'Results & Business ROI',
      tag: '수료 3~6개월',
      tool: '비즈니스 KPI & ROI 산출',
      target: '순 ROI 150%+ 달성',
      bgClass: 'from-purple-500/10 to-pink-500/5 hover:border-purple-500',
      activeBorder: 'border-purple-600 ring-2 ring-purple-500/20',
      badgeColor: 'bg-purple-100 text-purple-800',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Executive Summary Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Award className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              [평가 총괄] {plan.courseInput.courseTitle}
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
            생성일시: {new Date(plan.createdAt).toLocaleDateString('ko-KR')}
          </span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-100">
          {plan.executiveSummary}
        </p>

        {/* Input Details Pill Row */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
            <strong>대상:</strong>&nbsp;{plan.courseInput.targetAudience}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
            <strong>방식/시간:</strong>&nbsp;{plan.courseInput.deliveryMethod} / {plan.courseInput.trainingPeriod}
          </span>
          {plan.courseInput.businessContext && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
              <strong>과제 배경:</strong>&nbsp;{plan.courseInput.businessContext}
            </span>
          )}
        </div>
      </div>

      {/* 4 Levels Interactive Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {levels.map((lvl) => {
          const isSelected = activeTab === lvl.id;
          return (
            <div
              key={lvl.id}
              onClick={() => setActiveTab(lvl.id)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all text-left relative overflow-hidden bg-white shadow-xs ${
                isSelected
                  ? lvl.activeBorder + ' shadow-md scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${lvl.badgeColor}`}
                >
                  Level {lvl.num}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {lvl.tag}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-0.5 flex items-center justify-between">
                <span>{lvl.title}</span>
                <ArrowUpRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-0.5 -translate-y-0.5 text-blue-600' : 'text-slate-400'}`} />
              </h4>
              <p className="text-xs text-slate-400 mb-3">{lvl.sub}</p>

              <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">평가 도구:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[130px]" title={lvl.tool}>
                    {lvl.tool}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">목표 기준:</span>
                  <span className="font-semibold text-emerald-700">{lvl.target}</span>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-bl-sm" />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center space-x-1 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>전체 통합 로드맵</span>
        </button>

        <button
          onClick={() => setActiveTab('level1')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
            activeTab === 'level1'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>1단계: 반응 평가 (설문지)</span>
        </button>

        <button
          onClick={() => setActiveTab('level2')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
            activeTab === 'level2'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-blue-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>2단계: 학습 평가 (시험·루브릭)</span>
        </button>

        <button
          onClick={() => setActiveTab('level3')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
            activeTab === 'level3'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-indigo-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span>3단계: 행동 평가 (현업적용·체크리스트)</span>
        </button>

        <button
          onClick={() => setActiveTab('level4')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
            activeTab === 'level4'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <span>4단계: 결과 평가 (비즈니스 KPI·ROI)</span>
        </button>
      </div>
    </div>
  );
};
