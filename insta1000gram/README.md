# Insta1000gram

High-performance, programmatic SEO Instagram media downloader platform with 1080p Full HD extraction, smart direct URL shortcuts, and multi-language support across 29 languages.

---

## 🏛 Clean Architecture

The project is structured into two dedicated applications:

```text
insta1000gram/
│
├── frontend/             # Next.js 14 App Router + React + Tailwind CSS
│   ├── app/              # App Router routes ([locale], [...slug], sitemaps, robots)
│   ├── components/       # Reusable UI widgets, header, downloader box, ads, admin modal
│   ├── config/           # Downloaders and supported language definitions
│   ├── context/          # LanguageContext with RTL auto-detection
│   ├── lib/              # Clean API communication layer (downloader.ts)
│   ├── translations/     # 29 languages and programmatic SEO data
│   ├── types.ts          # Shared TypeScript interfaces
│   ├── .env.local        # Public client environment variables
│   └── package.json      # Frontend dependencies
│
├── backend/              # Python Django 5 API & Admin Service
│   ├── manage.py         # Django CLI
│   ├── settings.py       # CORS, SQLite/PostgreSQL, installed apps
│   ├── urls.py           # API routes, admin, dynamic sitemaps, ads.txt
│   ├── views.py          # Instagram 1080p resolver, proxy stream, pSEO endpoints
│   ├── models.py         # PSEOPart, PSEOPartKeyword, AdPlacement, AdsTxtEntry
│   ├── init_db.py        # Database initializer
│   ├── requirements.txt  # Python dependencies
│   └── .env              # Private backend environment variables
│
└── README.md
```

---

## 🚀 Quick Start & Local Development

### 1. Backend (Django)

In your first terminal:

```bash
cd insta1000gram/backend

# Install dependencies
pip install -r requirements.txt

# Initialize database schema (first time only)
python init_db.py

# Start Django API server on port 8000
python manage.py runserver 8000
```

- API Base: `http://127.0.0.1:8000/api/`
- Django Admin: `http://127.0.0.1:8000/admin/`

---

### 2. Frontend (Next.js)

In your second terminal:

```bash
cd insta1000gram/frontend

# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```

- Web App: `http://localhost:3000`

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env.local`)
Variables exposed only where prefixed with `NEXT_PUBLIC_`:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SITE_DOMAIN=http://localhost:3000
```

### Backend (`backend/.env`)
Private server-only variables (never exposed to browser):
```env
DJANGO_SECRET_KEY=django-insecure-production-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost,0.0.0.0
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
MAX_DOWNLOAD_RETRIES=3
DOWNLOAD_PROXY_TIMEOUT_MS=15000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
ADMIN_SESSION_SECRET=secret-auth-key
```

---

## ⚡ Smart Instagram URL Feature ("1000" Trick)

When browsing Instagram, users can insert `1000` into any URL:
- Original: `https://www.instagram.com/reels/DcAS_m5zxaU/`
- Transformed: `https://www.insta1000gram.com/reels/DcAS_m5zxaU/`

Supported Smart Routes handled dynamically:
- `/reels/{id}`
- `/reel/{id}`
- `/p/{id}`
- `/stories/{username}/{id}`
- `/tv/{id}`

The Next.js catch-all route (`app/[...slug]/`) recognizes the media path, sends it to `POST /api/instagram/resolve/`, and streams the original 1080p MP4 / HD JPG without leaving the browser.

---

## 🌐 Multilingual & Programmatic SEO (pSEO)

- **29 Supported Locales**: Arabic (`ar`), English (`en`), French (`fr`), Spanish (`es`), German (`de`), Persian (`fa`), Japanese (`ja`), Chinese (`zh-Hans`), and 21 more.
- **RTL Support**: Automatic RTL direction (`dir="rtl"`) and Amiri typography for Arabic (`ar`) and Persian (`fa`).
- **5 Localized Downloader Pages** per language (145 total SEO landing pages):
  - `/{locale}/reels-downloader`
  - `/{locale}/video-downloader`
  - `/{locale}/photo-downloader`
  - `/{locale}/story-downloader`
  - `/{locale}/highlights-downloader`
- **Dynamic Sitemaps**: Available at `/sitemap_1.xml` and `/robots.txt` blocking private admin paths while indexing all localized downloader pages.
