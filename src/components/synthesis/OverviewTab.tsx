/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, HelpCircle } from 'lucide-react';
import { SynthesisReport } from '../../types';

interface OverviewTabProps {
  synthesis: SynthesisReport;
}

export default function OverviewTab({ synthesis }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Side: Summary overview & underlying contradictions */}
      <div id="overview-left-section" className="lg:col-span-8 space-y-6">
        
        {/* Synthesized overview statement */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E2D9] shadow-xs space-y-3">
          <h3 className="text-base font-serif text-[#33332D] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#8DA58D]" />
            Relational Integration Report
          </h3>
          <p className="text-xs text-[#4A4A40] leading-relaxed whitespace-pre-line font-sans">
            {synthesis.overview}
          </p>
        </div>

        {/* Contradiction Spotlights */}
        {synthesis.contradictionInsights && synthesis.contradictionInsights.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-[#E5E2D9] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#D18B6B]" />
              <h3 className="text-base font-serif text-[#33332D]">
                Systemic Contradictions Identified
              </h3>
            </div>
            <p className="text-xs text-[#6B6B5E] leading-relaxed italic">
              Relationships cycle because our actions contradict our stated desires. We seek safety but act with aggression; we seek intimacy but withdraw into isolation. Here are the core paradoxes driving the loop:
            </p>

            <div className="space-y-4">
              {synthesis.contradictionInsights.map((ins, idx) => (
                <div key={idx} className="p-4 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl space-y-2">
                  <span className="text-[9.5px] font-mono text-[#D18B6B] uppercase tracking-wider font-bold block">
                    CONFLICT PATTERN #{idx + 1}: {ins.topic}
                  </span>
                  <p className="text-xs text-[#33332D] font-serif italic leading-relaxed">
                    "{ins.insight}"
                  </p>
                  <div className="pt-2 border-t border-[#E5E2D9] flex items-start gap-2">
                    <span className="text-[9px] bg-[#FAF9F6] border border-[#E5E2D9] text-[#546B54] px-1.5 py-0.5 rounded font-mono uppercase">Mediation Guide</span>
                    <p className="text-[11px] text-[#6B6B5E] italic leading-relaxed">
                      Companion directive: {ins.mediationStrategy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Right Side: Clash Themes list */}
      <div id="overview-right-section" className="lg:col-span-4 space-y-6">
        
        <div className="bg-white rounded-2xl p-6 border border-[#E5E2D9] shadow-xs space-y-4">
          <h3 className="text-xs font-mono font-medium text-[#8C8C7F] uppercase tracking-widest">
            Dispute Root Themes
          </h3>

          <div className="space-y-4">
            {synthesis.coreClashThemes.map((thm, idx) => (
              <div key={idx} className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E2D9] hover:bg-[#F5F2ED] transition">
                <span className="text-[9px] font-mono font-medium text-[#8C8C7F] uppercase tracking-wider block mb-1">
                  {thm.mismatchType}
                </span>
                <h4 className="text-xs font-semibold text-[#33332D] mb-1">{thm.title}</h4>
                <p className="text-[11px] text-[#6B6B5E] leading-relaxed">{thm.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
