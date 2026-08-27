import React from 'react';
import {
  Search,
  Building2,
  FileEdit,
  DollarSign,
  Tag,
  Boxes,
  ShoppingBag,
  BarChart3,
  ArrowRight,
  CheckCircle,
  X,
  Sparkles
} from 'lucide-react';
import { NavSection } from '../types';

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Product Research',
    targetSection: 'research' as NavSection,
    icon: Search,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    description: 'Sourcing trending SKUs, calculating target margins, analyzing competitor pricing, and evaluating customer demand metrics.',
    vaAction: 'Analyzes market search volumes, validates sample feasibility, and prepares item proposals for store approval.'
  },
  {
    step: 2,
    title: 'Supplier Verification',
    targetSection: 'suppliers' as NavSection,
    icon: Building2,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    description: 'Negotiating volume tier pricing, verifying factory lead times (7-16 days), MOQ terms, and reliable carrier logistics.',
    vaAction: 'Coordinates supplier communications, requests factory samples, audits compliance, and records Net-30 terms.'
  },
  {
    step: 3,
    title: 'Product Data Entry',
    targetSection: 'products' as NavSection,
    icon: FileEdit,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    description: 'Drafting SEO-rich bullet points, assigning structured SKUs, standardizing dimension specs, and formatting product copy.',
    vaAction: 'Generates standardized catalog entries, attributes, high-resolution lifestyle image tags, and barcode assignments.'
  },
  {
    step: 4,
    title: 'Pricing Analysis',
    targetSection: 'pricing' as NavSection,
    icon: DollarSign,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    description: 'Benchmarking marketplace prices against target 60-75% gross margins and recommending dynamic price updates.',
    vaAction: 'Calculates landed cost vs. gross profit, monitors competitor price drops, and flags underpriced or uncompetitive listings.'
  },
  {
    step: 5,
    title: 'Product Listing',
    targetSection: 'products' as NavSection,
    icon: Tag,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    description: 'Publishing optimized listings across omnichannel sales channels (Shopify, Amazon US, Walmart, and TikTok Shop).',
    vaAction: 'Ensures listing synchronization, validates category mapping, inspects mobile rendering, and activates live sales status.'
  },
  {
    step: 6,
    title: 'Inventory Monitoring',
    targetSection: 'inventory' as NavSection,
    icon: Boxes,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    description: 'Tracking reorder thresholds, calculating days of supply, issuing low-stock alerts, and drafting replenishment POs.',
    vaAction: 'Monitors real-time stock deductions, flags 24 low-stock items, and coordinates restock timelines before stockouts occur.'
  },
  {
    step: 7,
    title: 'Order Management',
    targetSection: 'orders' as NavSection,
    icon: ShoppingBag,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    description: 'Auditing pending customer orders, verifying delivery addresses, coordinating with 3PL fulfillment, and logging tracking numbers.',
    vaAction: 'Processes 37 pending queue orders daily, escalates rush delivery flags, and handles customer shipment inquiries.'
  },
  {
    step: 8,
    title: 'Performance Reporting',
    targetSection: 'reports' as NavSection,
    icon: BarChart3,
    color: 'text-teal-600 bg-teal-50 border-teal-200',
    description: 'Synthesizing monthly revenue ($48,620), average order value ($170), inventory turnover, and best-performing categories.',
    vaAction: 'Compiles executive weekly KPI dashboards for the store owner, identifying high-velocity items and margin optimizations.'
  }
];

interface VaWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: NavSection) => void;
}

export const VaWorkflowModal: React.FC<VaWorkflowModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        id="va-workflow-modal"
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-4xl w-full overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Virtual Assistant E-Commerce Operational Workflow
              </h3>
              <p className="text-xs text-slate-300">
                End-to-End Operational Lifecycle managed by Catherine Ngina
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-lg p-4 text-xs text-indigo-950 leading-relaxed">
            <span className="font-semibold text-indigo-900">Virtual Assistant Role Context: </span>
            This operational workflow maps the standardized 8-stage lifecycle executed to manage products from initial ideation and supplier sourcing through multi-channel listing, inventory replenishment, daily order fulfillment, and KPI executive reporting.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WORKFLOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg p-4 transition-all duration-150 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                          {step.step}
                        </span>
                        <div className={`p-1.5 rounded-md border ${step.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold text-sm text-slate-900">{step.title}</h4>
                      </div>
                      <button
                        onClick={() => {
                          onNavigate(step.targetSection);
                          onClose();
                        }}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
                      >
                        Open Module <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/80 bg-white/70 rounded p-2 text-[11px] text-slate-700">
                    <strong className="text-slate-900 font-medium">Catherine's VA Task: </strong>
                    {step.vaAction}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Click any module to jump directly to its workspace</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-md transition-colors"
          >
            Close Workflow
          </button>
        </div>
      </div>
    </div>
  );
};
