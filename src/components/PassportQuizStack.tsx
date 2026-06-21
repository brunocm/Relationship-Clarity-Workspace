/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Sliders, 
  RotateCcw, 
  HelpCircle,
  Clock,
  Coins,
  Smile,
  Shield,
  Layers,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { RelationalPassport } from '../types';

export interface QuizQuestion {
  id: number;
  category: 'pacing' | 'assets' | 'chores' | 'vulnerability' | 'independence' | 'adaptation';
  topic: string;
  scenario: string;
  optA: {
    label: string;
    text: string;
    description: string;
    pacingCoeff: number; // alignment value weight
  };
  optB: {
    label: string;
    text: string;
    description: string;
    pacingCoeff: number; // autonomist value weight
  };
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'pacing',
    topic: 'Conflict Pacing & The Silent Gap',
    scenario: 'You hit an immediate, sharp disagreement about schedules or priorities. An icy silence falls over the kitchen. What is your somatic nervous system’s immediate override impulse?',
    optA: {
      label: 'Express Immediately',
      text: 'I want to speak and parse it right now.',
      description: 'Gaps cause tension/alarm in my chest. Reassurance comes from visual connection and talking through it immediately.',
      pacingCoeff: 9
    },
    optB: {
      label: 'Decompress Alone',
      text: 'I need to detach, leave the room, or walk away.',
      description: 'Immediate pressure triggers sensory flooding and freeze/fight gears. I must sit quietly and settle alone first.',
      pacingCoeff: 1
    }
  },
  {
    id: 2,
    category: 'assets',
    topic: 'Asset Allocation Gears & Financial Security',
    scenario: 'You are planning a personal vacation or weekend expense. How is your security instinct triggered when reviewing the cost?',
    optA: {
      label: 'Structural Guardrails',
      text: 'Strict budget matrices and emergency reserve backing.',
      description: 'Loose buffers or spontaneous expendings trigger cognitive anxiety. Safety means knowing exactly how every dollar offsets our long-term plan.',
      pacingCoeff: 8
    },
    optB: {
      label: 'Living Experiences',
      text: 'Fluid allocation for memory-making and ease.',
      description: 'Absolute tracking spreadsheets feel claustrophobic. Funds exist to reduce pressure and buy freedom; too much counting kills the magic.',
      pacingCoeff: 2
    }
  },
  {
    id: 3,
    category: 'chores',
    topic: 'Domestic Labor & Order Cadence',
    scenario: 'Dishes or packages have accumulated on the counter after a grueling workday. What translates to genuine relief for you?',
    optA: {
      label: 'Rostered Responsibility',
      text: 'A structured, transparent ledger of expectations and timing.',
      description: 'Clarity is a form of partnership respect. Dishes left to sit feel like a breach of structural agreements and pile up as ambient fatigue.',
      pacingCoeff: 8
    },
    optB: {
      label: 'Somatic Coordination',
      text: 'Flexible, organic cleaning as energy levels permit.',
      description: 'Explicit schedules feel administrative and demanding. I clean when my batteries are charged, and expect coordination without rigid timers.',
      pacingCoeff: 2
    }
  },
  {
    id: 4,
    category: 'vulnerability',
    topic: 'Vulnerability Gears & Storytelling',
    scenario: 'When attempting to express something deeply hurtful or private that occurred in the partnership, how do you construct your words?',
    optA: {
      label: 'Analytical Sequence',
      text: 'I sequence the facts, chronological events, and logical reasons.',
      description: 'I feel safer framing my sadness through context details and diagnostic clarity first, preventing the raw emotional wave from hijacking my speech.',
      pacingCoeff: 8
    },
    optB: {
      label: 'Somatic Core Expressions',
      text: 'I deliver my raw somatic feelings, crying, or visceral yearnings directly.',
      description: 'Why do we need a table of chronological sequence? Real intimacy is expressing the raw, aching wound from my gut directly without analytical filters.',
      pacingCoeff: 2
    }
  },
  {
    id: 5,
    category: 'independence',
    topic: 'Relational Autonomy vs. Interdependence',
    scenario: 'Your partner has planned a standalone weekend getaway with friends, leaving you briefly disconnected. What describes your internal environment?',
    optA: {
      label: 'Continuous Coordination Seek',
      text: 'I want consistent touchpoints, texts, and mutual attunement.',
      description: 'I find absolute comfort in knowing we are checking in regularly. Space is tolerable, but quiet hours create minor background static.',
      pacingCoeff: 9
    },
    optB: {
      label: 'Unplugged Autonomy',
      text: 'I enjoy full, separate quiet space to cultivate my individual agency.',
      description: 'Having solid, untouched spatial margins allows my system to breathe, recharging my batteries so I can return to the connection with genuine joy.',
      pacingCoeff: 1
    }
  },
  {
    id: 6,
    category: 'adaptation',
    topic: 'Adaptation Gears during Transitions',
    scenario: 'A major life change looms (a career sprint or potential geographic relocation). What represents your primary requirement for safety?',
    optA: {
      label: 'Paced Growth Sprints',
      text: 'Active momentum, high risk-tolerance, and transitional agility.',
      description: 'Safety means climbing higher, evolving, and seizing growth opportunities quickly. Standing still or clinging to a baseline feels stagnant.',
      pacingCoeff: 9
    },
    optB: {
      label: 'Grounding Constants',
      text: 'Physical stability, predictable community roots, and preservation of safety.',
      description: 'We must anchor ourselves to our geographic support networks and routines first. Radical upheaval representing rapid change threatens my stabilization.',
      pacingCoeff: 1
    }
  }
];

interface PassportQuizStackProps {
  userName: string;
  onConfirm: (passport: RelationalPassport) => void;
  onCancel: () => void;
}

export default function PassportQuizStack({
  userName,
  onConfirm,
  onCancel
}: PassportQuizStackProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [isFinished, setIsFinished] = useState(false);
  
  // Confirmed / sliders state for refinement screen
  const [refiningPassport, setRefiningPassport] = useState<RelationalPassport | null>(null);
  const [isCustomStyleSelected, setIsCustomStyleSelected] = useState<boolean>(false);

  const activeQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (opt: 'A' | 'B') => {
    const updated = { ...answers, [activeQuestion.id]: opt };
    setAnswers(updated);
    
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate scores on completion
      calculatePassportResults(updated);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const calculatePassportResults = (finalAnswers: Record<number, 'A' | 'B'>) => {
    // 1. Calculate Pacing Meters
    // Verbal Pacing: Q1 (pacing) and Q5 (independence)
    let pacingSum = 0;
    let pacingCount = 0;
    
    QUIZ_QUESTIONS.forEach(q => {
      if (q.category === 'pacing' || q.category === 'independence') {
        const val = finalAnswers[q.id];
        pacingSum += val === 'A' ? q.optA.pacingCoeff : q.optB.pacingCoeff;
        pacingCount++;
      }
    });
    const verbalPacing = Math.round(pacingSum / pacingCount);

    // Asset Pacing: Q2
    const assetPacing = finalAnswers[2] === 'A' ? QUIZ_QUESTIONS[1].optA.pacingCoeff : QUIZ_QUESTIONS[1].optB.pacingCoeff;

    // Domestic Pacing: Q3
    const domesticPacing = finalAnswers[3] === 'A' ? QUIZ_QUESTIONS[2].optA.pacingCoeff : QUIZ_QUESTIONS[2].optB.pacingCoeff;

    // Vulnerability score: Q4 is vulnerability
    const vulnerabilityStyle = finalAnswers[4] === 'A' ? QUIZ_QUESTIONS[3].optA.pacingCoeff : QUIZ_QUESTIONS[3].optB.pacingCoeff;

    // 2. Determine Archetype & AttachmentStyle
    let attachmentStyle = 'Secure Engager';
    let archetype = 'The Harmonizing Voyager';
    let primaryShield = 'Open Somatic Dialogue';
    let growthAntidote = 'Constructive Mutual Agendas';

    // Count how many A answers overall to score style
    let totalA = 0;
    Object.values(finalAnswers).forEach(v => { if (v === 'A') totalA++; });

    if (totalA >= 4) {
      attachmentStyle = 'Anxious-Preoccupied';
      archetype = 'The Clarity Pursuer';
      primaryShield = 'The Shield of Procedural Detail (pushing for analytical rules to escape panic)';
      growthAntidote = 'Somatic Down-Regulation (learning to sit with the silent gap without catastrophizing)';
    } else if (totalA <= 2) {
      attachmentStyle = 'Avoidant-Dismissive';
      archetype = 'The Autonomy Distancer';
      primaryShield = 'The Shield of Cognitive Retreat (withdrawing into solitude to de-escalate flooding)';
      growthAntidote = 'Enunciating My Needs (safeguarding autonomy by stating "I want to connect, but need 15 minutes of quiet first")';
    } else {
      attachmentStyle = 'Secure-Preoccupied Mixed';
      archetype = 'The Grounded Synthesizer';
      primaryShield = 'Balanced Attunement Buffer';
      growthAntidote = 'Integrating spontaneous space with structural commitments';
    }

    const compiled: RelationalPassport = {
      archetype,
      attachmentStyle,
      primaryShield,
      growthAntidote,
      verbalPacing,
      assetPacing,
      domesticPacing,
      vulnerabilityStyle,
      confirmedByUser: false
    };

    setRefiningPassport(compiled);
    setIsFinished(true);
  };

  const handleUpdateSlider = (key: keyof RelationalPassport, val: number) => {
    if (!refiningPassport) return;
    const updated = { ...refiningPassport, [key]: val };
    
    // Dynamic adjustment of Archetype based on custom sliders
    if (key === 'verbalPacing') {
      if (val >= 7) {
        updated.archetype = 'The Clarity Pursuer';
        updated.attachmentStyle = 'Anxious-Preoccupied';
        updated.primaryShield = 'The Shield of Procedural Detail (pushing for analytical rules to escape panic)';
        updated.growthAntidote = 'Somatic Down-Regulation (learning to sit with the silent gap without catastrophizing)';
      } else if (val <= 4) {
        updated.archetype = 'The Autonomy Distancer';
        updated.attachmentStyle = 'Avoidant-Dismissive';
        updated.primaryShield = 'The Shield of Cognitive Retreat (withdrawing into solitude to de-escalate flooding)';
        updated.growthAntidote = 'Enunciating My Needs (safeguarding autonomy by stating "I want to connect, but need 15 minutes of quiet first")';
      } else {
        updated.archetype = 'The Grounded Synthesizer';
        updated.attachmentStyle = 'Secure-Engager';
        updated.primaryShield = 'Somatic Balance Zone';
        updated.growthAntidote = 'Continuous self-responsible checkins';
      }
    }

    setRefiningPassport(updated);
    setIsCustomStyleSelected(true);
  };

  return (
    <div id="passport-quiz" className="bg-[#FAF9F6] border border-[#E5E2D9] rounded-3xl overflow-hidden mt-6 animate-fade-in text-left shadow-sm">
      
      {/* Title Header */}
      <div className="bg-[#F0EEE6] border-b border-[#E5E2D9] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#5A5A40]" />
          <div>
            <h3 className="text-sm font-serif font-bold text-[#33333D]">
              Relational Passport Assessment
            </h3>
            <p className="text-[10px] text-[#8C8C7F] font-mono uppercase tracking-wider">
              Profile Setup: {userName}
            </p>
          </div>
        </div>
        <button 
          onClick={onCancel}
          className="text-xs text-[#8C8C7F] hover:text-[#4A4A40] transition underline underline-offset-2 cursor-pointer font-sans"
        >
          Cancel Assessment
        </button>
      </div>

      {!isFinished ? (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Progress bar */}
          <div className="space-y-1.5 font-sans">
            <div className="flex items-center justify-between text-xs text-[#8C8C7F]">
              <span>Scenario {activeQuestion.id} of {QUIZ_QUESTIONS.length}</span>
              <span className="font-mono bg-[#E5E2D9] px-2 py-0.5 rounded-md text-[10px] text-[#4A4A40] font-bold uppercase tracking-wider">{activeQuestion.category}</span>
            </div>
            <div className="w-full bg-[#EBE8E1] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#5A5A40] h-full transition-all duration-300" 
                style={{ width: `${(activeQuestion.id / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario Text */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono font-bold text-[#8C8C7F] uppercase tracking-wider">
              {activeQuestion.topic}
            </h4>
            <div className="bg-white p-5 rounded-2xl border border-[#E5E2D9] shadow-xs relative">
              <span className="absolute -top-3 left-4 bg-[#D18B6B] text-white font-serif italic text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-xs">
                {activeQuestion.id}
              </span>
              <p className="text-sm sm:text-base text-[#33332D] leading-relaxed pl-4 font-serif">
                "{activeQuestion.scenario}"
              </p>
            </div>
          </div>

          {/* Action Choice Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <button
              id={`quiz-opt-a-${activeQuestion.id}`}
              onClick={() => handleSelectOption('A')}
              className="text-left bg-white hover:bg-neutral-50 p-5 rounded-2xl border border-[#E5E2D9] transition hover:border-[#8DA58D] hover:ring-1 hover:ring-[#8DA58D]/30 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3 font-mono">
                  A
                </span>
                <p className="text-xs font-bold text-[#4A4A40] uppercase tracking-wider group-hover:text-[#8DA58D] transition">
                  {activeQuestion.optA.label}
                </p>
                <p className="text-sm font-sans font-medium text-[#333320] mt-1 leading-snug">
                  {activeQuestion.optA.text}
                </p>
              </div>
              <p className="text-xs text-[#8C8C7F] leading-snug mt-3 italic">
                {activeQuestion.optA.description}
              </p>
            </button>

            <button
              id={`quiz-opt-b-${activeQuestion.id}`}
              onClick={() => handleSelectOption('B')}
              className="text-left bg-white hover:bg-neutral-50 p-5 rounded-2xl border border-[#E5E2D9] transition hover:border-[#D18B6B] hover:ring-1 hover:ring-[#D18B6B]/30 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold mb-3 font-mono">
                  B
                </span>
                <p className="text-xs font-bold text-[#4A4A40] uppercase tracking-wider group-hover:text-[#D18B6B] transition">
                  {activeQuestion.optB.label}
                </p>
                <p className="text-sm font-sans font-medium text-[#333320] mt-1 leading-snug">
                  {activeQuestion.optB.text}
                </p>
              </div>
              <p className="text-xs text-[#8C8C7F] leading-snug mt-3 italic">
                {activeQuestion.optB.description}
              </p>
            </button>
          </div>

          {/* Footer Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]/60 font-sans">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="text-xs text-[#8C8C7F] hover:text-[#4A4A40] disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Scenario
            </button>
            <span className="text-[11px] text-[#A8A89A] font-mono uppercase tracking-wider">
              Nervous System Calibration
            </span>
          </div>
        </div>
      ) : (
        // Validation & Adjustment Screen
        refiningPassport && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Computed Passport Preview */}
            <div className="bg-[#FAF9F6] border-2 border-dashed border-[#C5C2B9] rounded-3xl p-6 relative overflow-hidden bg-[radial-gradient(#F0EEE6_1px,transparent_1px)] [background-size:16px_16px]">
              
              <div className="absolute right-6 top-6 w-16 h-16 rounded-full border border-[#D18B6B]/40 opacity-25 flex items-center justify-center font-mono text-[8px] text-[#D18B6B] font-bold uppercase tracking-widest leading-none rotate-12">
                Symmetry Validated
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#5A5A40] text-white text-[9px] font-mono tracking-widest uppercase mb-4 shadow-xs">
                <Heart className="w-3 h-3 fill-white/20" /> RELATIONAL PASSPORT • {userName}
              </div>

              {/* Archetype & Attachment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <span className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Calculated Archetype</span>
                  <p className="text-2xl font-serif text-[#33332D] font-bold mt-1">
                    {refiningPassport.archetype}
                  </p>
                  
                  <div className="mt-4 space-y-1">
                    <span className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Attachment System Signature</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#4A4A40] font-sans font-semibold">
                      <span className={`w-2 h-2 rounded-full ${
                        refiningPassport.attachmentStyle.includes('Anxious') ? 'bg-red-400' :
                        refiningPassport.attachmentStyle.includes('Avoidant') ? 'bg-orange-400' : 'bg-emerald-400'
                      }`} />
                      {refiningPassport.attachmentStyle}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Primary Defensive Shield</span>
                    <p className="text-xs font-sans text-[#4A4A40] leading-relaxed mt-1 font-medium italic">
                      "{refiningPassport.primaryShield}"
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Co-Regulation Growth Antidote</span>
                    <p className="text-xs font-sans text-[#5A5A40] leading-relaxed mt-1 font-bold">
                      🗝️ {refiningPassport.growthAntidote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Meters list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#E5E2D9]">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-sans font-medium text-[#4A4A40]">
                    <span>Verbal Pacing Seek:</span>
                    <span className="font-mono text-[#D18B6B] font-bold">
                      {refiningPassport.verbalPacing >= 7 ? "Pursuer (Anxious)" :
                       refiningPassport.verbalPacing <= 4 ? "Retreat (Avoidant)" : "Balanced Secure"}
                    </span>
                  </div>
                  <div className="w-full bg-[#EBE8E1] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D18B6B] h-full" style={{ width: `${refiningPassport.verbalPacing * 10}%` }} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-sans font-medium text-[#4A4A40]">
                    <span>Asset Pacing (Budgeting):</span>
                    <span className="font-mono text-[#8DA58D] font-bold">
                      {refiningPassport.assetPacing >= 6 ? "Spreadsheets First" : "Spontaneous Flow"}
                    </span>
                  </div>
                  <div className="w-full bg-[#EBE8E1] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#8DA58D] h-full" style={{ width: `${refiningPassport.assetPacing * 10}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-sans font-medium text-[#4A4A40]">
                    <span>Domestic Chore Order:</span>
                    <span className="font-mono text-[#5A5A40] font-bold">
                      {refiningPassport.domesticPacing >= 6 ? "Structured Roster" : "Spontaneous/Fluid"}
                    </span>
                  </div>
                  <div className="w-full bg-[#EBE8E1] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#5A5A40] h-full" style={{ width: `${refiningPassport.domesticPacing * 10}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-sans font-medium text-[#4A4A40]">
                    <span>Vulnerability Style:</span>
                    <span className="font-mono text-slate-500 font-bold">
                      {refiningPassport.vulnerabilityStyle >= 6 ? "Logical Facts" : "Direct Somatic Heart"}
                    </span>
                  </div>
                  <div className="w-full bg-[#EBE8E1] h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-500 h-full" style={{ width: `${refiningPassport.vulnerabilityStyle * 10}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Slider tweak box */}
            <div className="bg-white border border-[#E5E2D9] rounded-2xl p-5 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#D18B6B]" />
                <h4 className="text-xs font-mono font-bold text-[#8C8C7F] uppercase tracking-wider">
                  Validate & Refine Your Alignment Profiles:
                </h4>
              </div>
              <p className="text-[11px] text-[#6B6B5E]">
                We value your self-awareness above standard algorithms. If the card scenario formulas did not capture some complexity of your system, drag the sliders to re-tune your Relational Passport directly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="space-y-1">
                  <label htmlFor="verbal-pacing-slider" className="block text-[11px] font-medium text-[#4A4A40] flex justify-between">
                    <span>Verbal Pacing Seek:</span>
                    <span className="font-mono font-bold">{refiningPassport.verbalPacing}/10</span>
                  </label>
                  <input 
                    id="verbal-pacing-slider"
                    type="range" 
                    min="1" 
                    max="10" 
                    value={refiningPassport.verbalPacing} 
                    onChange={(e) => handleUpdateSlider('verbalPacing', parseInt(e.target.value))}
                    className="w-full h-1 bg-[#EBE8E1] rounded-lg appearance-none cursor-pointer accent-[#D18B6B]"
                  />
                  <div className="flex justify-between text-[9px] text-[#A8A89A] font-mono uppercase">
                    <span>Space/Timeout (1)</span>
                    <span>Direct reassure now (10)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="asset-pacing-slider" className="block text-[11px] font-medium text-[#4A4A40] flex justify-between">
                    <span>Asset Pacing (Budgets):</span>
                    <span className="font-mono font-bold">{refiningPassport.assetPacing}/10</span>
                  </label>
                  <input 
                    id="asset-pacing-slider"
                    type="range" 
                    min="1" 
                    max="10" 
                    value={refiningPassport.assetPacing} 
                    onChange={(e) => handleUpdateSlider('assetPacing', parseInt(e.target.value))}
                    className="w-full h-1 bg-[#EBE8E1] rounded-lg appearance-none cursor-pointer accent-[#8DA58D]"
                  />
                  <div className="flex justify-between text-[9px] text-[#A8A89A] font-mono uppercase">
                    <span>Spontaneous Memory (1)</span>
                    <span>Spreadsheet Reserve (10)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="domestic-pacing-slider" className="block text-[11px] font-medium text-[#4A4A40] flex justify-between">
                    <span>Domestic Chore Order:</span>
                    <span className="font-mono font-bold">{refiningPassport.domesticPacing}/10</span>
                  </label>
                  <input 
                    id="domestic-pacing-slider"
                    type="range" 
                    min="1" 
                    max="10" 
                    value={refiningPassport.domesticPacing} 
                    onChange={(e) => handleUpdateSlider('domesticPacing', parseInt(e.target.value))}
                    className="w-full h-1 bg-[#EBE8E1] rounded-lg appearance-none cursor-pointer accent-[#5A5A40]"
                  />
                  <div className="flex justify-between text-[9px] text-[#A8A89A] font-mono uppercase">
                    <span>Fluid flow (1)</span>
                    <span>Rostered Schedule (10)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="vulnerability-style-slider" className="block text-[11px] font-medium text-[#4A4A40] flex justify-between">
                    <span>Vulnerability Delivery:</span>
                    <span className="font-mono font-bold">{refiningPassport.vulnerabilityStyle}/10</span>
                  </label>
                  <input 
                    id="vulnerability-style-slider"
                    type="range" 
                    min="1" 
                    max="10" 
                    value={refiningPassport.vulnerabilityStyle} 
                    onChange={(e) => handleUpdateSlider('vulnerabilityStyle', parseInt(e.target.value))}
                    className="w-full h-1 bg-[#EBE8E1] rounded-lg appearance-none cursor-pointer accent-slate-500"
                  />
                  <div className="flex justify-between text-[9px] text-[#A8A89A] font-mono uppercase">
                    <span>Direct Heart/Cry (1)</span>
                    <span>Analytical facts (10)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Affirm Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
              <button
                onClick={() => {
                  setIsFinished(false);
                  setCurrentIdx(0);
                  setAnswers({});
                  setIsCustomStyleSelected(false);
                }}
                className="px-4 py-2 bg-[#EBE8E1] hover:bg-[#DEDACF] text-[#4A4A40] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Scenario Quiz
              </button>
              
              <button
                id="btn-confirm-passport"
                onClick={() => {
                  const finalPassport = { ...refiningPassport, confirmedByUser: true };
                  onConfirm(finalPassport);
                }}
                className="px-6 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-white" /> Use This Passport Map
              </button>
            </div>

          </div>
        )
      )}

    </div>
  );
}
