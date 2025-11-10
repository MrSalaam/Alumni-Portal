# Alumni Portal System

A comprehensive, production-ready Alumni Portal System built with React, TypeScript, Vite, Tailwind CSS, and Supabase. This full-stack web application connects alumni, current students, and administrators, facilitating networking, mentorship, job opportunities, and event management.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/registration with role-based access (Admin, Alumni, Student)
- **Alumni Directory**: Browse and search verified alumni with advanced filters
- **Job Board**: Post and discover job opportunities
- **Events Management**: Create, browse, and register for events
- **Mentorship System**: Connect students with alumni mentors
- **News & Updates**: Share success stories and important announcements
- **Admin Dashboard**: Comprehensive user and content management

### User Roles

#### Admin
- Complete user management (CRUD operations)
- Verify alumni accounts
- View analytics dashboard
- Generate reports
- Content moderation

#### Alumni
- Complete profile management
- Post job opportunities
- Create events
- Offer mentorship
- Connect with other alumni

#### Student
- Browse alumni directory
- Apply for jobs
- Request mentorship
- Register for events
- Access career resources

## 🛠️ Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Context API
- **Routing**: React Router v6
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns
- **Charts**: Recharts
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Alumni-Portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
   
   Update the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_APP_URL=http://localhost:5173
   VITE_STORAGE_BUCKET=alumni-portal-storage
   ```

4. **Set up Supabase Database**
   
   Run the SQL migrations in your Supabase project to create the required tables and policies. See the database schema section below.

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Input, Card, etc.)
│   ├── layout/         # Layout components (Navbar, Sidebar, Footer)
│   └── features/       # Feature-specific components
├── contexts/           # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Library configurations (Supabase, etc.)
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # Dashboard pages
│   ├── alumni/        # Alumni-related pages
│   ├── jobs/          # Job board pages
│   ├── events/        # Events pages
│   ├── mentorship/    # Mentorship pages
│   ├── news/          # News pages
│   └── admin/         # Admin pages
├── services/          # API service layer
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── assets/            # Static assets (images, icons)
```

## 🗄️ Database Schema

The application uses the following main tables:

- **users**: Core user information and authentication
- **alumni_profiles**: Alumni-specific profile data
- **student_profiles**: Student-specific profile data
- **jobs**: Job postings
- **events**: Event listings
- **event_registrations**: Event attendance tracking
- **mentorship_requests**: Mentorship connections
- **news**: News articles and updates
- **notifications**: User notifications
- **saved_jobs**: Bookmarked jobs

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm run test

# Coverage report
npm run test:coverage
```

## 🏗️ Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   
   The built files in the `dist/` directory can be deployed to:
   - Vercel (recommended)
   - Netlify
   - Cloudflare Pages
   - Any static hosting service

## 🔐 Environment Variables

Required environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `VITE_APP_URL` | Application URL (for redirects) |
| `VITE_STORAGE_BUCKET` | Supabase storage bucket name |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Roadmap

- [ ] Mobile applications (iOS/Android)
- [ ] Real-time chat between alumni and students
- [ ] Advanced analytics dashboard
- [ ] AI-powered job recommendations
- [ ] Video conferencing for virtual events
- [ ] Alumni donation system
- [ ] Advanced search with Elasticsearch

---

Built with ❤️ by the Alumni Portal Team
