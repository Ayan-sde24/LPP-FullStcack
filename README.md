📊 Linear Programming Solver (Graphical Method)

Visualize, solve, and understand Linear Programming — step by step.

🚀 Overview

This project is a full-stack Linear Programming Solver that implements the graphical method for 2-variable optimization problems.

It not only computes the optimal solution but also explains every step, making it ideal for:

Learning & teaching LPP
Interview preparation
Visualization of optimization problems
✨ Features
🔢 Solver Capabilities
Supports Maximization & Minimization
Handles mixed constraints:
≤ (less than equal)
≥ (greater than equal)
= (equality)
Detects:
✅ Optimal solutions
❌ Infeasible problems
♾️ Unbounded solutions
🧠 Algorithmic Logic
Computes intersection points of constraint lines
Filters feasible region
Evaluates objective function at corner points
Selects optimal extreme point
📈 Visualization Ready
Graph-ready data for:
Constraint lines
Feasible region
Corner points
Optimal solution
📜 Step-by-Step Explanation

Every solution includes:

Mathematical reasoning
Computational steps
Clear explanation flow
🏗️ Architecture
Frontend (React + Tailwind)
        ↓
FastAPI Backend (REST API)
        ↓
Custom LPP Solver Engine (Python)
🧩 Tech Stack
Layer	Technology
Frontend	React, Tailwind CSS
Backend	FastAPI
Engine	Python (NumPy)
API	REST
⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/lpp-solver.git
cd lpp-solver
2. Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
3. Frontend Setup
cd frontend
npm install
npm run dev
4. Open in Browser
http://localhost:5173
🔌 API Usage
Endpoint
POST /solve
Sample Request
{
  "c1": 3,
  "c2": 2,
  "problem_type": "max",
  "constraints": [
    { "a": 1, "b": 1, "c": 4, "type": "<=" },
    { "a": 1, "b": 0, "c": 2, "type": "<=" },
    { "a": 0, "b": 1, "c": 3, "type": "<=" }
  ]
}
Sample Response
{
  "status": "optimal",
  "optimal_point": [2, 2],
  "optimal_value": 10,
  "steps": [
    "Computed intersections...",
    "Filtered feasible region...",
    "Evaluated objective function...",
    "Selected optimal solution..."
  ]
}
📊 How It Works
Step 1: Convert Constraints

Each constraint is converted into a line:

ax + by = c
Step 2: Find Intersections

All pairs of lines are solved to find candidate points.

Step 3: Feasible Region

Points satisfying all constraints are retained.

Step 4: Optimization

Objective function evaluated at all feasible points.

Step 5: Result

Best value selected based on max/min condition.

🖼️ Screenshots

(Add your screenshots here after UI is ready)

🔹 Input UI
[ Screenshot Placeholder ]
🔹 Graph Visualization
[ Feasible Region + Constraints Plot ]
🔹 Step-by-Step Solution
[ Timeline / Explanation UI ]
📐 Example Problem

Maximize:

Z = 3x + 2y

Subject to:

x + y ≤ 4  
x ≤ 2  
y ≤ 3  
x, y ≥ 0
✅ Output:
Optimal Point: (2, 2)
Maximum Z: 10
🧪 Edge Case Handling
Case	Behavior
Infeasible	No common region detected
Unbounded	Objective grows infinitely
Degenerate	Multiple optimal points
📌 Future Improvements
Graph animation of objective function
Convex hull visualization
Export results as PDF
Multi-variable support (Simplex method)
Interactive sliders for constraints
🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

📄 License

This project is licensed under the MIT License.

🌟 Show Your Support

If you found this useful:

⭐ Star the repo
🍴 Fork it
📢 Share it

💡 Author
Ayan Mukhopadhyay
Built with a focus on algorithms + system design + visualization to bridge the gap between theory and real-world implementation.
