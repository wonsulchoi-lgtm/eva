import React, { useState } from 'react';
import { EvaluationPlan } from '../types/evaluation';
import { X, Printer, FileText, FileSpreadsheet, Copy, Check, Download, Upload } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: EvaluationPlan;
  onImportPlan?: (imported: EvaluationPlan) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  plan,
  onImportPlan,
}) => {
  const [copiedMd, setCopiedMd] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownReport = (): string => {
    let md = `# [교육평가 종합설계서] ${plan.courseInput.courseTitle}\n\n`;
    md += `- **교육 대상:** ${plan.courseInput.targetAudience}\n`;
    md += `- **교육 기간:** ${plan.courseInput.trainingPeriod} (${plan.courseInput.deliveryMethod})\n`;
    md += `- **생성 일시:** ${new Date(plan.createdAt).toLocaleDateString('ko-KR')}\n\n`;

    md += `## 1. 평가 총괄 요약 (Executive Summary)\n${plan.executiveSummary}\n\n`;

    md += `## 2. 커크패트릭 4단계 평가 매트릭스 요약\n`;
    plan.matrixSummary.forEach((m) => {
      md += `### ${m.name} (${m.subtitle})\n`;
      md += `- **평가 대상:** ${m.target}\n`;
      md += `- **평가 시점:** ${m.timing}\n`;
      md += `- **측정 도구:** ${m.method}\n`;
      md += `- **목표 기준:** ${m.benchmark}\n\n`;
    });

    md += `## 3. [1단계] 반응 평가 (Reaction)\n`;
    md += `**목적:** ${plan.level1.purpose}\n\n`;
    plan.level1.categories.forEach((cat) => {
      md += `#### ${cat.categoryName}\n`;
      cat.questions.forEach((q, i) => {
        md += `${i + 1}. ${q.text} (5점 척도)\n`;
      });
      md += `\n`;
    });
    md += `#### 주관식 서술형 질문\n`;
    plan.level1.openQuestions.forEach((oq, i) => {
      md += `${i + 1}. ${oq.question} *(의도: ${oq.intent})*\n`;
    });
    md += `\n`;

    md += `## 4. [2단계] 학습 평가 (Learning)\n`;
    md += `**목적:** ${plan.level2.purpose}\n\n`;
    md += `#### 지식 진단 테스트 (객관식)\n`;
    plan.level2.knowledgeQuiz.forEach((q, i) => {
      md += `**Q${i + 1}. ${q.question}**\n`;
      q.options.forEach((opt, oIdx) => {
        md += `- [${oIdx === q.correctAnswerIndex ? 'x' : ' '}] ${oIdx + 1}. ${opt}\n`;
      });
      md += `*해설: ${q.explanation}*\n\n`;
    });

    md += `#### 실무 과제 루브릭: ${plan.level2.performanceRubric.taskTitle}\n`;
    md += `${plan.level2.performanceRubric.taskDescription}\n\n`;
    plan.level2.performanceRubric.criteria.forEach((c) => {
      md += `- **${c.dimension} (배점 ${c.weight}%):**\n`;
      md += `  - 상: ${c.levels.high}\n`;
      md += `  - 중: ${c.levels.medium}\n`;
      md += `  - 하: ${c.levels.low}\n`;
    });
    md += `\n`;

    md += `## 5. [3단계] 행동 평가 (Behavior)\n`;
    md += `**목적:** ${plan.level3.purpose} (측정: ${plan.level3.evaluationTiming})\n\n`;
    plan.level3.behaviorItems.forEach((b, i) => {
      md += `#### ${i + 1}. ${b.competency}\n`;
      md += `- **구체적 행동 지표:** ${b.actionItem}\n`;
      md += `- **목표 빈도:** ${b.frequencyGoal} | **측정 방식:** ${b.measurementMethod}\n`;
      md += `- **자가 평가 문항:** ${b.selfScorePrompt}\n`;
      md += `- **부서장 관찰 문항:** ${b.managerScorePrompt}\n\n`;
    });

    md += `## 6. [4단계] 결과 평가 (Business Results & ROI)\n`;
    md += `**목적:** ${plan.level4.purpose} (측정 주기: ${plan.level4.measurementPeriod})\n\n`;
    md += `#### 핵심 비즈니스 KPI\n`;
    plan.level4.businessKPIs.forEach((k) => {
      md += `- **${k.kpiName}** (${k.type}): 기준치 \`${k.baselineValue}\` ➔ 목표치 \`${k.targetValue}\` (출처: ${k.dataSource})\n`;
    });

    return md;
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdownReport();
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadWord = () => {
    const title = plan.courseInput.courseTitle || '교육평가계획서';
    const contentHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${title}</title>
      <style>
        body { font-family: 'Malgun Gothic', Dotum, sans-serif; line-height: 1.6; }
        h1 { color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 8px; }
        h2 { color: #1e40af; margin-top: 24px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
        h3 { color: #334155; }
        table { border-collapse: collapse; width: 100%; margin: 12px 0; }
        th, td { border: 1px solid #cbd5e1; padding: 8px 10px; font-size: 13px; }
        th { background-color: #f1f5f9; text-align: left; }
        .box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; margin: 10px 0; border-radius: 6px; }
      </style>
      </head>
      <body>
        <h1>[교육평가 종합설계서] ${title}</h1>
        <div class="box">
          <p><strong>교육 대상:</strong> ${plan.courseInput.targetAudience} | <strong>교육 시간:</strong> ${plan.courseInput.trainingPeriod} (${plan.courseInput.deliveryMethod})</p>
          <p><strong>총괄 요약:</strong> ${plan.executiveSummary}</p>
        </div>

        <h2>1. 커크패트릭 4단계 평가 매트릭스</h2>
        <table>
          <tr><th>단계</th><th>평가 명칭</th><th>대상 및 시점</th><th>측정 도구</th><th>목표 기준</th></tr>
          ${plan.matrixSummary
            .map(
              (m) =>
                `<tr><td>Level ${m.level}</td><td><strong>${m.name}</strong></td><td>${m.target} (${m.timing})</td><td>${m.method}</td><td>${m.benchmark}</td></tr>`
            )
            .join('')}
        </table>

        <h2>2. 1단계 반응 평가 설문지</h2>
        <p><strong>평가 시점:</strong> ${plan.level1.timing} | <strong>목표 점수:</strong> ${plan.level1.targetScore}점 이상</p>
        ${plan.level1.categories
          .map(
            (cat) => `
          <h3>${cat.categoryName}</h3>
          <table>
            <tr><th width="80%">문항 내용</th><th width="20%">척도</th></tr>
            ${cat.questions.map((q) => `<tr><td>${q.text}</td><td>5점 리커트</td></tr>`).join('')}
          </table>
        `
          )
          .join('')}

        <h2>3. 2단계 학습 평가 도구</h2>
        <h3>(1) 지식 진단 테스트 문항</h3>
        ${plan.level2.knowledgeQuiz
          .map(
            (q, idx) => `
          <p><strong>[문항 ${idx + 1}] ${q.question}</strong></p>
          <ul>
            ${q.options.map((opt, oIdx) => `<li>${oIdx + 1}. ${opt} ${oIdx === q.correctAnswerIndex ? '<strong>(정답)</strong>' : ''}</li>`).join('')}
          </ul>
          <p><em>* 해설: ${q.explanation}</em></p>
        `
          )
          .join('')}

        <h3>(2) 실기 과제 평가 루브릭: ${plan.level2.performanceRubric.taskTitle}</h3>
        <table>
          <tr><th>평가 항목 (배점)</th><th>상 (우수)</th><th>중 (보통)</th><th>하 (미흡)</th></tr>
          ${plan.level2.performanceRubric.criteria
            .map(
              (c) =>
                `<tr><td><strong>${c.dimension} (${c.weight}%)</strong></td><td>${c.levels.high}</td><td>${c.levels.medium}</td><td>${c.levels.low}</td></tr>`
            )
            .join('')}
        </table>

        <h2>4. 3단계 행동 평가 체크리스트 (수료 후 30~60일)</h2>
        <table>
          <tr><th>역량 항목</th><th>구체적 관찰 행동 지표</th><th>자가 점검 문항</th><th>부서장 관찰 문항</th></tr>
          ${plan.level3.behaviorItems
            .map(
              (b) =>
                `<tr><td><strong>${b.competency}</strong></td><td>${b.actionItem}</td><td>${b.selfScorePrompt}</td><td>${b.managerScorePrompt}</td></tr>`
            )
            .join('')}
        </table>

        <h2>5. 4단계 결과 평가 및 비즈니스 KPI</h2>
        <table>
          <tr><th>핵심 KPI 명칭</th><th>구분</th><th>과거치 (Baseline)</th><th>목표치 (Target)</th><th>데이터 출처</th><th>교육 기여도 분리 방법</th></tr>
          ${plan.level4.businessKPIs
            .map(
              (k) =>
                `<tr><td><strong>${k.kpiName}</strong></td><td>${k.type}</td><td>${k.baselineValue}</td><td>${k.targetValue}</td><td>${k.dataSource}</td><td>${k.isolationMethod}</td></tr>`
            )
            .join('')}
        </table>
      </body></html>
    `;

    const blob = new Blob(['\ufeff' + contentHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `[교육평가서]_${title.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsv = () => {
    let csv = '\ufeff'; // UTF-8 BOM
    csv += '평가단계,구분/카테고리,문항/항목명,세부내용/기준,목표치/배점,측정방식\n';

    // Matrix
    plan.matrixSummary.forEach((m) => {
      csv += `"전체 매트릭스","Level ${m.level}","${m.name}","${m.target} / ${m.timing}","${m.benchmark}","${m.method}"\n`;
    });

    // Level 1
    plan.level1.categories.forEach((cat) => {
      cat.questions.forEach((q) => {
        csv += `"1단계 반응","${cat.categoryName}","${q.text}","5점 리커트 척도","4.3점 이상","설문지"\n`;
      });
    });

    // Level 2
    plan.level2.knowledgeQuiz.forEach((q, idx) => {
      csv += `"2단계 학습","객관식 퀴즈","Q${idx + 1}. ${q.question}","정답: ${q.options[q.correctAnswerIndex]}","80점 이상","지식진단"\n`;
    });
    plan.level2.performanceRubric.criteria.forEach((c) => {
      csv += `"2단계 학습","실기 루브릭","${c.dimension}","상:${c.levels.high} / 중:${c.levels.medium}","가중치 ${c.weight}%","루브릭 평가"\n`;
    });

    // Level 3
    plan.level3.behaviorItems.forEach((b) => {
      csv += `"3단계 행동","${b.competency}","${b.actionItem}","${b.selfScorePrompt}","${b.frequencyGoal}","${b.measurementMethod}"\n`;
    });

    // Level 4
    plan.level4.businessKPIs.forEach((k) => {
      csv += `"4단계 결과","${k.type}","${k.kpiName}","현재:${k.baselineValue} ➔ 목표:${k.targetValue}","${k.dataSource}","${k.isolationMethod}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `[교육평가지표]_${plan.courseInput.courseTitle.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(plan, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `[KirkpatrickPlan]_${plan.courseInput.courseTitle.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">보고서 내보내기 & 공유</h3>
              <p className="text-xs text-slate-500">인쇄, Word, Excel, Markdown 형식 지원</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Print / PDF */}
          <button
            onClick={handlePrint}
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group flex items-start space-x-3"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block">인쇄 / PDF 저장</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                브라우저 인쇄 창을 열어 PDF로 저장하거나 출력합니다.
              </span>
            </div>
          </button>

          {/* Word Download */}
          <button
            onClick={handleDownloadWord}
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group flex items-start space-x-3"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block">MS Word (.doc)</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                표와 서식이 포함된 워드/한글 호환 문서로 다운로드합니다.
              </span>
            </div>
          </button>

          {/* Excel / CSV */}
          <button
            onClick={handleDownloadCsv}
            className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left group flex items-start space-x-3"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block">엑셀 CSV 다운로드</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                모든 평가 문항과 루브릭 지표를 스프레드시트용으로 내보냅니다.
              </span>
            </div>
          </button>

          {/* Markdown Copy */}
          <button
            onClick={handleCopyMarkdown}
            className="p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 transition-all text-left group flex items-start space-x-3"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {copiedMd ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </div>
            <div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                {copiedMd ? '복사 완료!' : '마크다운 전체 복사'}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                노션(Notion), 슬랙, 컨플루언스에 붙여넣기 할 수 있습니다.
              </span>
            </div>
          </button>
        </div>

        {/* JSON Backup & Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={handleDownloadJson}
            className="text-slate-500 hover:text-slate-800 underline"
          >
            JSON 데이터 원본 파일 백업 (.json)
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
