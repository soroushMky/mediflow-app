<div align="center">

![MediFlow banner](docs/banner.svg)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-4C8DFF?style=for-the-badge)](https://your-site-name.netlify.app)
![Status](https://img.shields.io/badge/Status-Concept%20Prototype-3DDC91?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-HTML%20·%20CSS%20·%20JS%20·%20React-1F2937?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-9CA3AF?style=flat-square)

**A clinical documentation assistant for therapists — designed around the one thing every competitor skipped: making an AI-generated note fast to *trust*, not just fast to *generate*.**

</div>

> (https://medicalflow-app.netlify.app/)

---

## Table of contents

- [The problem](#the-problem)
- [The research](#the-research)
- [The four pillars](#the-four-pillars)
- [User flow](#user-flow)
- [Screens](#screens)
- [Design system](#design-system)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Roadmap](#roadmap)
- [About this project](#about-this-project)

---

## The problem

It started with a complaint I kept hearing. A therapist I know would come home most evenings and spend the time he should've had to himself finishing patient notes instead. He'd started using an AI tool to draft them — fast, but he was never quite sure if what it wrote was actually right, so he ended up checking everything line by line anyway.

The tool was supposed to save him time. Instead, it just moved the work from *writing* to *double-checking*.

That's the whole problem in one sentence: **AI scribes have gotten fast. Almost none of them got trustworthy.** MediFlow starts from a different question — not *"how do we draft a note faster,"* but *"what would it actually take for a clinician to trust a note he didn't write himself, without rereading the whole thing?"*

## The research

A look at how the major AI documentation tools for therapists handle the moment of review — where trust is either built or lost.

| Tool | Strength | Where it falls short |
|---|---|---|
| **Mentalyc** | Purpose-built for therapists, strong privacy, supports SOAP/DAP/GIRP | Treatment planning stays largely static; little insight across sessions |
| **Upheal** | Popular, free entry tier, multi-language | Struggles with speaker ID, occasional fabricated dialogue; drifting toward full-EHR scope |
| **Eleos** | Strong for large clinics — supervision dashboards, org analytics | Less ideal for a solo clinician wanting a simple, fast workflow |
| **Blueprint** | Ties notes directly to standardized assessments (PHQ-9, GAD-7) | Notes can feel repetitive or overly dependent on scale data |
| **TherapyNotes** | Built into an EHR clinicians already use | Note quality still depends heavily on manual edits |

**The gap:** almost every tool solves drafting a single session well. Almost none of them solve *continuity* — keeping a patient's problems, progress, and history connected across sessions, the way a therapist actually has to think. Mentalyc calls this the "golden thread" and treats it as a premium feature — which tells you it's rare, not standard.

## The four pillars

![Four pillars diagram](docs/diagrams/four-pillars.svg)

1. **Trust Layer** — tap any line in the note, see the exact transcript moment it came from. Verification becomes a 2-second tap instead of a full reread.
2. **Relief Moment** — signing off shows a quiet acknowledgment (time saved vs. your average), turning documentation from a chore into a small, earned checkpoint.
3. **Problem Tracking** — every problem a patient has ever mentioned lives in one place, marked resolved or ongoing. The direct answer to the continuity gap the research surfaced.
4. **Predictive Teaser** — a soft burnout trend and follow-up suggestion, shown deliberately as a concept rather than a finished, validated model.

## User flow

![Clinician flow diagram](docs/diagrams/clinician-flow.svg)

The main loop repeats every visit: **Draft Review → Sign-off → Note Filed → Patient Profile**, then back to Draft Review for the next patient. **Scheduling** sits outside that loop entirely — it's a utility accessible anytime, not tied to a single visit.

A real design decision worth calling out: when the AI flags something missing (a vitals reading, a follow-up date), it **does not block sign-off**. The flag travels forward — into Sign-off, into Note Filed — as a visible to-do, instead of halting the clinician's day over an honest gap in the information.

## Screens

### Draft Review
The core of the Trust Layer — tap any line to reveal its source, see a live accuracy score, confirm or flag lines individually.

![Draft Review screenshot](docs/screenshots/draft-review.png)

### Sign-off
The Relief Moment — a verification checklist, the session-time comparison, and the finalize action.

![Sign-off screenshot](docs/screenshots/sign-off.png)

### Note Filed
Confirms the note is committed, and shows exactly which flagged items carried forward as action items.

![Note Filed screenshot](docs/screenshots/note-filed.png)

### Patient Profile
Appointment history, problem tracking with resolved/ongoing toggles, prescriptions, and pre-visit notes.

![Patient Profile screenshot](docs/screenshots/patient-profile.png)

### Scheduling
Today's appointments, with real cancel/restore actions and a working booking form.

![Scheduling screenshot](docs/screenshots/scheduling.png)

## Design system

A dark, glass-material aesthetic — frosted panels over an animated network background, with a deliberately restrained two-color palette doing all the semantic work (no third accent color anywhere in the product).

| Token | Value | Used for |
|---|---|---|
| `--blue-1` / `--blue-2` | `#4C8DFF` / `#1E54B7` | Primary actions, active states, the Relief Moment hero card |
| `--green-1` / `--green-2` | `#3DDC91` / `#1E8F5C` | Confirmation, resolved states, success chips |
| `--bg` | `#101216` | Base background |
| `--ink` | `#F3F2F0` | Primary text |

Typography: **Plus Jakarta Sans** for UI text, **IBM Plex Mono** for data labels, timestamps, and anything meant to read as a precise system value rather than prose.

Every card uses a layered "liquid glass" treatment — backdrop blur + saturation boost, a soft top-edge highlight, and a diagonal glossy sheen — rather than a flat tinted box.

## Tech stack

- **HTML / CSS / JS** — the primary, dependency-free version. Plain DOM APIs for all interactivity (expand/collapse, toggles, the booking form).
- **React** — a parallel port of every screen, same design system, same logic, idiomatic component structure (shared `WorkflowNav`, extracted icon set, data-driven lists).
- **Three.js + Vanta.NET** — the animated background network, loaded via CDN in the HTML version and via npm in the React version.
- **Google Fonts** — Plus Jakarta Sans, IBM Plex Mono.

No backend. No real AI model. No database. This is a front-end prototype — see [Roadmap](#roadmap) for what's intentionally not real yet.

## Getting started

### Plain HTML/CSS/JS
```bash
# just open it — no build step
open html/sign-off.html
# or serve the folder so relative paths and Live Server reload work:
# (VS Code) right-click index.html → "Open with Live Server"
```

### React
```bash
npm create vite@latest mediflow-app -- --template react
cd mediflow-app
npm install three vanta   # required for the animated background
# copy every file from /react into src/
npm run dev
```

## Project structure

```
mediflow-app/
├── index.html              # redirects to html/sign-off.html
├── docs/
│   ├── banner.svg
│   ├── diagrams/
│   └── screenshots/
├── html/
│   ├── sign-off.html
│   ├── draft-review.html
│   ├── note-filed.html
│   ├── patient-profile.html
│   └── scheduling.html
├── css/
│   └── styles.css          # design tokens + every component style
├── js/
│   └── script.js           # nav routing, toggles, booking form, Vanta init
└── react/
    ├── App.jsx              # view-state router + mounts VantaBackground once
    ├── SignOff.jsx          # also exports the shared WorkflowNav
    ├── DraftReview.jsx
    ├── NoteFiled.jsx
    ├── PatientProfile.jsx
    ├── Scheduling.jsx
    ├── Logo.jsx
    ├── VantaBackground.jsx
    ├── icons.jsx             # every icon as its own component
    └── app.css
```

## Roadmap

What's real vs. what's intentionally a sketch, stated plainly:

- ✅ **Built**: all five screens, full navigation, the Trust Layer interaction, problem-status toggles, a working (client-side only) booking form
- 🧪 **Conceptual, not real**: the Predictive Teaser card — no actual model behind the burnout trend or follow-up suggestion
- 🔜 **Next, if this became a real product**:
  - Validate the evidence-linking pattern with real clinicians
  - Prototype an actual predictive model against real outcome data
  - Usability-test the gap-flagging tone so it reads as supportive, not punitive
  - Replace the client-side booking form with a real backend + persistence

## About this project

Designed and built as a UX case study exploring AI documentation trust, for therapists specifically, over a focused one-week sprint — research, flow mapping, wireframe synthesis, and high-fidelity design with motion.

Part of a UX/product design portfolio. See the full written case study (research process, wireframe iterations, key design decisions) at **[link to your portfolio case study]**.

---

<div align="center">

*Built with Figma, Figma Motion, Visily, and a lot of back-and-forth on what "trust" actually looks like on a screen.*

</div>
