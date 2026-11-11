# ReCampus – The Marketplace Built for Students

> **Buy Smart. Sell Easy. Reuse More.**

ReCampus is a modern, student-exclusive second-hand marketplace web application designed specifically for college and university communities. It solves the student problem of expensive semester textbooks, calculators, lab coats, and hostel gear by providing a localized, trustworthy peer-to-peer marketplace and item swap network.

---

## 🌟 Key Features

### 1. Campus Discovery & Marketplace
- **28+ Curated Sample Listings** across 9 student-focused categories:
  - Textbooks and Academic Books
  - Electronics
  - Stationery
  - Lab Equipment
  - Hostel Essentials
  - Sports Equipment
  - Clothing and Accessories
  - Furniture
  - Miscellaneous
- **Multi-Facet Search & Filtering**:
  - Full-text search across titles, descriptions, and categories
  - Campus filter (Apex Institute, Delhi Tech University, Metro State, Heritage Engineering, etc.)
  - Condition filter (*Like New*, *Good*, *Fair*, *Needs Repair*)
  - Interactive price range slider (₹100 to ₹1000+)
  - Sorting by Newest, Price (Low/High), and Popularity

### 2. ReCampus Exchange (Zero-Cash Item Swapping)
- Propose direct 1-to-1 swaps (e.g. Higher Engineering Math for Python Programming, Badminton Racket for Cricket Kit)
- Specify items wanted in return
- Simulated peer proposal workflow

### 3. Contiguous Product Detail Pages
- Image galleries with high-resolution product photography
- Bargaining via **Make an Offer** modal with preset counter-offers (-10%, -15%, -20%)
- Direct peer messaging shortcut
- Verified student seller summary and campus meeting hotspot recommendations

### 4. Sell an Item (Listing Creation)
- Create new listings with character limits and price validation
- Preset collegiate photography + custom photo upload previews
- Live side-by-side card preview before publishing
- Full persistence in browser `localStorage`

### 5. Campus Shopping Bag & Simulated Checkout
- Itemized cart with quantity steppers and live savings calculations
- Campus handoff point selection (Central Library Lawn, Student Union, Hostel Gate)
- Time slot selection (e.g. post-lab or lunch break)
- Confetti celebration upon order placement
- Order history with statuses (*Order Placed*, *Awaiting Confirmation*, *Completed*)

### 6. Campus Messaging
- Two-column chat interface
- Contextual item spotlight badge
- Simulated seller auto-responses for realistic demo interactions

### 7. Student Dashboard & Sustainability Impact
- Profile management with preconfigured student profile (Alex Rivera)
- **Reuse Impact Dashboard** with interactive resource simulator calculating trees saved, liters of water conserved, and money retained

### 8. Hackathon Demo Ready
- Pre-populated with realistic campus data
- One-click **Reset Demo Data** button in header and footer
- Zero API keys or backend setup required

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations / Confetti**: Canvas-Confetti, Tailwind Transitions
- **State & Persistence**: React Context API + LocalStorage

---

## 🚀 Getting Started

### Prerequisites
Node.js 18+ and npm / bun installed.

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to explore ReCampus.

### Production Build
```bash
npm run build
```

---

## 📦 Vercel Deployment

ReCampus is configured as a purely client-side Single Page Application (SPA). For Vercel or any static host:
1. Push repository to GitHub (`recampus`).
2. Import project into Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`

---

## 🔒 Privacy & Safety Notice
ReCampus is a demonstration prototype designed for hackathons. All seller profiles, student ratings, and payment transactions are simulated without collection of sensitive personal financial information. Always meet in daylight at public campus hubs for real-world peer exchanges.
