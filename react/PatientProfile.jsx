import { useState } from 'react';
import Logo from './Logo';
import './app.css';
import { WorkflowNav } from './SignOff';
import {
  SearchIcon,
  PhoneIcon,
  BellIcon,
  ChevronDownIcon,
} from './icons';

const HISTORY = [
  {
    id: 'oct24',
    date: 'Oct 24, 2026',
    type: 'Follow-up — most recent session',
    recap: 'Sleep improved to ~7 hours nightly; mild residual anxiety before sessions. Continued weekly cadence, grounding exercise assigned as homework.',
  },
  {
    id: 'oct10',
    date: 'Oct 10, 2026',
    type: 'Follow-up',
    recap: 'Reported difficulty falling asleep and racing thoughts at night. Introduced a structured breathing technique to use before bed.',
  },
  {
    id: 'sep26',
    date: 'Sep 26, 2026',
    type: 'Initial follow-up',
    recap: 'Discussed onset of work-related anxiety, particularly around morning meetings. Began weekly CBT-based sessions.',
  },
];

const INITIAL_PROBLEMS = [
  { id: 'sleep', label: 'Sleep disturbance', resolved: true },
  { id: 'anxiety', label: 'Work-related anxiety', resolved: false },
  { id: 'avoidance', label: 'Avoidance of morning meetings', resolved: false },
];

const PRESCRIPTIONS = [
  { label: 'Sertraline 50mg', value: 'Once daily, AM, with food' },
  { label: 'Hydroxyzine 25mg', value: 'PRN, max 2× daily' },
];

const DOCUMENTS = [
  { label: 'Psychiatry consult summary', value: 'Sep 02' },
  { label: 'Intake assessment', value: 'Aug 15' },
];

function HistoryItem({ visit, expanded, onToggle }) {
  return (
    <li className="noteitem" data-expanded={expanded}>
      <button
        className="head"
        aria-expanded={expanded}
        aria-controls={`recap-${visit.id}`}
        onClick={() => onToggle(visit.id)}
      >
        <div className="headtext">
          <div className="sectionrow"><span className="sectionlabel">{visit.date}</span></div>
          <div className="linetext">{visit.type}</div>
        </div>
        <ChevronDownIcon className="chevron" />
      </button>
      <div className="transcript" id={`recap-${visit.id}`}>
        <div className="quote">{visit.recap}</div>
      </div>
    </li>
  );
}

export default function PatientProfile({ onNavigate }) {
  const [expandedId, setExpandedId] = useState(null);
  const [problems, setProblems] = useState(INITIAL_PROBLEMS);

  const toggleHistory = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const toggleProblem = (id) => {
    setProblems((current) =>
      current.map((p) => (p.id === id ? { ...p, resolved: !p.resolved } : p))
    );
  };

  return (
    <div className="shell">

      <header className="topbar">
        <div className="topleft">
          <Logo />
          <WorkflowNav current="profile" onNavigate={onNavigate} />
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
        <span>45 · Follow-up: Generalized anxiety</span>
        <span className="tag">Up next</span>
      </div>

      <main className="grid">

        <div>
          <section className="card" aria-labelledby="history-heading">
            <h3 id="history-heading">Appointment history</h3>
            <ul className="notelist" aria-label="Past appointments, tap to view recap">
              {HISTORY.map((visit) => (
                <HistoryItem
                  key={visit.id}
                  visit={visit}
                  expanded={expandedId === visit.id}
                  onToggle={toggleHistory}
                />
              ))}
            </ul>
          </section>

          <section className="card sectiongap" aria-labelledby="problems-heading">
            <h3 id="problems-heading">Problems tracked</h3>
            <div className="problemlist">
              {problems.map((problem) => (
                <div className="problemrow" key={problem.id}>
                  <span className="label">{problem.label}</span>
                  <button
                    type="button"
                    className={`statuschip ${problem.resolved ? 'resolved' : 'ongoing'}`}
                    aria-pressed={!problem.resolved}
                    onClick={() => toggleProblem(problem.id)}
                  >
                    {problem.resolved ? 'Resolved' : 'Ongoing'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside aria-label="Visit prep">
          <div className="hero">
            <div className="label mono">UP NEXT</div>
            <div className="big">12 min</div>
            <div className="compare mono"><span>ROOM</span><span>4</span></div>
          </div>

          <div className="card sectiongap" style={{ marginBottom: 14 }}>
            <h3 style={{ marginBottom: 10 }}>Prescriptions</h3>
            <div className="reflist">
              {PRESCRIPTIONS.map(({ label, value }) => (
                <div className="refrow" key={label}>
                  <span className="k">{label}</span>
                  <span className="v">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <h3 style={{ marginBottom: 10 }}>Pre-visit notes</h3>
            <textarea className="notesbox" placeholder="Add a note before this session…" />
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <h3 style={{ marginBottom: 10 }}>Relevant documents</h3>
            <div className="reflist">
              {DOCUMENTS.map(({ label, value }) => (
                <div className="refrow" key={label}>
                  <span className="k">{label}</span>
                  <span className="v">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="btn primary" type="button" onClick={() => onNavigate('draft')}>
            Start session
          </button>
        </aside>

      </main>
    </div>
  );
}
