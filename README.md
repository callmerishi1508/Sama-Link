# SAMA LINK

## Overview
SAMA LINK is an AI-first emergency response and disaster management platform that enables incident detection, intelligent triage, resource coordination, operational awareness, and decision support. It empowers command centers to manage complex, multi-incident emergencies with maximum efficiency and clarity.

---

## Features
* **AI Incident Understanding**: Automated risk assessment and categorization.
* **Multi-Incident Command Center**: A Kanban-style board to track incidents across their lifecycle.
* **Live Operational Dashboard**: Real-time insights, metrics, and global activity.
* **Resource Allocation**: Track and route resources to active incidents efficiently.
* **Hospital Capacity Monitoring**: Monitor medical resources and saturation levels.
* **Operational Timeline**: Visual timeline of all coordinated responses and activities.
* **AI Insights**: Contextual predictions, weather impact, and tactical recommendations.
* **Incident Analytics**: Deep dive into response times and performance metrics.
* **Communication Monitoring**: Oversee incoming emergency reports across multiple channels.
* **Emergency Response Workflow**: Structured incident management and approvals.
* **Interactive Maps**: Live plotting of operations and active emergency zones.
* **Coordinator Console**: Oversight on active dispatchers and operators.
* **Incident History**: Searchable archive of all resolved operations.
* **Reports**: Generating comprehensive post-incident analysis.
* **Settings Management**: Customizable configurations for different command centers.

---

## Tech Stack

**Frontend**
* Next.js
* TypeScript
* TailwindCSS
* React

**Backend**
* FastAPI
* Python

**Database**
* Supabase

**AI**
* Google Gemini

**Maps**
* OpenStreetMap

**Deployment**
* Google Cloud Run

---

## Project Structure
- `/frontend`: Next.js web application and UI components.
- `/backend`: FastAPI service for intelligence processing and integrations.
- `/docs`: Architecture, product, and developer documentation.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/callmerishi1508/Sama-Link.git
   cd Sama-Link
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

---

## Environment Variables

Create `.env` or `.env.local` files using `.env.example` as a template.

**Required Variables:**
- `GEMINI_API_KEY`: API key for Google Gemini AI processing.
- `SUPABASE_URL`: Supabase project URL.
- `SUPABASE_ANON_KEY`: Supabase project anonymous key.
- `NEXT_PUBLIC_API_URL`: URL to the FastAPI backend (e.g., `http://localhost:8000`).

---

## Running Locally

**Start the Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

**Start the Frontend:**
```bash
cd frontend
npm run dev
```

The platform will be available at `http://localhost:3000`.

---

## Production Deployment

This project is configured to deploy via Google Cloud Run.

1. **Build and Submit Docker Image:**
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/sama-link-backend
   ```
2. **Deploy to Cloud Run:**
   ```bash
   gcloud run deploy sama-link-backend --image gcr.io/YOUR_PROJECT_ID/sama-link-backend --platform managed
   ```

Follow a similar Dockerfile setup for the frontend deployment on Cloud Run or Vercel.

---

## Screenshots

*(Screenshots placeholder)*

---

## Future Roadmap

- Advanced mobile app capabilities for field responders.
- Real-time drone video feed integration.
- Expanded predictive analytics for mass casualty incidents.

---

## Contributing

We welcome contributions. Please review the issues board and submit a pull request with clear documentation of your changes. Ensure all code passes `npm run lint` and `npm run build` before submitting.

---

## Acknowledgements

- Google Gemini for the foundational AI reasoning.
- Next.js and Vercel for the web application framework.
- FastAPI for high-performance Python services.
- TailwindCSS for the rapid styling engine.
