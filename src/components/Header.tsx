import React from 'react';
import { Award, BookOpen, Download, HelpCircle, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenExport: () => void;
  hasPlan: boolean;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGuide,
  onOpenExport,
  hasPlan,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                Kirkpatrick 4-Level Evaluation
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
                HRD 전문 도구
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              교육 목표 & 내용 기반 커크패트릭 1~4단계 교육평가 체계 자동 생성 솔루션
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenGuide}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            title="커크패트릭 4단계 평가 모델 가이드"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span className="hidden md:inline">평가 프레임워크 가이드</span>
          </button>

          {hasPlan && (
            <>
              <button
                onClick={onReset}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="새로운 교육과정 입력"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden md:inline">새로 작성</span>
              </button>

              <button
                onClick={onOpenExport}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>보고서 내보내기 / 인쇄</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
