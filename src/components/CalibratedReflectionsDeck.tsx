import React, { useState } from 'react';
import { 
  Lightbulb, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles 
} from 'lucide-react';
import { PartnerProfile } from '../types';

interface CalibratedReflectionsDeckProps {
  profile: PartnerProfile;
  isA: boolean;
  isSending: boolean;
  opponentName: string;
  getAdaptiveCalibrator: () => { threshold: number; mean: number; count: number; status: string };
  handleRatingChange: (prompt: string, rating: number) => void;
  handleEngageInquiry: (prompt: string) => void;
}

export default function CalibratedReflectionsDeck({
  profile,
  isA,
  isSending,
  opponentName,
  getAdaptiveCalibrator,
  handleRatingChange,
  handleEngageInquiry
}: CalibratedReflectionsDeckProps) {
  const [activePromptIdx, setActivePromptIdx] = useState(0);
  const [isDeckCollapsed, setIsDeckCollapsed] = useState(false);
  const [showTechMetrics, setShowTechMetrics] = useState(false);

  const reflections = profile.hiddenInjectedReflections || [];
  if (reflections.length === 0) return null;

  const currentRawPrompt = reflections[activePromptIdx] || "";
  const cleanPrompt = currentRawPrompt.replace(/Ask.*?:/, '').replace(/^Prompt:\s*/i, '').trim();
  const resonance = profile.reflectionRatings?.[currentRawPrompt] ?? 5;

  let resonanceDesc = "Neutral / Not sure";
  let resonanceColor = "text-[#8C8C7F] bg-[#FAF9F6]";
  if (resonance >= 9) {
    resonanceDesc = "Crucial Insight / Immediate Hotspot";
    resonanceColor = "text-red-700 bg-red-50 border-red-100 font-bold animate-pulse";
  } else if (resonance >= 7) {
    resonanceDesc = "Strong Resonance / Active Friction";
    resonanceColor = "text-[#C05C5C] bg-[#D18B6B]/15 border-[#D18B6B]/25";
  } else if (resonance >= 4) {
    resonanceDesc = "Subtle Vibe / Mild Awareness";
    resonanceColor = "text-[#5A5A40] bg-[#5A5A40]/10 border-[#5A5A40]/15";
  } else {
    resonanceDesc = "No Charge / Little Tension";
    resonanceColor = "text-[#8C8C7F] bg-[#E5E2D9]/30 border-transparent";
  }

  const cal = getAdaptiveCalibrator();

  return (
    <div className="bg-white rounded-2xl border border-[#E5E2D9] px-5 py-4 text-left shadow-xs">
      {isDeckCollapsed ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <span className="p-1.5 rounded-lg bg-[#5A5A40]/10 text-[#5A5A40] shrink-0">
              <Lightbulb className="w-3.5 h-3.5 text-[#5A5A40]" />
            </span>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-medium text-[#33332D] line-clamp-1">
                Active Inquiry: <span className="font-serif italic font-normal text-[#5A5A40]">"{cleanPrompt}"</span>
              </span>
              <p className="text-[9px] text-[#8C8C7F] font-mono mt-0.5">
                Calibration: {cal.threshold}/10 ({cal.status})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsDeckCollapsed(false)}
            className="text-[10px] text-[#5A5A40] font-mono bg-[#FAF9F6] hover:bg-[#F2EFE8] border border-[#E5E2D9] px-3 py-1.5 rounded-lg shrink-0 transition flex items-center gap-1 cursor-pointer shadow-3xs"
          >
            <span>View Deck ({reflections.length})</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {/* Expanded Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E5E2D9]/60">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg shrink-0 ${isA ? 'bg-[#5A5A40]/15 text-[#5A5A40]' : 'bg-[#D18B6B]/15 text-[#D18B6B]'}`}>
                <Lightbulb className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold text-[#33332D] uppercase tracking-wider">
                  De-contaminated Sanctuary Inquiry Deck
                </h3>
                <p className="text-[10px] text-[#8C8C7F] mt-0.5">
                  Subtle diagnostic inquiries calculated from underlying relationship physics.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 justify-between sm:justify-end">
              <span className="flex items-center gap-1 text-[9.5px] font-mono text-[#546B54] bg-[#8DA58D]/15 px-2 py-0.5 rounded-md border border-[#8DA58D]/25 shadow-3xs">
                <ShieldCheck className="w-3 h-3 text-[#546B54]" />
                Sealed
              </span>
              
              {reflections.length > 1 && (
                <div className="flex items-center gap-1 bg-white border border-[#E5E2D9] rounded-lg p-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setActivePromptIdx(prev => (prev - 1 + reflections.length) % reflections.length); 
                    }}
                    className="p-1 hover:bg-[#FAF9F6] rounded-md transition text-[#8C8C7F] hover:text-[#4A4A40] cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono px-1.5 text-[#6B6B5E]">
                    {activePromptIdx + 1}/{reflections.length}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setActivePromptIdx(prev => (prev + 1) % reflections.length); 
                    }}
                    className="p-1 hover:bg-[#FAF9F6] rounded-md transition text-[#8C8C7F] hover:text-[#4A4A40] cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsDeckCollapsed(true)}
                className="text-[10px] text-[#8C8C7F] hover:text-[#4A4A40] font-mono bg-white hover:bg-[#FAF9F6] border border-[#E5E2D9] px-2.5 py-1 rounded-lg shrink-0 transition flex items-center gap-1 cursor-pointer shadow-3xs ml-1"
              >
                <span>Minimize</span>
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Central Choice Card */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E5E2D9] shadow-2xs text-left space-y-4">
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-[#8C8C7F] uppercase tracking-wider block">
                CALIBRATED INQUIRY
              </span>
              <blockquote className="text-xs sm:text-sm font-serif italic text-[#33332D] leading-relaxed pl-3 border-l-2 border-[#E5E2D9] py-0.5">
                "{cleanPrompt}"
              </blockquote>
            </div>

            <div className="border-t border-[#E5E2D9]/60 pt-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-mono text-[#8C8C7F] uppercase text-[9px]">Does this resonate?</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium border ${resonanceColor}`}>
                    {resonance}/10 — {resonanceDesc}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#A8A89A]">Low</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    className="flex-1 h-1.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-lg appearance-none cursor-pointer accent-[#5A5A40]"
                    value={resonance}
                    onChange={(e) => handleRatingChange(currentRawPrompt, parseInt(e.target.value))}
                  />
                  <span className="text-[10px] font-mono text-[#A8A89A]">High</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleEngageInquiry(cleanPrompt)}
                  disabled={isSending}
                  className={`w-full md:w-auto text-xs px-4 py-2 text-white font-medium rounded-lg shadow-sm transition active:scale-95 disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer ${
                    isA ? 'bg-[#5A5A40] hover:bg-[#4A4A35]' : 'bg-[#D18B6B] hover:bg-[#C17B5B]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Engage Deep Dive</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E2D9]/40 flex justify-center">
              <button
                type="button"
                onClick={() => setShowTechMetrics(!showTechMetrics)}
                className="text-[10px] text-[#8C8C7F] hover:text-[#5A5A40] font-mono transition flex items-center gap-1 cursor-pointer bg-[#FAF9F6] hover:bg-[#F5F2ED] px-3 py-1 rounded-lg border border-[#E5E2D9]/50"
              >
                <span>{showTechMetrics ? "▲ Hide Technical Calibration & Privacy Guard" : "▼ Show Technical Calibration & Privacy Guard"}</span>
              </button>
            </div>

            {showTechMetrics && (
              <div className="space-y-3 pt-3 border-t border-[#E5E2D9]/40 animate-fade-in text-left">
                <div className="text-[9.5px] text-[#8C8C7F] leading-normal bg-[#FAF9F6] p-2.5 rounded-lg border border-[#E5E2D9]/40 flex items-start gap-2">
                  <span className="text-xs shrink-0 select-none">🛡️</span>
                  <p>
                    <strong>Symmetry Safeguard:</strong> This inquiry translates conflict metrics under the hood, but <em>never</em> leaks unedited diary text or specific inputs logged by <strong>{opponentName}</strong>. Reflecting on this coordinate builds crucial self-awareness.
                  </p>
                </div>

                <div className="bg-[#5A5A40]/5 px-3.5 py-2.5 rounded-xl border border-[#5A5A40]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10.5px]">
                  <div className="flex items-center gap-2 text-left">
                    <span className="text-[14px]">🔄</span>
                    <div>
                      <span className="font-mono font-bold text-[#33332D] uppercase tracking-wider text-[9px] block">Dynamic Resonance Modulator:</span>
                      <span className="text-[#6B6B5E] text-[11px] leading-tight font-serif italic block mt-0.5">{cal.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-xl border border-[#E5E2D9] shrink-0 font-mono text-[9px] text-[#6B6B5E] shadow-3xs w-full sm:w-auto justify-around sm:justify-start">
                    <div>Feedback Count: <span className="font-bold text-[#33332D]">{cal.count}</span></div>
                    <div className="w-px h-3 bg-[#E5E2D9] hidden sm:block" />
                    <div>Mean Response: <span className="font-bold text-[#33332D]">{cal.mean > 0 ? `${cal.mean}/10` : '—'}</span></div>
                    <div className="w-px h-3 bg-[#E5E2D9] hidden sm:block" />
                    <div>Filter Threshold: <span className="font-bold text-[#5A5A40]">{cal.threshold}/10</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
