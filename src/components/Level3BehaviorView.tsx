import React, { useState } from 'react';
import { Level3BehaviorData, BehaviorItem } from '../types/evaluation';
import { CheckCircle2, UserCheck, Users, Calendar, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface Level3BehaviorViewProps {
  data: Level3BehaviorData;
  onUpdate: (updated: Level3BehaviorData) => void;
}

export const Level3BehaviorView: React.FC<Level3BehaviorViewProps> = ({ data }) => {
  const [activeSubTab, setActiveSubTab] = useState<'checklist' | 'actionPlan'>('checklist');
  const [evaluatorPerspective, setEvaluatorPerspective] = useState<'self' | 'manager'>('self');

  // Interactive Behavior Rating State
  const [behaviorRatings, setBehaviorRatings] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    data.behaviorItems.forEach((item) => {
      init[item.id] = 4; // default good rating
    });
    return init;
  });

  // Action plan milestones completion toggle
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const handleRate = (id: string, score: number) => {
    setBehaviorRatings((prev) => ({ ...prev, [id]: score }));
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const ratingsArray = Object.values(behaviorRatings);
  const avgBehaviorScore =
    ratingsArray.length > 0
      ? (ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length).toFixed(1)
      : '4.0';

  const transferPercentage = Math.round((Number(avgBehaviorScore) / 5) * 100);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                Kirkpatrick Level 3
              </span>
              <h3 className="text-xl font-bold text-slate-900">{data.title}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{data.purpose}</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              평가 시점: {data.evaluationTiming}
            </span>
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="mt-4 flex items-center space-x-2 border-b border-slate-100 pb-2">
          <button
            onClick={() => setActiveSubTab('checklist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeSubTab === 'checklist'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>현업 적용 행동 체크리스트 ({data.behaviorItems.length}개 지표)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('actionPlan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeSubTab === 'actionPlan'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>60일 현업 실천 액션 플랜</span>
          </button>
        </div>
      </div>

      {/* SubTab 1: Checklist */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-4">
          {/* Perspective & Meter Bar */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50/50 to-slate-50 rounded-2xl p-4 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-indigo-900">평가 시점 / 관점 전환:</span>
              <div className="bg-white p-1 rounded-xl border border-indigo-200 inline-flex space-x-1 shadow-xs">
                <button
                  onClick={() => setEvaluatorPerspective('self')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    evaluatorPerspective === 'self'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  학습자 자가 진단 (Self)
                </button>
                <button
                  onClick={() => setEvaluatorPerspective('manager')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    evaluatorPerspective === 'manager'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  직속 부서장(팀장) 관찰 평가
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">
                  현업 행동 전이도 (Transfer Rate)
                </span>
                <span className="text-xs text-indigo-900 font-medium">
                  평균 <strong>{avgBehaviorScore}점</strong> / 5.0점 만점
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                {transferPercentage}%
              </div>
            </div>
          </div>

          {/* Behavior Items List */}
          <div className="space-y-4">
            {data.behaviorItems.map((item, idx) => {
              const currentScore = behaviorRatings[item.id] || 4;
              const promptText =
                evaluatorPerspective === 'self'
                  ? item.selfScorePrompt
                  : item.managerScorePrompt;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-3 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">{item.competency}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        측정: {item.measurementMethod}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                        목표 빈도: {item.frequencyGoal}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-100 font-medium leading-relaxed">
                    <strong>구체적 행동 지표:</strong> {item.actionItem}
                  </p>

                  {/* Rating Prompt according to perspective */}
                  <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="text-xs text-slate-600">
                      <strong className="text-indigo-900">
                        [{evaluatorPerspective === 'self' ? '자가 점검' : '부서장 관찰'} 설문]:
                      </strong>{' '}
                      {promptText}
                    </div>

                    <div className="flex items-center space-x-1 shrink-0 self-end md:self-auto">
                      {[1, 2, 3, 4, 5].map((val) => {
                        const isSelected = currentScore === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleRate(item.id, val)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-indigo-600 text-white shadow-xs scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-indigo-50'
                            }`}
                          >
                            {val}점
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SubTab 2: Action Plan Roadmap */}
      {activeSubTab === 'actionPlan' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
            <h4 className="font-bold text-slate-900 text-base mb-1">{data.actionPlan.title}</h4>
            <p className="text-xs text-slate-500 mb-6">
              교육 후 학습이 사장되지 않고 현업 루틴으로 안착할 수 있도록 3단계 전이 로드맵을 운영합니다.
            </p>

            <div className="space-y-4">
              {data.actionPlan.steps.map((step, idx) => {
                const isChecked = !!completedSteps[idx];
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                          {step.period}
                        </span>
                        <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                          {step.actionGoal}
                        </h5>
                      </div>

                      <button
                        onClick={() => toggleStep(idx)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 mr-0.5" />}
                        <span>{isChecked ? '실행 완료' : '미완료'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200/60">
                      <div>
                        <strong className="text-slate-700 block mb-0.5">📌 산출물 및 증빙 자료:</strong>
                        <span>{step.deliverableOrEvidence}</span>
                      </div>
                      <div>
                        <strong className="text-slate-700 block mb-0.5">🤝 부서장 및 조직 지원:</strong>
                        <span>{step.supportNeeded}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Manager Follow-up Checklist */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>부서장(팀장) 현업 전이 지원 필수 체크리스트</span>
            </h4>
            <div className="space-y-2">
              {data.actionPlan.managerFollowUpChecklist.map((checkItem, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{checkItem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
