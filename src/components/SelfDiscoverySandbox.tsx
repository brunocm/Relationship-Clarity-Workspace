import React, { useState } from 'react';
import { 
  Brain, 
  Lock, 
  Sparkles, 
  Square, 
  Check, 
  Activity, 
  ShieldCheck, 
  Compass, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { PartnerProfile, SynthesisReport } from '../types';

interface SelfDiscoverySandboxProps {
  profile: PartnerProfile;
  partnerKey: 'partnerA' | 'partnerB';
  isA: boolean;
  opponentName: string;
  updateProfile: (profile: PartnerProfile) => void;
  saveExerciseToJournal: (title: string, summaryText: string) => void;
  synthesis?: SynthesisReport | null;
  
  // Exercise states passed in or managed locally
  activeExercise: string | null;
  setActiveExercise: React.Dispatch<React.SetStateAction<string | null>>;

  // Somatic states
  somaticArousal: number;
  setSomaticArousal: React.Dispatch<React.SetStateAction<number>>;
  selectedSensations: string[];
  setSelectedSensations: React.Dispatch<React.SetStateAction<string[]>>;
  isBreathingActive: boolean;
  setIsBreathingActive: React.Dispatch<React.SetStateAction<boolean>>;
  breathCyclesCompleted: number;
  breathPhase: 'Inhale' | 'Hold' | 'Exhale' | 'Prepare';
  breathTimer: number;

  // Shadow projection
  shadowTrigger: string;
  setShadowTrigger: React.Dispatch<React.SetStateAction<string>>;
  shadowChildhood: string;
  setShadowChildhood: React.Dispatch<React.SetStateAction<string>>;
  shadowReassurance: string;
  setShadowReassurance: React.Dispatch<React.SetStateAction<string>>;

  // Soft need excavator
  excavatorDemand: string;
  setExcavatorDemand: React.Dispatch<React.SetStateAction<string>>;
  excavatorFear: string;
  setExcavatorFear: React.Dispatch<React.SetStateAction<string>>;
  excavatorCoreNeed: string;
  setExcavatorCoreNeed: React.Dispatch<React.SetStateAction<string>>;

  // Shield inventory
  selectedShield: string | null;
  setSelectedShield: React.Dispatch<React.SetStateAction<string | null>>;
  shieldReflectionText: string;
  setShieldReflectionText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelfDiscoverySandbox({
  profile,
  partnerKey,
  isA,
  opponentName,
  updateProfile,
  saveExerciseToJournal,
  activeExercise,
  setActiveExercise,
  somaticArousal,
  setSomaticArousal,
  selectedSensations,
  setSelectedSensations,
  isBreathingActive,
  setIsBreathingActive,
  breathCyclesCompleted,
  breathPhase,
  breathTimer,
  shadowTrigger,
  setShadowTrigger,
  shadowChildhood,
  setShadowChildhood,
  shadowReassurance,
  setShadowReassurance,
  excavatorDemand,
  setExcavatorDemand,
  excavatorFear,
  setExcavatorFear,
  excavatorCoreNeed,
  setExcavatorCoreNeed,
  selectedShield,
  setSelectedShield,
  shieldReflectionText,
  setShieldReflectionText,
  synthesis,
}: SelfDiscoverySandboxProps) {
  const [nervousSystemResult, setNervousSystemResult] = useState<string | null>(null);
  const [shadowResult, setShadowResult] = useState<{ projectionStr: string; saved: boolean } | null>(null);
  const [excavatorResult, setExcavatorResult] = useState<{ blame: string; softNeed: string; pivotText: string; saved: boolean } | null>(null);
  const [shieldResult, setShieldResult] = useState<{ shield: string; reflection: string; alternative: string; saved: boolean } | null>(null);
  const [showClusterCard, setShowClusterCard] = useState(true);

  const unlockedList = profile.unlockedExercises || ['nervous-system-map'];

  const triggerManualUnlock = (id: string) => {
    const list = [...unlockedList];
    if (!list.includes(id)) {
      list.push(id);
    }
    updateProfile({
      ...profile,
      unlockedExercises: list
    });
  };

  // Dynamic Archetypes based on Euclidean Similarity (proximity matrix)
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

  const archetypesList = [
    {
      id: "pursuer-distancer",
      clashType: "Analytical Pursuer / Autonomy Distancer",
      label: "Pursuer / Distancer Pacing Loop",
      color: "from-amber-50/70 to-orange-50/20 border-orange-200 text-orange-950",
      buttonColor: "bg-orange-800 hover:bg-orange-900 border-orange-350",
      iconColor: "text-amber-700",
      harmony: [8, 6], autonomy: [4, 9], security: [9, 3], spontaneity: [5, 8],
      roleA: {
        title: "The Analytical Pursuer",
        coreDrive: "Abandonment Avoidance through immediate rational resolution",
        explanation: "You seek emotional security through immediate dialoguing, verbal symmetry, and rapid convergence. When relational tension rises or you feel distance, your nervous system processes it as deep relational danger, triggering a powerful somatic urge to talk, litigate, or check in.",
        earlyLife: "Often encouraged in childhood for high verbal articulation, or placed in situations requiring premature responsibility for resolving parent/sibling friction.",
        armor: "Deploying high-frequency questions, logical cross-examination, and demanding immediate conversations, which your partner Taylor interprets as high-intensity surveillance and critical accusation.",
        antidote: "Practice respecting the Timeout Decompression Pact. Reassure your body that Taylor's withdrawal is a chemical attempt to de-flood, not a sign of desertion. Gifting them space triggers safety, allowing them to return."
      },
      roleB: {
        title: "The Autonomy Distancer",
        coreDrive: "Somatic Self-Preservation through private containment",
        explanation: "You seek emotional security through quiet, self-directed decompression, autonomous pacing, and temporary withdrawal. When relationship friction spikes, your nervous system experiences severe somatic flooding (high adrenaline/cortisol), shutting down your verbal output center.",
        earlyLife: "Often conditioned early to believe that strong interactive feelings are volatile, dangerous, or unresolvable, and that standalone self-reliance is the only absolute safety.",
        armor: "Deploying stonewalling, physical relocation, monosyllabic checkouts, or total focus redirection to block incoming stimulation.",
        antidote: "Offer an explicit Timeout Decompression bid with a guaranteed return timeline, such as: 'I am tensing up and need 20 minutes of quiet to de-flood, but I love you and will return at 7:45 PM to finish speaking.' This settles Alex's abandonment alarm immediately."
      }
    },
    {
      id: "financial-tension",
      clashType: "Financial Safety / Spontaneous Expending",
      label: "Saving vs. Expending Loop",
      color: "from-blue-50/70 to-indigo-50/20 border-indigo-200 text-indigo-950",
      buttonColor: "bg-indigo-850 hover:bg-indigo-900 border-indigo-350",
      iconColor: "text-indigo-700",
      harmony: [7, 8], autonomy: [5, 7], security: [10, 4], spontaneity: [4, 9],
      roleA: {
        title: "The Financial Safety Sentinel (Saver)",
        coreDrive: "Defense against material vulnerability & scarcity",
        explanation: "You associate rigorous budgeting and asset tracking with basic personal safety and environmental sanity. Financial volatility feels like an imminent threat of financial disaster.",
        earlyLife: "Experienced severe childhood environmental volatility, sudden resource shifts, or relational breakdowns tied directly to financial irresponsibility.",
        armor: "Deploying deep audit sheets, controlling joint resource allocations, criticizing minor transactions, or conducting administrative interrogation sessions.",
        antidote: "Move away from transaction auditing. Implement Sovereign Spend Pools—where each partner has absolute unmonitored decision authority over a set pocket of resource—to preserve structural safety without choking Taylor's personal dignity."
      },
      roleB: {
        title: "The Spontaneous Expending Agent (Spender)",
        coreDrive: "Personal Sovereignty and Experiential Agency",
        explanation: "You equate flexible choices, experimental purchases, and sensory moments with actual life warmth, relational joy, and independent freedom. Budget controls feel like clinical surveillance.",
        earlyLife: "Grew up inside highly rigid household resource controls or cold rules where affection was bartered, making spending agency feel like an act of survival.",
        armor: "Adopting passive strike patterns, hidden transactions, superficial details compliance, or total somatic checkout during financial discussions.",
        antidote: "Settle into the Sovereign Spend Pool agreement. Complete and unmonitored tracking exemption on your sovereign pool eliminates the toxic parent-child control dynamic completely."
      }
    },
    {
      id: "over-under",
      clashType: "Over-functioner / Under-functioner",
      label: "Over-Functioning / Under-Functioning Loop",
      color: "from-emerald-50/70 to-teal-50/20 border-emerald-250 text-teal-950",
      buttonColor: "bg-emerald-850 hover:bg-[#3B4F3B] border-emerald-350",
      iconColor: "text-emerald-700",
      harmony: [9, 5], autonomy: [4, 9], security: [8, 5], spontaneity: [4, 8],
      roleA: {
        title: "The Over-Functioning System Steward",
        coreDrive: "Control over omnipresent systemic threat and chaos",
        explanation: "You carry a somatic belief that if you step off the coordination deck, the entire household, planning, chores, or scheduling will immediately collapse. This breeds constant vigilance, high cortisol, and eventual martyred burnout.",
        earlyLife: "Forced into premature, adult-like parental responsibilities (parentification) to stabilize a chaotic, erratic, or neglectful early family home.",
        armor: "Formulating detailed task spreadsheets, constant chores auditing, heavy sighing, critical reminders, or taking over domestic items while displaying silent resentment.",
        antidote: "Relinquish total executive control over selected domains (e.g. meals). Agree that Taylor determines the standards for those domains, and cease all tracking or intervention."
      },
      roleB: {
        title: "The Under-Functioning Receiver",
        coreDrive: "Self-preservation from hyper-critical auditing",
        explanation: "You step back from domestic responsibilities. Since you anticipate that whatever work you provide will be closely audited, criticized, or eventually redone to Alex's standard anyway, your somatic defense is to conserve energy and cease efforts.",
        earlyLife: "Grew up inside highly domineering or critical homes where your autonomous achievements were downplayed, edited, or strictly controlled.",
        armor: "Slipping into passive delay patterns, comfortable non-performance, or agreeing with chore assignments in words but striking through passive inaction.",
        antidote: "Claim 100% executive ownership over entire physical branches (e.g. laundry/organization) with unilateral standards. Agree that you own the task completely, transforming passive compliance into sovereignty."
      }
    },
    {
      id: "relocation-belonging",
      clashType: "Relocation Momentum / Belonging Safety",
      label: "Spatial Transition & Roots Safety Loop",
      color: "from-purple-50/75 to-fuchsia-10/20 border-purple-200 text-purple-950",
      buttonColor: "bg-purple-850 hover:bg-purple-905 border-purple-350",
      iconColor: "text-purple-700",
      harmony: [6, 8], autonomy: [8, 5], security: [8, 9], spontaneity: [6, 4],
      roleA: {
        title: "The Spatial Transition Driver",
        coreDrive: "Career adaptiveness, mobility, and momentum",
        explanation: "You view geographical mobility, change, and professional adaptiveness as crucial safety shields against stagnation, career irrelevance, or systemic entrapment.",
        earlyLife: "Learned that your career achievement and spatial flexibility are the only reliable hedges to maintain control over your life destiny.",
        armor: "Minimizing local roots, analyzing relationships as transportable productivity assets, or presenting hyper-glossy future scenarios without acknowledging loss.",
        antidote: "Acknowledge that your partner's need for local ties represents genuine psychological wellness, not career obstruction. Explore transition ideas with low-stakes, real-world pilots."
      },
      roleB: {
        title: "The Localized Support Anchor",
        coreDrive: "Interpersonal Belonging and Organic Roots Continuity",
        explanation: "You bind emotional and somatic baseline safety to geographic consistency, deep neighborhood roots, and established local community circles. Leaving feels like an existential fracturing.",
        earlyLife: "Nurtured within stable, supportive local support systems, or experienced chaotic geographical moves during childhood that severely broke deep safety.",
        armor: "Defensive skepticism toward career opportunities, passive reluctance to explore geographical ideas, or walls of silent resentment.",
        antidote: "Separate geographical ideas from sudden, irreversible relocation decisions. Agree to participate in low-liability physical scouting trials to test social/hobby interfaces before committing."
      }
    }
  ];

  // KNN calculation to locate closest matching diagnostic archetype
  let matchedArchetype = archetypesList[0];
  let minDValue = Infinity;

  archetypesList.forEach((archetype) => {
    const dH = Math.pow(curA.harmony - archetype.harmony[0], 2) + Math.pow(curB.harmony - archetype.harmony[1], 2);
    const dA = Math.pow(curA.autonomy - archetype.autonomy[0], 2) + Math.pow(curB.autonomy - archetype.autonomy[1], 2);
    const dS = Math.pow(curA.security - archetype.security[0], 2) + Math.pow(curB.security - archetype.security[1], 2);
    const dP = Math.pow(curA.spontaneity - archetype.spontaneity[0], 2) + Math.pow(curB.spontaneity - archetype.spontaneity[1], 2);
    const totalD = Math.sqrt(dH + dA + dS + dP);
    if (totalD < minDValue) {
      minDValue = totalD;
      matchedArchetype = archetype;
    }
  });

  const myRole = isA ? matchedArchetype.roleA : matchedArchetype.roleB;
  const partnerRole = isA ? matchedArchetype.roleB : matchedArchetype.roleA;

  return (
    <div className="space-y-6 animate-fade-in font-sans text-left">
      
      {/* Header block */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2D9] space-y-2 shadow-xs">
        <span className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-widest block">Interactive Diagnostic Chambers</span>
        <h3 className="text-xl font-serif text-[#33332D] font-bold">Relational Self-Discovery Engines</h3>
        <p className="text-xs text-[#6B6B5E] max-w-3xl leading-relaxed">
          Explore structural exercises designed to help you decompress, map somatic stresses, translate demanding statements into core values, and discover projections in absolute safety. 
          <span className="block mt-1 font-semibold text-[#33332D]">🔒 Absolute Partition Guarantee: None of your choices, slider calibrations, or text prompts are visible to {opponentName}. You stamp your insights to your journal only when ready.</span>
         </p>
      </div>

      {activeExercise === null && (
        <div className={`p-6 rounded-2xl border bg-gradient-to-br ${matchedArchetype.color} shadow-2xs space-y-4`}>
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div className="space-y-1.5">
              <span className={`text-[9.5px] font-mono uppercase bg-white/80 border border-[#E5E2D9] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-fit`}>
                <Compass className={`w-3 h-3 ${matchedArchetype.iconColor}`} />
                <span>Computed Relational Sub-Cluster: {matchedArchetype.label}</span>
              </span>
              <h4 className="text-lg font-serif font-bold text-[#33332D]">
                Your Individual Diagnostic Role: <span className="font-serif italic font-extrabold underline decoration-emerald-800/35">{myRole.title}</span>
              </h4>
            </div>
            
            <button
              onClick={() => setShowClusterCard(!showClusterCard)}
              className="text-[11px] font-mono text-[#6B6B5E] hover:text-[#33332D] underline cursor-pointer bg-white/45 px-3 py-1 rounded-lg border border-neutral-200/50"
            >
              {showClusterCard ? "Collapse Guide" : "Expand Guide"}
            </button>
          </div>

          {showClusterCard && (
            <div className="space-y-5 animate-fade-in">
              <p className="text-xs text-[#4A4A40] leading-relaxed font-serif italic border-l-2 border-[#5A5A40]/30 pl-3">
                "Relational system models locate your couples values configuration inside this sub-cluster. By shining light on individual roles in complete isolation, Sanctuary helps you unpack your side of the feedback wire with absolute dignity."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1.5">
                
                {/* Left: Deep Inner Meaning */}
                <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-neutral-200/60 space-y-3 shadow-3xs">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-[#8C8C7F] block font-bold">CORE PSYCHOLOGICAL DRIVE</span>
                    <h5 className="text-[11px] font-mono font-bold text-slate-850 uppercase tracking-wide">{myRole.coreDrive}</h5>
                  </div>
                  <p className="text-xs text-[#5C5C4F] leading-relaxed">
                    {myRole.explanation}
                  </p>
                </div>

                {/* Right: Early Life Sourcing & Defense Armor */}
                <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-neutral-200/60 space-y-3 shadow-3xs">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-[#8C8C7F] block font-bold">⚓ DEVELOPMENTAL SOURCING</span>
                    <p className="text-xs text-[#5C5C4F] leading-relaxed font-serif italic">
                      "{myRole.earlyLife}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-neutral-100/80">
                    <span className="text-[9px] font-mono uppercase text-red-700 block font-bold">⚠️ SYSTEMIC ACCUSATION ARMOR</span>
                    <p className="text-xs text-[#5C5C4F] leading-relaxed">
                      {myRole.armor}
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom: Antidote Banner */}
              <div className="bg-emerald-800/10 border border-emerald-500/25 p-4.5 rounded-xl space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider block w-fit">
                  ⚔️ Secure Relational Antidote
                </span>
                <p className="text-xs text-[#2A3E2A] leading-relaxed font-serif font-medium">
                  {isA 
                    ? myRole.antidote.replace("Alex's", "your").replace("Alex", "you").replace("Taylor", opponentName)
                    : myRole.antidote.replace("Taylor's", "your").replace("Taylor", "you").replace("Alex", opponentName)
                  }
                </p>
                <div className="pt-1.5 text-[9.5px] font-mono text-[#4A5D4A]">
                  *Tip: Try using this antidote during your next joint calibration session in the Synthesis Hub.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeExercise === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          
          {/* Exercise 1: Somatic Map */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E2D9] hover:border-[#C5C2B9] transition flex flex-col justify-between h-56 shadow-3xs">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-[#8DA58D] font-bold uppercase tracking-wider bg-[#8DA58D]/15 px-2 py-0.5 rounded">Somatic Regulator</span>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1">🔓 Always Available</span>
              </div>
              <h4 className="text-sm font-serif text-[#333332] font-bold">Nervous System Somatic Checkin & Breathing Space</h4>
              <p className="text-[11px] text-[#6B6B5E] leading-relaxed">
                Log bodily stress signals, measure sympathetic activation, and practice paced diaphragmatic breathing to settle your nervous system before communicating feedback.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveExercise('nervous-system-map')}
              className="w-full text-center py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-medium cursor-pointer transition shadow-3xs"
            >
              Regulate Somatic Baseline
            </button>
          </div>

          {/* Exercise 2: Shadow Projection Probe */}
          {(() => {
            const isUnlocked = unlockedList.includes('shadow-mismatch');
            return (
              <div className={`p-5 rounded-2xl border flex flex-col justify-between h-56 transition ${
                isUnlocked 
                  ? 'bg-white border-[#E5E2D9] hover:border-[#C5C2B9] shadow-3xs' 
                  : 'bg-[#F2EFE8]/40 border-dashed border-[#E5E2D9] text-[#8C8C7F]'
              }`}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-[#5A5A40]/10 text-[#5A5A40] px-2 py-0.5 rounded font-bold">Intrapersonal Scanner</span>
                    {isUnlocked ? (
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold">🔓 Companion Suggested</span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#8C8C7F] flex items-center gap-1">🔒 Locked by Companion</span>
                    )}
                  </div>
                  <h4 className={`text-sm font-serif font-bold ${isUnlocked ? 'text-[#333332]' : 'text-[#8C8C7F]'}`}>
                    Disowned Shadow & Projection Probe
                  </h4>
                  <p className="text-[11px] leading-relaxed">
                    Assess why a repetitive behavior of {opponentName} provokes high aggravation, comparing it to disowned boundaries, rules, or childhood codes.
                  </p>
                </div>
                {isUnlocked ? (
                  <button
                    type="button"
                    onClick={() => setActiveExercise('shadow-mismatch')}
                    className="w-full text-center py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-medium cursor-pointer transition shadow-3xs"
                  >
                    Launch Projection Probe
                  </button>
                ) : (
                  <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-[#E5E2D9]/40 mt-auto">
                    <span className="text-[9.5px] italic text-[#8C8C7F] leading-tight">Discuss childhood projections, triggers or "shadow issues" in chat to unlock.</span>
                    <button
                      type="button"
                      onClick={() => triggerManualUnlock('shadow-mismatch')}
                      className="text-[9.5px] hover:underline text-[#5A5A40] font-mono shrink-0 cursor-pointer font-bold bg-white px-2 py-1 rounded border border-[#E5E2D9] shadow-3xs"
                    >
                      Unlock
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Exercise 3: Soft Need Excavator */}
          {(() => {
            const isUnlocked = unlockedList.includes('soft-need-excavator');
            return (
              <div className={`p-5 rounded-2xl border flex flex-col justify-between h-56 transition ${
                isUnlocked 
                  ? 'bg-white border-[#E5E2D9] hover:border-[#C5C2B9] shadow-3xs' 
                  : 'bg-[#F2EFE8]/40 border-dashed border-[#E5E2D9] text-[#8C8C7F]'
              }`}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-[#5A5A40]/10 text-[#5A5A40] px-2 py-0.5 rounded font-bold">Vulnerability Translator</span>
                    {isUnlocked ? (
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold">🔓 Companion Suggested</span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#8C8C7F] flex items-center gap-1">🔒 Locked by Companion</span>
                    )}
                  </div>
                  <h4 className={`text-sm font-serif font-bold ${isUnlocked ? 'text-[#333332]' : 'text-[#8C8C7F]'}`}>
                    Underlying Soft Need Excavator
                  </h4>
                  <p className="text-[11px] leading-relaxed">
                    Convert high critical accusations or defensive blame statements into clean, vulnerable expressions of core boundary safety needs.
                  </p>
                </div>
                {isUnlocked ? (
                  <button
                    type="button"
                    onClick={() => setActiveExercise('soft-need-excavator')}
                    className="w-full text-center py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-medium cursor-pointer transition shadow-3xs"
                  >
                    Excavate Soft Needs
                  </button>
                ) : (
                  <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-[#E5E2D9]/40 mt-auto">
                    <span className="text-[9.5px] italic text-[#8C8C7F] leading-tight">Discuss your vulnerability, longings or "soft needs" in chat to unlock.</span>
                    <button
                      type="button"
                      onClick={() => triggerManualUnlock('soft-need-excavator')}
                      className="text-[9.5px] hover:underline text-[#5A5A40] font-mono shrink-0 cursor-pointer font-bold bg-white px-2 py-1 rounded border border-[#E5E2D9] shadow-3xs"
                    >
                      Unlock
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Exercise 4: Defensive Shield Inventory */}
          {(() => {
            const isUnlocked = unlockedList.includes('defensive-shield-inventory');
            return (
              <div className={`p-5 rounded-2xl border flex flex-col justify-between h-56 transition ${
                isUnlocked 
                  ? 'bg-white border-[#E5E2D9] hover:border-[#C5C2B9] shadow-3xs' 
                  : 'bg-[#F2EFE8]/40 border-dashed border-[#E5E2D9] text-[#8C8C7F]'
              }`}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-[#5A5A40]/10 text-[#5A5A40] px-2 py-0.5 rounded font-bold">Defensive Antidote Chart</span>
                    {isUnlocked ? (
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold">🔓 Companion Suggested</span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#8C8C7F] flex items-center gap-1">🔒 Locked by Companion</span>
                    )}
                  </div>
                  <h4 className={`text-sm font-serif font-bold ${isUnlocked ? 'text-[#333332]' : 'text-[#8C8C7F]'}`}>
                    Defensive Shield Inventory & Counter-Steps
                  </h4>
                  <p className="text-[11px] leading-relaxed">
                    Identify armor structures like stonewalling, lectures, or pre-emptive blame. Map the exact secure counter-steps to lower defensiveness.
                  </p>
                </div>
                {isUnlocked ? (
                  <button
                    type="button"
                    onClick={() => setActiveExercise('defensive-shield-inventory')}
                    className="w-full text-center py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-xl text-xs font-medium cursor-pointer transition shadow-3xs"
                  >
                    Analyze Shield Mechanisms
                  </button>
                ) : (
                  <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-[#E5E2D9]/40 mt-auto">
                    <span className="text-[9.5px] italic text-[#8C8C7F] leading-tight">Discuss protective habits, withdrawing or "defenses" in chat to unlock.</span>
                    <button
                      type="button"
                      onClick={() => triggerManualUnlock('defensive-shield-inventory')}
                      className="text-[9.5px] hover:underline text-[#5A5A40] font-mono shrink-0 cursor-pointer font-bold bg-white px-2 py-1 rounded border border-[#E5E2D9] shadow-3xs"
                    >
                      Unlock
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E5E2D9] p-6 space-y-6 relative animate-fade-in text-left">
          <button
            type="button"
            onClick={() => {
              setActiveExercise(null);
              setIsBreathingActive(false);
              setNervousSystemResult(null);
              setShadowResult(null);
              setExcavatorResult(null);
              setShieldResult(null);
            }}
            className="absolute top-4 right-4 bg-[#FAF9F6] border border-[#E5E2D9] text-[#8C8C7F] hover:text-[#4A4A40] text-xs px-3 py-1.5 rounded-lg cursor-pointer transition font-mono shadow-3xs hover:bg-[#FAF9F6]"
          >
            ◀ Exit Exercise
          </button>

          {/* RENDER EXERCISE 1: nervous-system-map */}
          {activeExercise === 'nervous-system-map' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h4 className="text-base font-serif text-[#333332] font-bold">Nervous System Somatic Map & Cyclic Grounder</h4>
                <p className="text-xs text-[#6B6B5E] mt-0.5">Bring explicit mindfulness to physical tension signals. Run a calculated somatic profile and ground with paced diaphragmatic loops.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Level Selector & Body signals */}
                <div className="space-y-4">
                  
                  {/* Arousal Slider */}
                  <div className="space-y-2">
                    <label className="text-[10.5px] font-mono text-[#8C8C7F] uppercase tracking-wider block">
                      Current Bodily Activation Level:
                    </label>
                    <div className="flex items-center gap-4 bg-[#FAF9F6] p-3 rounded-xl border border-[#E5E2D9]">
                      <span className="text-xs font-mono font-bold text-[#8C8C7F]">Calm (1)</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        className="flex-1 h-2 bg-[#E5E2D9] rounded-lg appearance-none cursor-pointer accent-[#5A5A40]"
                        value={somaticArousal}
                        onChange={(e) => setSomaticArousal(parseInt(e.target.value))}
                      />
                      <span className="text-xs font-mono font-bold text-red-600">Fired (10)</span>
                      <span className="text-sm font-bold font-mono bg-white border border-[#E5E2D9] px-2 py-1 rounded shadow-3xs text-[#33332D]">
                        {somaticArousal}
                      </span>
                    </div>
                  </div>

                  {/* Bodily sensations checklist */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10.5px] font-mono text-[#8C8C7F] uppercase tracking-wider block">
                      Identify physical stress signatures:
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-[#FAF9F6] p-3 border border-[#E5E2D9] rounded-xl text-xs text-[#4A4A40]">
                      {[
                        "Tight clenched jaw", "Shallow or rapid breathing", 
                        "Constricted heavy chest", "Fluttering stomach / butterfly loop",
                        "Clenched cold hands", "Hot flushing ears",
                        "Heavy slumped posture", "Restless fidgety legs"
                      ].map((sig, sIdx) => {
                        const isCh = selectedSensations.includes(sig);
                        return (
                          <label key={sIdx} className="flex items-center gap-2 cursor-pointer py-1">
                            <input
                              type="checkbox"
                              checked={isCh}
                              onChange={() => {
                                if (isCh) {
                                  setSelectedSensations(selectedSensations.filter(s => s !== sig));
                                } else {
                                  setSelectedSensations([...selectedSensations, sig]);
                                }
                              }}
                              className="rounded border-[#E5E2D9] text-[#5A5A40] focus:ring-[#8DA58D]"
                            />
                            <span className={isCh ? "font-medium text-[#33332D]" : "text-[#6B6B5E]"}>{sig}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      let responseMap = "";
                      const sensStr = selectedSensations.length > 0 ? selectedSensations.join(", ") : "no severe sensory contractions";
                      if (somaticArousal >= 8) {
                        responseMap = `Physiological Activation is HIGH Sympathetic (Fight/Flight Response) at ${somaticArousal}/10. Physical symptoms noted: ${sensStr}. Clinically, your defense threshold is heavily lowered, meaning any communication right now is prone to reactionary shields. Suggest immediate 3-5 cycles of cyclic diaphragmatic breath (4s in, 4s hold, 7s out) to trigger the vagus nerve.`;
                      } else if (somaticArousal >= 5) {
                        responseMap = `Physiological Activation is MODERATE Vigilance (Sympathetic Engagement) at ${somaticArousal}/10. Physical symptoms noted: ${sensStr}. Your nervous system is bracing for critique. Practice paced pauses to keep your core boundaries logical and prevent emotional flooded loops.`;
                      } else {
                        responseMap = `Physiological Activation is Ventral Vagal (Safe Connection & Equilibrium) at ${somaticArousal}/10. Symptoms: ${sensStr || 'Fully settled'}. Your system is grounded. This is the optimal, safe sandbox baseline from which to engage in clarifying agreements.`;
                      }
                      setNervousSystemResult(responseMap);
                    }}
                    className="w-full text-center py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white text-xs font-mono uppercase font-bold rounded-xl transition cursor-pointer shadow-3xs"
                  >
                    🔍 Map Somatic Baseline Print
                  </button>
                </div>

                {/* Integrated breathing spacer */}
                <div className="bg-[#FAF9F6] border border-[#E5E2D9] rounded-2xl p-5 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto shadow-3xs w-full">
                  <div className="text-center font-mono text-[9px] uppercase tracking-wider text-[#8C8C7F]">Cyclic 4-4-7 Breathing Space</div>
                  
                  {/* Scaled breathing circle */}
                  <div 
                    className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-1000 select-none ${
                        breathPhase === 'Inhale' 
                          ? 'bg-[#8DA58D]/25 scale-110 text-[#546B54]' 
                          : breathPhase === 'Hold' 
                          ? 'bg-yellow-100/60 scale-110 text-yellow-800' 
                          : breathPhase === 'Exhale' 
                          ? 'bg-[#E5E2D9]/30 scale-90 text-[#8C8C7F]' 
                          : 'bg-[#FAF9F6] border border-dashed border-[#E5E2D9] text-[#8C8C7F]'
                    }`}
                  >
                    <span className="font-bold text-[10px] uppercase font-mono tracking-widest">{breathPhase}</span>
                    {isBreathingActive && <span className="text-base font-semibold mt-0.5 font-mono">{breathTimer}s</span>}
                  </div>

                  <div className="text-[10.5px] text-center text-[#6B6B5E] max-w-xs leading-relaxed italic h-12 flex items-center justify-center">
                    {breathPhase === 'Inhale' && `🫁 Breathe in slowly through your nose...`}
                    {breathPhase === 'Hold' && `⏸️ Pause. Settle in this temporary silent pocket...`}
                    {breathPhase === 'Exhale' && `🌬️ Prolonged release. Settle down your nervous system...`}
                    {breathPhase === 'Prepare' && `Pace your breath to decompress and lower heart signals.`}
                  </div>

                  <div className="text-[10px] font-mono text-[#6B6B5E]">
                    Breath Cycles: <span className="font-bold text-[#33332D] text-[12px]">{breathCyclesCompleted}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsBreathingActive(!isBreathingActive)}
                    className={`w-full py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold tracking-wider transition cursor-pointer ${
                      isBreathingActive 
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-3xs' 
                        : 'bg-white hover:bg-[#F5F2ED] border border-[#E5E2D9] text-[#4A4A40] shadow-3xs'
                    }`}
                  >
                    {isBreathingActive ? "Stop Breathing" : "Start Diaphragmatic Breath"}
                  </button>
                </div>

              </div>

              {nervousSystemResult && (
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E2D9] space-y-3 animate-fade-in text-left">
                  <div className="text-xs font-bold text-[#33332D] uppercase tracking-wide font-mono">Calibrated Somatic Mapping Output:</div>
                  <p className="text-xs text-[#5A5A40] leading-relaxed italic font-serif bg-white p-3.5 border border-[#E5E2D9] rounded-xl">"{nervousSystemResult}"</p>
                  <button
                    type="button"
                    onClick={() => {
                      saveExerciseToJournal("Somatic Checkin & Vagus Grounder", `Somatic Level: ${somaticArousal}/10\nSensory marks: ${selectedSensations.join(', ') || 'Fully calm'}\nDiagnostic Assessment: ${nervousSystemResult}`);
                      alert("Stamped and sealed somatic check-in directly to your private reflective journal!");
                      setActiveExercise(null);
                      setNervousSystemResult(null);
                    }}
                    className="text-[10.5px] px-3.5 py-1.5 bg-[#FAF9F6] border border-[#E5E2D9] hover:bg-white text-[#4A4A40] rounded-lg transition font-mono hover:border-[#C5C2B9] cursor-pointer shadow-3xs flex items-center gap-1.5"
                  >
                    📋 Stamp to Private Journal Log
                  </button>
                </div>
              )}
            </div>
          )}

          {/* RENDER EXERCISE 2: shadow-mismatch */}
          {activeExercise === 'shadow-mismatch' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-base font-serif text-[#333332] font-bold">Disowned Shadow & Projection Probe</h4>
                <p className="text-xs text-[#6B6B5E] mt-0.5">Determine why a specific behavior of your partner induces excessive aggravation under the hood, parsing it back to early internal rules.</p>
              </div>

              <div className="space-y-3 text-left animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Step 1: The Provocative Feature (What irritates you highly in your partner?)</label>
                  <input
                    type="text"
                    placeholder="e.g. They make decisions spontaneously without scheduling details"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8DA58D]"
                    value={shadowTrigger}
                    onChange={(e) => setShadowTrigger(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Step 2: The Childhood Sourcing (What was the early familial ruleset on this trait?)</label>
                  <input
                    type="text"
                    placeholder="e.g. Tidy order and strict control were rewarded; spontaneity was labeled disruptive"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8DA58D]"
                    value={shadowChildhood}
                    onChange={(e) => setShadowChildhood(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Step 3: The Disowned Freedom (What forbidden desire does this behavior represent?)</label>
                  <input
                    type="text"
                    placeholder="e.g. The freedom to occasionally rest, play, and make mistakes without guilt"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8DA58D]"
                    value={shadowReassurance}
                    onChange={(e) => setShadowReassurance(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  disabled={!shadowTrigger.trim() || !shadowChildhood.trim() || !shadowReassurance.trim()}
                  onClick={() => {
                    const projectionStr = `My intense irritation regarding "${shadowTrigger}" is sourced in my childhood rule: "${shadowChildhood}". Beneath my critical assessment, this behavior represents a suppressed freedom I long for: "${shadowReassurance}". By acknowledging that, I can request collaborative scheduling as a practical logistical aid, rather than treating their posture as a personal attack on order.`;
                    setShadowResult({ projectionStr, saved: false });
                  }}
                  className="w-full text-center py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white text-xs font-mono uppercase font-bold rounded-xl transition cursor-pointer disabled:opacity-40"
                >
                  Resolve Projection Blueprint
                </button>
              </div>

              {shadowResult && (
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E2D9] space-y-3 animate-fade-in text-left">
                  <div className="text-xs font-bold text-[#333332] uppercase tracking-wide font-mono">Resolved Shadow Mapping:</div>
                  <p className="text-xs text-[#5A5A40] leading-relaxed font-serif italic text-[12px] p-3.5 bg-white border border-[#E5E2D9] rounded-xl font-medium">"{shadowResult.projectionStr}"</p>
                  <button
                    type="button"
                    onClick={() => {
                      saveExerciseToJournal("Disowned Shadow Projection Probe", shadowResult.projectionStr);
                      alert("Saved shadow resolution map directly to your private journal partition!");
                      setActiveExercise(null);
                      setShadowResult(null);
                    }}
                    className="text-[10.5px] px-3.5 py-1.5 bg-[#FAF9F6] border border-[#E5E2D9] text-[#4A4A40] rounded-lg transition font-mono hover:bg-white cursor-pointer shadow-3xs"
                  >
                    📋 Stamp to Private Journal Log
                  </button>
                </div>
              )}
            </div>
          )}

          {/* RENDER EXERCISE 3: soft-need-excavator */}
          {activeExercise === 'soft-need-excavator' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-base font-serif text-[#333332] font-bold">Underlying Soft Need Excavator</h4>
                <p className="text-xs text-[#6B6B5E] mt-0.5">Strip away hard armor demands and critical indictments. Translate them into clean, non-escalatory, vulnerable core statements of boundary requirements.</p>
              </div>

              <div className="space-y-3 text-left">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Step 1: The Hard Indictment (What blaming demand are you tempted to make?)</label>
                  <input
                    type="text"
                    placeholder="e.g. You never help me around the house and act like a selfish roommate!"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8DA58D]"
                    value={excavatorDemand}
                    onChange={(e) => setExcavatorDemand(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Step 2: Core Need Category</label>
                    <select
                      className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-3 py-2 text-xs text-[#4A4A40] focus:outline-none focus:ring-1"
                      value={excavatorCoreNeed}
                      onChange={(e) => setExcavatorCoreNeed(e.target.value)}
                    >
                      <option>Safety & Certainty</option>
                      <option>Teamwork & Co-equal Collaboration</option>
                      <option>Reassurance of Care / Devotion</option>
                      <option>Autonomy & Cadence Pace</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Step 3: The Sparing Fear</label>
                    <input
                      type="text"
                      placeholder="e.g. That I am isolated and carrying the domestic load entirely solo"
                      className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                      value={excavatorFear}
                      onChange={(e) => setExcavatorFear(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!excavatorDemand.trim() || !excavatorFear.trim()}
                  onClick={() => {
                    const blame = excavatorDemand;
                    const softNeed = excavatorCoreNeed;
                    const pivotText = `Translating raw indictment: "${blame}". My underlying safety fear is: "${excavatorFear}". My core soft need is: "${softNeed}". To ground my defenses, rather than demanding compliance, I extend this soft invitation: "When decisions or commitments aren't co-created, my nervous system triggers into isolation. My underlying soft need is to feel co-equal collaboration. What would help me settle is: having a brief schedule check-in."`;
                    setExcavatorResult({ blame, softNeed, pivotText, saved: false });
                  }}
                  className="w-full text-center py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white text-xs font-mono uppercase font-bold rounded-xl transition cursor-pointer"
                >
                  Excavate Vulnerable Statements
                </button>
              </div>

              {excavatorResult && (
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E2D9] space-y-3 animate-fade-in text-left">
                  <div className="text-xs font-bold text-[#333332] uppercase tracking-wide font-mono">Excavated Soft Pivot Expression:</div>
                  <p className="text-xs text-[#5A5A40] leading-relaxed font-serif italic text-[12px] p-3.5 bg-white border border-[#E5E2D9] rounded-xl font-medium">"{excavatorResult.pivotText}"</p>
                  <button
                    type="button"
                    onClick={() => {
                      saveExerciseToJournal("Soft Need Translation Excavation", excavatorResult.pivotText);
                      alert("Saved excavated soft pivot statement to your journal log!");
                      setActiveExercise(null);
                      setExcavatorResult(null);
                    }}
                    className="text-[10.5px] px-3.5 py-1.5 bg-[#FAF9F6] border border-[#E5E2D9] text-[#4A4A40] rounded-lg transition font-mono hover:bg-white cursor-pointer shadow-3xs"
                  >
                    📋 Stamp to Private Journal Log
                  </button>
                </div>
              )}
            </div>
          )}

          {/* RENDER EXERCISE 4: defensive-shield-inventory */}
          {activeExercise === 'defensive-shield-inventory' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-base font-serif text-[#333332] font-bold">Defensive Shield Inventory</h4>
                <p className="text-xs text-[#6B6B5E] mt-0.5">Diagnose which defensive armor postures you deploy under conflict pressure, and view the precise secure antidote choreography.</p>
              </div>

              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Step 1: Choose Active Shield Posture</label>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#4A4A40]">
                    {[
                      { id: 'withdraw', label: 'Shield of Withdrawal', desc: 'Stonewalling or physical/mental checkout' },
                      { id: 'intellect', label: 'Shield of Hyper-Rationalization', desc: 'Lecturing with dry logic, bypassing affect' },
                      { id: 'pre-blame', label: 'Shield of Pre-emptive Blame', desc: 'Accusing the other partner to avoid personal error guilt' },
                      { id: 'pander', label: 'Shield of Complacency / Accommodation', desc: 'Agreeing externally with hidden internal resentment' }
                    ].map((sh) => (
                      <button
                        key={sh.id}
                        type="button"
                        onClick={() => setSelectedShield(sh.id)}
                        className={`p-2.5 rounded-xl border text-left transition text-[11px] leading-tight cursor-pointer ${
                          selectedShield === sh.id
                            ? isA ? 'border-[#5A5A40] bg-[#5A5A40]/5 text-[#33332D] font-medium' : 'border-[#D18B6B] bg-[#D18B6B]/5 text-[#33332D] font-medium'
                            : 'border-[#E5E2D9] bg-[#FAF9F6] text-[#6B6B5E] hover:bg-[#F2EFE8]'
                        }`}
                      >
                        <span className="font-bold block text-[11.5px]">{sh.label}</span>
                        <span className="text-[10px] text-[#8C8C7F] font-normal leading-normal mt-0.5 block">{sh.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedShield && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-[10px] font-mono text-[#8C8C7F] uppercase tracking-wider block">Step 2: Self-Refinement Inquiry</label>
                    <p className="text-[11px] text-[#6B6B5E] leading-normal italic mb-1.5">
                      {selectedShield === 'withdraw' && "💡 Why do you withdraw? Do you fear that staying engaged will lead to a catastrophic emotional explosion or that your words will be warped?"}
                      {selectedShield === 'intellect' && "💡 What feeling does the dry rationalization hide? Is it a fear of showing raw helplessness or being pathologized?"}
                      {selectedShield === 'pre-blame' && "💡 How does accusing first protect you? Does admitting a minor mistake feel like giving them a loaded gun to dominate you?"}
                      {selectedShield === 'pander' && "💡 What makes boundary-setting scary? Will being honest render you unlovable or spark an immediate rejection cascade?"}
                    </p>
                    <textarea
                      rows={3}
                      placeholder="Write honest, raw self-reflections about how and when you notice yourself raising this shield..."
                      className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl p-3 text-xs text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D] resize-none"
                      value={shieldReflectionText}
                      onChange={(e) => setShieldReflectionText(e.target.value)}
                    />
                  </div>
                )}

                <button
                  type="button"
                  disabled={!selectedShield || !shieldReflectionText.trim()}
                  onClick={() => {
                    let shieldName = "";
                    let alternative = "";
                    if (selectedShield === 'withdraw') {
                      shieldName = "Shield of Withdrawal / Stonewalling";
                      alternative = "RESPONSIBLE SECURE TIMEOUT: Say, 'I am flooded and felt myself checking out to protect us. I need a 15-minute timeout to ground my physical nervous system, but I promise and warrant returning at exactly [specific time].' Run somatic deep breathing in private.";
                    } else if (selectedShield === 'intellect') {
                      shieldName = "Shield of Hyper-Rationalization / Lecturing";
                      alternative = "EMOTIONAL EMBODIMENT PILLAR: Drop the objective case trial logic. Speak exclusively of internal subjective sensory facts: 'I feel frightened' or 'I feel tired and heavy'. Avoid arguing over memory chronologies.";
                    } else if (selectedShield === 'pre-blame') {
                      shieldName = "Shield of Pre-emptive Blame Accusations";
                      alternative = "CLAIMING THE 20% OF THE SOIL: Stop defending 100% perfection. Pinpoint where you contributed a fraction of the soil to this cycle: 'I acknowledge that I did not schedule this, which added to your stress.' This immediately strips their shield of a target.";
                    } else {
                      shieldName = "Shield of Complacency/Resentful Accommodation";
                      alternative = "BOUNDED COURAGE INVITATION: Stop hiding resentment. Speak a kind, gentle but immutable NO: 'I want to say yes, but my core priorities cannot accommodate this paced expectation without burnout. Let us explore an alternative scheduling option.'";
                    }
                    
                    const text = `Identified Protective Armor: ${shieldName}.\nReflection Context: ${shieldReflectionText}\nSecure Antidote Choreography: ${alternative}`;
                    setShieldResult({ shield: shieldName, reflection: shieldReflectionText, alternative, saved: false });
                  }}
                  className="w-full text-center py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-white text-xs font-mono uppercase font-bold rounded-xl transition cursor-pointer"
                >
                  Dismantle Shield with Secure Antidotes
                </button>
              </div>

              {shieldResult && (
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E2D9] space-y-3 animate-fade-in text-left">
                  <div className="text-xs font-bold text-[#33332D] uppercase tracking-wide font-mono">Dismantling Shield Mapping:</div>
                  <div className="p-4 bg-white border border-[#E5E2D9] rounded-xl space-y-2.5 text-xs text-[#5A5A40]">
                    <div><strong className="text-[#33332D]">Deployed Armor:</strong> {shieldResult.shield}</div>
                    <div><strong className="text-[#33332D]">Quarantined Reflection:</strong> <span className="italic">"{shieldResult.reflection}"</span></div>
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 leading-relaxed font-sans">
                      <strong>⚓ Secure Action Antidote Choreography:</strong> {shieldResult.alternative}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const journalText = `Identified Defensive Shield: ${shieldResult.shield}\nMy Reflective Notes: ${shieldResult.reflection}\nSecure Action Antidote Path: ${shieldResult.alternative}`;
                      saveExerciseToJournal("Defensive Shield Dismantling", journalText);
                      alert("Sealed defensive antidote blueprint to your private log ledger!");
                      setActiveExercise(null);
                      setShieldResult(null);
                    }}
                    className="text-[10.5px] px-3.5 py-1.5 bg-[#FAF9F6] border border-[#E5E2D9] text-[#4A4A40] rounded-lg transition font-mono hover:bg-white cursor-pointer shadow-3xs"
                  >
                    📋 Stamp to Private Journal Log
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}
