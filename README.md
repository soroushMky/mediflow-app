# MediFlow — Sign-off + Note Filed

## /html, /css, /js — plain version, split by file type

```
html/
  sign-off.html
  note-filed.html
css/
  styles.css
js/
  script.js
```

Open `html/sign-off.html` in a browser (or use VS Code's Live Server).

**How navigation works:** the actual page-to-page links ("Confirm & sign
off", "Back to sign-off") are plain `<a href="...">` tags in the HTML —
they work even with JavaScript disabled.

`js/script.js` only handles the *nav pill at the top* — it reads
`<body data-page="signoff">` (or `"filed"`), then:
- marks the matching item active
- makes the other *built* screens clickable (adds the link behavior)
- greys out screens that don't exist yet (Draft review, Patient
  profile, Scheduling) and marks them `aria-disabled`

Because of this, both HTML files use the *exact same* nav markup — no
more manually writing "active" on one page and "disabled" on the other.
Add a new screen by adding one line to `NAV_ROUTES` in `script.js`.

It also gives the two placeholder buttons ("Modify draft", "Go to next
patient") honest feedback when clicked — they briefly show *"isn't
built yet"* instead of doing nothing.

To add a new page: copy one of the two HTML files, change
`data-page="..."`, build out the `<main>` content, and add it to
`NAV_ROUTES` in `script.js`.

## /react and /nextjs
Unchanged — these keep their own conventions (components, CSS Modules,
co-located files), since splitting those by file type would work
against how each framework is normally organized. See the comments in
`App.jsx` / `WorkflowNav.jsx` for how navigation works in those
versions.

## Design tokens
Same as before — `--blue-1/2`, `--green-1/2` etc. at the top of
`css/styles.css`. No pink anywhere.

## Draft Review (new)
The core trust-layer screen. Tap any line in the note to reveal the
transcript snippet it came from — that's the "evidence follows the
claim" decision from the case study, now actually interactive.

- **HTML/JS**: `initNoteLines()` in `script.js` toggles a
  `data-expanded` attribute per line; CSS shows/hides the transcript
  panel. No framework needed for this kind of simple toggle.
- **React**: `DraftReview.jsx` keeps one `expandedId` in state — only
  one line open at a time, closing the previous one automatically.
- **Next.js**: same component, but marked `'use client'` at the top —
  required because it's the first screen using interactive state
  (`useState`) rather than just links.

Because the shared nav reads from one `NAV_ROUTES` / `BUILT_VIEWS` /
`BUILT_ROUTES` list per stack, adding this screen automatically
"un-grayed" the Draft review tab on Sign-off and Note Filed too — no
edits needed there beyond pointing "Modify draft" at the real page.
