import { useState } from 'react';
import Logo from './Logo';
import './app.css';
import { WorkflowNav } from './SignOff';
import { SearchIcon, PhoneIcon, BellIcon } from './icons';

const INITIAL_APPOINTMENTS = [
  { id: 1, time: '2:15 PM', name: 'Sarah Jenkins', type: 'Follow-up: Generalized anxiety', canceled: false },
  { id: 2, time: '2:30 PM', name: 'Robert Alexander', type: 'Follow-up: Hypertension & Type II diabetes', canceled: false },
  { id: 3, time: '3:00 PM', name: 'Marcus Lin', type: 'Annual wellness exam', canceled: false },
  { id: 4, time: '3:30 PM', name: 'New patient intake', type: 'Unassigned', canceled: false },
];

export default function Scheduling({ onNavigate }) {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [form, setForm] = useState({ patient: '', time: '', type: '' });

  const toggleCanceled = (id) => {
    setAppointments((current) =>
      current.map((a) => (a.id === id ? { ...a, canceled: !a.canceled } : a))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.patient.trim() || !form.time.trim()) return;

    setAppointments((current) => [
      ...current,
      {
        id: Date.now(),
        time: form.time.trim(),
        name: form.patient.trim(),
        type: form.type.trim() || 'Appointment',
        canceled: false,
      },
    ]);
    setForm({ patient: '', time: '', type: '' });
  };

  const activeCount = appointments.filter((a) => !a.canceled).length;

  return (
    <div className="shell">

      <header className="topbar">
        <div className="topleft">
          <Logo />
          <WorkflowNav current="scheduling" onNavigate={onNavigate} />
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
        <span><b>Today</b></span>
        <span>Oct 24, 2026</span>
        <span className="tag">{activeCount} appointments</span>
      </div>

      <main className="grid">

        <div>
          <section className="card" aria-labelledby="appts-heading">
            <h3 id="appts-heading">Today's appointments</h3>
            <ul className="apptlist" aria-label="Today's appointments">
              {appointments.map((appt) => (
                <li className={appt.canceled ? 'apptrow canceled' : 'apptrow'} key={appt.id}>
                  <div className="info">
                    <span className="time mono">{appt.time}</span>
                    <span className="name">{appt.name}</span>
                    <span className="type">{appt.type}</span>
                  </div>
                  <div className="apptactions">
                    <button type="button">Reschedule</button>
                    <button
                      type="button"
                      className={appt.canceled ? 'cancel canceled' : 'cancel'}
                      onClick={() => toggleCanceled(appt.id)}
                    >
                      {appt.canceled ? 'Restore' : 'Cancel'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="card sectiongap" aria-labelledby="book-heading">
            <h3 id="book-heading">Book a new appointment</h3>
            <form className="bookform" onSubmit={handleSubmit}>
              <label htmlFor="patient">Patient name</label>
              <input
                id="patient"
                type="text"
                placeholder="e.g. Jordan Casey"
                value={form.patient}
                onChange={(e) => setForm({ ...form, patient: e.target.value })}
                required
              />

              <label htmlFor="time">Time</label>
              <input
                id="time"
                type="text"
                placeholder="e.g. 4:00 PM"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />

              <label htmlFor="type">Visit type</label>
              <input
                id="type"
                type="text"
                placeholder="e.g. Follow-up: Depression"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />

              <button className="btn primary" type="submit" style={{ marginTop: 4 }}>
                Confirm booking
              </button>
            </form>
          </section>
        </div>

        <aside aria-label="Scheduling overview">
          <div className="hero">
            <div className="label mono">BOOKED TODAY</div>
            <div className="big">{activeCount}</div>
            <div className="compare mono"><span>AVAILABLE SLOTS</span><span>3</span></div>
          </div>

          <div className="card sectiongap">
            <h3 style={{ marginBottom: 10 }}>Waitlist</h3>
            <p className="subtext">No patients waiting for an earlier slot today.</p>
            <button className="btn ghost" type="button">Add to waitlist</button>
          </div>
        </aside>

      </main>
    </div>
  );
}