# SAP CertPrep - SuccessFactors Employee Central Certification Preparation Platform

A professional certification preparation platform for SAP SuccessFactors Employee Central (C_HRHPC/C_HRHCP) exams featuring 300+ realistic MCQs, interactive quizzes, progress tracking, and mock exams.

## 🚀 Features

- **300+ Realistic MCQs** - Questions mirror actual exam format with detailed explanations
- **Multiple Question Types** - Single choice, multiple choice, and true/false
- **Interactive Quiz Engine** - Real-time feedback and progress tracking
- **Timed Mock Exams** - Simulate real exam conditions with customizable timers
- **Smart Learning** - AI-powered weak area detection and recommendations
- **Progress Analytics** - Track XP, level, streak, and topic-wise progress
- **Dark/Light Mode** - SAP-inspired color theme with theme toggle
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, RLS)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
sap-examination/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login, signup)
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   └── admin/             # Admin panel
│   ├── components/            # Reusable React components
│   ├── lib/                   # Utilities and Supabase client
│   ├── types/                 # TypeScript definitions
│   ├── context/              # React context providers
│   └── data/                 # Mock data and MCQ database
├── supabase/                 # Database migrations
└── public/                   # Static assets
```

## 🎯 Topics Covered

1. Employee Central Basics (25 questions)
2. Foundation Objects (30 questions)
3. MDF Framework (35 questions)
4. Effective Dating (25 questions)
5. Role-Based Permissions (25 questions)
6. Position Management (20 questions)
7. Business Rules (30 questions)
8. Workflows (25 questions)
9. Event Reason Derivation (20 questions)
10. Associations & Relationships (25 questions)
11. Picklists (15 questions)
12. Data Models (20 questions)

## 🔐 Authentication

The app supports multiple authentication methods:
- **Email/Password** - Traditional signup and login
- **Google OAuth** - Sign in with Google
- **Guest Mode** - Practice without account (localStorage)

## 🎮 Gamification

- **XP System** - Earn XP for correct answers
- **Levels** - Progress from Level 1 to Level 50+
- **Streaks** - Daily practice tracking
- **Achievements** - Unlock badges and rewards

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- SAP SuccessFactors for the certification framework
- Supabase for the backend infrastructure
- Vercel for the deployment platform

---

Built with ❤️ for SAP professionals worldwide
