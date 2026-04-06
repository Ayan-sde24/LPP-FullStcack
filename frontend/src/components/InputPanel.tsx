import React from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import type { LPPRequest, Constraint } from '../api';
import { motion } from 'framer-motion';

interface InputPanelProps {
  request: LPPRequest;
  setRequest: (req: LPPRequest) => void;
  onSolve: () => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ request, setRequest, onSolve, isLoading }) => {
  const handleConstraintChange = (index: number, field: keyof Constraint, value: any) => {
    const newConstraints = [...request.constraints];
    newConstraints[index] = { ...newConstraints[index], [field]: value };
    setRequest({ ...request, constraints: newConstraints });
  };

  const addConstraint = () => {
    setRequest({
      ...request,
      constraints: [...request.constraints, { a: 1, b: 1, operator: '<=', c: 10 }]
    });
  };

  const removeConstraint = (index: number) => {
    const newConstraints = request.constraints.filter((_, i) => i !== index);
    setRequest({ ...request, constraints: newConstraints });
  };

  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-6 w-full max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Problem Setup</h2>
        <select
          className="bg-card border border-white/10 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
          value={request.problem_type}
          onChange={(e) => setRequest({ ...request, problem_type: e.target.value as 'max' | 'min' })}
        >
          <option value="max">Maximize</option>
          <option value="min">Minimize</option>
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Objective Function (Z)</h3>
        <div className="flex items-center gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
          <span className="text-lg font-mono text-primary font-semibold">Z = </span>
          <input
            type="number"
            value={request.c1}
            onChange={(e) => setRequest({ ...request, c1: Number(e.target.value) })}
            className="w-20 bg-card border border-white/10 rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary outline-none transition-all"
          />
          <span className="text-lg font-mono">x + </span>
          <input
            type="number"
            value={request.c2}
            onChange={(e) => setRequest({ ...request, c2: Number(e.target.value) })}
            className="w-20 bg-card border border-white/10 rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary outline-none transition-all"
          />
          <span className="text-lg font-mono">y</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Constraints</h3>
            <button
              onClick={addConstraint}
              className="text-primary hover:text-primaryHover transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <Plus size={16} /> Add 
            </button>
        </div>
        
        <div className="space-y-3">
          {request.constraints.map((c, i) => (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className="flex items-center gap-2 bg-black/20 p-3 rounded-xl border border-white/5"
            >
              <input
                type="number"
                value={c.a}
                onChange={(e) => handleConstraintChange(i, 'a', Number(e.target.value))}
                className="w-16 bg-card border border-white/10 rounded-lg px-2 py-1.5 text-center text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <span className="font-mono text-sm">x +</span>
              <input
                type="number"
                value={c.b}
                onChange={(e) => handleConstraintChange(i, 'b', Number(e.target.value))}
                className="w-16 bg-card border border-white/10 rounded-lg px-2 py-1.5 text-center text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <span className="font-mono text-sm">y</span>
              
              <select
                value={c.operator}
                onChange={(e) => handleConstraintChange(i, 'operator', e.target.value)}
                className="w-16.5 bg-card border border-white/10 rounded-lg px-1 py-1.5 text-center text-sm focus:ring-2 focus:ring-primary outline-none appearance-none"
              >
                <option value="<=">&le;</option>
                <option value=">=">&ge;</option>
                <option value="==">=</option>
              </select>

              <input
                type="number"
                value={c.c}
                onChange={(e) => handleConstraintChange(i, 'c', Number(e.target.value))}
                className="w-16 bg-card border border-white/10 rounded-lg px-2 py-1.5 text-center text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <button
                onClick={() => removeConstraint(i)}
                className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors ml-auto"
                title="Remove constraint"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 font-mono">
             x, y &ge; 0 (implicit)
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSolve}
        disabled={isLoading || request.constraints.length === 0}
        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-400 text-white font-semibold flex flex-row items-center justify-center gap-2 shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
            <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        ) : (
            <>
                <Calculator size={20} />
                Solve Problem
            </>
        )}
      </motion.button>
    </div>
  );
};
