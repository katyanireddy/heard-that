# Heard That? — Community Platform

A playful, retro-maximalist, animation-heavy Next.js website for **Heard That?**, a Bangalore community platform by two psychology students.

## Tech stack
- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- GSAP
- Nodemailer (confirmation email flow)

## Core features implemented
- Public browsing for home/events/gallery/community/about/collab
- Authentication system (signup/login/logout with secure signed cookie sessions)
- Member-only features:
  - Personalized vibe profile updates
  - Dashboard with joined events + memory cards
  - Community wall posting
- Admin-only organizer dashboard:
  - Add/delete events
  - View registrations/ticket codes
  - Moderate community notes
  - View collab inquiries
  - View confirmation-email log
- Animation-rich UI:
  - Layered hero with floating sticker cloud
  - Bento event cards with motion
  - Interactive vibe cards
  - Dynamic tonight mood section
  - Nostalgia section + scrapbook gallery board
  - Ticket reveal animation with GSAP "CONFIRMED" stamp
  - Stylized interactive Bangalore map
  - Playful custom 404 page

## Demo accounts
- Member: `member@heardthat.in` / `friendsoffline`
- Admin: `admin@heardthat.in` / `chaiandchaos`

## Run locally
```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Production build
```bash
npm run build
npm run start
```

## Environment
Copy `.env.example` to `.env.local` and set values.

- `AUTH_SECRET` and `AUTH_SALT` are required for secure session signing.
- SMTP variables are optional. If not provided, confirmation emails are captured in local JSON transport and reflected in the admin log.

## Notes
- Data persistence is in-memory for this prototype (events, bookings, notes, users, inquiries) and resets on server restart.
- For production: replace in-memory stores with a database + persistent object storage.
