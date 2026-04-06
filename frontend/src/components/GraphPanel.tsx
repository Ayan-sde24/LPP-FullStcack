import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import type { LPPResponse } from '../api';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

interface GraphPanelProps {
  response: LPPResponse | null;
}

export const GraphPanel: React.FC<GraphPanelProps> = ({ response }) => {
  const chartData = useMemo(() => {
    if (!response) return null;

    const datasets: any[] = [];

    
    // In ChartJS, to draw lines given ax + by = c, we need points.
    // Let's create two points for each line: (0, y_intercept) and (x_intercept, 0)
    // If line is vertical or horizontal, handle appropriately.
    response.graph_data.lines.forEach((line, index) => {
      let pts = [];
      if (line.b === 0) {
        // Vertical line x = c/a
        pts = [{ x: line.c / line.a, y: 0 }, { x: line.c / line.a, y: 100 }];
      } else if (line.a === 0) {
        // Horizontal line y = c/b
        pts = [{ x: 0, y: line.c / line.b }, { x: 100, y: line.c / line.b }];
      } else {
        pts = [
          { x: 0, y: line.c / line.b },
          { x: line.c / line.a, y: 0 }
        ];
      }

      datasets.push({
        label: `Constraint ${index + 1}`,
        data: pts,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 2,
        borderDash: [5, 5],
        showLine: true,
        pointRadius: 0,
        fill: false,
      });
    });

    // Feasible Region Polygon
    if (response.feasible_points.length > 0) {
      const regionData = [...response.graph_data.region_points];
      // Close the polygon
      regionData.push(response.graph_data.region_points[0]);

      datasets.push({
        label: 'Feasible Region',
        data: regionData,
        backgroundColor: 'rgba(59, 130, 246, 0.3)', // Primary color with opacity
        borderColor: 'rgba(59, 130, 246, 0.8)',
        borderWidth: 2,
        showLine: true,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
      });
    }

    // Optimal Point
    if (response.optimal_point) {
      datasets.push({
        label: 'Optimal Point',
        data: [response.optimal_point],
        backgroundColor: '#F59E0B', // Accent color
        borderColor: '#fff',
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
        showLine: false,
      });
    }

    return { datasets };
  }, [response]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        min: 0,
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
        ticks: { color: '#9ca3af' }
      },
      y: {
        type: 'linear' as const,
        min: 0,
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
        ticks: { color: '#9ca3af' }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb'
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: (${context.parsed.x.toFixed(2)}, ${context.parsed.y.toFixed(2)})`;
          }
        }
      }
    }
  };

  return (
    <div className="glass rounded-2xl p-6 flex flex-col w-full h-[500px]">
      <h2 className="text-xl font-semibold text-white mb-4">Graph Visualization</h2>
      <div className="flex-1 relative w-full h-full">
        {chartData ? (
          <Scatter data={chartData} options={options} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
            Run solver to display graph
          </div>
        )}
      </div>
    </div>
  );
};
