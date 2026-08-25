# Naomi Eyenga — Portfolio

A premium, story-driven portfolio built with React, Tailwind CSS, and Framer Motion. It tells the story of a software engineering student who started in product design and is becoming a full-stack engineer — through an interactive journey timeline, a flagship project spotlight, a living learning roadmap, and a "Building in Public" log.

## Design concept

- **Signature motif — the design canvas.** Every section sits on a faint dot-grid ("canvas-grid"), and section labels read like Figma layer paths ("Frame / Journey"), tying the whole page to the idea of a design file becoming a real product.
- **Signature illustration.** The hero features a hand-built SVG that morphs a wireframe card into working code (`src/components/ui/SketchToCode.jsx`) — the whole narrative in one image.
- **Palette.** Deep blue `#1E3A8A` anchors the UI, with soft cyan and light violet accents, generous white space, and a dark mode built on a near-navy ink background.
- **Type.** Fraunces (display serif) for personality, Inter for readable body copy, JetBrains Mono for labels, tags, and code-flavored details.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
```

Requires Node.js 18+.

## Project structure

```
src/
  components/
    ui/                    Reveal, SectionHeader, Badge, Blob, SketchToCode — shared primitives
    Nav.jsx                Sticky nav with dark mode toggle
    Hero.jsx               Hero with animated background + signature illustration
    About.jsx              Quick-read "who I am" cards
    Journey.jsx             Interactive vertical journey timeline (the core story)
    Values.jsx              Core values as premium cards
    Projects.jsx             Flagship project (TaskFlow) + project grid
    Roadmap.jsx              Learning roadmap with progress bars
    TechStack.jsx            Tools grouped by category
    Experience.jsx           Impact-focused experience timeline
    Process.jsx              Research to deployment process strip
    BuildingInPublic.jsx     Current challenge, milestones, learning log
    Contact.jsx              Closing call to action
    Footer.jsx
  data/content.js           All copy and structured content in one place
  hooks/useTheme.js         Dark mode hook (persisted to localStorage)
  index.css                 Tailwind layers + canvas-grid utility
  App.jsx / main.jsx
```

## Editing content

Everything you will want to personalize — name, journey stages, projects, tech stack, roadmap, experience, "Building in Public" log — lives in `src/data/content.js`. Components stay purely presentational.

## Notes

- Dark mode respects `prefers-color-scheme` on first visit and then remembers the user's choice.
- Motion respects `prefers-reduced-motion`.
- Project cover images are placeholders (`CoverPlaceholder` in `Projects.jsx`) — swap in real screenshots when ready.
