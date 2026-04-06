import React from 'react';
import { motion } from 'framer-motion';
import type { LPPResponse } from '../api';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface ResultsPanelProps {
  response: LPPResponse | null;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ response }) => {
  if (!response) {
    return (
      <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center text-gray-400 min-h-[300px]">
        <CheckCircle2 size={48} className="mb-4 opacity-20" />
        <p>Results will appear here after solving.</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-6 w-full">
      <h2 className="text-xl font-semibold text-white">Solution Steps</h2>
      
      <div className="space-y-4">
        {response.steps.map((step, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"
          >
            <div className="mt-0.5 text-primary">
              <ChevronRight size={18} />
            </div>
            <p className="text-sm text-gray-200 leading-relaxed font-medium">
              {step}
            </p>
          </motion.div>
        ))}
      </div>

      {response.optimal_value !== null && response.optimal_point && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: response.steps.length * 0.1 }}
          className="mt-4 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-6 text-center shadow-lg"
        >
          <p className="text-sm font-medium text-gray-300 uppercase tracking-widest mb-2">Optimal Solution</p>
          <div className="text-4xl font-bold font-mono text-white mb-3">
             Z = {response.optimal_value.toFixed(2)}
          </div>
          <div className="flex justify-center gap-4 text-lg font-mono text-primary">
            <span className="bg-black/30 px-3 py-1 rounded-lg flex items-center justify-center min-w-[5rem]">x = {response.optimal_point.x.toFixed(2)}</span>
            <span className="bg-black/30 px-3 py-1 rounded-lg flex items-center justify-center min-w-[5rem]">y = {response.optimal_point.y.toFixed(2)}</span>
          </div>
        </motion.div>
      )}
      
      {response.feasible_points.length === 0 && (
         <div className="mt-4 p-4 border border-red-500/30 bg-red-500/10 rounded-xl text-red-200 text-center font-medium">
           No Feasible Region Found
         </div>
      )}
    </div>
  );
};
