import React from 'react';
import { X, BookOpen, Layers, CheckCircle2, TrendingUp, Compass, Target, ArrowRight } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KirkpatrickGuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">커크패트릭(Kirkpatrick) 4단계 교육평가 모델 안내</h3>
              <p className="text-xs text-slate-500">글로벌 HRD에서 가장 신뢰받는 교육 효과성 측정 프레임워크</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4">
            <p className="font-medium text-blue-900 mb-1">
              "교육은 교실에서 끝나는 것이 아니라, 현업의 비즈니스 성과로 완성된다."
            </p>
            <p className="text-xs text-blue-700 leading-relaxed">
              1959년 도널드 커크패트릭(Donald Kirkpatrick) 박사가 제안하고 현대 New World Kirkpatrick 모델로 발전된 4단계 평가는,
              교육 훈련의 즉각적 만족도부터 실무 적용 및 최종 경영 성과(ROI)까지 논리적으로 연결하는 종합 성과 평가 기법입니다.
            </p>
          </div>

          {/* 4 Levels Grid */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>단계별 핵심 목적 및 측정 도구</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Level 1 */}
              <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Level 1
                  </span>
                  <span className="text-xs text-emerald-700 font-medium">교육 직후</span>
                </div>
                <h5 className="font-bold text-slate-900 mb-1">반응 평가 (Reaction)</h5>
                <p className="text-xs text-slate-600 mb-2">
                  학습자의 교육 만족도, 강사 전문성, 난이도, 학습 환경, 그리고 현업 적용 기대도(의지)를 측정합니다.
                </p>
                <div className="text-xs text-slate-500 bg-white/80 p-2 rounded-lg border border-emerald-100">
                  <strong className="text-emerald-900">핵심 도구:</strong> 5점 리커트 척도 설문지, 주관식 정성 인터뷰, 순추천고객지수(eNPS)
                </div>
              </div>

              {/* Level 2 */}
              <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    Level 2
                  </span>
                  <span className="text-xs text-blue-700 font-medium">교육 중 / 종료 시</span>
                </div>
                <h5 className="font-bold text-slate-900 mb-1">학습 평가 (Learning)</h5>
                <p className="text-xs text-slate-600 mb-2">
                  교육 목표로 설정된 지식(Knowledge), 기술(Skill), 태도(Attitude)를 실제로 습득했는지 검증합니다.
                </p>
                <div className="text-xs text-slate-500 bg-white/80 p-2 rounded-lg border border-blue-100">
                  <strong className="text-blue-900">핵심 도구:</strong> 사전-사후 지식 진단 테스트, 실기 롤플레잉/과제 루브릭(상/중/하)
                </div>
              </div>

              {/* Level 3 */}
              <div className="border border-indigo-200 bg-indigo-50/30 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                    Level 3
                  </span>
                  <span className="text-xs text-indigo-700 font-medium">수료 후 30~90일</span>
                </div>
                <h5 className="font-bold text-slate-900 mb-1">행동 평가 (Behavior)</h5>
                <p className="text-xs text-slate-600 mb-2">
                  배운 내용이 현업 업무에서 실제 관찰 가능한 행동 변화(Learning Transfer)로 전이되었는지 추적합니다.
                </p>
                <div className="text-xs text-slate-500 bg-white/80 p-2 rounded-lg border border-indigo-100">
                  <strong className="text-indigo-900">핵심 도구:</strong> 현업 실천 계획서(Action Plan), 자가 점검 및 부서장/동료 다면 관찰 체크리스트
                </div>
              </div>

              {/* Level 4 */}
              <div className="border border-purple-200 bg-purple-50/30 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                    Level 4
                  </span>
                  <span className="text-xs text-purple-700 font-medium">수료 후 3~6개월</span>
                </div>
                <h5 className="font-bold text-slate-900 mb-1">결과 평가 (Results & ROI)</h5>
                <p className="text-xs text-slate-600 mb-2">
                  행동 변화가 최종적으로 조직의 생산성, 비용 절감, 품질 개선, 매출 증대 등 핵심 KPI에 미친 영향을 측정합니다.
                </p>
                <div className="text-xs text-slate-500 bg-white/80 p-2 rounded-lg border border-purple-100">
                  <strong className="text-purple-900">핵심 도구:</strong> 부서 비즈니스 KPI 지표 대조, 필립스(Phillips) ROI 순편익 산출 프레임워크
                </div>
              </div>
            </div>
          </div>

          {/* Success Tips */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h5 className="font-bold text-slate-900 text-xs mb-2 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>성공적인 교육 평가 설계 팁 (HRD Best Practice)</span>
            </h5>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>
                <strong>역방향 설계(Backward Design):</strong> 4단계 비즈니스 목표(조직의 필요)에서 출발하여 3단계 행동, 2단계 학습, 1단계 설계를 연계하세요.
              </li>
              <li>
                <strong>구체적 행동 지표 정의:</strong> 3단계 행동 평가는 ‘열심히 한다’가 아닌 ‘주 2회 1on1 미팅 실시’와 같이 관찰 가능한 지표여야 합니다.
              </li>
              <li>
                <strong>교육 기여도 분리(Isolation):</strong> 4단계 결과에서 성과 개선 중 교육이 기여한 비율(추정률 40~60% 등)을 객관적으로 명시하세요.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
};
