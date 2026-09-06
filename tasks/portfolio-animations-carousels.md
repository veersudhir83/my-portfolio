# Plan: Tech animations + carousel for portfolio

Static HTML/CSS/JS site (no framework, no build step). Adding tasteful,
performant enhancements — no fabricated content (no fake testimonials/logos).

## Checklist

- [x] 1. Domains strip -> infinite auto-scroll marquee (real carousel effect,
      pause on hover, seamless loop)
- [x] 2. Hero section -> animated drifting gradient blobs behind copy (CSS only)
- [x] 3. Spotlight cursor-glow hover effect on impact/skill/credential/about cards
- [x] 4. Timeline (Experience) -> scroll-linked progress line fill
- [x] 5. prefers-reduced-motion overrides for all new animations
- [x] 6. Verify in browser (Playwright screenshot, check console errors)
- [x] 7. Commit and push

## Summary

Added four tasteful, performance-light enhancements to the static site
(no framework/build step, no new dependencies):

1. **Domains strip -> marquee carousel** (`.domains-marquee`, `@keyframes marquee`):
   duplicated track scrolls infinitely, pauses on hover, `white-space: nowrap`.
2. **Hero background** (`.hero-bg`, `.hero-blob`, `@keyframes drift`): two blurred
   radial-gradient blobs in the existing accent/amber palette drift slowly behind
   the hero copy (`z-index: -1`, `pointer-events: none`).
3. **Spotlight hover glow** (`.spotlight` class + JS mousemove listener in
   `main.js`): radial gradient follows the cursor via `--x`/`--y` CSS vars on
   impact cards, skill cards, the about-card aside, and credential items.
4. **Timeline scroll-progress fill** (`.timeline::before` + scroll listener):
   the experience timeline's vertical line fills with the accent gradient as
   the section scrolls into view.

All new animations are disabled under `prefers-reduced-motion: reduce`
(marquee, blob drift, pulse dot, reveal transitions, timeline fill; the JS
scroll listener is also skipped entirely when reduced motion is requested).

Verified with a local static server + headless Chromium (Playwright):
hero blobs and marquee render correctly, no real console errors (the one
`ERR_CONNECTION_RESET` was the sandboxed Google Fonts request, unrelated to
this change), timeline fill visibly tracks scroll position.

Files touched: `index.html`, `css/styles.css`, `js/main.js`.
