/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { SynthesisReport, ConflictContext, ScheduledDialogue } from '../types';

// Refactored Sub-Components
import OverviewTab from './synthesis/OverviewTab';
import ValuesTab from './synthesis/ValuesTab';
import ScheduleTab from './synthesis/ScheduleTab';
import ProgressTab from './synthesis/ProgressTab';
import DiscoveryTab from './synthesis/DiscoveryTab';

interface SynthesisHubProps {
  synthesis: SynthesisReport | null;
  conflictContext: ConflictContext;
  partnerAName: string;
  partnerBName: string;
  onRunSynthesis: () => void;
  isSynthesizing: boolean;
  scheduledDialogues: ScheduledDialogue[];
  onAddDialogue: (dialogue: ScheduledDialogue) => void;
  onDeleteDialogue: (id: string) => void;
}

export default function SynthesisHub({
  synthesis,
  conflictContext,
  partnerAName,
  partnerBName,
  onRunSynthesis,
  isSynthesizing,
  scheduledDialogues,
  onAddDialogue,
  onDeleteDialogue,
}: SynthesisHubProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'values' | 'schedule' | 'progress' | 'discovery'>('overview');
  const [discoveryData, setDiscoveryData] = useState<any>(null);
  const [isLoadingDiscovery, setIsLoadingDiscovery] = useState(false);

  useEffect(() => {
    if (activeTab === 'discovery') {
      const fetchDiscovery = async () => {
        setIsLoadingDiscovery(true);
        try {
          const res = await fetch('/api/discovery-insights');
          if (res.ok) {
            const data = await res.json();
            setDiscoveryData(data);
          }
        } catch (err) {
          console.error("Discovery diagnostics fetch failed:", err);
        } finally {
          setIsLoadingDiscovery(false);
        }
      };
      fetchDiscovery();
    }
  }, [activeTab, synthesis]);

  // Tab 5 discovery local UI state variables
  const [discoverySubTab, setDiscoverySubTab] = useState<'profile' | 'registry' | 'stream'>('profile');
  const [registryFilter, setRegistryFilter] = useState<string>('all');
  const [dataStreamConsent, setDataStreamConsent] = useState<boolean>(true);
  const [streamLog, setStreamLog] = useState<string[]>([]);
  
  // Value Matrix Active Local Tuning State
  const [localMatrix, setLocalMatrix] = useState<any[]>([]);

  useEffect(() => {
    if (synthesis?.valueMatrix) {
      setLocalMatrix(synthesis.valueMatrix);
    }
  }, [synthesis]);

  const handleRatingChange = (idx: number, isPartnerA: boolean, val: number) => {
    const updated = [...localMatrix];
    if (isPartnerA) {
      updated[idx] = { ...updated[idx], partnerARating: val };
    } else {
      updated[idx] = { ...updated[idx], partnerBRating: val };
    }
    setLocalMatrix(updated);
  };

  const handleApplySuggestion = (idx: number) => {
    const item = localMatrix[idx];
    const updated = [...localMatrix];
    updated[idx] = {
      ...item,
      partnerARating: item.suggestedPartnerARating ?? item.partnerARating,
      partnerBRating: item.suggestedPartnerBRating ?? item.partnerBRating
    };
    setLocalMatrix(updated);
  };

  const handleApplyAllSuggestions = () => {
    const updated = localMatrix.map(item => ({
      ...item,
      partnerARating: item.suggestedPartnerARating ?? item.partnerARating,
      partnerBRating: item.suggestedPartnerBRating ?? item.partnerBRating
    }));
    setLocalMatrix(updated);
  };
  
  // Schedule Form State
  const [sessionType, setSessionType] = useState('The 30-Minute Safe-Container Walk');
  const [sessionDate, setSessionDate] = useState('2026-06-16');
  const [sessionTime, setSessionTime] = useState('14:00');
  const [customMeetingLink, setCustomMeetingLink] = useState('https://meet.google.com/new');

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format date-time block
    const formattedDateString = sessionDate.replace(/-/g, '');
    const formattedTimeString = sessionTime.replace(/:/g, '') + '00';
    
    // Default 30 min duration
    const endMinutes = parseInt(sessionTime.split(':')[1]) + 30;
    const endHour = parseInt(sessionTime.split(':')[0]) + (endMinutes >= 60 ? 1 : 0);
    const endMinutesFormatted = (endMinutes % 60).toString().padStart(2, '0');
    const endHourFormatted = (endHour % 24).toString().padStart(2, '0');
    
    const datesParameter = `${formattedDateString}T${formattedTimeString}/${formattedDateString}T${endHourFormatted}${endMinutesFormatted}00`;
    
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(sessionType)}&dates=${datesParameter}&details=${encodeURIComponent(`Curated relationship dialogue slot based on synthesized clash recommendations in your Relational Clarity Workspace.\n\nLink to context: ${customMeetingLink}`)}&location=${encodeURIComponent(customMeetingLink)}`;

    const newDialogue: ScheduledDialogue = {
      id: Date.now().toString(),
      title: sessionType,
      startTime: `${sessionDate} @ ${sessionTime}`,
      durationMinutes: 30,
      format: "Facilitated Direct Dialogue",
      description: "Structured agenda focusing on underlying soft desires and value alignment.",
      calendarLink: gcalUrl
    };

    onAddDialogue(newDialogue);
  };

  // Scheduling formats
  const DIALOGUE_FORMATS = [
    {
      title: "The 30-Minute Safe-Container Walk",
      desc: "Side-by-side shoulder movement limits stress, promoting safe soft exploration of emotions."
    },
    {
      title: "Active Listening Swap",
      desc: "Strict timers allowing Partner A to present their perspective without response, followed by Partner B."
    },
    {
      title: "Values Blueprint Session",
      desc: "Sit to compromise on the single most disparate value parameter on the value matrix."
    },
    {
      title: "Financial Priority Realignment",
      desc: "Inspect budget item mismatches side-by-side to translate item costs into safety values."
    }
  ];

  return (
    <div id="synthesis-hub" className="max-w-7xl mx-auto py-6 px-4 fade-in relative z-10">
      
      {/* Upper Hub Bar */}
      <div className="bg-[#5A5A40] text-white rounded-3xl p-6 sm:p-8 border border-[#4A4A33] shadow-md mb-8 relative overflow-hidden">
        
        {/* Natural background ambient visual details */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8DA58D]/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D18B6B]/20 blur-3xl rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-[10px] font-mono tracking-wider text-[#FAF9F6]">
              <Sparkles className="w-3.5 h-3.5 text-[#FAF9F6]" />
              INTEGRATED RELATIONSHIP COMPILER
            </div>
            <h1 className="text-3xl font-serif tracking-tight text-white">
              Relational Synthesis Center
            </h1>
            <p className="text-xs text-[#FAF9F6]/80 leading-relaxed italic">
              When both parties have logged self-descriptions and values, click below. The Synthesizer compiles individual inputs, maps core divergence matrixes, and formats structured dialogue sessions.
            </p>
          </div>

          <div className="flex flex-col gap-2 min-w-[200px]">
            <button
              id="synthesize-btn"
              onClick={onRunSynthesis}
              disabled={isSynthesizing}
              className="w-full bg-[#FAF9F6] hover:bg-[#F5F2ED] font-medium text-[#33332D] rounded-xl py-3 px-4 text-xs transition duration-200 cursor-pointer shadow-xs text-center flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSynthesizing ? "Compiling Logs..." : "Compile & Map Relationship"}
            </button>
            <span className="text-[9.5px] text-[#FAF9F6]/60 text-center font-mono block">
              Uses server-side context integration
            </span>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-[#E5E2D9] mb-8 gap-1 font-sans">
        <button
          id="tab-overview-btn"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-mono font-medium transition cursor-pointer border-b-2 -mb-[2px] ${
            activeTab === 'overview' 
              ? 'border-[#5A5A40] text-[#33332D] font-bold' 
              : 'border-transparent text-[#8C8C7F] hover:text-[#4A4A40]'
          }`}
        >
          Overview & Themes
        </button>
        <button
          id="tab-values-btn"
          onClick={() => setActiveTab('values')}
          className={`px-4 py-2.5 text-xs font-mono font-medium transition cursor-pointer border-b-2 -mb-[2px] ${
            activeTab === 'values' 
              ? 'border-[#5A5A40] text-[#33332D] font-bold' 
              : 'border-transparent text-[#8C8C7F] hover:text-[#4A4A40]'
          }`}
        >
          Value Matrix Chart
        </button>
        <button
          id="tab-schedule-btn"
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2.5 text-xs font-mono font-medium transition cursor-pointer border-b-2 -mb-[2px] ${
            activeTab === 'schedule' 
              ? 'border-[#5A5A40] text-[#33332D] font-bold' 
              : 'border-transparent text-[#8C8C7F] hover:text-[#4A4A40]'
          }`}
        >
          Coordinated Dialogue Scheduler
        </button>
        <button
          id="tab-progress-btn"
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2.5 text-xs font-mono font-medium transition cursor-pointer border-b-2 -mb-[2px] ${
            activeTab === 'progress' 
              ? 'border-[#5A5A40] text-[#33332D] font-bold' 
              : 'border-transparent text-[#8C8C7F] hover:text-[#4A4A40]'
          }`}
        >
          Progress & Sentiment Trends
        </button>
        <button
          id="tab-discovery-btn"
          onClick={() => setActiveTab('discovery')}
          className={`px-4 py-2.5 text-xs font-mono font-medium transition cursor-pointer border-b-2 -mb-[2px] ${
            activeTab === 'discovery' 
              ? 'border-[#5A5A40] text-[#33332D] font-bold' 
              : 'border-transparent text-[#8C8C7F] hover:text-[#4A4A40]'
          }`}
        >
          Relational Discovery Hub
        </button>
      </div>

      {/* Empty State warning */}
      {!synthesis && (
        <div id="empty-synthesis" className="p-12 text-center bg-white rounded-3xl border border-[#E5E2D9] shadow-xs max-w-xl mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-[#C5C2B9] mx-auto animate-pulse" />
          <div>
            <h3 className="text-sm font-serif text-[#33332D]">No active relationship compile exists</h3>
            <p className="text-xs text-[#6B6B5E] leading-relaxed max-w-md mx-auto mt-1 italic">
              Please visit Partner A's room and Partner B's room to save a few unedited raw journal log entries or change values, then click "Compile & Map Relationship" to construct insights.
            </p>
          </div>
          <button
            id="initial-compile-btn"
            onClick={onRunSynthesis}
            className="px-5 py-2.5 bg-[#5A5A40] text-white rounded-xl text-xs font-medium hover:bg-[#4A4A35] transition active:scale-95 cursor-pointer"
          >
            Run Initial Compilation
          </button>
        </div>
      )}

      {synthesis && (
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <OverviewTab synthesis={synthesis} />
          )}

          {activeTab === 'values' && (
            <ValuesTab 
              synthesis={synthesis}
              conflictContext={conflictContext}
              partnerAName={partnerAName}
              partnerBName={partnerBName}
              localMatrix={localMatrix}
              setLocalMatrix={setLocalMatrix}
              handleRatingChange={handleRatingChange}
              handleApplySuggestion={handleApplySuggestion}
              handleApplyAllSuggestions={handleApplyAllSuggestions}
            />
          )}

          {activeTab === 'schedule' && (
            <ScheduleTab
              synthesis={synthesis}
              scheduledDialogues={scheduledDialogues}
              onAddDialogue={onAddDialogue}
              onDeleteDialogue={onDeleteDialogue}
              sessionType={sessionType}
              setSessionType={setSessionType}
              sessionDate={sessionDate}
              setSessionDate={setSessionDate}
              sessionTime={sessionTime}
              setSessionTime={setSessionTime}
              customMeetingLink={customMeetingLink}
              setCustomMeetingLink={setCustomMeetingLink}
              handleCreateSchedule={handleCreateSchedule}
              DIALOGUE_FORMATS={DIALOGUE_FORMATS}
              partnerAName={partnerAName}
              partnerBName={partnerBName}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressTab 
              synthesis={synthesis}
              partnerAName={partnerAName}
              partnerBName={partnerBName}
            />
          )}

          {activeTab === 'discovery' && (
            <DiscoveryTab 
              synthesis={synthesis}
              partnerAName={partnerAName}
              partnerBName={partnerBName}
              discoveryData={discoveryData}
              isLoadingDiscovery={isLoadingDiscovery}
              discoverySubTab={discoverySubTab}
              setDiscoverySubTab={setDiscoverySubTab}
              registryFilter={registryFilter}
              setRegistryFilter={setRegistryFilter}
              dataStreamConsent={dataStreamConsent}
              setDataStreamConsent={setDataStreamConsent}
              streamLog={streamLog}
              setStreamLog={setStreamLog}
            />
          )}
        </div>
      )}

    </div>
  );
}
