import React, { useState } from 'react';
import { Level2LearningData, QuizQuestion, RubricCriterion } from '../types/evaluation';
import { CheckCircle2, HelpCircle, FileCheck2, Award, RefreshCw, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

interface Level2LearningViewProps {
  data: Level2LearningData;
  onUpdate: (updated: Level2LearningData) => void;
}

export const Level2LearningView: React.FC<Level2LearningViewProps> = ({ data }) => {
  const [subTab, setSubTab] = useState<'quiz' | 'rubric' | 'guide'>('quiz');

  // Interactive Quiz State
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // Interactive Rubric Evaluator State
  const [rubricLevels, setRubricLevels] = useState<Record<string, 'high' | 'medium' | 'low'>>(() => {
    const initial: Record<string, 'high' | 'medium' | 'low'> = {};
    data.performanceRubric.criteria.forEach((c) => {
      initial[c.id] = 'high';
    });
    return initial;
  });

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  // Calculate Quiz Score
  const totalQuestions = data.knowledgeQuiz.length;
  const correctCount = data.knowledgeQuiz.filter(
    (q) => userAnswers[q.id] === q.correctAnswerIndex
  ).length;
  const quizScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Calculate Rubric Weighted Score
  // high = 100%, medium = 75%, low = 50%
  const rubricScore = Math.round(
    data.performanceRubric.criteria.reduce((acc, c) => {
      const lvl = rubricLevels[c.id] || 'high';
      const factor = lvl === 'high' ? 1.0 : lvl === 'medium' ? 0.75 : 0.5;
      return acc + c.weight * factor;
    }, 0)
  );

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Kirkpatrick Level 2
              </span>
              <h3 className="text-xl font-bold text-slate-900">{data.title}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{data.purpose}</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">수료 기준 점수:</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {data.passingScore}점 이상 합격
            </span>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="mt-4 flex items-center space-x-2 border-b border-slate-100 pb-2">
          <button
            onClick={() => setSubTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              subTab === 'quiz'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>지식 진단 퀴즈 ({data.knowledgeQuiz.length}문항)</span>
          </button>
          <button
            onClick={() => setSubTab('rubric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              subTab === 'rubric'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>실무 과제 평가 루브릭</span>
          </button>
          <button
            onClick={() => setSubTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              subTab === 'guide'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>사전-사후 평가 운영 지침</span>
          </button>
        </div>
      </div>

      {/* SubTab 1: Knowledge Quiz */}
      {subTab === 'quiz' && (
        <div className="space-y-4">
          {/* Quiz Controller & Live Test Bar */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/40 rounded-2xl p-4 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                인터랙티브 퀴즈 모의 테스트
              </h4>
              <p className="text-xs text-blue-800 mt-0.5">
                정답을 직접 선택하고 '답안 제출 및 채점' 버튼을 눌러 정답 및 상세 해설을 확인해 보세요.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {submitted ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-700">채점 결과:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      quizScore >= data.passingScore
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {quizScore}점 ({correctCount}/{totalQuestions} 정답) -{' '}
                    {quizScore >= data.passingScore ? '합격' : '재시험 권고'}
                  </span>
                  <button
                    onClick={handleResetQuiz}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white transition-colors"
                    title="다시 풀기"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={Object.keys(userAnswers).length === 0}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs"
                >
                  답안 제출 및 채점하기
                </button>
              )}
            </div>
          </div>

          {/* Quiz Cards */}
          {data.knowledgeQuiz.map((q, idx) => {
            const selectedOpt = userAnswers[q.id];
            const isCorrect = selectedOpt === q.correctAnswerIndex;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">{q.question}</h4>
                      <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        연계 교육목표: {q.targetObjective}
                      </span>
                    </div>
                  </div>

                  {submitted && (
                    <span
                      className={`shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>정답</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3.5 h-3.5" />
                          <span>오답</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {q.options.map((option, optIdx) => {
                    const isPicked = selectedOpt === optIdx;
                    const isRightAnswer = q.correctAnswerIndex === optIdx;

                    let optStyle =
                      'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-blue-50/50 hover:border-blue-300';
                    if (submitted) {
                      if (isRightAnswer) {
                        optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                      } else if (isPicked && !isRightAnswer) {
                        optStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                      }
                    } else if (isPicked) {
                      optStyle = 'bg-blue-50 border-blue-600 text-blue-900 font-semibold ring-1 ring-blue-600';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${optStyle}`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                            {optIdx + 1}
                          </span>
                          <span>{option}</span>
                        </div>
                        {submitted && isRightAnswer && (
                          <span className="text-[11px] font-bold text-emerald-700">✓ 정답</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {submitted && (
                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs space-y-1">
                    <p className="font-bold text-blue-900 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>해설 및 정답 가이드 (정답: {q.correctAnswerIndex + 1}번)</span>
                    </p>
                    <p className="text-blue-800 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SubTab 2: Performance Rubric */}
      {subTab === 'rubric' && (
        <div className="space-y-4">
          {/* Rubric Header Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                  실무 과제 평가 (Authentic Assessment)
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  {data.performanceRubric.taskTitle}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {data.performanceRubric.taskDescription}
                </p>
              </div>

              {/* Rubric Live Score Calculator */}
              <div className="p-3 rounded-xl bg-gradient-to-tr from-indigo-50 to-blue-50 border border-indigo-100 shrink-0 text-center">
                <span className="text-[11px] font-bold text-indigo-900 uppercase block">
                  루브릭 환산 모의 점수
                </span>
                <span className="text-2xl font-black text-indigo-700">{rubricScore}점</span>
                <span className="text-[11px] text-indigo-600 block mt-0.5">
                  {rubricScore >= data.passingScore ? '✓ 합격 기준 충족' : '! 보완 필요'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              💡 <strong>평가 방법:</strong> 아래 루브릭의 각 평가 기준별로 [상 / 중 / 하] 수준을 클릭하여 가중치 합산 점수를 모의 산출해 보세요.
            </p>
          </div>

          {/* Criteria Cards */}
          {data.performanceRubric.criteria.map((criterion, idx) => {
            const currentLevel = rubricLevels[criterion.id] || 'high';

            return (
              <div
                key={criterion.id}
                className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h5 className="font-bold text-slate-900 text-sm">{criterion.dimension}</h5>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    배점 비중: {criterion.weight}%
                  </span>
                </div>

                {/* 3 Level Boxes (High, Medium, Low) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* High */}
                  <div
                    onClick={() =>
                      setRubricLevels((prev) => ({ ...prev, [criterion.id]: 'high' }))
                    }
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      currentLevel === 'high'
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-emerald-800">상 (우수 / 90~100%)</span>
                      {currentLevel === 'high' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{criterion.levels.high}</p>
                  </div>

                  {/* Medium */}
                  <div
                    onClick={() =>
                      setRubricLevels((prev) => ({ ...prev, [criterion.id]: 'medium' }))
                    }
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      currentLevel === 'medium'
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-amber-800">중 (보통 / 70~89%)</span>
                      {currentLevel === 'medium' && (
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{criterion.levels.medium}</p>
                  </div>

                  {/* Low */}
                  <div
                    onClick={() =>
                      setRubricLevels((prev) => ({ ...prev, [criterion.id]: 'low' }))
                    }
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      currentLevel === 'low'
                        ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-rose-800">하 (미흡 / 70% 미만)</span>
                      {currentLevel === 'low' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{criterion.levels.low}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SubTab 3: Pre-Post Test Guide */}
      {subTab === 'guide' && (
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Award className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-slate-900 text-sm">사전-사후 평가 비교 가이드라인</h4>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 leading-relaxed">
            <p className="font-semibold mb-1">효과적인 학습 습득도(Gain) 측정 방법:</p>
            <p>{data.prePostComparisonGuide}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-1">1. 사전 진단 (Pre-test)</span>
              <p className="text-xs text-slate-600">
                교육 시작 전 또는 입과 1일 차 오전에 실시하여 학습자의 기존 출발점 지식(Baseline)을 파악합니다.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-1">2. 사후 진단 (Post-test)</span>
              <p className="text-xs text-slate-600">
                교육 종료 직전 동일 난이도의 평가를 실시하여 순수 학업 성취도 향상 폭을 측정합니다.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-1">3. 정규화 향상도 (Hake Gain)</span>
              <p className="text-xs text-slate-600">
                <code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-blue-700 font-mono">
                  g = (사후 - 사전) / (100 - 사전)
                </code>
                <br />
                g ≥ 0.3 이상일 때 실질적인 교육 효과가 입증된 것으로 판정합니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
