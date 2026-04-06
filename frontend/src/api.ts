import axios from 'axios';

export interface Constraint {
  a: number;
  b: number;
  operator: '<=' | '>=' | '==';
  c: number;
}

export interface LPPRequest {
  c1: number;
  c2: number;
  constraints: Constraint[];
  problem_type: 'max' | 'min';
}

export interface Point {
  x: number;
  y: number;
}

export interface GraphLine {
  a: number;
  b: number;
  c: number;
  points: Point[];
}

export interface GraphData {
  lines: GraphLine[];
  region_points: Point[];
}

export interface LPPResponse {
  feasible_points: Point[];
  optimal_point: Point | null;
  optimal_value: number | null;
  steps: string[];
  graph_data: GraphData;
}

export const solveLPP = async (request: LPPRequest): Promise<LPPResponse> => {
  const response = await axios.post<LPPResponse>('http://localhost:8000/solve', request);
  return response.data;
};
