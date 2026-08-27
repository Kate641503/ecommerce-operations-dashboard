import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  Search,
  Plus,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';
import { VATask, TaskStatus, TaskPriority } from '../types';

interface TasksViewProps {
  tasks: VATask[];
  onToggleTaskStatus: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onOpenAddTask: () => void;
  searchQuery: string;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onToggleTaskStatus,
  onUpdateTaskStatus,
  onOpenAddTask,
  searchQuery: globalSearch,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [statusTab, setStatusTab] = useState<'All' | 'To Do' | 'In Progress' | 'Review' | 'Completed'>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredTasks = useMemo(() => {
    const q = (localSearch || globalSearch).toLowerCase().trim();
    return tasks.filter((t) => {
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.assignedTo.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);

      const matchesStatus =
        statusTab === 'All' || t.status === statusTab;

      const matchesCategory =
        categoryFilter === 'All' || t.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [tasks, localSearch, globalSearch, statusTab, categoryFilter]);

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const reviewCount = tasks.filter((t) => t.status === 'Review').length;
  const toDoCount = tasks.filter((t) => t.status === 'To Do').length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Virtual Assistant Operational Task Board
            </h2>
            <p className="text-xs text-slate-500">
              Daily workflows, catalog optimization, PO dispatch, and supplier check-ins for Catherine Ngina
            </p>
          </div>
        </div>

        <button
          id="tasks-add-btn"
          onClick={onOpenAddTask}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Status Progress Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setStatusTab('To Do')}
          className={`bg-white rounded-xl border p-3.5 shadow-xs cursor-pointer transition-all ${
            statusTab === 'To Do' ? 'border-slate-800 ring-2 ring-slate-800/20' : 'border-slate-200 hover:border-slate-400'
          }`}
        >
          <span className="text-xs text-slate-500 font-medium">To Do</span>
          <div className="text-xl font-bold text-slate-900 mt-1">{toDoCount}</div>
        </div>

        <div
          onClick={() => setStatusTab('In Progress')}
          className={`bg-white rounded-xl border p-3.5 shadow-xs cursor-pointer transition-all ${
            statusTab === 'In Progress' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-blue-300'
          }`}
        >
          <span className="text-xs text-slate-500 font-medium">In Progress</span>
          <div className="text-xl font-bold text-blue-600 mt-1">{inProgressCount}</div>
        </div>

        <div
          onClick={() => setStatusTab('Review')}
          className={`bg-white rounded-xl border p-3.5 shadow-xs cursor-pointer transition-all ${
            statusTab === 'Review' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200 hover:border-amber-300'
          }`}
        >
          <span className="text-xs text-slate-500 font-medium">Under Review</span>
          <div className="text-xl font-bold text-amber-600 mt-1">{reviewCount}</div>
        </div>

        <div
          onClick={() => setStatusTab('Completed')}
          className={`bg-white rounded-xl border p-3.5 shadow-xs cursor-pointer transition-all ${
            statusTab === 'Completed' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300'
          }`}
        >
          <span className="text-xs text-slate-500 font-medium">Completed</span>
          <div className="text-xl font-bold text-emerald-600 mt-1">{completedCount}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search task title, category, assignee..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setStatusTab('All')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              statusTab === 'All'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All ({tasks.length})
          </button>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          >
            <option value="All">All Categories</option>
            <option value="Catalog">Catalog</option>
            <option value="Inventory">Inventory</option>
            <option value="Supplier">Supplier</option>
            <option value="Orders">Orders</option>
            <option value="Research">Research</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-10">Done</th>
                <th className="py-3 px-3">Task & Description</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Assigned To</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTasks.map((t) => {
                const isDone = t.status === 'Completed';

                return (
                  <tr key={t.id} className={`hover:bg-slate-50/80 transition-colors ${isDone ? 'bg-slate-50/40' : ''}`}>
                    {/* Checkbox toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onToggleTaskStatus(t.id)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                          isDone
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 hover:border-emerald-500 bg-white text-transparent'
                        }`}
                        title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </td>

                    {/* Task details */}
                    <td className="py-3 px-3">
                      <div className={`font-semibold text-slate-900 ${isDone ? 'line-through text-slate-400' : ''}`}>
                        {t.title}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 max-w-lg leading-relaxed">
                        {t.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200/60">
                        {t.category}
                      </span>
                    </td>

                    {/* Assigned To */}
                    <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-800">
                      {t.assignedTo}
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          t.priority === 'Urgent'
                            ? 'bg-rose-100 text-rose-700'
                            : t.priority === 'High'
                            ? 'bg-amber-100 text-amber-700'
                            : t.priority === 'Medium'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {t.priority}
                      </span>
                    </td>

                    {/* Due Date */}
                    <td className="py-3 px-3 whitespace-nowrap text-slate-600 text-[11px]">
                      {t.dueDate}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <select
                        value={t.status}
                        onChange={(e) => onUpdateTaskStatus(t.id, e.target.value as TaskStatus)}
                        className={`text-xs font-semibold px-2 py-1 rounded border cursor-pointer ${
                          t.status === 'Completed'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : t.status === 'In Progress'
                            ? 'bg-blue-50 border-blue-300 text-blue-800'
                            : t.status === 'Review'
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
