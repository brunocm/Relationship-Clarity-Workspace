/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line 
} from 'recharts';
import { SynthesisReport } from '../../types';

interface ProgressTabProps {
  synthesis: SynthesisReport;
  partnerAName: string;
  partnerBName: string;
}

export default function ProgressTab({ synthesis, partnerAName, partnerBName }: ProgressTabProps) {
  const chartData = synthesis.progressTrend || [
    { date: "May 20", alignmentScore: 42, sentimentA: 3, sentimentB: 4, clashIntensity: 8 },
    { date: "Jun 01", alignmentScore: 50, sentimentA: 4, sentimentB: 5, clashIntensity: 7 },
    { date: "Jun 10", alignmentScore: 58, sentimentA: 5, sentimentB: 5, clashIntensity: 6 },
    { date: "Jun 15", alignmentScore: 68, sentimentA: 7, sentimentB: 6, clashIntensity: 4 }
  ];

  const currentAlignment = chartData.length > 0 
    ? `${chartData[chartData.length - 1].alignmentScore}%` 
    : "68%";
    
  const currentFriction = chartData.length > 0 
    ? `${chartData[chartData.length - 1].clashIntensity}/10` 
    : "4/10";

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header explanation block */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2D9] shadow-xs text-left space-y-4">
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-[#5A5A40]/10 rounded-lg text-[#5A5A40] shrink-0 mt-0.5">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-serif font-semibold text-[#33332D]">
              Relationship Symmetry & Progress Tracker
            </h3>
            <p className="text-xs text-[#6B6B5E] leading-relaxed">
              This telemetry layer aggregates sentiment patterns from unedited partner journal entries and evaluates value alignment metrics compiled across previous check-ins. By tracking shifts in emotional warmth and clash intensity, symmetry mapping helps visualize de-escalation over time.
            </p>
          </div>
        </div>

        <div className="border-t border-[#E5E2D9]/60 pt-3 text-xs text-[#6B6B5E] grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E5E2D9]/40 text-center">
            <span className="text-[9px] font-mono text-[#8C8C7F] uppercase block">Current Value Alignment</span>
            <span className="text-2xl font-serif font-bold text-[#5A5A40]">
              {currentAlignment}
            </span>
          </div>
          <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E5E2D9]/40 text-center">
            <span className="text-[9px] font-mono text-[#8C8C7F] uppercase block">Clash Intensity Index</span>
            <span className="text-2xl font-serif font-bold text-[#D18B6B]">
              {currentFriction}
            </span>
          </div>
          <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E5E2D9]/40 text-center">
            <span className="text-[9px] font-mono text-[#8C8C7F] uppercase block">Sentiment Symmetry</span>
            <span className="text-2xl font-serif font-bold text-[#8DA58D]">Symmetric</span>
          </div>
        </div>
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart A: Value Alignment Progress over time */}
        <div id="chart-alignment-container" className="bg-white rounded-2xl p-6 border border-[#E5E2D9] shadow-xs space-y-4 text-left">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-serif font-semibold text-[#33332D] flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#5A5A40]" />
                Needs Alignment Progression
              </h4>
              <p className="text-[11px] text-[#6B6B5E]">Shows convergence inside the system as unedited baselines synchronize</p>
            </div>
            <span className="bg-[#5A5A40]/10 text-[#5A5A40] text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg border border-[#5A5A40]/15">
              INDEX PERCENT
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="alignmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5A5A40" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5A5A40" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D9" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#8C8C7F" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E2D9' }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  stroke="#8C8C7F" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={{ stroke: '#E5E2D9' }}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FAF9F6', 
                    border: '1px solid #E5E2D9', 
                    borderRadius: '12px',
                    color: '#33332D',
                    fontSize: '11px',
                    fontFamily: 'serif'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="alignmentScore" 
                  stroke="#5A5A40" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#alignmentGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Independent Sentiment & Joint Clash Intensity Tracker */}
        <div id="chart-sentiment-container" className="bg-white rounded-2xl p-6 border border-[#E5E2D9] shadow-xs space-y-4 text-left">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-serif font-semibold text-[#33332D] flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#D18B6B]" />
                Sentiment & Friction Tracking
              </h4>
              <p className="text-[11px] text-[#6B6B5E]">Contrasts private emotional warmth scores against joint tension levels</p>
            </div>
            <span className="bg-[#D18B6B]/15 text-[#C05C5C] text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg border border-[#D18B6B]/20">
              0-10 RATING
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D9" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#8C8C7F" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={{ stroke: '#E5E2D9' }}
                />
                <YAxis 
                  domain={[0, 10]} 
                  stroke="#8C8C7F" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={{ stroke: '#E5E2D9' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FAF9F6', 
                    border: '1px solid #E5E2D9', 
                    borderRadius: '12px',
                    color: '#33332D',
                    fontSize: '11px',
                    fontFamily: 'serif'
                  }} 
                />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }}
                />
                <Line 
                  name={`${partnerAName} Sentiment`} 
                  type="monotone" 
                  dataKey="sentimentA" 
                  stroke="#5A5A40" 
                  strokeWidth={2.5}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  name={`${partnerBName} Sentiment`} 
                  type="monotone" 
                  dataKey="sentimentB" 
                  stroke="#8DA58D" 
                  strokeWidth={2.5}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  name="Friction Level" 
                  type="monotone" 
                  dataKey="clashIntensity" 
                  stroke="#D18B6B" 
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      
      {/* Timeline explanation cards / takeaways */}
      <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#E5E2D9] text-left space-y-4">
        <h4 className="text-xs font-mono font-medium text-[#8C8C7F] uppercase tracking-wider">
          Timeline Analysis Takeaways
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#6B6B5E]">
          <div className="space-y-1">
            <span className="font-semibold text-[#33332D] font-serif">📈 Convergence Explanation</span>
            <p>
              The initial <strong>42% Alignment index</strong> on May 20 reflected severe defensive shields, where Taylor over-stated Autonomy demands and Alex over-stated Security demands. As self-reflection took root, they converged toward their true baselines, lifting alignment to <strong>68% on Jun 15</strong>.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-[#33332D] font-serif">🔄 Friction Reduction Loop</span>
            <p>
              As unedited diary sentiment scores improved (rising from 3-4 to 6-7), defensive cycles broke. Reduced friction levels on the timeline correspond precisely with scheduling <em>Safe-Container Walks</em> and <em>Listening Swaps</em>, allowing direct physical pacing to heal nervous triggers.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
