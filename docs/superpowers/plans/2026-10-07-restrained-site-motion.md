# Restrained site motion implementation plan

> **For agentic workers:** Use superpowers:executing-plans for this tightly coupled implementation and superpowers:requesting-code-review for final review.

**Goal:** Add the quiet photographic depth of auc.am to SHINEX while preserving its professional character, readable content, and existing navigation.

**Architecture:** Keep page content and images server rendered. A small client boundary observes explicitly marked elements inside the main content. CSS supplies one-time entrance and line animations; a passive scroll listener schedules image transforms only for visible images on desktop. No animation dependency, scroll interception, image replacement, or content changes.

**Tech stack:** Next.js 16.2.11, React 19, TypeScript, CSS, IntersectionObserver, requestAnimationFrame.

## Implementation

- [ ] Add `components/motion/site-motion.tsx` and `lib/site-motion.ts`. The component owns setup/cleanup on route changes. The controller skips initially visible content, reveals lower sections once, and cancels observers/listeners/frames when motion preferences change or the component unmounts.
- [ ] Add scoped motion styles in `app/globals.css`. Use a 14px entrance over 640ms with smooth deceleration, 16px maximum horizontal photo movement, and 24px maximum vertical hero movement. Overscan only the photo layer, never its surrounding layout. Disable desktop parallax on touch/mobile and all new animation for reduced motion and print.
- [ ] Wrap main content with the client boundary in `app/[locale]/layout.tsx`, passing server-rendered children unchanged.
- [ ] Mark `components/ui/section-heading.tsx` and `components/ui/service-card.tsx` for one-time entrance. Nest service photographs in clipped, alternating horizontal layers; reduce existing hover enlargement to 1.025 and limit it to motion-safe pointer hover.
- [ ] Nest the photograph in `components/sections/hero.tsx` in a vertical photo layer. Leave its title, explanatory copy, and calls to action immediately visible. Animate only the existing decorative copper rule at initial load.
- [ ] Add decorative copper line drawing to `components/sections/work-process.tsx`, following the existing vertical mobile / horizontal desktop layout. All step text remains visible and ordered.

## Verification

- [ ] Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Run `npm run seo:check` because the locale layout now includes a client boundary. Confirm existing metadata and server-rendered content remain intact.
- [ ] Inspect the local site in the browser at desktop and mobile sizes. Check photo movement, clipping, section entrances, process lines, internal navigation, consultation dialog, and absence of horizontal overflow.
- [ ] Verify progressive enhancement: baseline HTML/CSS leaves every text block visible, motion preferences gate animation, and cleanup removes scroll work. Check all supported locale home pages.
- [ ] Request independent code review while browser verification runs, resolve actionable findings, and report only checks actually completed.

## Scope

The user approved adding animations after reviewing the reference analysis. This pass uses existing assets and content; interactive material selection and before/after scenes require additional imagery and are outside this animation pass. Changes stay in the supplied workspace for review.
