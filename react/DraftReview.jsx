import { useState, useEffect } from 'react';
import Logo from './Logo';
import './app.css';
import { WorkflowNav } from './SignOff';
import {
  SearchIcon,
  PhoneIcon,
  BellIcon,
  ChevronDownIcon,
  FlagIcon,
  UserPlusIcon,
  HashIcon,
} from './icons';

const NOTE_LINES = [
  {
    id: 'subjective',
    section: 'Subjective',
    text: 'Patient reports improved sleep, averaging 7 hours nightly, with mild residual anxiety before morning sessions.',
    timestamp: '04:12',
    quote: "Yeah, sleep's been a lot better, maybe seven hours most nights. Still a bit anxious right before we start, though.",
  },
  {
    id: 'objective',
    section: 'Objective',
    text: 'Affect congruent, speech regular pace, no acute distress observed.',
    timestamp: '11:30',
    quote: "I feel like I'm finally getting some control over it, instead of it controlling me.",
  },
  {
    id: 'assessment',
    section: 'Assessment',
    text: 'Generalized anxiety, gradually improving with current approach.',
    timestamp: '19:05',
    quote: 'I think the breathing thing really does help when work gets stressful.',
    needsReview: true,
  },
  {
    id: 'plan',
    section: 'Plan',
    text: 'Continue weekly sessions, introduce grounding exercise homework, follow up in 7 days.',
    timestamp: '26:48',
    quote: "Let's try adding a grounding exercise for home, and check in again next week.",
  },
];

function NoteLine({ line, expanded, onToggle }) {
  return (
    <li className="noteitem" data-expanded={expanded}>
      <button
        className="head"
        aria-expanded={expanded}
        aria-controls={`transcript-${line.id}`}
        onClick={() => onToggle(line.id)}
      >
        <div className="headtext">
          <div className="sectionrow">
            <span className="sectionlabel">{line.section}</span>
            {line.needsReview && <span className="chip idle" style={{ padding: '2px 8px' }}>Needs review</span>}
          </div>
          <div className="linetext">{line.text}</div>
        </div>
        <ChevronDownIcon className="chevron" />
      </button>

      <div className="transcript" id={`transcript-${line.id}`}>
        <div className="meta mono">SOURCE · {line.timestamp}</div>
        <div className="quote">&ldquo;{line.quote}&rdquo;</div>
        <div className="lineactions">
          <button type="button">Confirm accuracy</button>
          <button type="button">Refine phrasing</button>
        </div>
      </div>
    </li>
  );
}

export default function DraftReview({ onNavigate }) {
  const [expandedId, setExpandedId] = useState(null);
  const [urgentFlagged, setUrgentFlagged] = useState(false);

  const toggleLine = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const confirmedCount = NOTE_LINES.length - 1; // one line still needs review
  const confirmedPct = Math.round((confirmedCount / NOTE_LINES.length) * 100);

  // Grows the bar in on mount rather than rendering already-full,
  // matching the same effect in the plain HTML/JS version.
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setBarWidth(confirmedPct));
    return () => cancelAnimationFrame(frame);
  }, [confirmedPct]);

  return (
    <div className="shell">

      <header className="topbar">
        <div className="topleft">
          <Logo />
          <WorkflowNav current="draft" onNavigate={onNavigate} />
        </div>

        <div className="topright">
          <div className="search" role="search">
            <SearchIcon strokeWidth={2} />
            Search session notes…
          </div>
          <button className="iconbtn" aria-label="Call patient">
            <PhoneIcon />
          </button>
          <button className="iconbtn" aria-label="Notifications, 1 unread">
            <BellIcon />
            <span className="dot" aria-hidden="true" />
          </button>
          <div className="avatar" role="img" aria-label="Signed in as Dr. S. Jenkins">SJ</div>
        </div>
      </header>

      <div className="patientbar">
        <span><b>Sarah Jenkins</b></span>
        <span>Session · Oct 24, 2026 · 2:15 PM</span>
        <span className="tag">AI-generated draft</span>
      </div>

      <main className="grid">

        <section className="card" aria-labelledby="draft-heading">
          <div className="scorebar">
            <h3 id="draft-heading" style={{ margin: 0 }}>Clinical encounter draft</h3>
            <span className="score">92%</span>
          </div>

          <ul className="notelist" aria-label="AI-generated note, tap a line to verify against the recording">
            {NOTE_LINES.map((line) => (
              <NoteLine
                key={line.id}
                line={line}
                expanded={expandedId === line.id}
                onToggle={toggleLine}
              />
            ))}
          </ul>
        </section>

        <aside aria-label="Quick actions and review status">

          <div className="card" style={{ marginBottom: 14 }}>
            <h3 style={{ marginBottom: 10 }}>Quick actions</h3>
            <div className="actionlist">
              <button
                type="button"
                aria-pressed={urgentFlagged}
                className={urgentFlagged ? 'toggled' : ''}
                onClick={() => setUrgentFlagged((v) => !v)}
              >
                <FlagIcon />
                Flag urgent
              </button>
              <button type="button">
                <UserPlusIcon />
                Request consultation
              </button>
              <button type="button">
                <HashIcon />
                Add diagnosis code
              </button>
            </div>

            <div className="reflist">
              <div className="refrow"><span className="k">Model</span><span className="v mono">MediFlow AI v2.4</span></div>
              <div className="refrow"><span className="k">Confidence</span><span className="v accent-green">92%</span></div>
              <div className="refrow"><span className="k">Word count</span><span className="v">184</span></div>
            </div>
          </div>

          <div className="hero">
            <div className="label mono">REVIEW PROGRESS</div>
            <div className="big">{confirmedCount} of {NOTE_LINES.length} lines</div>
            <div className="progressbar"><span style={{ width: `${barWidth}%` }} /></div>
            <div className="compare mono" style={{ marginTop: 10 }}><span>CONFIRMED</span><span>{confirmedPct}%</span></div>
          </div>

          <button className="btn primary" type="button" onClick={() => onNavigate('signoff')}>
            Finalize note
          </button>
        </aside>

      </main>
    </div>
  );
}