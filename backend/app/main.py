from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.exceptions import global_exception_handler

# Setup centralized logging
setup_logging()

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Starting SAMA LINK API in {settings.ENVIRONMENT} mode.")
    yield
    # Cleanup logic if necessary

app = FastAPI(
    title="SAMA LINK API",
    description="Action Intelligence Engine Backend",
    version="0.1.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan,
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",  # Common Vite default
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception Handlers
app.add_exception_handler(Exception, global_exception_handler)

from app.api.v1 import analysis

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "samalink-api"
    }

app.include_router(analysis.router, prefix="/api/v1", tags=["Analysis"])
