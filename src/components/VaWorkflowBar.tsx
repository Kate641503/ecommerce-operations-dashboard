import React from 'react';
import { WORKFLOW_STEPS } from './VaWorkflowModal';
import { NavSection } from '../types';
import { ChevronRight, Sparkles } from 'lucide-react';

interface VaWorkflowBarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onOpenDetailedModal: () => void;
}

export const VaWorkflowBar: React.FC<VaWorkflowBarProps> = ({
  currentSection,
  onNavigate,
  onOpenDetailedModal
}) => {
  return (
    <div id="va-workflow-bar" className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-thin">
        {/* Title / Label */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2 py-0.5 rounded">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            VA Workflow Pipeline
          </span>
        </div>

        {/* Stepper items */}
        <div className="flex items-center gap-1 min-w-max">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = currentSection === step.targetSection;
            const Icon = step.icon;
            return (
              <React.Fragment key={step.step}>
                <button
                  id={`workflow-step-${step.step}`}
                  onClick={() => onNavigate(step.targetSection)}
                  title={`${step.step}. ${step.title}: ${step.description}`}
                  className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      isActive ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                    }`}
                  >
                    {step.step}
                  </span>
                  <span className="whitespace-nowrap">{step.title}</span>
                </button>

                {idx < WORKFLOW_STEPS.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Info button */}
        <button
          onClick={onOpenDetailedModal}
          className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 hover:underline flex-shrink-0 whitespace-nowrap"
        >
          View Scope Details →
        </button>
      </div>
    </div>
  );
};
