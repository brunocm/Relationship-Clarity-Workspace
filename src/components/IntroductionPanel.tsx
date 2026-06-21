/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, 
  Compass, 
  ShieldAlert, 
  Sparkles, 
  MoveRight, 
  Users2, 
  Library,
  Mic, 
  Square, 
  Upload, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Trash2,
  Lock,
  Layers,
  ShieldCheck,
  Sliders,
  HelpCircle
} from 'lucide-react';
import { ConflictContext, PartnerProfile, RelationalPassport } from '../types';
import PassportQuizStack from './PassportQuizStack';

interface IntroductionPanelProps {
  partnerAName: string;
  partnerBName: string;
  setPartnerAName: (name: string) => void;
  setPartnerBName: (name: string) => void;
  conflictContext: ConflictContext;
  setConflictContext: (context: ConflictContext) => void;
  partnerA: PartnerProfile;
  setPartnerA: React.Dispatch<React.SetStateAction<PartnerProfile>>;
  partnerB: PartnerProfile;
  setPartnerB: React.Dispatch<React.SetStateAction<PartnerProfile>>;
  onStart: (rev: 'existing' | 'single' | 'fresh-c') => void;
}

export default function IntroductionPanel({
  partnerAName,
  partnerBName,
  setPartnerAName,
  setPartnerBName,
  conflictContext,
  setConflictContext,
  partnerA,
  setPartnerA,
  partnerB,
  setPartnerB,
  onStart,
}: IntroductionPanelProps) {

  // --- Relational Context Extraction States ---
  const [onboardingMode, setOnboardingMode] = useState<'existing' | 'single' | 'fresh-c'>('existing');
  const [quizTarget, setQuizTarget] = useState<'none' | 'partnerA' | 'partnerB'>('none');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, 'A' | 'B'>>({
    1: 'A', 2: 'A', 3: 'A', 4: 'A', 5: 'A'
  });

  const handlePassportComplete = (target: 'partnerA' | 'partnerB', passport: RelationalPassport) => {
    let pA = partnerA;
    let pB = partnerB;
    
    if (target === 'partnerA') {
      setPartnerA(prev => {
        const u = { ...prev, passport };
        pA = u;
        triggerAutomaticClashDetection(u, pB);
        return u;
      });
    } else {
      setPartnerB(prev => {
        const u = { ...prev, passport };
        pB = u;
        triggerAutomaticClashDetection(pA, u);
        return u;
      });
    }
    setQuizTarget('none');
    setSuccessMsg(`Relational passport successfully calibrated for ${target === 'partnerA' ? partnerAName : partnerBName}!`);
  };

  const triggerAutomaticClashDetection = (pA: PartnerProfile, pB: PartnerProfile) => {
    if (onboardingMode === 'single') {
      const passA = pA.passport;
      if (!passA) return;
      
      let topic = `Solo Calibration: ${passA.archetype}`;
      let desc = `Individual assessment container for parsing core triggers and shadow elements. Style: ${passA.attachmentStyle}.`;
      let viewA = `I tend to express myself as ${passA.archetype} under stress. My primary defensive shield is "${passA.primaryShield}". I seek to develop self-responsibility and internalize my growth antidote: ${passA.growthAntidote}.`;
      let viewB = "Explore individual behavior patterns. Partner B left unspecified for solitary diagnostic counseling.";
      
      setConflictContext({
        topic,
        description: desc,
        partnerA_view: viewA,
        partnerB_view: viewB,
        revMode: 'single'
      });
      return;
    }

    const passA = pA.passport;
    const passB = pB.passport;
    
    if (passA && passB) {
      let topic = "Overlapping Alignment Matrix";
      let desc = "Automatically configured sandbox based on overlapping Relational Passports.";
      let viewA = `As a ${passA.archetype} (${passA.attachmentStyle}), I tend to request attunement but sometimes hide behind: ${passA.primaryShield}.`;
      let viewB = `As a ${passB.archetype} (${passB.attachmentStyle}), I seek safety but under pressure I exhibit protective defense: ${passB.primaryShield}.`;

      // Check verbal pacing
      if (Math.abs(passA.verbalPacing - passB.verbalPacing) >= 4) {
        topic = "Pacing Discrepancy & Withdrawal Escape Loop";
        desc = `Verified mismatch in core Pacing metrics. ${passA.verbalPacing >= 6 ? pA.name : pB.name} seeks instant verbal reassurance and active alignment, triggering the spatial retreat and nervous system overload of ${passA.verbalPacing < 6 ? pA.name : pB.name}.`;
      }
      // Check finances
      else if (Math.abs(passA.assetPacing - passB.assetPacing) >= 4) {
        topic = "Asset Coordination & Spreadsheet Control Clash";
        desc = `Mismatch in Financial Pacing detected. ${passA.assetPacing >= 6 ? pA.name : pB.name} requires structured budget matrices for peace of mind, whereas ${passA.assetPacing < 6 ? pA.name : pB.name} interprets strict financial checklists as administrative containment.`;
      }
      // Check chores
      else if (Math.abs(passA.domesticPacing - passB.domesticPacing) >= 4) {
        topic = "Rigid Chore Contracts vs. Organic Coordination";
        desc = `Mismatch in domestic order. ${passA.domesticPacing >= 6 ? pA.name : pB.name} seeks strict division charts of labor, while ${passA.domesticPacing < 6 ? pA.name : pB.name} prefers fluid coordination without quantitative measurement.`;
      }

      setConflictContext({
        topic,
        description: desc,
        partnerA_view: viewA,
        partnerB_view: viewB,
        revMode: onboardingMode
      });
      
      setSuccessMsg(`✨ AI Clash Model Detected! We matched your passports and auto-populated the conflict fields below to reflect your exact joint dynamic.`);
    }
  };

  const [transcriptText, setTranscriptText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'voice'>('text');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const timerRef = React.useRef<any>(null);

  const startRecording = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setAudioBlob(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Unable to access microphone. Please check permissions or upload an audio file instead.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    setSuccessMsg('');
    const file = e.target.files?.[0];
    if (file) {
      const isAudio = file.type.startsWith('audio/') || /\.(mp3|wav|m4a|ogg|webm|flac|aac)$/i.test(file.name);
      
      if (isAudio) {
        if (file.size > 15 * 1024 * 1024) {
          setErrorMsg("Audio file size exceeds the 15MB limit. Please choose a shorter recording.");
          return;
        }
        setAudioBlob(file);
      } else {
        // Text file
        if (file.size > 5 * 1024 * 1024) {
          setErrorMsg("Text file size exceeds the 5MB limit.");
          return;
        }
        setTranscribing(true);
        try {
          const reader = new FileReader();
          reader.onload = (event) => {
            const text = event.target?.result as string;
            if (text) {
              setTranscriptText(prev => prev ? prev + "\n" + text : text);
              setSuccessMsg("Text file successfully imported! Joined with active log.");
            }
            setTranscribing(false);
          };
          reader.onerror = () => {
            setErrorMsg("Failed to read text file.");
            setTranscribing(false);
          };
          reader.readAsText(file);
        } catch (err: any) {
          setErrorMsg("Error parsing text file: " + err.message);
          setTranscribing(false);
        }
      }
    }
  };

  const handleTranscribeAudio = async () => {
    if (!audioBlob) {
      setErrorMsg("Please record a message or upload an audio file first.");
      return;
    }
    setTranscribing(true);
    setErrorMsg('');
    try {
      const base64 = await convertBlobToBase64(audioBlob);
      const res = await fetch('/api/transcribe-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioData: base64,
          mimeType: audioBlob.type || 'audio/webm',
          isRecording: true
        })
      });

      if (!res.ok) {
        throw new Error("Server failed to transcribe audio properly.");
      }

      const data = await res.json();
      setTranscriptText(prev => prev ? prev + "\n" + data.text : data.text);
      setSuccessMsg("Voice note successfully digitized! Added to log below.");
      setAudioBlob(null);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Transcription encountered an error: " + err.message);
    } finally {
      setTranscribing(false);
    }
  };

  const handleProcessTranscript = async () => {
    if (!transcriptText || !transcriptText.trim()) {
      setErrorMsg("Please paste or transcribe a conversation first.");
      return;
    }
    setIsAnalyzing(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/process-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: transcriptText,
          partnerAName,
          partnerBName
        })
      });

      if (!res.ok) {
        throw new Error("AI engine failed to coordinate the parameters of this dialogue");
      }

      const data = await res.json();
      setConflictContext({
        topic: data.topic || "Custom Synthesized Conflict",
        description: data.description || "Synthesized alignment clash.",
        partnerA_view: data.partnerA_view || "",
        partnerB_view: data.partnerB_view || "",
        worksheetData: undefined
      });

      setSuccessMsg("Distilled the active dispute details! Review and adjust if needed below.");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to decode parameters: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Preset Conflict Scenarios for ease of use
  const PRESET_SCENARIOS = [
    {
      topic: "Unidentified Undercurrent",
      label: "❓ General: Unidentified Clash",
      description: "A continuous coldness and irritability is felt daily, but neither can locate the single triggering event.",
      partnerA_view: "Every conversation feels loaded. I feel like I walk on eggshells, constantly monitored and destined to disappoint.",
      partnerB_view: "I feel lonely even when we occupy the same room. I have withdrawn because attempts to engage turn into critique.",
      budgetA: [],
      budgetB: []
    },
    {
      topic: "Dialogue pacing & emotional availability",
      label: "⏳ Pacing & Withdrawal loop",
      description: "A persistent loop of prompt confrontation vs. retreat during active disagreements.",
      partnerA_view: "Anxious during silent gaps, interpreting Taylor's need for space as emotional abandonment.",
      partnerB_view: "Suffocated by immediate audits, interpreting Alex's push for resolution as a threat to personal safety.",
      budgetA: [],
      budgetB: []
    },
    {
      topic: "Financial Alignment",
      label: "💸 Financial Blueprint clash",
      description: "One seeks immediate buffers and strict controls; the other seeks spontaneous trust and lifestyle freedom.",
      partnerA_view: "Feel constant anxiety about future emergencies, sensing any unplanned expense as a threat to our core safety.",
      partnerB_view: "Feel suffocated by rigid spreadsheets, perceiving budget oversight as a lack of basic trust and restriction of freedom.",
      budgetA: [
        { label: "Emergency Savings", amount: 1200 },
        { label: "Fixed Rent/Mortgage", amount: 1800 },
        { label: "Groceries & Comfort", amount: 400 },
        { label: "Spontaneous/Fun", amount: 100 }
      ],
      budgetB: [
        { label: "Emergency Savings", amount: 300 },
        { label: "Fixed Rent/Mortgage", amount: 1800 },
        { label: "Groceries & Comfort", amount: 600 },
        { label: "Spontaneous/Fun", amount: 800 }
      ]
    },
    {
      topic: "Domestic Labor & Chore Pacing",
      label: "🧹 Chore Pacing & Order",
      description: "Friction around standards of clean space and timeline coordination.",
      partnerA_view: "Tidiness equals mental peace. When dishes sit in the sink overnight, it feels like lack of respect for our shared home.",
      partnerB_view: "Order is fine, but direct demands feel clinical. I want to clean on a flexible cadence when I have battery, not on an enforced schedule.",
      budgetA: [],
      budgetB: []
    },
    {
      topic: "Career Crossroads & Relocation",
      label: "💼 Major Career Crossroads",
      description: "An opportunity arose to relocate for one partner's career, clashing with the other's stability.",
      partnerA_view: "This promotion is a once-in-a-lifetime career growth accelerator. If we don't take this risk, I fear feeling resentment.",
      partnerB_view: "Our current city holds my social support system and families. Relocating feels like erasing my social agency for another's gain.",
      budgetA: [],
      budgetB: []
    }
  ];

  const selectPreset = (p: typeof PRESET_SCENARIOS[number]) => {
    setConflictContext({
      topic: p.topic,
      description: p.description,
      partnerA_view: p.partnerA_view,
      partnerB_view: p.partnerB_view,
      worksheetData: p.budgetA.length > 0 ? {
        partnerA_budget: p.budgetA,
        partnerB_budget: p.budgetB,
      } : undefined
    });
  };

  return (
    <div id="intro-panel" className="max-w-4xl mx-auto py-10 px-4 scroll-smooth">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0EEE6] border border-[#E5E2D9] rounded-full text-xs text-[#6B6B5E] font-mono mb-4">
          <Heart className="w-3.5 h-3.5 text-[#D18B6B] fill-[#D18B6B]" />
          RELATIONAL CLARITY ENGINE
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#33332D] mb-4">
          The Misunderstanding Is the Enemy
        </h1>
        <p className="text-base text-[#6B6B5E] max-w-2xl mx-auto italic">
          A natural dialogue workspace. Step out of circular reactive combat. Privately express your context, analyze core contradictions, and let synthesized prompts guide you back to self-responsibility.
        </p>
      </div>

      {/* Philosophy Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-[#E5E2D9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#E5E2D9] flex items-center justify-center text-[#D18B6B] mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-[#33332D] mb-1">
              Identify the True Enemy
            </h3>
            <p className="text-xs text-[#6B6B5E] leading-relaxed">
              In relationship clashes, we often mistake the partner for the enemy. The true opponent is the circular loop of <b>defensive stories</b> and unrecognized mismatches in core human values.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-mono text-[#A8A89A] mt-4 block">CORE LAW #1</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E2D9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F0EEE6] border border-[#E5E2D9] flex items-center justify-center text-[#8DA58D] mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-[#33332D] mb-1">
              Sequestered Reflection
            </h3>
            <p className="text-xs text-[#6B6B5E] leading-relaxed">
              We provide isolated spaces for both partners. Vent, write, and dialogue with a compassionate guide privately. Your raw texts never leak to your partner, maintaining full vulnerability safety.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-mono text-[#A8A89A] mt-4 block">CORE LAW #2</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E2D9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#EBE8E1] border border-[#E5E2D9] flex items-center justify-center text-[#5A5A40] mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-[#33332D] mb-1">
              Subtle AI Synthesis
            </h3>
            <p className="text-xs text-[#6B6B5E] leading-relaxed">
              Our shared Synthesizer reads behind-the-scenes data to chart value gaps and spot blind spots. It designs custom prompts, injecting them into your private companion chats without pointing fingers.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-mono text-[#A8A89A] mt-4 block">CORE LAW #3</span>
        </div>
      </div>

      {/* Setup Form */}
      <div className="bg-white rounded-3xl border border-[#E5E2D9] shadow-xs overflow-hidden mb-12">
        <div className="bg-[#F5F2ED] border-b border-[#E5E2D9] px-6 py-4 flex items-center gap-3">
          <Users2 className="w-5 h-5 text-[#8C8C7F]" />
          <h2 className="text-sm font-serif italic text-[#33332D]">
            Define Workspace Parameters
          </h2>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-left">
          {/* Exploration Mode selector */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold text-[#8C8C7F] uppercase tracking-wider">
              1. Choose your Relational Exploration Vector:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                id="mode-existing-btn"
                onClick={() => {
                  setOnboardingMode('existing');
                  setPartnerAName('Alex');
                  setPartnerBName('Taylor');
                }}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between h-36 ${
                  onboardingMode === 'existing' 
                    ? 'border-[#5A5A40] bg-[#FAF9F6] ring-1 ring-[#5A5A40]' 
                    : 'border-[#E5E2D9] bg-white hover:bg-neutral-50'
                }`}
              >
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#33332D] flex items-center gap-1.5">
                    👫 Join Session (Couple Sandbox)
                  </h4>
                  <p className="text-[10px] text-[#6B6B5E] leading-relaxed mt-1">
                    Both partners exploring together. Enter names and an active dispute topic or transcribe voice logs to map security and pacing clashes immediately.
                  </p>
                </div>
                <span className="text-[8px] font-mono text-[#8C8C7F]">ALEX & TAYLOR PRESET</span>
              </button>

              <button
                type="button"
                id="mode-single-btn"
                onClick={() => {
                  setOnboardingMode('single');
                  setPartnerAName('Alex');
                  setPartnerBName('');
                  setConflictContext({
                    topic: 'Solo Behavioral Reflection',
                    description: 'A dedicated individual container for parsing unexpressed core triggers, past withdrawal patterns, and discovering self-soothing paces.',
                    partnerA_view: 'I notice certain conversational silences trigger immediate anxiety and pushes for verbal checking.',
                    partnerB_view: 'No partner specified for this self-exploration run.',
                    worksheetData: undefined,
                    revMode: 'single'
                  });
                }}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between h-36 ${
                  onboardingMode === 'single' 
                    ? 'border-[#5A5A40] bg-[#FAF9F6] ring-1 ring-[#5A5A40]' 
                    : 'border-[#E5E2D9] bg-white hover:bg-neutral-50'
                }`}
              >
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#33332D] flex items-center gap-1.5">
                    🧘 Self-Counsel (Single Partner)
                  </h4>
                  <p className="text-[10px] text-[#6B6B5E] leading-relaxed mt-1">
                    Frustrated inside my relationship & seeking answers. Log past triggers, shadow elements, projection cards, and discover self-soothing patterns safely.
                  </p>
                </div>
                <span className="text-[8px] font-mono text-[#8C8C7F]">SOLITARY PROFILE CONTAINER</span>
              </button>

              <button
                type="button"
                id="mode-fresh-c-btn"
                onClick={() => {
                  setOnboardingMode('fresh-c');
                  setPartnerAName('Chris (Partner C)');
                  setPartnerBName('Taylor (Partner B)');
                  setConflictContext({
                    topic: 'Fresh Compatibility Mapping Quest',
                    description: 'Interactive compatibility matrix checking how priorities align with Taylor entering a fresh connection with Chris.',
                    partnerA_view: 'I want to build an open, honest relational map right away.',
                    partnerB_view: 'Life is short. Sooner we can get to the bottom of what drives our paced defense loops, the better!',
                    worksheetData: undefined
                  });
                }}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between h-36 ${
                  onboardingMode === 'fresh-c' 
                    ? 'border-[#5A5A40] bg-[#FAF9F6] ring-1 ring-[#5A5A40]' 
                    : 'border-[#E5E2D9] bg-white hover:bg-neutral-50'
                }`}
              >
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#33332D] flex items-center gap-1.5">
                    🌱 Start Fresh with Partner C
                  </h4>
                  <p className="text-[10px] text-[#6B6B5E] leading-relaxed mt-1">
                    Taylor enters a relationship with Partner C. Let us complete a fun, honest, and highly insightful 5-Question Compatibility Quest first!
                  </p>
                </div>
                <span className="text-[8px] font-mono text-[#D18B6B] font-bold">COMPATIBILITY QUEST</span>
              </button>
            </div>
          </div>

          {/* Partner Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E5E2D9]/40">
            <div>
              <label htmlFor="partnerA-input" className="block text-xs font-mono font-medium text-[#8C8C7F] uppercase tracking-wider mb-2">
                {onboardingMode === 'single' ? "Your Name (e.g., Alex / Bruno)" : "Partner A Name (e.g., Alex)"}
              </label>
              <input
                id="partnerA-input"
                type="text"
                className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-4 py-2.5 text-sm text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D] transition"
                value={partnerAName}
                onChange={(e) => setPartnerAName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="partnerB-input" className="block text-xs font-mono font-medium text-[#8C8C7F] uppercase tracking-wider mb-2">
                {onboardingMode === 'single' 
                  ? "Opposing Partner Name (Optional - leave blank for solo reflection)" 
                  : "Partner B Name (e.g., Taylor)"}
              </label>
              <input
                id="partnerB-input"
                type="text"
                className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-4 py-2.5 text-sm text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D] transition"
                value={partnerBName}
                onChange={(e) => setPartnerBName(e.target.value)}
                placeholder={onboardingMode === 'single' ? "Leave blank to explore solo..." : "Taylor"}
              />
            </div>
          </div>

          {/* 2. Passport Calibration Hub (Card-Stack Assessment) */}
          <div id="ai-clash-detector-hub" className="pt-5 border-t border-[#E5E2D9] space-y-4">
            <div className="bg-[#F0EEE6]/60 border border-[#E5E2D9] rounded-2xl p-4 flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-serif font-bold text-sm">
                ✨
              </span>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#5A5A40]/10 text-[#4A4A35] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Automated AI Clash Management Detector
                </span>
                <h3 className="text-xs font-serif font-bold text-[#333320] text-left">
                  Calibrate Relational Passports to Map Clashes Automatically
                </h3>
                <p className="text-[11px] text-[#6B6B5E] !mt-1 leading-relaxed">
                  Instead of guessing a preset boundary dispute, complete your micro-scenarios to generate your secure <b>Relational Passport</b>. The AI detector automatically overlays your attachment signatures, pacing meters, and triggers to instantly predict relational clashes and pre-fill the sandbox parameters below.
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold text-[#8C8C7F] uppercase tracking-wider">
                2. Calibrate Relational Passports:
              </label>
              <p className="text-[11px] text-[#6B6B5E]">
                Take our quick-fire card assessment stack to identify somatic settings under high relational gravity.
              </p>
            </div>

            {quizTarget === 'none' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Partner A Passport status */}
                <div className="bg-[#FAF9F6] border border-[#E5E2D9] p-5 rounded-2xl flex flex-col justify-between space-y-4 text-left">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#8DA58D]/20 text-[#4E624E] text-[10px] font-mono uppercase tracking-wider">
                      {partnerAName}’s Passport
                    </span>
                    {partnerA.passport ? (
                      <div className="space-y-1.5 pt-1">
                        <p className="text-sm font-serif font-bold text-[#33332D]">
                          🏆 {partnerA.passport.archetype}
                        </p>
                        <p className="text-xs text-[#6B6B5E] font-medium leading-relaxed">
                          Attachment style is <b className="text-[#D18B6B]">{partnerA.passport.attachmentStyle}</b>. Defends behind <i>"{partnerA.passport.primaryShield.split(' ')[2] || 'defense'}"</i>.
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-[#8C8C7F] italic leading-relaxed pt-1">
                        No passport loaded yet. Complete the card stack to identify triggers and somatic settings.
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setQuizTarget('partnerA')}
                    className="w-full py-2 bg-[#EBE8E1] hover:bg-[#DEDACF] text-[#4A4A40] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    {partnerA.passport ? "Recalibrate Passport" : "🚀 Calibrate My Passport"}
                  </button>
                </div>

                {/* Partner B Passport status (rendered if not solo, or optional) */}
                {onboardingMode !== 'single' ? (
                  <div className="bg-[#FAF9F6] border border-[#E5E2D9] p-5 rounded-2xl flex flex-col justify-between space-y-4 text-left">
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#D18B6B]/15 text-[#C07B5C] text-[10px] font-mono uppercase tracking-wider">
                        {partnerBName || "Partner B"}’s Passport
                      </span>
                      {partnerB.passport ? (
                        <div className="space-y-1.5 pt-1">
                          <p className="text-sm font-serif font-bold text-[#33332D]">
                            🏆 {partnerB.passport.archetype}
                          </p>
                          <p className="text-xs text-[#6B6B5E] font-medium leading-relaxed">
                            Attachment style is <b className="text-[#D18B6B]">{partnerB.passport.attachmentStyle}</b>. Defends behind <i>"{partnerB.passport.primaryShield.split(' ')[2] || 'defense'}"</i>.
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-[#8C8C7F] italic leading-relaxed pt-1">
                          Optional passport. Complete to enable joint clash overlay alignment detection.
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={!partnerBName.trim()}
                      onClick={() => setQuizTarget('partnerB')}
                      className="w-full py-2 bg-[#EBE8E1] hover:bg-[#DEDACF] text-[#4A4A40] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      {partnerB.passport ? "Recalibrate Passport" : `🚀 Calibrate ${partnerBName || "Partner B"}'s Passport`}
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#F5F5F0] border border-dashed border-[#E5E2D9] p-5 rounded-2xl flex items-center justify-center text-center">
                    <p className="text-xs text-[#8C8C7F] italic max-w-[220px] leading-relaxed">
                      🧘 <b>Solo self-counsel</b> chosen. No opposing partner card needed for solo validation.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-fade-in">
                <PassportQuizStack 
                  userName={quizTarget === 'partnerA' ? partnerAName : partnerBName}
                  onConfirm={(pass) => handlePassportComplete(quizTarget, pass)}
                  onCancel={() => setQuizTarget('none')}
                />
              </div>
            )}
          </div>

          {/* Quick Scenario Scroller */}
          <div className="pt-4 border-t border-[#E5E2D9]/40">
            <span className="block text-xs font-mono font-medium text-[#8C8C7F] uppercase tracking-wider mb-2">
              {partnerA.passport && (onboardingMode === 'single' || partnerB.passport) ? (
                "✨ AI Calibrated Preset Active (Or manually override with standard presets below):"
              ) : (
                "Or, manually pre-configure with standard Clash Presets:"
              )}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {PRESET_SCENARIOS.map((p, idx) => {
                const isActive = conflictContext.topic === p.topic;
                return (
                  <button
                    id={`preset-btn-${idx}`}
                    key={idx}
                    type="button"
                    onClick={() => selectPreset(p)}
                    className={`text-left p-2.5 rounded-xl border text-[11px] transition relative overflow-hidden flex flex-col justify-between h-20 ${
                      isActive
                        ? "bg-[#5A5A40] border-[#5A5A40] text-white cursor-pointer"
                        : "bg-[#FAF9F6] hover:bg-[#F5F2ED] border-[#E5E2D9] text-[#4A4A40] cursor-pointer"
                    }`}
                  >
                    <div className="font-semibold line-clamp-1 mb-1">{p.label}</div>
                    <div className={`line-clamp-2 leading-snug ${isActive ? "text-[#EBE8E1]" : "text-[#8C8C7F]"}`}>
                      {p.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context Extractor - Paste Chat Log or Record Voice Note */}
          <div className="bg-[#FAF9F6] border border-[#E5E2D9] rounded-2xl p-5 space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E2D9]/60 pb-3">
              <div>
                <h4 className="text-sm font-serif font-semibold text-[#33332D] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D18B6B]" />
                  Relational Context Extractor
                </h4>
                <p className="text-[11px] text-[#6B6B5E] mt-0.5">
                  Have a written chat transcript or recorded vocal discussion? Import it here to automatically extract the dispute topics and views.
                </p>
              </div>
              <div className="flex bg-[#EBE8E1] rounded-lg p-0.5 text-xs text-[#5A5A40] shrink-0 self-start sm:self-auto">
                <button
                  id="tab-text"
                  type="button"
                  onClick={() => {
                    setActiveTab('text');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`px-3 py-1 rounded-md transition font-medium cursor-pointer ${activeTab === 'text' ? 'bg-[#5A5A40] text-white shadow-xs' : 'hover:text-[#33332D]'}`}
                >
                  Chat Log transcript
                </button>
                <button
                  id="tab-voice"
                  type="button"
                  onClick={() => {
                    setActiveTab('voice');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`px-3 py-1 rounded-md transition font-medium cursor-pointer ${activeTab === 'voice' ? 'bg-[#5A5A40] text-white shadow-xs' : 'hover:text-[#33332D]'}`}
                >
                  Record/Upload Audio
                </button>
              </div>
            </div>

            {/* Error / Success Alerts */}
            {errorMsg && (
              <div className="bg-[#FAF2F2] border border-[#E0C8C8] text-[#9E3F3F] text-xs p-3 rounded-xl flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="bg-[#F2FAF2] border border-[#C8E0C8] text-[#3F9E3F] text-xs p-3 rounded-xl flex items-start gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {activeTab === 'text' ? (
              <div className="space-y-2">
                <label htmlFor="transcript-textarea" className="block text-xs font-mono font-medium text-[#8C8C7F]">
                  Paste conversation transcript or copy-pasted messages (e.g. WhatsApp, iMessage, Messenger logs)
                </label>
                <textarea
                  id="transcript-textarea"
                  rows={4}
                  className="w-full bg-white border border-[#E5E2D9] rounded-xl p-3 text-xs text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D] transition placeholder:text-[#BBB]"
                  value={transcriptText}
                  onChange={(e) => setTranscriptText(e.target.value)}
                  placeholder={`Alex: Why do you shut off whenever we hit a bump?\nTaylor: I need structured time to gather my thoughts before we argue, Alex. Otherwise I feel cornered.\nAlex: I feel so alone waiting for reassurance...`}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Recorder panel */}
                  <div className="bg-white border border-[#E5E2D9] rounded-xl p-4 flex flex-col items-center justify-center space-y-3 text-center">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8C8C7F]">Voice Recorder</span>
                    
                    {isRecording ? (
                      <div className="flex items-center gap-3 bg-[#FAF2F2] border border-[#E0C8C8] px-4 py-2 rounded-full animate-pulse">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                        <span className="text-xs font-mono font-semibold text-red-600">Recording {formatDuration(recordingDuration)}</span>
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#6B6B5E] max-w-[200px]">
                        Speak directly into your phone or laptop microphone about your standoff.
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      {!isRecording ? (
                        <button
                          id="start-rec-btn"
                          type="button"
                          onClick={startRecording}
                          className="bg-[#D18B6B] hover:bg-[#C07B5C] text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                        >
                          <Mic className="w-3.5 h-3.5" /> Record vocal notes
                        </button>
                      ) : (
                        <button
                          id="stop-rec-btn"
                          type="button"
                          onClick={stopRecording}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 transition cursor-pointer shadow-xs animate-pulse"
                        >
                          <Square className="w-3.5 h-3.5" /> Stop & Capture
                        </button>
                      )}
                    </div>
                  </div>

                  {/* File Uploader */}
                  <div className="bg-white border border-[#E5E2D9] rounded-xl p-4 flex flex-col items-center justify-center space-y-3 text-center">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8C8C7F]">File Importer</span>
                    <p className="text-[11px] text-[#6B6B5E] max-w-[200px]">
                      Upload pre-recorded audio (.mp3, .wav, .m4a) or conversational logs (.txt, .md, .json) from cellular devices.
                    </p>
                    
                    <label className="bg-[#FAF9F6] border border-[#E5E2D9] hover:bg-[#F0EEE6] text-[#4A4A40] text-xs font-medium px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-xs cursor-pointer border-dashed">
                      <Upload className="w-3.5 h-3.5 text-[#8DA58D]" />
                      <span>{audioBlob ? "Replace Sound File" : "Choose text or audio..."}</span>
                      <input
                        id="audio-file-input"
                        type="file"
                        accept="audio/*,text/*,.txt,.md,.json,.csv,.docx"
                        className="hidden"
                        onChange={handleAudioUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Processing controls */}
                {audioBlob && (
                  <div className="bg-white border border-[#E5E2D9] rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs animate-fade-in">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#F0EEE6] flex items-center justify-center text-[#D18B6B] shrink-0">
                        <Mic className="w-4 h-4 text-[#8DA58D]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#4A4A40] truncate">Audio payload ready</p>
                        <p className="text-[10px] text-[#8C8C7F]">Type: {audioBlob.type || 'audio file'} • Size: {(audioBlob.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                      <button
                        id="trash-audio-btn"
                        type="button"
                        onClick={() => setAudioBlob(null)}
                        className="text-red-500 hover:bg-[#FAF2F2] p-1.5 rounded-lg transition"
                        title="Delete recording"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        id="transcribe-btn"
                        type="button"
                        onClick={handleTranscribeAudio}
                        disabled={transcribing}
                        className="bg-[#5A5A40] hover:bg-[#4A4A35] text-white text-xs font-medium px-4 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer"
                      >
                        {transcribing ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Transcribing verbal stream...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-[#D18B6B]" />
                            Transcribe Log to Text
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {transcriptText && (
                  <div className="space-y-2 animate-fade-in">
                    <label htmlFor="voice-result-textarea" className="block text-xs font-mono font-medium text-[#8C8C7F]">
                      Digitized Conversation Log
                    </label>
                    <textarea
                      id="voice-result-textarea"
                      rows={3}
                      className="w-full bg-white border border-[#E5E2D9] rounded-xl p-3 text-xs text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D] transition"
                      value={transcriptText}
                      onChange={(e) => setTranscriptText(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end gap-2 border-t border-[#E5E2D9]/60 pt-3">
              <button
                id="process-transcript-btn"
                type="button"
                onClick={handleProcessTranscript}
                disabled={isAnalyzing || !transcriptText.trim()}
                className="bg-[#5A5A40] hover:bg-[#4A4A35] disabled:bg-[#FAF9F6] disabled:border-[#E5E2D9] disabled:text-[#A8A89A] disabled:cursor-not-allowed border border-transparent text-white text-xs font-medium px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    AI Distilling Conciliations...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    Analyze & Auto-populate parameters
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dispute Context Detail Editor */}
          <div className="space-y-4 pt-4 border-t border-[#E5E2D9]">
            <div>
              <label htmlFor="clash-topic-input" className="block text-xs font-mono font-medium text-[#8C8C7F] uppercase tracking-wider mb-2">
                Active Dispute Topic
              </label>
              <input
                id="clash-topic-input"
                type="text"
                className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl px-4 py-2.5 text-sm text-[#33332D] font-medium focus:outline-none focus:ring-1 focus:ring-[#8DA58D] transition"
                value={conflictContext.topic}
                onChange={(e) => setConflictContext({ ...conflictContext, topic: e.target.value })}
                placeholder="Name the boundary topic..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="partnerA-vulnerability" className="block text-xs font-mono font-medium text-[#8C8C7F] uppercase tracking-wider mb-2">
                  {partnerAName}'s Perspective / Concern
                </label>
                <textarea
                  id="partnerA-vulnerability"
                  rows={3}
                  className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl p-3 text-xs text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D] transition resize-none"
                  value={conflictContext.partnerA_view}
                  onChange={(e) => setConflictContext({ ...conflictContext, partnerA_view: e.target.value })}
                  placeholder="What is hurting or failing on this end?"
                />
              </div>
              <div>
                <label htmlFor="partnerB-vulnerability" className="block text-xs font-mono font-medium text-[#8C8C7F] uppercase tracking-wider mb-2">
                  {partnerBName}'s Perspective / Concern
                </label>
                <textarea
                  id="partnerB-vulnerability"
                  rows={3}
                  className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl p-3 text-xs text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D] transition resize-none"
                  value={conflictContext.partnerB_view}
                  onChange={(e) => setConflictContext({ ...conflictContext, partnerB_view: e.target.value })}
                  placeholder="What is hurting or failing on this end?"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-[#FAF9F6] border-t border-[#E5E2D9] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8C8C7F] flex items-center gap-2">
            <Library className="w-4 h-4 text-[#A8A89A]" />
            <span>Full sandbox simulator state. You can swap roles at any time.</span>
          </div>
          <button
            id="start-session-btn"
            onClick={() => onStart(onboardingMode)}
            className="w-full sm:w-auto bg-[#5A5A40] hover:bg-[#4A4A35] text-white font-medium text-sm px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition shadow-sm active:scale-95 cursor-pointer"
          >
            Enter Sandbox Workspace
            <MoveRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
