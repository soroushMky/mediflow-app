import './app.css';
import Logo from './Logo';
import {
  FileIcon,
  CheckCircleIcon,
  FolderIcon,
  UserIcon,
  CalendarIcon,
  SearchIcon,
  PhoneIcon,
  BellIcon,
  CheckIcon,
  CircleIcon,
  LockIcon,
} from './icons';

// `view` ids that map to screens which actually exist yet.
// Add 'draft', 'profile', 'scheduling' here once those screens are built.
const BUILT_VIEWS = new Set(['draft', 'signoff', 'filed', 'profile', 'scheduling']);

const NAV_ITEMS = [
  { id: 'draft', label: 'Draft review', Icon: FileIcon },
  { id: 'signoff', label: 'Sign-off', Icon: CheckCircleIcon },
  { id: 'filed', label: 'Note filed', Icon: FolderIcon },
  { id: 'profile', label: 'Patient profile', Icon: UserIcon },
  { id: 'scheduling', label: 'Scheduling', Icon: CalendarIcon },
];

const NOTE_SECTIONS = [
  { label: 'Subjective', text: 'Patient reports steadier sleep this week, mild residual anxiety before morning sessions.' },
  { label: 'Objective', text: 'Affect congruent, speech regular pace, no acute distress observed.' },
  { label: 'Assessment', text: 'Generalized anxiety, gradually improving with current approach.' },
  { label: 'Plan', text: 'Continue weekly sessions, introduce grounding exercise homework, follow up in 7 days.' },
];

const CHECKLIST = [
  { label: 'Billing mapped', tone: 'blue', done: true },
  { label: 'Medications reconciled', tone: 'green', done: true },
  { label: 'Follow-up scheduled', tone: 'blue', done: true },
  { label: 'Signature pending', tone: 'idle', done: false },
];

const STATS = [
  { label: 'Accuracy', value: '94%', accent: 'accent-blue' },
  { label: 'Confidence', value: 'High', accent: 'accent-green' },
];

// Shared nav, reused by every screen so they all stay in sync.
// `current` is this screen's own id; `onNavigate` switches the active view in App.jsx.
export function WorkflowNav({ current, onNavigate }) {
  return (
    <nav aria-label="Workflow steps">
      <ul className="navpill">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = id === current;
          const isBuilt = BUILT_VIEWS.has(id);

          if (isActive) {
            return (
              <li key={id} className="navitem active" aria-current="step">
                <Icon />{label}
              </li>
            );
          }

          if (!isBuilt) {
            return (
              <li key={id} className="navitem disabled" aria-disabled="true">
                <Icon />{label}
              </li>
            );
          }

          return (
            <li key={id}>
              <button type="button" className="navitem navlink" onClick={() => onNavigate(id)}>
                <Icon />{label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function SignOff({ onNavigate }) {
  return (
    <div className="shell">

      <header className="topbar">
        <div className="topleft">
          <Logo />
          <WorkflowNav current="signoff" onNavigate={onNavigate} />
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
        <span className="tag">AI-assisted</span>
      </div>

      <main className="grid">

        <section className="card" aria-labelledby="summary-heading">
          <h3 id="summary-heading">Clinical encounter summary</h3>

          {NOTE_SECTIONS.map(({ label, text }) => (
            <p className="note-line" key={label}>
              <b>{label} —</b> <span>{text}</span>
            </p>
          ))}

          <ul className="chiprow" aria-label="Verification checklist">
            {CHECKLIST.map(({ label, tone, done }) => (
              <li className={`chip ${tone}`} key={label}>
                {done ? <CheckIcon /> : <CircleIcon />}
                {label}
              </li>
            ))}
          </ul>
        </section>

        <aside aria-label="Session summary and sign-off actions">
          <div className="hero">
            <div className="label mono">SESSION TIME</div>
            <div className="big">4m 12s</div>
            <svg className="sparkline" viewBox="0 0 240 36" width="100%" height="36" aria-hidden="true">
              <path
                d="M0 24 Q20 8 35 24 T70 18 T105 26 T140 10 T175 22 T210 16 T240 20"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
              />
            </svg>
            <div className="compare mono"><span>YOUR AVG</span><span>6m 45s</span></div>
          </div>

          <div className="minigrid">
            {STATS.map(({ label, value, accent }) => (
              <div className="mini" key={label}>
                <div className="l">{label}</div>
                <div className={`v ${accent}`}>{value}</div>
              </div>
            ))}
          </div>

          <p className="lockline">
            <LockIcon />
            Locked for editing once signed
          </p>

          <button className="btn ghost" type="button" onClick={() => onNavigate('draft')}>
            Modify draft
          </button>
          <button className="btn primary" type="button" onClick={() => onNavigate('filed')}>
            Confirm &amp; sign off
          </button>
        </aside>

      </main>
    </div>
  );
}