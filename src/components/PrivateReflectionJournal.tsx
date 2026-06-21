import React, { useState } from 'react';
import { 
  PenTool, 
  Plus, 
  Trash2, 
  History, 
  Mic, 
  Square, 
  Upload, 
  Loader2, 
  Coins 
} from 'lucide-react';
import { PartnerProfile, JournalEntry } from '../types';

interface PrivateReflectionJournalProps {
  profile: PartnerProfile;
  partnerKey: 'partnerA' | 'partnerB';
  isA: boolean;
  newJournal: string;
  setNewJournal: React.Dispatch<React.SetStateAction<string>>;
  journalMode: 'free' | 'guided';
  setJournalMode: React.Dispatch<React.SetStateAction<'free' | 'guided'>>;
  selectedGuidedPrompt: string;
  setSelectedGuidedPrompt: React.Dispatch<React.SetStateAction<string>>;
  GUIDED_JOURNAL_PROMPTS: Array<{ id: string; label: string; placeholder: string; guide: string }>;
  handleAddJournal: (e: React.FormEvent) => void;
  handleDeleteJournal: (id: string) => void;
  audioError: string;
  isRecording: boolean;
  recordingDuration: number;
  transcribing: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  handleJournalFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatDuration: (sec: number) => string;
  conflictTopic: string;
  newBudgetLabel: string;
  setNewBudgetLabel: React.Dispatch<React.SetStateAction<string>>;
  newBudgetAmount: string;
  setNewBudgetAmount: React.Dispatch<React.SetStateAction<string>>;
  addBudgetItem: () => void;
}

export default function PrivateReflectionJournal({
  profile,
  partnerKey,
  isA,
  newJournal,
  setNewJournal,
  journalMode,
  setJournalMode,
  selectedGuidedPrompt,
  setSelectedGuidedPrompt,
  GUIDED_JOURNAL_PROMPTS,
  handleAddJournal,
  handleDeleteJournal,
  audioError,
  isRecording,
  recordingDuration,
  transcribing,
  startRecording,
  stopRecording,
  handleJournalFileUpload,
  formatDuration,
  conflictTopic,
  newBudgetLabel,
  setNewBudgetLabel,
  newBudgetAmount,
  setNewBudgetAmount,
  addBudgetItem
}: PrivateReflectionJournalProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fade-in font-sans">
      
      {/* New Journal Formulation Section */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
        <div>
          <h3 className="text-sm font-mono font-bold text-[#33332D] uppercase tracking-wider">
            Reflective Ventilation Area
          </h3>
          <p className="text-[11px] text-[#8C8C7F] mt-0.5 leading-normal">
            Dump raw thoughts, worries, or behavioral insights. They remain quarantined on your private partition.
          </p>
        </div>

        <div className="flex bg-[#FAF9F6] border border-[#E5E2D9] p-1 rounded-xl">
          <button
            id={`journal-mode-free-${partnerKey}`}
            type="button"
            onClick={() => { setJournalMode('free'); setNewJournal(''); setSelectedGuidedPrompt(''); }}
            className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg transition cursor-pointer text-center ${
              journalMode === 'free'
                ? 'bg-white shadow-2xs text-[#33332D]'
                : 'text-[#8C8C7F] hover:text-[#4A4A40]'
            }`}
          >
            ✎ Free Ventilation
          </button>
          <button
            id={`journal-mode-guided-${partnerKey}`}
            type="button"
            onClick={() => { setJournalMode('guided'); setSelectedGuidedPrompt(''); setNewJournal(''); }}
            className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg transition cursor-pointer text-center ${
              journalMode === 'guided'
                ? 'bg-white shadow-2xs text-[#33332D]'
                : 'text-[#8C8C7F] hover:text-[#4A4A40]'
            }`}
          >
            🧘 Guided Reflection
          </button>
        </div>

        {journalMode === 'guided' && (
          <div className="space-y-2 animate-fade-in text-left">
            <label className="text-[10.5px] font-mono text-[#8C8C7F] uppercase tracking-wider block">
              Choose Guided Inquiry Prompt:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {GUIDED_JOURNAL_PROMPTS.map((prompt) => (
                <button
                  key={prompt.id}
                  id={`guided-prompt-btn-${partnerKey}-${prompt.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedGuidedPrompt(prompt.id);
                    setNewJournal(prompt.placeholder);
                  }}
                  className={`p-2 rounded-xl text-left border text-[10.5px] transition cursor-pointer leading-tight ${
                    selectedGuidedPrompt === prompt.id
                      ? isA 
                        ? 'border-[#8DA58D] bg-[#8DA58D]/5 text-[#546B54]' 
                        : 'border-[#D18B6B] bg-[#D18B6B]/5 text-[#D18B6B]'
                      : 'border-[#E5E2D9] bg-white text-[#6B6B5E] hover:bg-[#FAF9F6]'
                  }`}
                >
                  <span className="font-semibold block text-[11px]">{prompt.label}</span>
                </button>
              ))}
            </div>
            
            {selectedGuidedPrompt && (
              <div className="p-2.5 bg-[#F5F2ED] rounded-xl border border-[#E5E2D9] text-[10px] text-[#5A5A40] italic leading-relaxed">
                💡 <strong>Prompt Guide:</strong> {GUIDED_JOURNAL_PROMPTS.find(p => p.id === selectedGuidedPrompt)?.guide}
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleAddJournal} className="space-y-3">
          <textarea
            id={`${partnerKey}-raw-entry`}
            rows={journalMode === 'guided' ? 8 : 6}
            className="w-full bg-white border border-[#E5E2D9] rounded-xl p-3 text-xs text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D] placeholder:text-[#A8A89A] resize-none transition font-sans shadow-inner"
            placeholder={journalMode === 'guided' ? "Select a guided inquiry prompt above to start..." : `Write down how your triggers, somatic reactions, or conflicts over "${conflictTopic}" align...`}
            value={newJournal}
            onChange={(e) => setNewJournal(e.target.value)}
          />

          {audioError && (
            <div className="text-[10px] text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 flex items-center gap-1 animate-fade-in">
              <span>⚠️ {audioError}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl p-2 shadow-3xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Voice Record Button */}
              {isRecording ? (
                <button
                  id={`stop-journal-rec-${partnerKey}`}
                  type="button"
                  onClick={stopRecording}
                  className="flex items-center gap-1 bg-red-600 text-white text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer animate-pulse"
                >
                  <Square className="w-3 h-3 animate-ping" /> Stop ({formatDuration(recordingDuration)})
                </button>
              ) : (
                <button
                  id={`start-journal-rec-${partnerKey}`}
                  type="button"
                  onClick={startRecording}
                  disabled={transcribing}
                  className="flex items-center gap-1 hover:bg-[#FAF9F6] bg-white text-[#4A4A40] border border-[#E5E2D9] text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 shadow-2xs"
                  title="Dictate with voice"
                >
                  <Mic className={`w-3.5 h-3.5 ${isA ? 'text-[#8DA58D]' : 'text-[#D18B6B]'}`} />
                  <span>Dictate</span>
                </button>
              )}

              {/* File Upload Button */}
              {!isRecording && (
                <label className="flex items-center gap-1 hover:bg-[#FAF9F6] bg-white text-[#4A4A40] border border-[#E5E2D9] text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 shadow-2xs" title="Upload any text file (.txt, .md) or voice recordings">
                  <Upload className="w-3.5 h-3.5 text-[#8C8C7F]" />
                  <span>Import</span>
                  <input
                    id={`journal-file-upload-${partnerKey}`}
                    type="file"
                    accept="audio/*,text/*,.txt,.md"
                    className="hidden"
                    onChange={handleJournalFileUpload}
                    disabled={transcribing}
                  />
                </label>
              )}

              {transcribing && (
                <span className="text-[9px] text-[#8C8C7F] font-mono flex items-center gap-1 ml-1 animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin text-[#8DA58D]" />
                  Decoding stream...
                </span>
              )}
            </div>

            <div className="flex items-center justify-end gap-1.5 shrink-0 self-end sm:self-auto">
              <button
                id={`add-journal-btn-${partnerKey}`}
                type="submit"
                disabled={isRecording || transcribing || !newJournal.trim()}
                className={`text-xs px-3.5 py-1.5 rounded-lg border text-white font-medium shadow-xs transition active:scale-95 disabled:bg-[#FAF9F6] disabled:border-[#E5E2D9] disabled:text-[#A8A89A] disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer ${
                  isA 
                    ? 'bg-[#5A5A40] hover:bg-[#4A4A35] border-[#5A5A40]' 
                    : 'bg-[#D18B6B] hover:bg-[#C17B5B] border-[#D18B6B]'
                }`}
              >
                <Plus className="w-3 h-3" /> Save Entry
              </button>
            </div>
          </div>
        </form>

        {/* Budget allocation simulator widget inside financial scopes */}
        {conflictTopic.toLowerCase().includes("financ") && (
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E2D9] space-y-3 mt-3 shadow-3xs text-left animate-fade-in">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#4A4A40]">
              <Coins className="w-3.5 h-3.5 text-[#8C8C7F]" />
              <span>Financial Allocation Simulator</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                id={`${partnerKey}-budget-lbl`}
                type="text"
                placeholder="e.g. Shared Rent Portion"
                className="bg-white border border-[#E5E2D9] rounded-lg px-2 py-1.5 text-[11px] text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D]"
                value={newBudgetLabel}
                onChange={(e) => setNewBudgetLabel(e.target.value)}
              />
              <input
                id={`${partnerKey}-budget-amt`}
                type="number"
                placeholder="e.g. 1200"
                className="bg-white border border-[#E5E2D9] rounded-lg px-2 py-1.5 text-[11px] text-[#4A4A40] focus:outline-none focus:ring-1 focus:ring-[#8DA58D]"
                value={newBudgetAmount}
                onChange={(e) => setNewBudgetAmount(e.target.value)}
              />
            </div>
            <button
              id={`add-budget-btn-${partnerKey}`}
              type="button"
              onClick={addBudgetItem}
              className="w-full text-center text-[10.5px] py-1.5 bg-[#5A5A40] hover:bg-[#4A4A35] text-white rounded-md font-medium transition cursor-pointer"
            >
              Pin Allocation Amount to Reflection Ledger
            </button>
          </div>
        )}
      </div>

      {/* Historical Logs Ledger */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-mono font-bold text-[#33332D] uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-4 h-4 text-[#A8A89A]" />
            <span>Historic Saved Diaries & Exercises ({profile.journalEntries.length})</span>
          </h3>
        </div>

        {profile.journalEntries.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-[#E5E2D9] text-center italic text-[#8C8C7F] text-xs shadow-3xs">
            No entries saved yet. Dictate, upload or type an entry in the reflective block on the left to start your log.
          </div>
        ) : (
          <div id="journal-history-list" className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {profile.journalEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-white rounded-xl border border-[#E5E2D9] text-[11.5px] text-left relative group hover:border-[#C5C2B9] transition shadow-3xs leading-relaxed">
                <div className="flex justify-between text-[9px] font-mono text-[#A8A89A] mb-1.5">
                  <span>{entry.timestamp}</span>
                  <span className="font-semibold uppercase tracking-wider text-[8px] text-[#8C8C7F] bg-[#FAF9F6] px-1.5 py-0.5 rounded border border-[#E5E2D9]">
                    {entry.sentiment}
                  </span>
                </div>
                <p className="text-[#4A4A40] whitespace-pre-line pr-6 leading-relaxed font-sans">{entry.content}</p>
                
                {entry.keyIssues && entry.keyIssues.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {entry.keyIssues.map((tag, tIdx) => (
                      <span key={tIdx} className="inline-block text-[8px] bg-[#FAF9F6] border border-[#E5E2D9] px-2 py-0.5 rounded-md text-[#6B6B5E] font-mono font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  id={`delete-journal-btn-${partnerKey}-${entry.id}`}
                  onClick={() => handleDeleteJournal(entry.id)}
                  className="absolute top-3.5 right-3.5 text-[#C5C2B9] hover:text-red-600 opacity-0 group-hover:opacity-100 transition cursor-pointer p-1 rounded hover:bg-red-50"
                  title="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
