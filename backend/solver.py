import numpy as np
from models import LPPRequest, LPPResponse, Point, GraphLine, GraphData, Constraint
from typing import List, Tuple

def get_intersection(line1, line2):
    # line: a*x + b*y = c
    a1, b1, c1_val = line1
    a2, b2, c2_val = line2
    det = a1 * b2 - a2 * b1
    if abs(det) < 1e-10:
        return None  # Parallel or identical
    x = (c1_val * b2 - c2_val * b1) / det
    y = (a1 * c2_val - a2 * c1_val) / det
    return (x, y)

def is_feasible(x, y, constraints, eps=1e-6):
    if x < -eps or y < -eps:
        return False
    for c in constraints:
        val = c.a * x + c.b * y
        if c.operator == "<=":
            if val > c.c + eps:
                return False
        elif c.operator == ">=":
            if val < c.c - eps:
                return False
        elif c.operator == "==":
            if abs(val - c.c) > eps:
                return False
    return True

def order_points(points):
    if not points:
        return []
    centroid_x = sum(p[0] for p in points) / len(points)
    centroid_y = sum(p[1] for p in points) / len(points)
    def angle(p):
        return np.arctan2(p[1] - centroid_y, p[0] - centroid_x)
    return sorted(points, key=angle)

def solve_lpp(request: LPPRequest) -> LPPResponse:
    steps = ["1. Read objective function and constraints."]
    
    lines = [(c.a, c.b, c.c) for c in request.constraints]
    lines.extend([(1, 0, 0), (0, 1, 0)]) # x >= 0, y >= 0
    
    intersections = []
    n_lines = len(lines)
    for i in range(n_lines):
        for j in range(i + 1, n_lines):
            pt = get_intersection(lines[i], lines[j])
            if pt is not None:
                intersections.append(pt)
                
    steps.append(f"2. Found intersection points between all constraint lines and axes.")
    
    feasible_points = []
    for pt in intersections:
        if is_feasible(pt[0], pt[1], request.constraints):
            # Avoid duplicates
            if not any(abs(pt[0] - fp[0]) < 1e-6 and abs(pt[1] - fp[1]) < 1e-6 for fp in feasible_points):
                feasible_points.append(pt)
                
    steps.append(f"3. Filtered points to find the feasible region. Found {len(feasible_points)} valid corner points.")
    
    if not feasible_points:
        steps.append("4. The feasible region is empty. No solution exists.")
        return LPPResponse(
            feasible_points=[],
            optimal_point=None,
            optimal_value=None,
            steps=steps,
            graph_data=GraphData(lines=[], region_points=[])
        )
        
    ordered_fp = order_points(feasible_points)
    optimal_val, optimal_pt = None, None
    
    for pt in feasible_points:
        val = request.c1 * pt[0] + request.c2 * pt[1]
        if optimal_val is None or (request.problem_type == "max" and val > optimal_val) or (request.problem_type == "min" and val < optimal_val):
            optimal_val = val
            optimal_pt = pt
                
    steps.append(f"4. Evaluated objective function Z = {request.c1}x + {request.c2}y at feasible corner points.")
    steps.append(f"5. The {request.problem_type}imum value is Z = {optimal_val:.2f} at x={optimal_pt[0]:.2f}, y={optimal_pt[1]:.2f}.")
    
    graph_lines = [GraphLine(a=c.a, b=c.b, c=c.c, points=[]) for c in request.constraints]
    
    return LPPResponse(
        feasible_points=[Point(x=p[0], y=p[1]) for p in ordered_fp],
        optimal_point=Point(x=optimal_pt[0], y=optimal_pt[1]),
        optimal_value=optimal_val,
        steps=steps,
        graph_data=GraphData(lines=graph_lines, region_points=[Point(x=p[0], y=p[1]) for p in ordered_fp])
    )
