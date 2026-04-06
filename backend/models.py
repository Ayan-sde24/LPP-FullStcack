from pydantic import BaseModel
from typing import List, Optional, Literal

class Constraint(BaseModel):
    a: float
    b: float
    operator: Literal["<=", ">=", "=="]
    c: float

class LPPRequest(BaseModel):
    c1: float
    c2: float
    constraints: List[Constraint]
    problem_type: Literal["max", "min"]

class Point(BaseModel):
    x: float
    y: float

class GraphLine(BaseModel):
    a: float
    b: float
    c: float
    points: List[Point] # Display points

class GraphData(BaseModel):
    lines: List[GraphLine]
    region_points: List[Point]

class LPPResponse(BaseModel):
    feasible_points: List[Point]
    optimal_point: Optional[Point]
    optimal_value: Optional[float]
    steps: List[str]
    graph_data: GraphData
