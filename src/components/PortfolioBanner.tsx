import React, { useState } from 'react';
import {
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Briefcase,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface PortfolioBannerProps {
  onOpenWorkflow?: () => void;
  onOpenWorkflowGuide?: () => void;
}

export const PortfolioBanner: React.FC<PortfolioBannerProps> = ({ onOpenWorkflow, onOpenWorkflowGuide }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleOpen = onOpenWorkflowGuide || onOpenWorkflow || (() => {});

  return (
    <div id="portfolio-banner-container" className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-slate-800 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Left badge & Context */}
          <div className="flex items-center gap-3 min-w-0">
            <span
              id="portfolio-demo-badge"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Portfolio Demo — Sample Data
            </span>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
              <span className="font-medium text-white flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                Catherine Ngina
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 truncate">
                Virtual Assistant — E-Commerce & Administrative Operations
              </span>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <button
              id="view-va-workflow-btn"
              onClick={handleOpen}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md transition-colors shadow-xs"
              title="View the full 8-step Virtual Assistant e-commerce operational workflow"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>VA Operational Workflow</span>
            </button>

            <button
              id="toggle-banner-collapse-btn"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-400 hover:text-slate-200 p-1 rounded transition-colors text-xs flex items-center gap-1"
              aria-label="Toggle portfolio context details"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-xs">{isCollapsed ? 'Show Details' : 'Hide Details'}</span>
              {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expanded Description */}
        {!isCollapsed && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <p className="leading-relaxed text-slate-300">
              <strong className="text-slate-100 font-semibold">Portfolio Overview: </strong>
              Fictional portfolio demonstration created by <span className="text-indigo-300 font-medium">Catherine Ngina</span> to showcase e-commerce administration, product listing, research, inventory coordination, supplier management, order processing, and reporting workflows.
            </p>
            <div className="flex items-center gap-2 text-slate-400 whitespace-nowrap text-[11px]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 10 Active Modules
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" /> Interactive Sample Workspace
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
