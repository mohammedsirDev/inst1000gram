# Insta1000gram - Complete Source Code & Migration Guide

This archive contains the complete codebase for **insta1000gram**.

## Table of Contents
1. [Project 1: React 19 + Express + Vite (Ready-to-Run Production Stack)](#project-1-react--express)
2. [Project 2: Next.js + Django Migration (Included in /nextjs-django-version)](#project-2-nextjs--django)
3. [The "1000" URL Redirection Feature](#the-1000-url-shortcut)

---

## Project 1: React + Express (Default Running Application)

This is the exact high-speed engine currently running on the live server.

### Prerequisites:
- Node.js 18+ or 20+
- npm or bun

### Quick Start:
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
npm start
```
The server will start at `http://localhost:3000`.

### Key Files:
- `server.ts`: Express backend handling multi-source Instagram stream resolution, binary proxy streaming (with `Content-Disposition: attachment` to prevent CORS issues), and dynamic SEO sitemaps.
- `src/App.tsx`: Main application router and state management.
- `src/components/DownloaderBox.tsx`: Instagram link resolution interface.
- `src/components/ResultCard.tsx`: Media display and 1080p Full HD download buttons.
- `src/components/HowToGuide.tsx`: Guide and the "1000" URL shortcut.

---

## Project 2: Next.js + Django (Located in `/nextjs-django-version`)

If you want to run this application with Next.js on the frontend and Django on the backend:

### Django Backend Setup (`/nextjs-django-version/django-backend`):
```bash
cd nextjs-django-version/django-backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver 8000
```
Endpoints provided:
- `POST /api/instagram/resolve/`: Resolves reels, stories, photos, and carousels.
- `GET /api/download/proxy/`: Binary stream proxy with headers preventing Instagram CDN access restrictions.

### Next.js Frontend Setup (`/nextjs-django-version/nextjs-frontend`):
```bash
cd nextjs-django-version/nextjs-frontend
npm install
npm run dev
```
Runs Next.js App Router on `http://localhost:3000` with the catch-all route `app/[...slug]/page.tsx` for direct Instagram URL interception.

---

## The "1000" URL Shortcut

Users can download any post, reel, or story simply by inserting `1000` into any Instagram URL:
- Original: `https://www.instagram.com/p/DFeFJZBSWHK/`
- Download: `https://www.insta1000gram.com/p/DFeFJZBSWHK/`
