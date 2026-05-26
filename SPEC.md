# Bhartipada Temple Digital Experience

## Project Overview

**Project Name:** Bhartipada Temple Digital Experience  
**Type:** Production-grade spiritual/religious web application  
**Core Functionality:** Immersive temple digital platform with 3D visualization, donation system, and community engagement  
**Target Users:** Devotees worldwide, temple administrators, donors

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, Framer Motion 12 |
| 3D/Graphics | Three.js, React-Three-Fiber, React-Three-Drei |
| Backend | Next.js API Routes + Express.js (optional) |
| Database | PostgreSQL (Supabase) |
| Auth | NextAuth.js + Supabase Auth |
| Payments | Razorpay (UPI, Cards, EMI, QR) |
| i18n | English, Hindi (हिन्दी), Odia (ଓଡ଼ିଆ) |
| Deployment | Vercel |

---

## Features Implemented

### 1. Immersive Hero Section
- Fullscreen temple visual with spiritual animations
- Floating light particles effect (framer-motion)
- CTAs: Donate / Explore Temple
- Multi-language support

### 2. 3D Temple Experience
- Three.js powered 360° temple view
- Interactive OrbitControls (rotate, zoom, pan)
- Guided "virtual darshan" camera path
- Hotspots for temple sections (Garbhagriha, Mandapa)
- Environment lighting (sunset preset)

### 3. Temple History Timeline
- Interactive timeline with 4 eras (1400s → 2024)
- Before/after image comparison slider
- Historical transformation visualization

### 4. Ishta Devi Section
- Deity storytelling with festivals
- Spiritual significance content

### 5. Donation System
- Razorpay integration (UPI, Cards, NetBanking, EMI)
- Preset amounts (₹501, ₹1001, ₹5001) + custom
- Anonymous donation option
- PAN number for tax receipts (80G)
- QR code for direct UPI
- Progress bars for temple needs

### 6. Community Layer
- Public donor wall with anonymous support
- Blessings/messages wall

### 7. Gallery Section
- Image gallery with lightbox

### 8. Contact & Map
- Temple location, timings
- Contact form

### 9. Admin Panel
- Dashboard with stats (charts via Recharts)
- Donation management
- Analytics visualization

### 10. Multi-language
- English, Hindi, Odia
- Language switcher in navbar

---

## Project Structure

```
temple-donation/
├── frontend/                    # Next.js 16 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/            # API routes
│   │   │   │   ├── auth/[...nextauth]/
│   │   │   │   ├── create-order/
│   │   │   │   ├── verify-payment/
│   │   │   │   └── donations/
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── donate/        # Donation page
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx       # Main landing
│   │   │   └── globals.css     # Tailwind + theme
│   │   ├── components/
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── modules/        # Hero, History, 3D, Donation, etc.
│   │   │   └── ui/             # FadeIn animations
│   │   ├── lib/
│   │   │   ├── i18n/           # Language context + translations
│   │   │   └── supabase.ts    # Supabase client
│   │   └── types/
│   ├── public/
│   │   ├── assets/images/     # Gallery images
│   │   └── models/            # 3D GLB models (temple.glb, idol.glb)
│   └── package.json
│
├── backend/                    # Express.js API (optional)
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── middleware/
│       └── index.ts
│
├── db/
│   └── schema.sql              # PostgreSQL schema
│
└── temple website/             # Local assets
    ├── *.jpeg                 # Temple photos
    └── *.pdf                  # Blueprint PDF
```

---

## Database Schema (Supabase)

Tables:
- `profiles` - User profiles (extends Supabase Auth)
- `donations` - Donation records with Razorpay integration
- `temple_needs` - Campaign/needs with progress tracking
- `events` - Temple events
- `blessings` - Community messages

Row Level Security (RLS) policies enabled for all tables.

---

## Environment Variables

### Frontend (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Razorpay
NEXT_PUBLIC_RZP_KEY=your-key-id
RZP_KEY_ID=your-key-id
RZP_KEY_SECRET=your-key-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# Database
DATABASE_URL=postgresql://...
```

---

## 3D Models Setup

The 3D section requires two GLB models:
1. `temple.glb` - Temple structure model
2. `idol.glb` - Deity idol model

Place these in: `frontend/public/models/`

To create from blueprint PDF:
1. Use Blender to import PDF
2. Model the temple structure
3. Export as GLB with Draco compression
4. Optimize using gltf-pipeline

---

## Running Locally

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (optional)
cd backend
npm install
npm run dev
```

Open http://localhost:3000

---

## Deployment

### Vercel (Frontend)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Supabase (Database)

1. Create Supabase project
2. Run `db/schema.sql` in SQL Editor
3. Get connection details for .env

---

## Payment Flow

1. User selects amount → clicks Donate
2. Server creates Razorpay order via `/api/create-order`
3. Razorpay checkout opens in modal
4. On success → webhook/callback verifies payment
5. Donation saved to Supabase
6. Donor wall updates

---

## Admin Access

- Navigate to `/admin`
- Protected by authentication
- View donations, stats, charts

---

## License

MIT License
