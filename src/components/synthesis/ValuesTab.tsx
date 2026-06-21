/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, BrainCircuit, Shuffle, Check, Sparkles, LayoutGrid, Eye } from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { SynthesisReport, ConflictContext } from '../../types';

interface ValuesTabProps {
  synthesis: SynthesisReport;
  conflictContext?: ConflictContext;
  partnerAName: string;
  partnerBName: string;
  localMatrix: any[];
  setLocalMatrix: (matrix: any[]) => void;
  handleRatingChange: (idx: number, isPartnerA: boolean, val: number) => void;
  handleApplySuggestion: (idx: number) => void;
  handleApplyAllSuggestions: () => void;
}

export default function ValuesTab({
  synthesis,
  conflictContext,
  partnerAName,
  partnerBName,
  localMatrix,
  setLocalMatrix,
  handleRatingChange,
  handleApplySuggestion,
  handleApplyAllSuggestions,
}: ValuesTabProps) {
  const [diagramType, setDiagramType] = useState<'radar' | 'bar'>('radar');
  const isSolo = conflictContext?.revMode === 'single';

  // Format dataset for Recharts rendering
  const chartData = localMatrix.map(val => {
    const formatted: any = {
      subject: val.valueName,
    };
    formatted[partnerAName] = val.partnerARating;
    formatted[`${partnerAName} Calibrated`] = val.suggestedPartnerARating ?? val.partnerARating;
    
    if (!isSolo) {
      formatted[partnerBName || 'Partner B'] = val.partnerBRating;
      formatted[`${partnerBName || 'Partner B'} Calibrated`] = val.suggestedPartnerBRating ?? val.partnerBRating;
    }
    return formatted;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2D9] shadow-xs max-w-4xl mx-auto space-y-6">
      
      {/* Informational Header Section: What Priorities Mean */}
      <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-[#E5E2D9] space-y-4 shadow-2xs text-left">
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-[#5A5A40]/10 rounded-lg text-[#5A5A40] shrink-0 mt-0.5">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-serif font-semibold text-[#33332D]">
              What Do Relational "Priorities" Mean?
            </h3>
            <p className="text-xs text-[#6B6B5E] leading-relaxed">
              Priorities in a relationship define the fundamental human coordinates—such as <strong>{isSolo ? "Reassurance, Autonomy, Order, or Spontaneous Connection" : "Emotional Harmony, Autonomy, Order, or Spontaneous Connection"}</strong>—that dictate how we behave when stressed.
            </p>
          </div>
        </div>
        
        <div className="border-t border-[#E5E2D9]/60 pt-3 text-xs text-[#6B6B5E] space-y-2 leading-relaxed">
          <p>
            ⚠️ <strong>The Bias of Self-Reporting:</strong> Relying solely on an individual to identify their own priorities is highly subject to <em>emotional contamination</em>. When caught in defensive patterns, fear of being managed might cause {isSolo ? "you" : partnerBName || "Partner B"} to artificially inflate {isSolo ? "your" : "their"} Autonomy score, or anxiety might cause {partnerAName} to exaggerate their demand for Structural Security.
          </p>
          <p>
            🧠 <strong>The De-contaminated AI Model:</strong> By cross-referencing your private unedited journal histories against active dialogues, our system extracts your <strong>factual baseline requirements</strong>. Below, you can inspect self-reported expectations, read deep diagnostic insight explanations, and safely override ratings to align on real underlying needs.
          </p>
        </div>
      </div>

      {/* NEW: Interactive Priorities Overlap & Disparity Diagram with Toggle */}
      <div className="border border-[#E5E2D9] rounded-2xl overflow-hidden bg-[#FAF9F6] p-5 space-y-5 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E2D9] pb-3 select-none">
          <div>
            <h4 className="text-sm font-serif font-bold text-[#33332D] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D18B6B]" />
              Interactive Alignment & Value Matrix Diagram
            </h4>
            <p className="text-[11px] text-[#6B6B5E]">Compare active weights, Gaps, and the de-contaminated AI insights in real-time.</p>
          </div>
          <div className="flex items-center bg-white border border-[#E5E2D9] p-1 rounded-xl shadow-3xs hover:border-[#C5C2B9] transition">
            <button
              onClick={() => setDiagramType('radar')}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                diagramType === 'radar' 
                  ? 'bg-[#5A5A40] text-white shadow-3xs' 
                  : 'text-[#8C8C7F] hover:text-[#4A4A40]'
              }`}
            >
              🕸️ Radar Spider
            </button>
            <button
              onClick={() => setDiagramType('bar')}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                diagramType === 'bar' 
                  ? 'bg-[#5A5A40] text-white shadow-3xs' 
                  : 'text-[#8C8C7F] hover:text-[#4A4A40]'
              }`}
            >
              📊 Symmetry Bars
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Chart visual slot */}
          <div className="md:col-span-7 bg-white border border-[#E5E2D9] rounded-xl p-4 h-72 flex items-center justify-center shadow-3xs">
            <ResponsiveContainer width="100%" height="100%">
              {diagramType === 'radar' ? (
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <PolarGrid stroke="#E5E2D9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A4A40', fontSize: 10, fontFamily: 'serif', fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#E5E2D9" tick={{ fontSize: 8, fill: '#8C8C7F' }} />
                  
                  {/* Partner A Stated */}
                  <Radar
                    name={`${partnerAName} Stated`}
                    dataKey={partnerAName}
                    stroke="#5A5A40"
                    fill="#5A5A40"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />

                  {/* Partner B Stated (only if not solo) */}
                  {!isSolo && (
                    <Radar
                      name={`${partnerBName || 'Partner B'} Stated`}
                      dataKey={partnerBName || 'Partner B'}
                      stroke="#D18B6B"
                      fill="#D18B6B"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  )}

                  {/* Partner A AI Calibrated */}
                  <Radar
                    name={`${partnerAName} Calibrated`}
                    dataKey={`${partnerAName} Calibrated`}
                    stroke="#8DA58D"
                    fill="#8DA58D"
                    fillOpacity={0.05}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />

                  {/* Partner B AI Calibrated (only if not solo) */}
                  {!isSolo && (
                    <Radar
                      name={`${partnerBName || 'Partner B'} Calibrated`}
                      dataKey={`${partnerBName || 'Partner B'} Calibrated`}
                      stroke="#D18B6B"
                      fill="#D18B6B"
                      fillOpacity={0.0}
                      strokeWidth={1.5}
                      strokeDasharray="3 3"
                    />
                  )}
                  
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FAF9F6',
                      border: '1px solid #E5E2D9',
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: '#4A4A40',
                      fontFamily: 'serif'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace', marginTop: '10px' }} />
                </RadarChart>
              ) : (
                <BarChart data={chartData} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D9" vertical={false} />
                  <XAxis dataKey="subject" tick={{ fill: '#6B6B5E', fontSize: 9, fontFamily: 'monospace' }} />
                  <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tick={{ fill: '#8C8C7F', fontSize: 9 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FAF9F6',
                      border: '1px solid #E5E2D9',
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: '#4A4A40',
                      fontFamily: 'serif'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace' }} />
                  
                  <Bar name={`${partnerAName} Stated`} dataKey={partnerAName} fill="#5A5A40" radius={[4, 4, 0, 0]} />
                  
                  {!isSolo && (
                    <Bar name={`${partnerBName || 'Partner B'} Stated`} dataKey={partnerBName || 'Partner B'} fill="#D18B6B" radius={[4, 4, 0, 0]} />
                  )}

                  <Bar name={`${partnerAName} Calibrated`} dataKey={`${partnerAName} Calibrated`} fill="#8DA58D" radius={[4, 4, 0, 0]} opacity={0.65} />
                  
                  {!isSolo && (
                    <Bar name={`${partnerBName || 'Partner B'} Calibrated`} dataKey={`${partnerBName || 'Partner B'} Calibrated`} fill="#E5AA8A" radius={[4, 4, 0, 0]} opacity={0.65} />
                  )}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Explanation panel describing the diagram */}
          <div className="md:col-span-5 space-y-3.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#5A5A40]/10 text-[#4A4A35] text-[9.5px] font-mono tracking-wider font-bold">
              📚 DIAGRAM EXPLANATION
            </span>
            <div className="space-y-3 text-xs text-[#6B6B5E] leading-relaxed">
              <p>
                This diagram maps your <strong>relational geometry</strong> as overlapping polygons. The shape and intersections represent how aligned your primary motivators are.
              </p>
              <div className="space-y-2 border-t border-[#E5E2D9]/60 pt-2.5 font-sans">
                <div className="flex gap-2">
                  <span className="font-mono text-[9.5px] font-black text-[#5A5A40] mt-0.5">■</span>
                  <p className="text-[11px]">
                    <strong>Convergence Polygons:</strong> The intersections represent shared relational strengths. When polygons overlap broadly, couples enjoy a high degree of cooperative default behaviors.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[9.5px] font-black text-red-500 mt-0.5">■</span>
                  <p className="text-[11px]">
                    <strong>Divergence Gaps:</strong> Disparity areas where vertices push opposite colors depict structural clash zones. Gaps larger than <strong>4 points</strong> indicate high potential for defensive cycles.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[9.5px] font-black text-[#8DA58D] mt-0.5">╍╍</span>
                  <p className="text-[11px]">
                    <strong>De-contaminated Calibrations:</strong> The dashed profiles plot the corrective guidelines extracted by Gemini. Moving your stated weights closer to these targets breaks childhood defensive armor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Master Recalibrate Toolbar if suggestions exist */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF9F6] p-4 rounded-2xl border border-[#E5E2D9] text-left">
        <div className="text-left">
          <span className="text-[10px] font-mono uppercase text-[#8C8C7F] block">Calibration Workspace</span>
          <span className="text-xs font-semibold text-[#4A4A40]">Fine-tune or synchronize with unedited insights</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setLocalMatrix(synthesis.valueMatrix)}
            className="px-3 py-1.5 bg-white border border-[#E5E2D9] rounded-xl text-[11px] font-medium text-[#6B6B5E] hover:bg-[#FAF9F6] transition active:scale-95 cursor-pointer shadow-3xs"
          >
            Reset to Stated
          </button>
          <button
            type="button"
            onClick={handleApplyAllSuggestions}
            className="px-3.5 py-1.5 bg-[#5A5A40] text-white border border-transparent rounded-xl text-[11px] font-medium hover:bg-[#4A4A35] transition flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-[#D18B6B]" />
            Auto-Apply AI Calibration
          </button>
        </div>
      </div>

      {/* Custom interactive slider matrix list */}
      <div id="custom-value-matrix-list" className="space-y-6 pt-2 font-sans">
        
        {localMatrix.map((val, idx) => {
          const disparity = Math.abs(val.partnerARating - val.partnerBRating);

          // Check if current rating matches the recommendation
          const hasPendingSuggestion = 
            val.suggestedPartnerARating !== undefined && 
            (val.partnerARating !== val.suggestedPartnerARating || val.partnerBRating !== val.suggestedPartnerBRating);

          return (
            <div key={idx} className="p-5 sm:p-6 bg-[#FAF9F6] rounded-2xl border border-[#E5E2D9] space-y-4 transition hover:border-[#8DA58D]/40 shadow-3xs text-left">
              
              {/* Name, definition and Gap labels */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-[#33332D] flex items-center gap-2">
                    {val.valueName}
                  </h4>
                  <p className="text-xs text-[#6B6B5E] max-w-2xl leading-relaxed">
                    {val.definition}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0 self-start sm:self-auto">
                  {hasPendingSuggestion ? (
                    <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-lg border uppercase bg-[#D18B6B]/10 text-[#C07B5C] border-[#D18B6B]/25 flex items-center gap-1">
                      <Shuffle className="w-2.5 h-2.5 shrink-0" /> Potential Bias
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-lg border uppercase bg-green-50 text-[#5F8C5F] border-green-200 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 shrink-0" /> AI Calibrated
                    </span>
                  )}
                  <span className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded-lg border uppercase ${
                    disparity >= 4 ? 'bg-[#FAF2F2] text-red-700 border-red-200' : 'bg-white text-[#8C8C7F] border-[#E5E2D9]'
                  }`}>
                    {disparity >= 4 ? `⚠️ Disparate Gaps` : `Synced`}
                  </span>
                </div>
              </div>

              {/* Side-by-side interactive sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#E5E2D9]/40">
                {/* Partner A (Alex) - Sage Green Slider */}
                <div className="space-y-2 bg-white p-3.5 rounded-xl border border-[#E5E2D9]/80">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#6B6B5E]">
                    <span className="font-semibold uppercase tracking-wider">{partnerAName} Weight</span>
                    <span className="font-bold text-white bg-[#5A5A40] px-2 py-0.5 rounded-md min-w-[28px] text-center">{val.partnerARating}/10</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="1"
                    value={val.partnerARating}
                    onChange={(e) => handleRatingChange(idx, true, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#EBE8E1] rounded-lg appearance-none cursor-pointer accent-[#5A5A40] focus:outline-none"
                  />
                </div>

                {/* Partner B (Taylor) - Terracotta Slider */}
                <div className="space-y-2 bg-white p-3.5 rounded-xl border border-[#E5E2D9]/80">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#6B6B5E]">
                    <span className="font-semibold uppercase tracking-wider">{partnerBName} Weight</span>
                    <span className="font-bold text-white bg-[#D18B6B] px-2 py-0.5 rounded-md min-w-[28px] text-center">{val.partnerBRating}/10</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="1"
                    value={val.partnerBRating}
                    onChange={(e) => handleRatingChange(idx, false, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#EBE8E1] rounded-lg appearance-none cursor-pointer accent-[#D18B6B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Detailed AI Suggestion overlay panel with deep diagnosis if discrepancies exist */}
              {val.suggestedPartnerARating !== undefined && (
                <div className="bg-white border border-[#E5E2D9] rounded-xl p-4 space-y-3 mt-1 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E2D9]/40 pb-2">
                    <span className="text-[10px] font-mono font-bold text-[#5A5A40] flex items-center gap-1">
                      <BrainCircuit className="w-3.5 h-3.5 text-[#D18B6B]" />
                      DE-CONTAMINATED PRIORITIES INSIGHT
                    </span>
                    {hasPendingSuggestion && (
                      <button
                        type="button"
                        onClick={() => handleApplySuggestion(idx)}
                        className="text-[10px] bg-[#5A5A40] hover:bg-[#4A4A35] text-white px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 cursor-pointer active:scale-95 shadow-3xs"
                      >
                        <Sparkles className="w-3 h-3 text-[#D18B6B]" />
                        Align to AI Correction
                      </button>
                    )}
                  </div>
                  
                  <p className="text-[11px] text-[#6B6B5E] leading-relaxed italic">
                    "{val.insightAnalysis}"
                  </p>
                  
                  <div className="flex gap-4 text-[10px] font-mono text-[#8C8C7F]">
                    <div>
                      <span>Stated: </span>
                      <span className="font-semibold text-[#4A4A40]">{partnerAName}: {val.partnerARating}, {partnerBName}: {val.partnerBRating}</span>
                    </div>
                    <div className="border-l border-[#E5E2D9]/60 pl-4">
                      <span className="text-[#5A5A40] font-semibold">AI Baseline: </span>
                      <span className="font-semibold text-[#4A4A40]">{partnerAName}: {val.suggestedPartnerARating}, {partnerBName}: {val.suggestedPartnerBRating}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}
