// Maps a nav item's data-view to the page it should link to.
// Add an entry here once a new screen actually exists.
const NAV_ROUTES = {
  draft: 'draft-review.html',
  signoff: 'sign-off.html',
  filed: 'note-filed.html',
  profile: 'patient-profile.html',
  scheduling: 'scheduling.html',
};

// Reads <body data-page="..."> to know which screen is currently showing,
// then marks the matching nav item active, makes built screens clickable,
// and leaves not-yet-built screens visibly disabled. One nav definition
// in the HTML, no per-page "active"/"disabled" duplication needed.
function initNav() {
  const currentPage = document.body.dataset.page;

  document.querySelectorAll('.navitem').forEach((item) => {
    const view = item.dataset.view;

    if (view === currentPage) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'step');
      return;
    }

    const href = NAV_ROUTES[view];

    if (!href) {
      item.classList.add('disabled');
      item.setAttribute('aria-disabled', 'true');
      return;
    }

    item.classList.add('navlink');
    item.setAttribute('role', 'link');
    item.setAttribute('tabindex', '0');

    const go = () => {
      window.location.href = href;
    };

    item.addEventListener('click', go);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        go();
      }
    });
  });
}

// Buttons for screens that don't exist yet (e.g. "Modify draft" before
// Draft Review is built). Clicking gives honest feedback instead of doing
// nothing silently.
function initPlaceholderButtons() {
  document.querySelectorAll('[data-placeholder]').forEach((button) => {
    const originalText = button.textContent;

    button.addEventListener('click', () => {
      button.textContent = button.dataset.placeholder;
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    });
  });
}

// Draft Review: tap a note line to reveal the transcript snippet it came
// from. Each .noteitem toggles its own data-expanded attribute, which the
// CSS reads to show/hide the .transcript panel.
function initNoteLines() {
  document.querySelectorAll('.noteitem').forEach((item) => {
    const head = item.querySelector('.head');
    if (!head) return;

    const setExpanded = (expanded) => {
      item.setAttribute('data-expanded', expanded ? 'true' : 'false');
      head.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };

    head.addEventListener('click', () => {
      const isExpanded = item.getAttribute('data-expanded') === 'true';
      setExpanded(!isExpanded);
    });
  });
}

// Quick clinical action buttons that are simple on/off toggles
// (e.g. "Flag urgent") rather than placeholders or navigation.
function initToggleButtons() {
  document.querySelectorAll('[data-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('toggled');
      const isOn = button.classList.contains('toggled');
      button.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    });
  });
}

// Patient Profile: each tracked problem has a status chip that cycles
// between "Ongoing" and "Resolved" on click.
function initStatusToggles() {
  document.querySelectorAll('.statuschip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const isOngoing = chip.classList.contains('ongoing');
      chip.classList.toggle('ongoing', !isOngoing);
      chip.classList.toggle('resolved', isOngoing);
      chip.textContent = isOngoing ? 'Resolved' : 'Ongoing';
      chip.setAttribute('aria-pressed', isOngoing ? 'true' : 'false');
    });
  });
}

// Scheduling: each appointment row's Cancel button toggles a canceled
// state (strikethrough + button becomes "Restore").
function initApptActions() {
  document.querySelectorAll('.apptrow').forEach((row) => {
    const cancelBtn = row.querySelector('[data-cancel]');
    if (!cancelBtn) return;

    cancelBtn.addEventListener('click', () => {
      const isCanceled = row.classList.toggle('canceled');
      cancelBtn.classList.toggle('canceled', isCanceled);
      cancelBtn.textContent = isCanceled ? 'Restore' : 'Cancel';
    });
  });
}

// Scheduling: booking a new appointment adds a real row to the list
// above, instead of just showing a placeholder message.
function initBookingForm() {
  const form = document.querySelector('[data-book-form]');
  const list = document.querySelector('[data-appt-list]');
  if (!form || !list) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('[name="patient"]').value.trim();
    const time = form.querySelector('[name="time"]').value.trim();
    const type = form.querySelector('[name="type"]').value.trim();
    if (!name || !time) return;

    const li = document.createElement('li');
    li.className = 'apptrow';
    li.innerHTML = `
      <div class="info">
        <span class="time mono">${time}</span>
        <span class="name">${name}</span>
        <span class="type">${type || 'Appointment'}</span>
      </div>
      <div class="apptactions">
        <button type="button" data-placeholder="Opens calendar picker">Reschedule</button>
        <button type="button" data-cancel>Cancel</button>
      </div>
    `;

    list.appendChild(li);
    initApptActions();
    initPlaceholderButtons();
    form.reset();
  });
}

// Draft Review: progress bar grows from 0 to its target width on load,
// instead of just appearing already full — paired with the CSS
// transition on .progressbar > span.
function initProgressBars() {
  document.querySelectorAll('.progressbar > span').forEach((bar) => {
    const target = bar.style.width;
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.width = target;
      });
    });
  });
}

// Animated network background (Vanta.NET). Skips itself if the person
// prefers reduced motion, or if the CDN scripts failed to load (e.g. no
// internet) — the static CSS gradient on <body> is the fallback either way.
function initVantaBackground() {
  const el = document.getElementById('vanta-bg');
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  if (typeof VANTA === 'undefined' || !VANTA.NET) return;

  VANTA.NET({
    el,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x4c8dff,       // matches --blue-1
    backgroundColor: 0x101216, // matches --bg
    points: 8.00,
    maxDistance: 22.00,
    spacing: 18.00,
    showDots: true,
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initPlaceholderButtons();
  initNoteLines();
  initToggleButtons();
  initStatusToggles();
  initApptActions();
  initBookingForm();
  initProgressBars();
  initVantaBackground();
});