import React, { useState } from 'react';
import { X, CheckSquare, Plus } from 'lucide-react';
import { VATask, TaskPriority, TaskStatus } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: VATask) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('Catherine Ngina (VA)');
  const [category, setCategory] = useState<'Catalog' | 'Inventory' | 'Supplier' | 'Orders' | 'Research' | 'Admin'>('Catalog');
  const [priority, setPriority] = useState<TaskPriority>('High');
  const [dueDate, setDueDate] = useState('2026-08-29');
  const [status, setStatus] = useState<TaskStatus>('To Do');
  const [relatedEntity, setRelatedEntity] = useState('E-Commerce Operations');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: VATask = {
      id: `tsk-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Operational task assigned to Catherine Ngina.',
      assignedTo: assignedTo.trim(),
      category,
      priority,
      dueDate,
      status,
      relatedEntity,
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Create Virtual Assistant Task</h3>
              <p className="text-xs text-slate-300">Assign operational or catalog workflow task</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Task Title *</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Audit product listing bullet points"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Operational Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Catalog">Catalog</option>
                <option value="Inventory">Inventory</option>
                <option value="Supplier">Supplier</option>
                <option value="Orders">Orders</option>
                <option value="Research">Research</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Assigned To</label>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Detailed Instructions / Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide specific guidelines, links, or criteria..."
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
