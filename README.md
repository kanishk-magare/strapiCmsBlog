# strapiCmsBlog

A full-stack blog application powered by **Strapi CMS** on the backend and **Next.js** on the frontend.

---

## 📁 Project Structure

```text
strapiCmsBlog/
├── frontend/     # Next.js frontend application (React 19, Tailwind CSS)
└── strapi/       # Strapi headless CMS backend (v5, SQLite)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- `npm` or `yarn` or `pnpm`

---

### 1. Backend Setup (Strapi CMS)

1. Navigate to the `strapi` directory:
   ```bash
   cd strapi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file from the example template:
   ```bash
   cp .env.example .env
   ```
   Generate appropriate keys or fill in the necessary secret tokens.

4. Start the development server:
   ```bash
   npm run develop
   ```
   Strapi Admin panel will be available at [http://localhost:1337/admin](http://localhost:1337/admin).

---

### 2. Frontend Setup (Next.js)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will be running at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Lucide Icons, Shadcn UI
- **Backend**: Strapi v5 Headless CMS, SQLite (better-sqlite3)
- **API**: REST APIs with Strapi Content Types
