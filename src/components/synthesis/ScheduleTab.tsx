/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CalendarRange, 
  CheckCircle2, 
  Calendar, 
  ExternalLink, 
  AlertCircle,
  Timer,
  Heart,
  FileCheck
} from 'lucide-react';
import { SynthesisReport, ScheduledDialogue } from '../../types';

interface ScheduleTabProps {
  synthesis: SynthesisReport;
  scheduledDialogues: ScheduledDialogue[];
  onAddDialogue: (dialogue: ScheduledDialogue) => void;
  onDeleteDialogue: (id: string) => void;
  sessionType: string;
  setSessionType: (v: string) => void;
  sessionDate: string;
  setSessionDate: (v: string) => void;
  sessionTime: string;
  setSessionTime: (v: string) => void;
  customMeetingLink: string;
  setCustomMeetingLink: (v: string) => void;
  handleCreateSchedule: (e: React.FormEvent) => void;
  DIALOGUE_FORMATS: { title: string; desc: string }[];
  partnerAName: string;
  partnerBName: string;
}

export default function ScheduleTab({
  synthesis,
  scheduledDialogues,
  onAddDialogue,
  onDeleteDialogue,
  sessionType,
  setSessionType,
  sessionDate,
  setSessionDate,
  sessionTime,
  setSessionTime,
  customMeetingLink,
  setCustomMeetingLink,
  handleCreateSchedule,
  DIALOGUE_FORMATS,
  partnerAName,
  partnerBName,
}: ScheduleTabProps) {

  // Proposal 3: Interactive Dialogue prep simulation states
  const [activePlaybookIdx, setActivePlaybookIdx] = useState<number>(0);
  const [activePhaseIdx, setActivePhaseIdx] = useState<number>(0);
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [breathingStep, setBreathingStep] = useState<string>("Ready to Settle");
  const [breathingFill, setBreathingFill] = useState<number>(100);
  const [prepChecks, setPrepChecks] = useState<Record<string, boolean>>({
    somaticGrounding: false,
    environmentSeclusion: false,
    physicalTimer: false,
  });

  // Box Breathing cycle: Inhale (4s) -> Hold (4s) -> Exhale (4s) -> Rest (4s)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      let phase = 0; // 0 Inhale, 1 Hold, 2 Exhale, 3 Rest
      setBreathingStep("Inhale... (Deep belly breath) 💨");
      setBreathingFill(20);
      
      interval = setInterval(() => {
        phase = (phase + 1) % 4;
        if (phase === 0) {
          setBreathingStep("Inhale... (Deep belly breath) 💨");
          setBreathingFill(20);
        } else if (phase === 1) {
          setBreathingStep("Hold... (Abdominal expansion) 🧘‍♂️");
          setBreathingFill(60);
        } else if (phase === 2) {
          setBreathingStep("Exhale... (Slowing escape of air) 🌬️");
          setBreathingFill(100);
        } else {
          setBreathingStep("Empty... (Rest in safety) ✨");
          setBreathingFill(5);
        }
      }, 4000);
    } else {
      setBreathingStep("Ready to Settle");
      setBreathingFill(100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathing]);

  const PLAYBOOK_EXERCISES = [
    {
      title: "The 30-Minute Safe-Container Walk",
      description: "Walking side-by-side without eye contact to safely bypass face-to-face intense defensive armor.",
      neutralizes: "Amygdala hyper-charge flight/freeze reflexes.",
      prepQuote: "Coordinated pacing matches heart rates. Walk together, breath deep, and synchronize physically to neutralize tension.",
      phases: [
        { name: "Somatic Sync", duration: "5 mins", speaker: "Joint", desc: "Walk adjacent in absolute quiet. Fit your steps to their speed, breathe deeply, and coordinate physical posture to clear adrenaline." },
        { name: `${partnerAName} Expresses`, duration: "10 mins", speaker: partnerAName, desc: `${partnerAName} speaks continuously about their primary needs and feelings. ${partnerBName || 'Partner'} walks next to them in silence, eyes forward, absorbing fully.` },
        { name: `${partnerBName || 'Partner'} Expresses`, duration: "10 mins", speaker: partnerBName || "Partner B", desc: `Swap roles. ${partnerBName || 'Partner'} shares their values openly. ${partnerAName} walks next to them silently, refraining from defense responses or corrections.` },
        { name: "Restorative Silence", duration: "5 mins", speaker: "Joint", desc: "Finish the route in 5 minutes of quiet togetherness. Let the physical pacing cement the verbal insights without intellectual friction." },
      ]
    },
    {
      title: "Active Listening Swap",
      description: "Enforced, zero-interruption verbal segments ensuring voice space for both protective shields.",
      neutralizes: "Reactive defense formulation loops, where we build reply arguments instead of listening.",
      prepQuote: "A guarantee of zero retaliation or counters completely relaxes defensive posturing.",
      phases: [
        { name: "Focus Breathing", duration: "2 mins", speaker: "Joint", desc: "Sit directly face-to-face. Complete three synchronized four-part breath cycles holding gentle eye contact to anchor somatic safety." },
        { name: `${partnerAName} Shares`, duration: "8 mins", speaker: partnerAName, desc: `${partnerAName} outlines their relational value coordinates. ${partnerBName || 'Partner'} holds open attention silently with no notes, no rebuttals.` },
        { name: `${partnerBName || 'Partner'} Mirrors`, duration: "5 mins", speaker: partnerBName || "Partner B", desc: `${partnerBName || 'Partner'} mirrors key concepts starting with: 'What I heard you say is...'. Validate the core stress without needing to immediately agree.` },
        { name: "Reverse Roles", duration: "13 mins", speaker: "Joint", desc: `Swap responsibilities. ${partnerBName || 'Partner'} shares their priorities for 8m, and ${partnerAName} mirrors back core elements for 5m.` },
      ]
    },
    {
      title: "Values Blueprint Session",
      description: "Structural compromise work addressing core Priorities values rather than reactive house bickering.",
      neutralizes: "Vague, administrative surface bickering loops such as chores, chores audits, or house rules.",
      prepQuote: "Clashes are caused by survival archetypes, not partner maliciousness. Renegotiate actual expectations.",
      phases: [
        { name: "Pick Disparity Pin", duration: "5 mins", speaker: "Joint", desc: "Isolate your highest Gaps (e.g., Autonomy). Propose that differences correspond with protective childhood shields, not direct malice." },
        { name: "Describe Origin", duration: "10 mins", speaker: "Joint", desc: "Take turns completing: 'My demand for [Value] is elevated because as a child, my safety environment required...' " },
        { name: "Draft Rules", duration: "15 mins", speaker: "Joint", desc: "Establish physical boundary agreements (such as spend pools or chores schedules) supporting each other's calm requirements." },
      ]
    },
    {
      title: "Financial Priority Realignment",
      description: "Converting cold currency logs back into actual emotional and physical safety definitions.",
      neutralizes: "Vulnerability armor triggered by transaction controls and survival-level budget worries.",
      prepQuote: "Arguments over money are secretly fights for sovereign freedom, devotion, or survival.",
      phases: [
        { name: "Re-label Items", duration: "10 mins", speaker: "Joint", desc: "Open the bank ledger. Reframe charged expenses as either 'Sovereign Freedom' or 'Structural Panic Shield'." },
        { name: "Reserve Baselines", duration: "10 mins", speaker: partnerAName, desc: `${partnerAName} states the precise reserve amount needed in checking to keep somatic alert levels from firing. Agree to honor this margin.` },
        { name: "Sovereign Spend Pools", duration: "10 mins", speaker: partnerBName || "Partner B", desc: "Designate a set monthly sum for each partner. Complete and total exemption from tracking, auditing, or any partner criticism." },
      ]
    }
  ];

  const activePlaybook = PLAYBOOK_EXERCISES[activePlaybookIdx] || PLAYBOOK_EXERCISES[0];
  const activePhase = activePlaybook.phases[activePhaseIdx] || activePlaybook.phases[0];

  return (
    <div className="space-y-6">
      
      {/* Informational Playbook Section — Describes each Facilitation Format */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2D9] shadow-xs text-left space-y-5 animate-fade-in">
        <div id="playbook-top-header" className="flex items-center justify-between border-b border-[#E5E2D9] pb-3 select-none">
          <div>
            <h4 className="text-sm font-serif font-semibold text-[#33332D] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D18B6B]" />
              The Relational Facilitation Playbook
            </h4>
            <p className="text-xs text-[#6B6B5E] mt-0.5 leading-relaxed">
              Click a clinical format below to load the <strong>Interactive Prep Simulator Workbench</strong> in real-time.
            </p>
          </div>
          <span className="text-[10px] font-mono bg-[#5A5A40]/10 text-[#5A5A40] px-2.5 py-1 rounded-md font-bold">
            PROPOSAL 3 SIMULATOR
          </span>
        </div>

        {/* 4 Clickable playbooks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {PLAYBOOK_EXERCISES.map((ex, exIdx) => {
            const isActive = activePlaybookIdx === exIdx;
            return (
              <button
                key={exIdx}
                onClick={() => {
                  setActivePlaybookIdx(exIdx);
                  setActivePhaseIdx(0);
                }}
                className={`p-4 rounded-xl border text-left space-y-2 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#FAF9F6] border-[#5A5A40] ring-1 ring-[#5A5A40]/30 shadow-3xs' 
                    : 'bg-white border-[#E5E2D9] hover:border-[#C5C2B9] hover:bg-[#FAF9F6]/45'
                }`}
              >
                <div className="flex justify-between items-center select-none">
                  <h5 className="text-xs font-bold text-[#33332D] font-serif">
                    {exIdx === 0 ? "🚶‍♂️" : exIdx === 1 ? "⏱️" : exIdx === 2 ? "📐" : "💰"} {ex.title}
                  </h5>
                  {isActive ? (
                    <span className="text-[8px] font-mono font-bold text-[#5A5A40] uppercase bg-[#5A5A40]/15 px-1.5 py-0.5 rounded-md">
                      ✓ Selected Focus
                    </span>
                  ) : (
                    <span className="text-[8px] font-mono text-[#8C8C7F] uppercase">
                      Explore Prep
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#6B6B5E] leading-relaxed">
                  <strong>Neutralizes:</strong> {ex.neutralizes}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Prep Area */}
        <div className="border border-[#E5E2D9] rounded-2xl bg-[#FAF9F6] p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E2D9] pb-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#D18B6B]/15 text-[#D18B6B] text-[9.5px] font-mono tracking-wider font-bold">
                🛠️ INTERACTIVE WORKSPACE SIMULATOR
              </span>
              <h4 className="text-sm font-serif font-bold text-[#33332D] mt-1.5 leading-tight">
                Preparing for: {activePlaybook.title}
              </h4>
            </div>
            <p className="text-[11px] font-sans italic text-[#6B6B5E] max-w-sm">
              "{activePlaybook.prepQuote}"
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Timeline phase and details */}
            <div className="lg:col-span-7 space-y-4">
              <h5 className="text-[10px] font-mono font-bold text-[#8C8C7F] uppercase tracking-wider">
                Session Interactive Phasing Timeline
              </h5>

              {/* Steps timeline buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {activePlaybook.phases.map((ph, phIdx) => {
                  const isCurrent = activePhaseIdx === phIdx;
                  return (
                    <button
                      key={phIdx}
                      onClick={() => setActivePhaseIdx(phIdx)}
                      className={`px-3 py-1.5 rounded-lg text-[10.5px] font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                        isCurrent 
                          ? 'bg-[#5A5A40] text-white' 
                          : 'bg-white border border-[#E5E2D9] text-[#6B6B5E] hover:border-[#C5C2B9]'
                      }`}
                    >
                      {phIdx + 1}. {ph.name} ({ph.duration})
                    </button>
                  );
                })}
              </div>

              {/* Active step details view card */}
              <div className="bg-white border border-[#E5E2D9] rounded-xl p-4 space-y-3.5 animate-fade-in">
                <div className="flex items-center justify-between flex-wrap gap-2 select-none border-b border-[#E5E2D9]/60 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-[#D18B6B]" />
                    <span className="text-xs font-serif font-bold text-[#33332D]">
                      Active Phase: {activePhase.name}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[9px] font-mono font-bold bg-[#FAF9F6] border border-[#E5E2D9] px-2 py-0.5 rounded-md text-[#6B6B5E]">
                      ⏱️ {activePhase.duration}
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-[#8DA58D]/15 text-[#5A5A40] px-2 py-0.5 rounded-md">
                      👤 Speaker: {activePhase.speaker}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-[#4A4A40] leading-relaxed">
                    <strong>Action Guideline:</strong> {activePhase.desc}
                  </p>
                  
                  {/* Speaker script prompts helper */}
                  <div className="p-3 bg-neutral-50 rounded-lg border-l-2 border-[#D18B6B] space-y-1 text-left">
                    <span className="text-[9px] font-mono font-bold text-[#8C8C7F] uppercase tracking-wider block">🗣️ Safe Verbal Starters</span>
                    <p className="text-[11px] text-[#4A4A40] font-serif italic">
                      {activePlaybookIdx === 0 && activePhaseIdx === 1 && `"${partnerAName}: 'During this walk, I feel somatically tense when talking about priorities. I want to share my baseline need for...'"`}
                      {activePlaybookIdx === 0 && activePhaseIdx === 2 && `"${partnerBName || 'Partner'}: 'My turn to share. When looking forward, I realize my desire for autonomy represents...'"`}
                      {activePlaybookIdx === 1 && activePhaseIdx === 1 && `"${partnerAName} & ${partnerBName || 'Partner'}: [Sit quietly and maintain soft eye contact, sync breaths without speaking]"`}
                      {activePlaybookIdx === 1 && activePhaseIdx === 2 && `"${partnerAName}: 'Underneath my shields, I experience fear about relational instability when...'"`}
                      {activePlaybookIdx === 1 && activePhaseIdx === 3 && `"${partnerBName || 'Partner'}: 'What I heard you say is you feel fear about stability. That makes sense because as a child...'"`}
                      {activePlaybookIdx === 2 && activePhaseIdx === 1 && `"${partnerAName} & ${partnerBName || 'Partner'}: 'Let us agree that our values diagram mismatch is not partner malice, but protective childhood armor.'"`}
                      {activePlaybookIdx === 2 && activePhaseIdx === 2 && `"${partnerAName}: 'As a child, I learned that structural security was rare, making me crave extreme order...'"`}
                      {activePlaybookIdx === 2 && activePhaseIdx === 3 && `"Together: 'Let's draft a clear boundary rule that gives A order without cutting off B's autonomy.'"`}
                      {activePlaybookIdx === 3 && activePhaseIdx === 1 && `"Together: 'Let us isolate spending line items and translate them back into true emotional safety desires.'"`}
                      {activePlaybookIdx === 3 && activePhaseIdx === 2 && `"${partnerAName}: 'To quiet my panic loops about funds, I need a visual reserve of at least [X]. Can we lock this?'"`}
                      {activePlaybookIdx === 3 && activePhaseIdx === 3 && `"${partnerBName || 'Partner'}: 'In order to preserve my dignity and sovereignty, I require unmonitored spending allowance. All audits off.'"`}
                      {(![0,1,2,3].includes(activePhaseIdx) || (activePlaybookIdx === 0 && activePhaseIdx === 0) || (activePlaybookIdx === 0 && activePhaseIdx === 3)) && `"Breathe, maintain step rhythm, and allow somatic sync to calm amygdala alarms."`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Somatic checks and breathing helper */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Box breathing co-regulator */}
              <div className="bg-white border border-[#E5E2D9] p-4 rounded-xl space-y-3 shadow-3xs">
                <div className="flex justify-between items-center select-none border-b border-[#E5E2D9]/60 pb-1.5">
                  <h6 className="text-[10px] font-mono font-extrabold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    Somatic Co-Regulator
                  </h6>
                  <span className="text-[8px] font-mono text-[#8C8C7F] uppercase">BOX BREATH (4-4-4)</span>
                </div>

                <p className="text-[11px] text-[#6B6B5E] leading-relaxed">
                  Lower your baseline adrenaline level before sharing values. Use our breathing pacer to settle somatic armor.
                </p>

                {/* Breathing display gauge */}
                <div className="p-3 bg-[#FAF9F6] border border-[#E5E2D9] rounded-lg text-center space-y-2 relative overflow-hidden flex flex-col items-center">
                  {/* Dynamic background bar */}
                  <div 
                    className="absolute bottom-0 left-0 top-0 bg-[#8DA58D]/15 transition-all duration-1050 ease-in-out" 
                    style={{ width: `${breathingFill}%` }}
                  />
                  
                  <span className="text-xs font-serif font-black text-[#5A5A40] z-10 select-none">
                    {breathingStep}
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsBreathing(!isBreathing)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold z-10 transition cursor-pointer ${
                      isBreathing 
                        ? 'bg-[#C05C5C] text-white hover:bg-[#A04C4C]' 
                        : 'bg-[#5A5A40] text-white hover:bg-[#4A4A35]'
                    }`}
                  >
                    {isBreathing ? "🛑 Stop Pacer" : "💨 Start Breathing"}
                  </button>
                </div>
              </div>

              {/* Prep responsibility checklist */}
              <div className="bg-white border border-[#E5E2D9] p-4 rounded-xl space-y-3.5 shadow-3xs">
                <div className="flex justify-between items-center select-none border-b border-[#E5E2D9]/60 pb-1.5">
                  <h6 className="text-[10px] font-mono font-extrabold text-[#33332D] uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
                    Somatic Prep Checks
                  </h6>
                  <span className="text-[8px] font-mono text-[#8C8C7F] uppercase">SAFETY GATES</span>
                </div>

                <div className="space-y-2 text-left">
                  <label htmlFor="chk-somatic" className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      id="chk-somatic"
                      type="checkbox"
                      checked={prepChecks.somaticGrounding}
                      onChange={(e) => setPrepChecks({...prepChecks, somaticGrounding: e.target.checked})}
                      className="mt-0.5 rounded border-[#E5E2D9] text-[#5A5A40] focus:ring-[#8DA58D]"
                    />
                    <span className="text-[10.5px] text-[#4A4A40] leading-tight select-none">
                      My body is settled and I am not in active panic or flight mode.
                    </span>
                  </label>

                  <label htmlFor="chk-environment" className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      id="chk-environment"
                      type="checkbox"
                      checked={prepChecks.environmentSeclusion}
                      onChange={(e) => setPrepChecks({...prepChecks, environmentSeclusion: e.target.checked})}
                      className="mt-0.5 rounded border-[#E5E2D9] text-[#5A5A40] focus:ring-[#8DA58D]"
                    />
                    <span className="text-[10.5px] text-[#4A4A40] leading-tight select-none">
                      Our environment is secluded, private, and free from external alerts.
                    </span>
                  </label>

                  <label htmlFor="chk-timer" className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      id="chk-timer"
                      type="checkbox"
                      checked={prepChecks.physicalTimer}
                      onChange={(e) => setPrepChecks({...prepChecks, physicalTimer: e.target.checked})}
                      className="mt-0.5 rounded border-[#E5E2D9] text-[#5A5A40] focus:ring-[#8DA58D]"
                    />
                    <span className="text-[10.5px] text-[#4A4A40] leading-tight select-none">
                      We have equipped a physical stopwatch timer to enforce intervals.
                    </span>
                  </label>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
        {/* Scheduling action form */}
        <div id="schedule-form-section" className="lg:col-span-12 bg-white rounded-3xl p-6 border border-[#E5E2D9] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E2D9]/40 pb-3">
            <div className="flex items-center gap-2">
              <CalendarRange className="w-5 h-5 text-[#5A5A40]" />
              <h3 className="text-base font-serif text-[#33332D]">
                Coordinate Dialogue Medium
              </h3>
            </div>
            <p className="text-xs text-[#6B6B5E] max-w-md italic text-left">
              When ready, lock down your targets to draft joint Google Calendar integrations complete with automatic invite descriptions.
            </p>
          </div>

          <form onSubmit={handleCreateSchedule} className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 font-sans items-end text-left">
            
            {/* Select Format option */}
            <div className="md:col-span-1">
              <label id="format-lbl-select" htmlFor="session-format" className="block text-[10px] font-mono font-semibold text-[#8C8C7F] uppercase tracking-wider mb-2">
                Select Facilitation Format
              </label>
              <select
                id="session-format"
                className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-3 py-2 text-xs text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D]"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
              >
                {DIALOGUE_FORMATS.map((f, idx) => (
                  <option key={idx} value={f.title}>{f.title}</option>
                ))}
              </select>
            </div>

            {/* Datetime Selection split row */}
            <div className="md:col-span-1">
              <label id="date-lbl-sel" htmlFor="session-date" className="block text-[10px] font-mono font-semibold text-[#8C8C7F] uppercase tracking-wider mb-2">
                Target Date
              </label>
              <input
                id="session-date"
                type="date"
                className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-3 py-2 text-xs text-[#4A4A40] focus:outline-none"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
              />
            </div>

            <div className="md:col-span-1">
              <label id="time-lbl-sel" htmlFor="session-time" className="block text-[10px] font-mono font-semibold text-[#8C8C7F] uppercase tracking-wider mb-2">
                Start Time
              </label>
              <input
                id="session-time"
                type="time"
                className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-3 py-2 text-xs text-[#4A4A40] focus:outline-none"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
              />
            </div>

            <div className="md:col-span-1">
              <button
                id="submit-schedule-btn"
                type="submit"
                className="w-full bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-medium py-2 rounded-xl text-xs transition duration-200 active:scale-95 shadow-xs text-center cursor-pointer h-[34px]"
              >
                Lock Session Slot
              </button>
            </div>

          </form>

        </div>

        {/* Scheduled Agenda displays list */}
        <div id="schedule-display-section" className="lg:col-span-12 space-y-6 animate-fade-in text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Proposed Formats list details */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E2D9] shadow-xs space-y-4">
              <h4 className="text-xs font-mono font-medium text-[#8C8C7F] uppercase tracking-widest">
                Agenda Blueprints Curated for Your Clash
              </h4>

              <div className="space-y-4">
                {synthesis.suggestedDialogueMediums.map((med, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E2D9] flex gap-3">
                    <BookOpen className="w-5 h-5 text-[#8C8C7F] shrink-0 mt-0.5" />
                    <div className="space-y-1.5 flex-1">
                      <h5 className="text-xs font-serif italic text-[#33332D]">{med.type}</h5>
                      <p className="text-[10.5px] text-[#6B6B5E] leading-relaxed italic">{med.reason}</p>
                      <div className="pt-2 flex flex-col gap-1 font-sans">
                        <span className="text-[9px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Recommended Agenda Steps:</span>
                        {med.agenda.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5 text-[10.5px] text-[#4A4A40]">
                            <CheckCircle2 className="w-3 h-3 text-[#8DA58D] shrink-0" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled list cards or placeholder */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E2D9] shadow-xs space-y-3 font-sans">
              <h4 className="text-xs font-mono font-medium text-[#4A4A40] uppercase tracking-wider">
                Active Scheduled Slots ({scheduledDialogues.length})
              </h4>

              {scheduledDialogues.length > 0 ? (
                <div className="space-y-3">
                  {scheduledDialogues.map((item) => (
                    <div key={item.id} className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E2D9] flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-[#33332D]">{item.title}</div>
                        <div className="text-[10.5px] text-[#6B6B5E] flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-[#8C8C7F]" />
                          <span>{item.startTime} (30 mins)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          id={`calendar-action-btn-${item.id}`}
                          href={item.calendarLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10.5px] bg-[#F5F2ED] hover:bg-[#EBE8E1] border border-[#E5E2D9] px-2.5 py-1.5 rounded-lg text-[#33332D] font-medium transition flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          Add Invite <ExternalLink className="w-3 h-3 text-[#5A5A40]" />
                        </a>
                        <button
                          id={`delete-schedule-btn-${item.id}`}
                          onClick={() => onDeleteDialogue(item.id)}
                          className="text-[#8C8C7F] hover:text-red-500 p-1.5 transition cursor-pointer"
                          title="Cancel Session"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-[#FAF9F6]/50 rounded-xl border border-[#E5E2D9]/40 space-y-2 select-none">
                  <CalendarRange className="w-8 h-8 text-[#8C8C7F]/60 mx-auto" />
                  <p className="text-xs text-[#6B6B5E] leading-relaxed">
                    No dialogues locked down for this session yet. Complete your prep, select targets above, and add target spots to begin aligning.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
