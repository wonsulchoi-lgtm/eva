import React, { useState } from 'react';
import { Level4ResultsData, BusinessKPI, CostOrBenefitItem } from '../types/evaluation';
import { TrendingUp, Calculator, Layers, Calendar, DollarSign, Plus, Trash2, HelpCircle, CheckCircle2 } from 'lucide-react';

interface Level4ResultsViewProps {
  data: Level4ResultsData;
  onUpdate: (updated: Level4ResultsData) => void;
}

export const Level4ResultsView: React.FC<Level4ResultsViewProps> = ({ data, onUpdate }) => {
  const [subTab, setSubTab] = useState<'kpi' | 'roi' | 'roadmap'>('kpi');

  // ROI Calculator Interactive States
  const [benefits, setBenefits] = useState<CostOrBenefitItem[]>(data.roiFramework.benefits);
  const [costs, setCosts] = useState<CostOrBenefitItem[]>(data.roiFramework.costs);
  const [contributionRate, setContributionRate] = useState<number>(data.roiFramework.contributionRate || 50);

  // Calculate Real-time Financials
  const totalBenefits = benefits.reduce((acc, item) => acc + item.amount, 0);
  const totalCosts = costs.reduce((acc, item) => acc + item.amount, 0);

  // Attributable benefit according to training contribution rate
  const attributableBenefit = totalBenefits * (contributionRate / 100);
  const netBenefit = attributableBenefit - totalCosts;
  const roiPercent = totalCosts > 0 ? Math.round((netBenefit / totalCosts) * 100) : 0;
  const bcrRatio = totalCosts > 0 ? (totalBenefits / totalCosts).toFixed(2) : '0';

  const formatKRW = (num: number) => {
    return (num / 10000).toLocaleString('ko-KR') + '만 원';
  };

  const handleBenefitAmountChange = (id: string, newAmount: number) => {
    setBenefits((prev) =>
      prev.map((b) => (b.id === id ? { ...b, amount: Math.max(0, newAmount) } : b))
    );
  };

  const handleCostAmountChange = (id: string, newAmount: number) => {
    setCosts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, amount: Math.max(0, newAmount) } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Kirkpatrick Level 4 & Phillips ROI
              </span>
              <h3 className="text-xl font-bold text-slate-900">{data.title}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{data.purpose}</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 font-semibold border border-purple-100">
              측정 주기: {data.measurementPeriod}
            </span>
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="mt-4 flex items-center space-x-2 border-b border-slate-100 pb-2">
          <button
            onClick={() => setSubTab('kpi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              subTab === 'kpi'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>비즈니스 핵심 KPI 지표 ({data.businessKPIs.length}개)</span>
          </button>
          <button
            onClick={() => setSubTab('roi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              subTab === 'roi'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>인터랙티브 교육 ROI 계산기</span>
          </button>
          <button
            onClick={() => setSubTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              subTab === 'roadmap'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>평가 실행 및 성과화 로드맵</span>
          </button>
        </div>
      </div>

      {/* SubTab 1: Business KPIs */}
      {subTab === 'kpi' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.businessKPIs.map((kpi, idx) => (
              <div
                key={kpi.id}
                className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold">
                      KPI {idx + 1}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{kpi.kpiName}</h4>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                      kpi.type.includes('정량')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {kpi.type}
                  </span>
                </div>

                {/* Target Metric Box */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">과거 기준치 (Baseline)</span>
                    <span className="font-bold text-slate-700">{kpi.baselineValue}</span>
                  </div>
                  <div>
                    <span className="text-purple-600 font-bold block mb-0.5">교육 후 목표치 (Target)</span>
                    <span className="font-extrabold text-purple-800">{kpi.targetValue}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <div>
                    <strong className="text-slate-800">📊 데이터 수집 출처:</strong> {kpi.dataSource}
                  </div>
                  <div>
                    <strong className="text-purple-900">🔍 교육 기여도 분리 방법:</strong>{' '}
                    {kpi.isolationMethod}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 flex items-start space-x-2.5">
            <HelpCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <strong>교육 기여도 분리(Isolation of Training Effects) 핵심:</strong> 성과 개선에는 교육 외에도 시장 환경, 신규 시스템 도입, 마케팅 프로모션 등 다양한 외생 변수가 개입합니다. 따라서 통제 집단(Control Group) 비교 또는 학습자 및 부서장의 기여도 추정 가중치를 적용하여 순수 교육 기여분만을 투명하게 분리 산출해야 신뢰성을 확보할 수 있습니다.
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Interactive ROI Calculator */}
      {subTab === 'roi' && (
        <div className="space-y-6">
          {/* ROI Executive Dashboard Bar */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-purple-300">
                  Phillips ROI Model Summary
                </span>
                <h4 className="text-2xl font-black">
                  순 투자수익률(ROI):{' '}
                  <span className={roiPercent >= 100 ? 'text-emerald-400' : 'text-amber-300'}>
                    +{roiPercent}%
                  </span>
                </h4>
                <p className="text-xs text-slate-300">
                  비용편익비(BCR): <strong>{bcrRatio} : 1</strong> (투자액 1원당 {bcrRatio}원 회수)
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs border border-white/10">
                  <span className="text-slate-300 block mb-0.5 text-[11px]">총 편익 환산액</span>
                  <span className="font-bold text-white text-sm">{formatKRW(totalBenefits)}</span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs border border-white/10">
                  <span className="text-slate-300 block mb-0.5 text-[11px]">교육 기여 편익</span>
                  <span className="font-bold text-emerald-300 text-sm">
                    {formatKRW(attributableBenefit)}
                  </span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs border border-white/10">
                  <span className="text-slate-300 block mb-0.5 text-[11px]">총 교육 투자비</span>
                  <span className="font-bold text-rose-300 text-sm">{formatKRW(totalCosts)}</span>
                </div>
              </div>
            </div>

            {/* Slider for Training Contribution Rate */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-purple-200 flex items-center space-x-1.5">
                  <span>교육 기여도 가중치 (Contribution Rate):</span>
                  <span className="text-white text-sm font-extrabold bg-purple-700/80 px-2 py-0.5 rounded-md">
                    {contributionRate}%
                  </span>
                </label>
                <span className="text-xs text-slate-300">
                  슬라이더를 움직여 보수적/적극적 시나리오를 검토하세요
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={contributionRate}
                onChange={(e) => setContributionRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>
          </div>

          {/* Benefits & Costs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Benefit Items */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <h4 className="font-bold text-slate-900 text-sm">측정 편익 항목 (Benefits)</h4>
                </div>
                <span className="text-xs font-bold text-emerald-700">
                  합계: {formatKRW(totalBenefits)}
                </span>
              </div>

              <div className="space-y-3">
                {benefits.map((b) => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs">{b.name}</span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          step="1000000"
                          value={b.amount}
                          onChange={(e) => handleBenefitAmountChange(b.id, Number(e.target.value))}
                          className="w-28 px-2 py-1 text-right text-xs font-bold rounded-lg border border-slate-300 focus:ring-1 focus:ring-purple-500"
                        />
                        <span className="text-xs text-slate-500">원</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      <strong>산출 근거:</strong> {b.basis}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Items */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <h4 className="font-bold text-slate-900 text-sm">교육 투자 비용 (Costs)</h4>
                </div>
                <span className="text-xs font-bold text-rose-700">
                  합계: {formatKRW(totalCosts)}
                </span>
              </div>

              <div className="space-y-3">
                {costs.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs">{c.name}</span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          step="500000"
                          value={c.amount}
                          onChange={(e) => handleCostAmountChange(c.id, Number(e.target.value))}
                          className="w-28 px-2 py-1 text-right text-xs font-bold rounded-lg border border-slate-300 focus:ring-1 focus:ring-purple-500"
                        />
                        <span className="text-xs text-slate-500">원</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      <strong>산출 근거:</strong> {c.basis}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Implementation Roadmap */}
      {subTab === 'roadmap' && (
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h4 className="font-bold text-slate-900 text-sm">4단계 평가 실행 및 성과화 일정 로드맵</h4>
          </div>

          <div className="space-y-3">
            {data.implementationRoadmap.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{item.phase}</h5>
                      <span className="text-xs text-slate-500 font-medium">({item.timeline})</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-snug">{item.milestone}</p>
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-auto">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold">
                    담당: {item.responsible}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
