import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { GraphPanel } from './components/GraphPanel';
import { solveLPP } from './api';
import type { LPPRequest, LPPResponse } from './api';

function App() {
  const [request, setRequest] = useState<LPPRequest>({
    c1: 3,
    c2: 4,
    problem_type: 'max',
    constraints: [
      { a: 1, b: 2, operator: '<=', c: 8 },
      { a: 3, b: 1, operator: '<=', c: 9 }
    ]
  });
  
  const [response, setResponse] = useState<LPPResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await solveLPP(request);
      setResponse(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to connect to the solver API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="p-3 bg-primary/20 rounded-xl shadow-lg border border-primary/30">
              <Network size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">LPP Solver</h1>
          </motion.div>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Solve Linear Programming Problems graphically. Set your objective and constraints to visualize the optimal solution.
          </motion.p>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl text-center shadow-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <motion.div 
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-4 flex justify-center w-full"
          >
             <InputPanel 
               request={request}
               setRequest={setRequest}
               onSolve={handleSolve}
               isLoading={isLoading}
             />
          </motion.div>

          <motion.div 
             initial={{ x: 40, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="xl:col-span-8 flex flex-col gap-8 w-full"
          >
             <GraphPanel response={response} />
             <ResultsPanel response={response} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
