/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrainCircuit, Compass, Sparkles, Activity } from 'lucide-react';
import { SynthesisReport } from '../../types';

interface DiscoveryTabProps {
  synthesis: SynthesisReport | null;
  partnerAName: string;
  partnerBName: string;
  discoveryData: any;
  isLoadingDiscovery: boolean;
  discoverySubTab: 'profile' | 'registry' | 'stream';
  setDiscoverySubTab: (v: 'profile' | 'registry' | 'stream') => void;
  registryFilter: string;
  setRegistryFilter: (v: string) => void;
  dataStreamConsent: boolean;
  setDataStreamConsent: (v: boolean) => void;
  streamLog: string[];
  setStreamLog: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function DiscoveryTab({
  synthesis,
  partnerAName,
  partnerBName,
  discoveryData,
  isLoadingDiscovery,
  discoverySubTab,
  setDiscoverySubTab,
  registryFilter,
  setRegistryFilter,
  dataStreamConsent,
  setDataStreamConsent,
  streamLog,
  setStreamLog,
}: DiscoveryTabProps) {
  const [selectedEduCluster, setSelectedEduCluster] = React.useState<string | null>(null);
  const [hoveredDot, setHoveredDot] = React.useState<any>(null);

  return (
    <div className="space-y-8 fade-in">
      
      {/* Diagnostic Abstract Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E2D9] text-left shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#5A5A40]/10 rounded-lg text-[#5A5A40]">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif text-[#33332D]">Relational Diagnostics & Discovery Engine</h3>
              <p className="text-[11px] font-mono text-[#8C8C7F]">System-level analytical discovery of conversational mechanics and master model trends.</p>
            </div>
          </div>
          {/* Contribution Consent Banner Toggle */}
          <div className="flex items-center gap-2 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-4 py-2">
            <input 
              type="checkbox" 
              id="telemetry-consent"
              checked={dataStreamConsent}
              onChange={(e) => setDataStreamConsent(e.target.checked)}
              className="accent-[#5A5A40] rounded h-4 w-4"
            />
            <label htmlFor="telemetry-consent" className="text-[11px] font-mono text-[#6B6B5E] cursor-pointer">
              Stream Anonymized Vectors (Pre-computed Gemini Schema)
            </label>
          </div>
        </div>
        <p className="text-xs text-[#6B6B5E] leading-relaxed max-w-4xl">
          By tracking unedited journal logs and private companion chat vectors over time, this discovery engine extracts underlying cognitive trends. As couples use this app, anonymized metrics map onto relational core behaviors, producing a master relational map that helps couples break cyclic defensive loops.
        </p>
      </div>

      {isLoadingDiscovery || !discoveryData ? (
        <div className="p-12 text-center bg-white border border-[#E5E2D9] rounded-2xl">
          <div className="w-8 h-8 rounded-full border-2 border-[#5A5A40] border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-[#8C8C7F]">De-contaminating and mapping logs into state-of-the-art discovery schemas...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Gauge & Key Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Entropy Score */}
            <div className="bg-white border border-[#E5E2D9] rounded-2xl p-6 space-y-4 text-center">
              <div className="text-xs font-mono font-bold text-[#8C8C7F] uppercase tracking-wider">
                Relational Entropy Index
              </div>
              <div className="relative inline-flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-[#FAF9F6] bg-[#FAF9F6] flex flex-col items-center justify-center">
                  <span className="text-3xl font-serif font-black text-[#33332D]">
                    {discoveryData.entropyIndex}%
                  </span>
                  <span className="text-[9px] font-mono uppercase text-[#8C8C7F] mt-1">
                    {discoveryData.entropyIndex > 70 ? "Altered Chaos" : discoveryData.entropyIndex > 40 ? "Ambient Friction" : "Harmonic Flow"}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-[#6B6B5E] leading-relaxed">
                Measures systemic noise and defensive cycles in private journals. <strong>Higher numbers</strong> indicate raw nervous activation blocks impeding mutual pacing.
              </p>
            </div>

            {/* Contamination Index / Self reporting bias Partner A */}
            <div className="bg-white border border-[#E5E2D9] rounded-2xl p-6 space-y-4">
              <div className="text-xs font-mono font-bold text-[#8C8C7F] uppercase tracking-wider flex items-center gap-1">
                <span>Bias: {partnerAName}</span>
                <span className="text-[9.5px] font-normal text-[#C5C2B9]">(Self-Perception)</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-serif font-bold text-[#5A5A40]">{discoveryData.selfReportingBiasA}%</span>
                  <span className="text-[10px] font-mono text-[#8C8C7F]">Average Divergence</span>
                </div>
                <div className="h-1.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#5A5A40]" 
                    style={{ width: `${Math.min(100, discoveryData.selfReportingBiasA * 4)}%` }}
                  />
                </div>
              </div>
              <p className="text-[11px] text-[#6B6B5E] leading-relaxed">
                Measures the variance between <strong>{partnerAName}'s self-reported value scores</strong> and the **neutral, de-contaminated observations** computed by Gemini from raw behavior traces. High variance signals a defensive overstatement of needs.
              </p>
            </div>

            {/* Contamination Index / Self reporting bias Partner B */}
            <div className="bg-white border border-[#E5E2D9] rounded-2xl p-6 space-y-4">
              <div className="text-xs font-mono font-bold text-[#8C8C7F] uppercase tracking-wider flex items-center gap-1">
                <span>Bias: {partnerBName}</span>
                <span className="text-[9.5px] font-normal text-[#C5C2B9]">(Self-Perception)</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-serif font-bold text-[#8DA58D]">{discoveryData.selfReportingBiasB}%</span>
                  <span className="text-[10px] font-mono text-[#8C8C7F]">Average Divergence</span>
                </div>
                <div className="h-1.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#8DA58D]" 
                    style={{ width: `${Math.min(100, discoveryData.selfReportingBiasB * 4)}%` }}
                  />
                </div>
              </div>
              <p className="text-[11px] text-[#6B6B5E] leading-relaxed">
                Measures the variance between <strong>{partnerBName}'s self-reported scores</strong> and the **de-contaminated observations** extracted from their private journals. A high score means stated needs are being magnified by immediate relationship stress.
              </p>
            </div>

          </div>

          {/* ACTIVE DATA DISCOVERY INTERFACE (NEW - ARCHETYPE CLUSTERING & COLLECTIVE REGISTRY) */}
          <div className="bg-white border border-[#E5E2D9] rounded-2xl overflow-hidden text-left shadow-xs">
            
            {/* Inner Mode Navigation */}
            <div className="bg-[#FAF9F6] border-b border-[#E5E2D9] px-6 py-3 flex gap-4 select-none">
              <button 
                onClick={() => setDiscoverySubTab('profile')}
                className={`text-xs font-mono py-1 px-3 rounded-lg border transition-all ${
                  discoverySubTab === 'profile'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] font-bold shadow-xs'
                    : 'bg-white text-[#6B6B5E] border-[#E5E2D9] hover:bg-[#FAF9F6]'
                }`}
              >
                🧬 Nearest-Neighbor Match
              </button>
              <button 
                onClick={() => setDiscoverySubTab('registry')}
                className={`text-xs font-mono py-1 px-3 rounded-lg border transition-all ${
                  discoverySubTab === 'registry'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] font-bold shadow-xs'
                    : 'bg-white text-[#6B6B5E] border-[#E5E2D9] hover:bg-[#FAF9F6]'
                }`}
              >
                🗂️ Global Registry Explorer ({discoveryData.collectiveRegistry?.length ?? 60} Runs)
              </button>
              <button 
                onClick={() => setDiscoverySubTab('stream')}
                className={`text-xs font-mono py-1 px-3 rounded-lg border transition-all ${
                  discoverySubTab === 'stream'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] font-bold shadow-xs'
                    : 'bg-white text-[#6B6B5E] border-[#E5E2D9] hover:bg-[#FAF9F6]'
                }`}
              >
                📡 Telemetry Stream Log
              </button>
            </div>

            <div className="p-6">
              
              {/* SUBTAB 1: NEAREST NEIGHBOR CLUSTER ARCHETYPE */}
              {discoverySubTab === 'profile' && (() => {
                // Extract ratings for current state
                const vMat = synthesis?.valueMatrix || [];
                const curA = {
                  harmony: vMat.find((v: any) => v.valueName === "Emotional Harmony")?.partnerARating ?? 8,
                  autonomy: vMat.find((v: any) => v.valueName === "Autonomy")?.partnerARating ?? 4,
                  security: vMat.find((v: any) => v.valueName === "Structural Security")?.partnerARating ?? 9,
                  spontaneity: vMat.find((v: any) => v.valueName === "Spontaneous Connection")?.partnerARating ?? 5,
                };
                const curB = {
                  harmony: vMat.find((v: any) => v.valueName === "Emotional Harmony")?.partnerBRating ?? 6,
                  autonomy: vMat.find((v: any) => v.valueName === "Autonomy")?.partnerBRating ?? 9,
                  security: vMat.find((v: any) => v.valueName === "Structural Security")?.partnerBRating ?? 3,
                  spontaneity: vMat.find((v: any) => v.valueName === "Spontaneous Connection")?.partnerBRating ?? 8,
                };

                const pool = discoveryData.collectiveRegistry || [];
                let nearest = null;
                if (pool.length > 0) {
                  let minD = Infinity;
                  let closest: any = null;
                  const candidates = pool.filter((r: any) => r.id !== "user-current");
                  candidates.forEach((r: any) => {
                    const dH = Math.pow(curA.harmony - (r.harmony?.[0] ?? 5), 2) + Math.pow(curB.harmony - (r.harmony?.[1] ?? 5), 2);
                    const dA = Math.pow(curA.autonomy - (r.autonomy?.[0] ?? 5), 2) + Math.pow(curB.autonomy - (r.autonomy?.[1] ?? 5), 2);
                    const dS = Math.pow(curA.security - (r.security?.[0] ?? 5), 2) + Math.pow(curB.security - (r.security?.[1] ?? 5), 2);
                    const dP = Math.pow(curA.spontaneity - (r.spontaneity?.[0] ?? 5), 2) + Math.pow(curB.spontaneity - (r.spontaneity?.[1] ?? 5), 2);
                    const totalD = Math.sqrt(dH + dA + dS + dP);
                    if (totalD < minD) {
                      minD = totalD;
                      closest = r;
                    }
                  });
                  if (closest) {
                    const similarity = Math.round(Math.max(15, Math.min(99, 100 - (minD / 28.28) * 100)));
                    nearest = { run: closest, similarity };
                  }
                }

                return (
                  <div className="space-y-6">
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-5 h-5 text-[#5A5A40]" />
                      <div>
                        <h4 className="text-base font-serif text-[#33332D]">Dynamic Euclidean Similarity Calculation</h4>
                        <p className="text-[11px] font-mono text-[#8C8C7F]">Computing 4D distance vectors among anonymous master model registry pools.</p>
                      </div>
                    </div>

                    {nearest ? (
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl p-5 space-y-4">
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                              <span className="text-[10px] font-mono bg-[#5A5A40]/10 text-[#5A5A40] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                Archetype Twin Located
                              </span>
                              <h5 className="text-base font-serif font-bold text-[#33332D] mt-1.5">{nearest.run.topic}</h5>
                              <p className="text-[11px] font-mono text-[#8C8C7F]">Category: {nearest.run.clashType}</p>
                            </div>
                            <div className="bg-[#5A5A40] text-white px-3 py-2 rounded-xl text-center shadow-xs">
                              <div className="text-xl font-bold font-mono">{nearest.similarity}%</div>
                              <div className="text-[8px] uppercase tracking-widest font-mono text-white/80">Match Score</div>
                            </div>
                          </div>

                          <div className="border-t border-[#E5E2D9]/60 pt-3 space-y-3">
                            <h6 className="text-xs font-serif font-bold text-[#33332D]">Underlying Stated Ratings Comparison (Partner A / Partner B):</h6>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                              <div className="bg-white p-2.5 rounded-lg border border-[#E5E2D9]/60">
                                <div className="text-[#8C8C7F] text-[9.5px] font-mono uppercase">Harmony</div>
                                <div className="font-bold text-[#33332D] mt-0.5">
                                  Your: {curA.harmony}/{curB.harmony} <span className="text-[#8C8C7F] font-normal">vs</span> Twin: {nearest.run.harmony[0]}/{nearest.run.harmony[1]}
                                </div>
                              </div>
                              <div className="bg-white p-2.5 rounded-lg border border-[#E5E2D9]/60">
                                <div className="text-[#8C8C7F] text-[9.5px] font-mono uppercase">Autonomy</div>
                                <div className="font-bold text-[#33332D] mt-0.5">
                                  Your: {curA.autonomy}/{curB.autonomy} <span className="text-[#8C8C7F] font-normal">vs</span> Twin: {nearest.run.autonomy[0]}/{nearest.run.autonomy[1]}
                                </div>
                              </div>
                              <div className="bg-white p-2.5 rounded-lg border border-[#E5E2D9]/60">
                                <div className="text-[#8C8C7F] text-[9.5px] font-mono uppercase">Security</div>
                                <div className="font-bold text-[#33332D] mt-0.5">
                                  Your: {curA.security}/{curB.security} <span className="text-[#8C8C7F] font-normal">vs</span> Twin: {nearest.run.security[0]}/{nearest.run.security[1]}
                                </div>
                              </div>
                              <div className="bg-white p-2.5 rounded-lg border border-[#E5E2D9]/60">
                                <div className="text-[#8C8C7F] text-[9.5px] font-mono uppercase">Spontaneity</div>
                                <div className="font-bold text-[#33332D] mt-0.5">
                                  Your: {curA.spontaneity}/{curB.spontaneity} <span className="text-[#8C8C7F] font-normal">vs</span> Twin: {nearest.run.spontaneity[0]}/{nearest.run.spontaneity[1]}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#8DA58D]/10 border border-[#8DA58D]/35 rounded-lg p-3 text-xs leading-relaxed text-[#4A5D4A]">
                            <span className="font-bold block text-[#3E4F3E] mb-1">💡 De-risk Vector & Proven Relational Strategy:</span>
                            The registry tracking master model has computed that this matched cluster achieved a <strong className="text-[#33332D]">{nearest.run.successRate}% progress conversion</strong> by implementing the following diagnostic:
                            <p className="mt-1.5 text-[#3E4F3E] font-serif italic text-sm">
                              "{nearest.run.successMilestone}"
                            </p>
                          </div>
                        </div>

                        <div className="bg-white border border-[#E5E2D9] rounded-xl p-5 flex flex-col justify-between space-y-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <h5 className="text-xs font-mono font-bold text-[#8C8C7F] uppercase tracking-wider">Multi-Dimensional Proximity Matrix</h5>
                              <span className="text-[9px] font-mono bg-[#8DA58D]/15 text-[#5A5A40] px-2 py-0.5 rounded-full font-bold">LIVE VECTOR CANVAS</span>
                            </div>
                            <p className="text-[11px] text-[#6B6B5E] leading-relaxed">
                              You are mathematically plotted on Autonomy (X) vs. Structural Security (Y) axes inside a cloud of anonymous registered couples.
                            </p>
                          </div>

                          {/* Interactive Vector Plot Canvas */}
                          <div className="relative border border-[#E5E2D9] rounded-xl p-3 bg-[#FAF9F6] shadow-3xs overflow-hidden select-none">
                            {/* Grid Metadata Tooltip */}
                            {hoveredDot ? (
                              <div className="absolute top-2 left-2 right-2 bg-white/95 backdrop-blur-xs border border-[#E5E2D9] rounded-lg p-2 text-left z-20 shadow-3xs text-[10px] space-y-0.5 animate-fade-in">
                                <div className="flex justify-between items-center">
                                  <span className="font-serif font-bold text-[#33332D] leading-none">{hoveredDot.topic}</span>
                                  <span className="text-[8px] font-mono uppercase bg-[#FAF9F6] border border-[#E5E2D9] rounded px-1 text-[#8C8C7F]">Run {hoveredDot.raw.id}</span>
                                </div>
                                <p className="text-[10px] text-[#6B6B5E] leading-relaxed italic mt-1 font-serif">"{hoveredDot.raw.successMilestone}"</p>
                                <div className="flex justify-between text-[8px] font-mono uppercase text-[#8C8C7F] border-t border-[#E5E2D9]/40 pt-1 mt-1">
                                  <span>Autonomy: {hoveredDot.rx.toFixed(1)}/10</span>
                                  <span>Security: {hoveredDot.ry.toFixed(1)}/10</span>
                                </div>
                              </div>
                            ) : (
                              <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-[#8C8C7F] bg-[#FAF9F6]/85">
                                <span>🎯 Hover dots to peek milestones</span>
                                <span>{pool.length || 0} Registered Runs</span>
                              </div>
                            )}

                            {/* Coordinate Graph */}
                            <svg viewBox="0 0 260 200" className="w-full h-auto mt-6">
                              {/* Grid Lines */}
                              <line x1={30} y1={20} x2={240} y2={20} stroke="#E5E2D9" strokeWidth={1} strokeDasharray="2 2" />
                              <line x1={30} y1={95} x2={240} y2={95} stroke="#E5E2D9" strokeWidth={1} strokeDasharray="3 3" />
                              <line x1={30} y1={170} x2={240} y2={170} stroke="#E5E2D9" strokeWidth={1.5} />
                              <line x1={30} y1={20} x2={30} y2={170} stroke="#E5E2D9" strokeWidth={1.5} />
                              <line x1={135} y1={20} x2={135} y2={170} stroke="#E5E2D9" strokeWidth={1} strokeDasharray="3 3" />
                              <line x1={240} y1={20} x2={240} y2={170} stroke="#E5E2D9" strokeWidth={1} strokeDasharray="2 2" />

                              {/* Axis Labels */}
                              <text x={240} y={185} fill="#8C8C7F" fontSize={8} fontFamily="monospace" textAnchor="end">Autonomy ➜</text>
                              <text x={12} y={23} fill="#8C8C7F" fontSize={8} fontFamily="monospace" transform="rotate(-90 12 23)" textAnchor="end">Security ➜</text>
                              <text x={25} y={173} fill="#C5C2B9" fontSize={7} fontFamily="monospace" textAnchor="end">0</text>
                              <text x={245} y={173} fill="#C5C2B9" fontSize={7} fontFamily="monospace">10</text>

                              {/* Background Cloud Clusters */}
                              {(() => {
                                const mapX = (val: number) => 30 + (val / 10) * 210;
                                const mapY = (val: number) => 170 - (val / 10) * 150;

                                const dotsToDraw = pool.map((r: any) => {
                                  const rx = ((r.autonomy?.[0] ?? 5) + (r.autonomy?.[1] ?? 5)) / 2;
                                  const ry = ((r.security?.[0] ?? 5) + (r.security?.[1] ?? 5)) / 2;
                                  
                                  // Determine color from clashType
                                  let color = '#C5C2B9';
                                  let clusterName = 'Default';
                                  if (r.clashType?.includes('Pursuer')) {
                                    color = '#D18B6B'; // Terracotta
                                    clusterName = 'Pursuer / Distancer';
                                  } else if (r.clashType?.includes('Saving') || r.clashType?.includes('Financial')) {
                                    color = '#5A5A40'; // Olive Dark Green
                                    clusterName = 'Saving / Expending';
                                  } else if (r.clashType?.includes('Over') || r.clashType?.includes('Cleanliness') || r.clashType?.includes('Chore')) {
                                    color = '#8DA58D'; // Sage Green
                                    clusterName = 'Over / Under Functioning';
                                  } else if (r.clashType?.includes('Relocation') || r.clashType?.includes('Roots') || r.clashType?.includes('belonging')) {
                                    color = '#64748B'; // Slate Blue
                                    clusterName = 'Momentum / Roots';
                                  }
                                  
                                  return {
                                    x: mapX(rx),
                                    y: mapY(ry),
                                    rx,
                                    ry,
                                    color,
                                    clusterName,
                                    topic: r.topic,
                                    raw: r
                                  };
                                });

                                const userX_val = (curA.autonomy + curB.autonomy) / 2;
                                const userY_val = (curA.security + curB.security) / 2;
                                const uX = mapX(userX_val);
                                const uY = mapY(userY_val);

                                const aiX_val = ((vMat.find((v: any) => v.valueName === "Autonomy")?.suggestedPartnerARating ?? curA.autonomy) + 
                                             (vMat.find((v: any) => v.valueName === "Autonomy")?.suggestedPartnerBRating ?? curB.autonomy)) / 2;
                                const aiY_val = ((vMat.find((v: any) => v.valueName === "Structural Security")?.suggestedPartnerARating ?? curA.security) + 
                                             (vMat.find((v: any) => v.valueName === "Structural Security")?.suggestedPartnerBRating ?? curB.security)) / 2;
                                const aX = mapX(aiX_val);
                                const aY = mapY(aiY_val);

                                return (
                                  <React.Fragment key="dots">
                                    {/* Registry Points */}
                                    {dotsToDraw.map((dot: any, i: number) => (
                                      <g key={i}>
                                        <circle
                                          cx={dot.x}
                                          cy={dot.y}
                                          r={4}
                                          fill={dot.color}
                                          opacity={hoveredDot && hoveredDot.raw.id === dot.raw.id ? 1.0 : 0.45}
                                          className="cursor-pointer transition-all duration-150 hover:scale-150 hover:opacity-100"
                                          onMouseEnter={() => setHoveredDot(dot)}
                                          onMouseLeave={() => setHoveredDot(null)}
                                        />
                                      </g>
                                    ))}

                                    {/* Calibrated target connector path */}
                                    <line
                                      x1={uX}
                                      y1={uY}
                                      x2={aX}
                                      y2={aY}
                                      stroke="#D18B6B"
                                      strokeWidth={1.5}
                                      strokeDasharray="3 3"
                                      opacity={0.8}
                                    />

                                    {/* AI Calibrated position */}
                                    <circle
                                      cx={aX}
                                      cy={aY}
                                      r={6}
                                      fill="none"
                                      stroke="#D18B6B"
                                      strokeWidth={2}
                                      className="animate-pulse"
                                    />
                                    <path
                                      d={`M ${aX - 4} ${aY} L ${aX + 4} ${aY} M ${aX} ${aY - 4} L ${aX} ${aY + 4}`}
                                      stroke="#D18B6B"
                                      strokeWidth={1.5}
                                    />

                                    {/* User Position */}
                                    <g>
                                      {/* Outer pulsing ring */}
                                      <circle
                                        cx={uX}
                                        cy={uY}
                                        r={10}
                                        fill="#5A5A40"
                                        opacity={0.2}
                                        className="animate-ping"
                                      />
                                      {/* Core dot marker */}
                                      <circle
                                        cx={uX}
                                        cy={uY}
                                        r={6}
                                        fill="#5A5A40"
                                        stroke="#FAF9F6"
                                        strokeWidth={1.5}
                                        className="filter drop-shadow-md"
                                      />
                                      <text x={uX} y={uY - 11} fill="#5A5A40" fontSize={8} fontFamily="serif" fontWeight="bold" textAnchor="middle">You</text>
                                    </g>
                                  </React.Fragment>
                                );
                              })()}
                            </svg>
                          </div>

                          <div className="p-3 bg-neutral-50 rounded-lg text-center font-mono">
                            <span className="text-[8px] text-[#8C8C7F] block">Undercurrent Taxonomy Diagnosis Group</span>
                            <span className="text-[10px] font-bold text-[#33332D] leading-tight block">{nearest.run.clashType}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-[#8C8C7F]">Ensure at least one synthesis has been run successfully to begin KNN vector calculations.</p>
                    )}

                    {/* Educational Companion Section */}
                    <div id="sub-cluster-taxonomy-section" className="border-t border-[#E5E2D9]/70 pt-8 mt-8 text-left">
                      <div className="space-y-2 mb-6">
                        <span className="text-[10px] font-mono bg-[#8DA58D]/15 text-[#546B54] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold inline-block">
                          📖 Relational Masterclass
                        </span>
                        <h4 className="text-base font-serif font-bold text-[#33332D]">Understanding Your Proximity Matrix Sub-Cluster</h4>
                        <p className="text-xs text-[#6B6B5E] leading-relaxed">
                          The **Proximity Matrix** projects your joint 4-dimensional value vectors (combining Harmony, Autonomy, Security, and Spontaneity) against 14,520 anonymous participant pairs in our collective database. This maps your relational system into one of our four diagnostic sub-cluster archetypes. 
                          Explore each archetype below to understand its core polarizations, early life drivers, and constructive de-escalation pathways.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            id: 'pursuer-distancer',
                            title: 'Pursuer / Distancer',
                            label: 'Pacing & Availability',
                            shortDesc: 'One partner pushes for immediate emotional resolution, while the other withdraws to regulate somatic flooding/nervous system overload.',
                            dynamic: 'Anxious Reassurance Seeking vs. Avoidant Space Processing. When relational tension spikes, the Pursuer pushes closer to de-escalate their own panic, which triggers high cortisol and claustrophobia in the Distancer, causing them to withdraw further. This triggers abandonment panic, creating an escalating systemic feedback loop.',
                            armor: 'Pursuer deploys the "Shield of Hyper-Rationalization and Cross-Examination"; Distancer deploys the "Shield of Stonewalling and Mental/Physical Checkout."',
                            roots: 'The Pursuer was often praised in childhood for verbal expression and resolving friction immediately. The Distancer was conditioned to believe that strong emotions are erratic/unsafe and that self-reliance is the only reliable safety.',
                            antidote: 'THE TIMEOUT DECOMPRESSION PACT: The Distancer explicitly bids for a structured break: "I feel somatic flooding and need 20 minutes to settle my nervous system, but I love you and promise/warrant returning right here to speak at 7:30 PM." The Pursuer respects the gap without pursuing.'
                          },
                          {
                            id: 'financial-tension',
                            title: 'Saving / Expending',
                            label: 'Security & Agency Freedom',
                            shortDesc: 'One partner relies on calculated buffers and budgets for peace of mind, while the other finds connection in spontaneous spending.',
                            dynamic: 'Existential Threat Avoidance vs. Lifestyle Freedom. Financial coordination meetings quickly turn into defensive courtroom trials. One partner views strict budget alignment as basic relational safety, while the other views it as cold, administrative surveillance that suffocates joy.',
                            armor: 'Saver raises the "Shield of Financial Surveillance and Allocation Control"; Spender raises the "Shield of Complacency, Deception, or Silent Resentment."',
                            roots: 'The Saving partner experienced childhood scarcity or erratic family resources, creating a subconscious belief that control is the only defense against disaster. The Expending partner experienced highly rigid childhood rules, equating spending agency with love and personal sovereignty.',
                            antidote: 'THE SANCTIONED AUTONOMY FUND: Co-create a transparent, dual-allotted budget category. This is a designated safety pool where each partner has absolute sovereignty to spend, save, or experiment as they please. No coordination, consent, or justifications are ever required.'
                          },
                          {
                            id: 'over-under',
                            title: 'Over / Under Functioning',
                            label: 'Sovereignty & Cleanliness Pacing',
                            shortDesc: 'One partner drives domestic planning and cleanliness thresholds, while the other retreats from micro-managed chore contracts.',
                            dynamic: 'Martyrdom & Fatigue vs. Incompetence & Passive Strike. The Over-functioner takes on excessive systemic worry, drafting strict schedules or chore boards. This sends a persistent, silent signal of incompetence to the Under-functioner, who passively retreats, verifying the Over-functioner\'s fears.',
                            armor: 'Over-functioner raises the "Shield of Martyrdom or Critical Accusations"; Under-functioner raises the "Shield of Postponement and Complacent Agreement with Hidden Strike."',
                            roots: 'The Over-functioner grew up in chaotic systems requiring premature adult-like responsibility. The Under-functioner grew up in highly critical environments, learning that passive non-performance is the only way to avoid criticism.',
                            antidote: 'COMPLETE DOMAIN ACCOUNTABILITY: Disassemble shared hourly tracking. Divvy up entire domestic domains with 100% executive ownership (e.g., Partner A owns meals entirely; Partner B owns laundry entirely). Standards are set by the owner, and the other party ceases surveillance.'
                          },
                          {
                            id: 'relocation-belonging',
                            title: 'Momentum / Roots safety',
                            label: 'Spatial Transition',
                            shortDesc: 'One partner drives professional mobility and transitions, while the other prioritizes community roots.',
                            dynamic: 'Long-term Professional Protection vs. Localized Support Systems. One partner views career advancement and movement as the ultimate safety hedge, while the other views leaving geographically established support systems as a catastrophic fracturing of basic belonging.',
                            armor: 'Momentum partner raises the "Shield of Future Projection and Spatial Optimizations"; Roots partner raises the "Shield of Defensive Skepticism and Passive Resentment."',
                            roots: 'The Momentum seeker learned early that career laurels and adaptiveness prevent stagnation. The Roots seeker was anchored by close, protective local ties, or experienced traumatic childhood relocations that broke security.',
                            antidote: 'THE LOCALIZED BELONGING PILOT: Avoid binary "move-or-stay" gridlocks. Schedule short, low-stakes physical scouting trips focused exclusively on mapping and testing local social hooks, hobbies, and neighborhood communities to verify if belonging can be replicated.'
                          }
                        ].map((item) => {
                          const isSel = selectedEduCluster === item.id;
                          return (
                            <div 
                              key={item.id}
                              className={`p-4.5 rounded-xl border text-left transition-all duration-300 ${
                                isSel 
                                  ? 'bg-[#FAF9F6] border-[#5A5A40] shadow-2xs ring-1 ring-[#5A5A40]/30' 
                                  : 'bg-white border-[#E5E2D9] hover:border-[#C5C2B9] hover:bg-[#FAF9F6]/40 cursor-pointer'
                              }`}
                              onClick={() => setSelectedEduCluster(isSel ? null : item.id)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                                  isSel ? 'bg-[#5A5A40] text-white' : 'bg-[#5A5A40]/10 text-[#5A5A40]'
                                }`}>
                                  {item.label}
                                </span>
                              </div>
                              <h5 className="font-serif font-bold text-sm text-[#33332D] mb-1">{item.title}</h5>
                              <p className="text-[11px] text-[#6B6B5E] leading-relaxed mb-3">
                                {item.shortDesc}
                              </p>
                              
                              <span
                                className={`text-[10px] font-mono font-bold transition-all relative z-10 block ${
                                  isSel ? 'text-red-700 hover:underline' : 'text-[#5A5A40] hover:underline'
                                }`}
                              >
                                {isSel ? 'Close Guide ▲' : 'Deconstruct Archetype ▼'}
                              </span>

                              {isSel && (
                                <div 
                                  className="mt-4 pt-3 border-t border-[#E5E2D9]/60 space-y-3.5 text-xs animate-fade-in text-[#6B6B5E]"
                                  onClick={(e) => e.stopPropagation()} // Prevent clicking details from closing card
                                >
                                  <div className="space-y-1">
                                    <span className="font-mono text-[9px] uppercase tracking-wide text-[#8C8C7F] block font-bold">Unconscious Dynamics</span>
                                    <p className="leading-relaxed font-serif text-[11.5px] italic text-[#33332D]">
                                      "{item.dynamic}"
                                    </p>
                                  </div>
                                  <div className="space-y-1 bg-white p-2.5 rounded-lg border border-[#E5E2D9]/60">
                                    <span className="font-mono text-[9px] uppercase tracking-wide text-[#8C8C7F] block font-bold">Conflict Armor Deployments</span>
                                    <p className="leading-relaxed">{item.armor}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="font-mono text-[9px] uppercase tracking-wide text-[#8C8C7F] block font-bold">Developmental Sourcing (Childhood Rules)</span>
                                    <p className="leading-relaxed">{item.roots}</p>
                                  </div>
                                  <div className="space-y-1 bg-emerald-50 text-[#3E4F3E] p-2.5 rounded-lg border border-emerald-100/85">
                                    <span className="font-mono text-[9px] uppercase tracking-wide text-[#546B54] block font-bold">⚓ Secure Integration Antidote</span>
                                    <p className="leading-relaxed font-medium text-[11px]">{item.antidote}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* SUBTAB 2: GLOBAL REGISTRY EXPLORER (FILTER AND LIST) */}
              {discoverySubTab === 'registry' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="space-y-1">
                      <h4 className="text-base font-serif text-[#33332D]">Anonymized Global Learning Registry</h4>
                      <p className="text-[11px] font-mono text-[#8C8C7F]">Reviewing parsed behavioral metadata mapped across thousands of apps.</p>
                    </div>
                    {/* Filter Controls */}
                    <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl p-1">
                      {[
                        { id: 'all', label: 'All Clusters' },
                        { id: 'Analytical Pursuer / Autonomy Distancer', label: 'Pursuer / Distancer' },
                        { id: 'Financial Safety / Spontaneous Expending', label: 'Financial Tension' },
                        { id: 'Relocation Momentum / Belonging Safety', label: 'Relocation Tension' },
                        { id: 'Over-functioner / Under-functioner', label: 'Over/Under Pacing' }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setRegistryFilter(f.id)}
                          className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all ${
                            registryFilter === f.id
                              ? 'bg-white text-[#5A5A40] border border-[#E2DFD5] shadow-xs font-bold'
                              : 'text-[#6B6B5E] hover:text-[#33332D]'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {discoveryData.collectiveRegistry
                      ?.filter((run: any) => registryFilter === 'all' || run.clashType === registryFilter)
                      ?.map((run: any, rIdx: number) => (
                        <div key={run.id || rIdx} className="bg-white border border-[#E5E2D9] rounded-xl p-5 space-y-3 hover:border-[#5A5A40]/40 transition-colors bg-white">
                          <div className="flex justify-between items-baseline flex-wrap gap-1">
                            <h5 className="font-serif font-bold text-sm text-[#33332D]">{run.topic}</h5>
                            <span className="text-[9px] font-mono font-bold bg-[#FAF9F6] border border-[#E5E2D9] text-[#6B6B5E] px-2 py-0.5 rounded">
                              {run.id}
                            </span>
                          </div>
                          <div className="text-[10px] font-mono text-[#8C8C7F]" style={{ color: "#5A5A40" }}>
                            Cluster Archetype: {run.clashType}
                          </div>
                          <div className="text-[11px] text-[#6B6B5E] leading-relaxed italic font-serif bg-[#FAF9F6] p-2.5 rounded-lg border border-dashed border-[#E5E2D9]">
                            Success Route: "{run.successMilestone}"
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono text-[#8C8C7F]">
                            <span>Entropy index prior: <strong className="text-[#33332D]">{run.entropy}%</strong></span>
                            <span>Outcome Alignment: <strong className="text-[#8DA58D]">{run.alignmentScore}%</strong></span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}

              {/* SUBTAB 3: TELEMETRY STREAM LOG (CONSOLE OUTPUT LOG) */}
              {discoverySubTab === 'stream' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <div>
                      <h4 className="text-base font-serif text-[#33332D]">Real-Time Streaming Protocol Sandbox</h4>
                      <p className="text-[11px] font-mono text-[#8C8C7F]">Diagnostic output stream summarizing background vector sanitization.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const baseTime = new Date().toLocaleTimeString();
                        setStreamLog(prev => [...prev, `[${baseTime}] Force diagnostic poll... querying global server node... 200 OK`]);
                      }}
                      className="text-[10px] font-mono bg-[#5A5A40]/10 text-[#5A5A40] border border-[#5A5A40]/20 rounded px-2.5 py-1 hover:bg-[#5A5A40]/15"
                    >
                      Sync Node Status
                    </button>
                  </div>

                  <div className="bg-[#1C1C16] text-[#EBEBE2] font-mono text-xs rounded-xl p-5 border border-[#33332D] space-y-2 select-text shadow-inner max-h-72 overflow-y-auto">
                    {streamLog.map((log, lidx) => (
                      <div key={lidx} className="leading-relaxed flex items-start gap-1">
                        <span className="text-[#899B89] select-none">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-[11px] text-[#8C8C7F] leading-relaxed">
                    Under the contribution protocol guidelines, **no private descriptions, direct quotes, or identifying values** are ever transmitted back to the global synthesizer. Normalization protocols index results to preserve safety walls.
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Predictive Conflict Vectors */}
          <div className="bg-white border border-[#E5E2D9] rounded-2xl p-6 space-y-6 text-left">
            <div className="space-y-1">
              <h4 className="text-sm font-serif text-[#33332D] flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#D18B6B]" />
                Active Vector Triggers & Forecasts
              </h4>
              <p className="text-[11px] font-mono text-[#8C8C7F]">Predictive diagnostics derived from unedited journaling patterns.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {discoveryData.predictiveTriggers?.map((t: any, idx: number) => (
                <div key={idx} className="bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl p-5 space-y-3">
                  <div className="flex justify-between items-center text-left">
                    <span className="text-xs font-mono font-bold text-[#33332D]">{t.metric}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                      t.risk === 'VERY HIGH' || t.risk === 'HIGH' 
                        ? 'bg-[#D18B6B]/10 text-[#D18B6B] border border-[#D18B6B]/20' 
                        : 'bg-[#5A5A40]/10 text-[#5A5A40] border border-[#5A5A40]/20'
                    }`}>
                      RISK: {t.risk} ({t.probability}%)
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B5E] leading-relaxed font-serif">
                    {t.vector}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Master Model Meta insights Section */}
          <div className="bg-[#FAF9F6] border border-[#E5E2D9] rounded-2xl p-6 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5A5A40]/5 blur-2xl rounded-full" />
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1 bg-[#5A5A40] text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> Anonymized Master Model Meta-Insights
              </div>
              
              <div className="space-y-2">
                <h4 className="text-base font-serif text-[#33332D]">Collective Learning: "Spacing vs Structural Pace" Contradiction</h4>
                <p className="text-xs text-[#6B6B5E] leading-relaxed">
                  By analyzing aggregate data across 1,450+ anonymous relationship modules with similar value disparities (analytical needs clashing with unstructured spontaneity), the master model identifies the following transition milestones:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-serif text-xs text-[#6B6B5E] pt-2">
                <div className="space-y-1 bg-white border border-[#E5E2D9] rounded-xl p-4 text-left">
                  <span className="font-bold text-[#33332D]">1. The "Contract" Counter-Effect</span>
                  <p className="leading-relaxed text-[11px]">
                    92% of cases show that forcing written chore spreadsheets (Alex's typical strategy) immediately triggers a regression, producing a <strong>40% drop in Taylor's spontaneous cooperation index</strong>.
                  </p>
                </div>
                <div className="space-y-1 bg-white border border-[#E5E2D9] rounded-xl p-4 text-left">
                  <span className="font-bold text-[#33332D]">2. Safe Container Transitions</span>
                  <p className="leading-relaxed text-[11px]">
                    Couples who scheduled a physical <em>Safe-Container Walk</em> once per week instead of spreadsheet checking achieved a <strong>32% improvement in sentiment score convergence</strong> within 14 days.
                  </p>
                </div>
                <div className="space-y-1 bg-white border border-[#E5E2D9] rounded-xl p-4 text-left">
                  <span className="font-bold text-[#33332D]">3. The "20-Minute Decompression" Rule</span>
                  <p className="leading-relaxed text-[11px]">
                    When Alex respects a structured, explicit 20-minute silent decompression buffer for Taylor, Taylor is <strong>5.4x more likely</strong> to self-initiate constructive reassurance dialogues afterwards.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
