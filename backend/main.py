from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import LPPRequest, LPPResponse
from solver import solve_lpp

app = FastAPI(title="LPP Solver API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/solve", response_model=LPPResponse)
def solve(request: LPPRequest):
    return solve_lpp(request)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
