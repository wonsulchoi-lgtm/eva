import React, { useState } from 'react';
import { Level1ReactionData, LikertQuestion } from '../types/evaluation';
import { CheckCircle2, MessageSquare, Star, Copy, Check, BarChart2, AlertCircle, Plus, Trash2 } from 'lucide-react';

interface Level1ReactionViewProps {
  data: Level1ReactionData;
  onUpdate: (updated: Level1ReactionData) => void;
}

export const Level1ReactionView: React.FC<Level1ReactionViewProps> = ({ data, onUpdate }) => {
  // Interactive simulator ratings state
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    data.categories.forEach((cat) => {
      cat.questions.forEach((q) => {
        initial[q.id] = 5; // default 5 for preview
      });
    });
    return initial;
  });

  const [copied, setCopied] = useState(false);
  const [showSimNotice, setShowSimNotice] = useState(false);

  // Compute average score from ratings
  const questionCount = Object.keys(ratings).length;
  const currentTotal = Object.values(ratings).reduce((a, b) => a + b, 0);
  const currentAvg = questionCount > 0 ? (currentTotal / questionCount).toFixed(2) : '5.00';

  const handleRate = (id: string, score: number) => {
    setRatings((prev) => ({ ...prev, [id]: score }));
  };

  const handleCopySurveyText = () => {
    let text = `[교육 만족도 및 반응 평가 설문지 - 5점 척도]\n`;
    text += `평가 목적: ${data.purpose}\n`;
    text += `평가 시점: ${data.timing}\n\n`;

    data.categories.forEach((cat, idx) => {
      text += `■ ${idx + 1}. ${cat.categoryName}\n`;
      cat.questions.forEach((q, qIdx) => {
        text += `  ${idx + 1}-${qIdx + 1}. ${q.text} (1점: 전혀 아니다 ~ 5점: 매우 그렇다)\n`;
      });
      text += `\n`;
    });

    text += `■ 주관식 정성 평가 문항\n`;
    data.openQuestions.forEach((oq, idx) => {
      text += `  [문항 ${idx + 1}] ${oq.question}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info Box */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Kirkpatrick Level 1
              </span>
              <h3 className="text-xl font-bold text-slate-900">{data.title}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{data.purpose}</p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleCopySurveyText}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사 완료!' : '설문 문항 전체 복사'}</span>
            </button>
          </div>
        </div>

        {/* Live Simulator Meter */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-xs">
              {currentAvg}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-900 uppercase">
                  실시간 모의 응답 평균점수
                </span>
                <span className="text-xs text-emerald-700 font-medium">
                  (목표치: {data.targetScore}점 이상)
                </span>
              </div>
              <p className="text-xs text-emerald-800">
                아래 1~5점 척도 버튼을 직접 눌러 수료자 설문 응답 및 평균 점수를 시뮬레이션해 보세요.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                Number(currentAvg) >= data.targetScore
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 text-white'
              }`}
            >
              {Number(currentAvg) >= data.targetScore ? '✓ 목표 점수 달성' : '! 개선 필요 상태'}
            </span>
          </div>
        </div>
      </div>

      {/* Categories & Survey Questions */}
      <div className="space-y-4">
        {data.categories.map((category, catIdx) => (
          <div key={catIdx} className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
            <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-100">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                {catIdx + 1}
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{category.categoryName}</h4>
              <span className="text-xs text-slate-400">({category.questions.length}문항)</span>
            </div>

            <div className="space-y-4">
              {category.questions.map((q, qIdx) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start space-x-2.5">
                    <span className="text-xs font-semibold text-slate-400 mt-0.5">
                      {catIdx + 1}-{qIdx + 1}.
                    </span>
                    <p className="text-sm font-medium text-slate-800 leading-snug">{q.text}</p>
                  </div>

                  {/* 1-5 scale buttons */}
                  <div className="flex items-center space-x-1 shrink-0 self-end md:self-auto">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const isSelected = ratings[q.id] === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleRate(q.id, val)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white scale-110 shadow-xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50'
                          }`}
                          title={`${val}점`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Open-ended Subjective Questions */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
        <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-slate-100">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-sm">주관식 서술형 정성 질문 (질적 분석 문항)</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.openQuestions.map((oq, idx) => (
            <div key={oq.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  문항 {idx + 1}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">질적 피드백</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-relaxed">{oq.question}</p>
              <div className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-100">
                <strong className="text-emerald-900">설계 의도:</strong> {oq.intent}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Threshold Table */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
        <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center space-x-2">
          <BarChart2 className="w-4 h-4 text-emerald-600" />
          <span>점수 구간별 진단 및 사후 조치 가이드라인 (Action Thresholds)</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-y border-slate-200">
                <th className="py-2.5 px-3 font-semibold">점수 구간</th>
                <th className="py-2.5 px-3 font-semibold">평가 등급</th>
                <th className="py-2.5 px-3 font-semibold">운영팀 조치 가이드</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.actionThresholds.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {row.scoreRange}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full font-bold text-[11px] ${
                        idx === 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : idx === 1
                          ? 'bg-blue-100 text-blue-800'
                          : idx === 2
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{row.actionGuidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
