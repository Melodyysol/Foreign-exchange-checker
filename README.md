# Foreign Exchange Checker

A polished currency exchange dashboard built with React, TypeScript, and Vite. This project was designed as a Frontend Mentor-style challenge solution with a modern UI, live conversion flow, and user-focused tools for tracking exchange activity.

## Preview

- image preview: "src/assets/images/preview.png"

## Links

- Frontend Mentor challenge: https://www.frontendmentor.io/challenges
- Live demo: https://foreign-exchange-checker-zeta.vercel.app/
- Github: https://github.com/Melodyysol/Foreign-exhange-checker

## Overview

Foreign Exchange Checker lets users:

- convert currencies with a clean, responsive interface
- save favorite currency pairs for quick access
- compare exchange rates side by side
- view historical exchange trends over time
- log conversions and revisit them later
- sign in and persist their data with Supabase

## Features

- Responsive layout for desktop and mobile
- Live exchange conversion experience
- Favorites management
- Compare page for quick pair evaluation
- History chart with range selection
- Conversion log tracking
- Authentication and protected user data via Supabase

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- DaisyUI
- TanStack Query
- React Router
- Supabase
- Axios

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Project Structure

- `src/pages` — main views such as home, favorites, compare, history, and log
- `src/components` / `src/layouts` — reusable UI structure and layout pieces
- `src/service` — API and data fetching logic
- `src/lib` — Supabase client setup
- `src/context` — authentication and section state

## Submission Summary

This project was built to deliver a complete, modern currency exchange experience with a strong focus on usability, visual polish, and thoughtful interaction design. The app combines a live conversion flow with practical tools for saving favorites, comparing rates, tracking history, and reviewing conversion logs.

## What I Learned

- how to structure a multi-page React experience with routing and shared layout patterns
- how to integrate Supabase for authentication and persistent user data
- how to build responsive interfaces that feel polished on both mobile and desktop
- how to combine API-driven data with React Query for a smoother experience
- how to troubleshoot and work around CORS issues while integrating external APIs
