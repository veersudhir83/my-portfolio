# Plan: Fix section spacing/overlap, nav-anchor position, one-page resume

## Root cause found

`.container { padding: 0 24px; }` (class selector) beats `section { padding: 90px 24px; }`
(element selector) in specificity for every section that carries both classes
(impact/about/experience/skills/credentials/contact all use `class="X container"`).
This silently zeroed out vertical section padding site-wide, which explains both:
- sections butting directly against each other (no visual separation)
- clicking a nav anchor (#about, #impact) lands the section flush against the
  sticky header with no clearance

## Checklist

- [x] 1. Fix `.container` to only set horizontal padding (root-cause fix for
      spacing bug), restoring `section`'s intended 90px vertical padding
- [x] 2. Add `scroll-padding-top` on `html` so anchor jumps clear the sticky
      header explicitly (belt-and-suspenders with #1)
- [x] 3. Rebuild resume PDF as a single page (condense spacing/margins; same
      content) so it opens without a scrollbar
- [x] 4. Verify: screenshot section spacing + nav-anchor clicks, confirm PDF
      page count = 1
- [x] 5. Commit and push (updates existing PR #1)

## Summary

**Root cause of #1 (nav-link position) and #3 (no space between sections):**
`.container { padding: 0 24px; }` is a class selector, so it beat the plain
element selector `section { padding: 90px 24px; }` in specificity. Every
main section (`impact`, `about`, `experience`, `skills`, `credentials`,
`contact`) carries both `class="X container"`, so their vertical padding was
silently zeroed — sections butted directly against each other, and clicking
a nav anchor landed the section flush against the sticky header. Fixed by
changing `.container` to only set `padding-left`/`padding-right`, letting
`section`'s 90px top/bottom padding apply as originally intended. Also added
`scroll-padding-top: 88px` on `html` as an explicit, robust safeguard for
sticky-header clearance on any anchor jump, independent of section padding.
(This bug pre-dated the animation work in the previous commit — confirmed by
inspecting computed styles: `paddingTop`/`paddingBottom` were `0px` on every
section except `.hero`, which has its own higher-specificity class.)

**#2 (one-page resume):** The original PDF was 2 pages, with page 2 holding
only Education & Certifications. Rebuilt from the extracted text with
reportlab (`SimpleDocTemplate`/Platypus), preserving all content and the
original visual style (navy header, rule lines under section headings,
two-column Core Competencies / Technical Skills / Education-Certifications,
timeline-style Experience entries with bold role + right-aligned dates +
italic org line). Tightened margins/leading/spacing iteratively, verified
page count and remaining whitespace with PyMuPDF at each step, landing on a
single page with ~30pt of safety margin at the bottom (not maximally
cramped). File path unchanged (`assets/Sudheer_Veeravalli_Resume.pdf`), so
the existing download links in `index.html` needed no changes.

Verified: computed `getBoundingClientRect`/style checks confirmed 90px
padding restored on every section; screenshots of clicking the About and
Impact nav links show clean clearance below the sticky header; an
incremental-scroll full-page screenshot (real scroll events, unlike a
single-shot fullPage capture which doesn't trigger the scroll-reveal
IntersectionObserver) confirms every section renders correctly with proper
spacing; PDF page count confirmed as 1 via PyMuPDF.

Files touched: `css/styles.css`, `assets/Sudheer_Veeravalli_Resume.pdf`.
