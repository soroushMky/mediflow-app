import './app.css';
import Logo from './Logo';
import { WorkflowNav } from './SignOff';
import {
  SearchIcon,
  PhoneIcon,
  BellIcon,
  CheckCircleIcon,
  CircleIcon,
} from './icons';

const REFERENCE = [
  { label: 'Patient', value: 'Sarah Jenkins' },
  { label: 'Document type', value: 'SOAP progress note' },
  { label: 'Encounter date', value: 'Oct 24, 2026, 2:15 PM' },
  { label: 'Reference ID', value: 'MF-2026-0042', mono: true },
];

const CARRIED_OVER = [
  'Confirm medication dosage at next contact',
  'Add updated emergency contact',
];

const STATS = [
  { label: 'Up next in', value: '12 min', accent: 'accent-blue' },
  { label: 'Filed today', value: '6', accent: 'accent-green' },
];

export default function NoteFiled({ onNavigate }) {
  return (
    <div className="shell">

      <header className="topbar">
        <div className="topleft">
          <Logo />
          <WorkflowNav current="filed" onNavigate={onNavigate} />
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
        <span className="tag">Finalized</span>
      </div>

      <main className="grid">

        <section className="card" aria-labelledby="filed-heading">
          <div className="successhead">
            <span className="icon-circle">
              <CheckCircleIcon strokeWidth={2} />
            </span>
            <h3 id="filed-heading">Clinical note filed</h3>
          </div>
          <p className="subtext">Documentation for Sarah Jenkins has been committed to the record.</p>

          <div className="reflist">
            {REFERENCE.map(({ label, value, mono }) => (
              <div className="refrow" key={label}>
                <span className="k">{label}</span>
                <span className={mono ? 'v mono' : 'v'}>{value}</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginBottom: 10 }}>Carried-over action items</h3>
          <ul className="chiprow" aria-label="Items flagged during review">
            {CARRIED_OVER.map((item) => (
              <li className="chip idle" key={item}>
                <CircleIcon strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <aside aria-label="Session metrics and next actions">
          <div className="hero">
            <div className="label mono">EFFICIENCY GAINED</div>
            <div className="big">38% faster</div>
            <svg className="sparkline" viewBox="0 0 240 36" width="100%" height="36" aria-hidden="true">
              <path
                d="M0 24 Q20 8 35 24 T70 18 T105 26 T140 10 T175 22 T210 16 T240 20"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
              />
            </svg>
            <div className="compare mono"><span>4M 12S</span><span>VS 6M 45S</span></div>
          </div>

          <div className="minigrid">
            {STATS.map(({ label, value, accent }) => (
              <div className="mini" key={label}>
                <div className="l">{label}</div>
                <div className={`v ${accent}`}>{value}</div>
              </div>
            ))}
          </div>

          <button className="btn primary" type="button" onClick={() => onNavigate('profile')}>
            Go to next patient
          </button>
          <button className="linklike" type="button" onClick={() => onNavigate('signoff')}>
            Back to sign-off
          </button>
        </aside>

      </main>
    </div>
  );
}