# Vibecoding: AI-Driven Agency Web Development

This project was built using an advanced AI-driven workflow commonly referred to as **Vibecoding**. Instead of manually writing every line of CSS and React, the development process was orchestrated through a sequence of high-level design prompts and specialized AI agent "Skills".

By supplying the AI with strict constraints regarding typography, layout aesthetics, and GSAP motion logic, we bypassed the generic "AI-generated" look to produce a premium, editorial-quality web template.

---

## 🧠 The Agent Skills Utilized

To achieve this level of quality, the AI assistant was equipped with several specialized context skills prior to coding. These skills forced the AI to adhere to top-tier agency standards rather than its default, often basic, web development biases.

- **`taste-skill` (High-End Visual Design):** Stripped away generic gradients, heavy shadows, and default fonts. Enforced rules for editorial serifs (`DM Serif Display`), minimalist spacing, and strict color palettes.
- **`cinematic-gsap-lenis-motion-system`:** Provided the AI with the exact boilerplate and React hooks necessary to integrate `@studio-freight/lenis` smooth scrolling with `GSAP ScrollTrigger` safely within the Next.js 14 App Router environment.
- **`staggered-word-reveal`:** Governed the exact CSS clip-path and GSAP `SplitText` logic used to make headings emerge cinematically as they enter the viewport.
- **`animation-on-scroll`:** Dictated the batch-rendering logic (`ScrollTrigger.batch`) used in the masonry grid so that project cards fade and translate up beautifully in groups.
- **`atmosphere-background`:** Guided the creation of the subtle, grainy, dark aesthetic used in sections like the footer and contact forms.

---

## 🗣️ Refined Prompts for Premium UI Generation

If you want to recreate similar results using an AI coding assistant (like Claude, Gemini, or Cursor), use these refined prompt structures rather than asking for "a nice website".

### 1. The Foundation Prompt (Architecture & Taste)
> *"Initialize a Next.js 14 App Router project. Do not use generic AI fonts; use 'DM Serif Display' for headings and 'Inter' or 'Neue Montreal' for body copy. The aesthetic must feel like a high-agency editorial portfolio—clean, airy, and artistic. Implement a smooth scroll wrapper using Lenis and set up a global GSAP plugin registry in a `lib/gsap.ts` file."*

### 2. The Hero Section (Cinematic Entrance)
> *"Build a Hero section that occupies `100vh`. It should feature a massive, staggered typography reveal using GSAP and a background image slideshow that utilizes a slow Ken Burns scale effect (1.1 to 1.0). Ensure all animations are tied to a `useGSAP` hook scoped to the section reference."*

### 3. The Masonry Grid (Projects Showcase)
> *"Create an asymmetric masonry grid for a projects showcase. The layout should look organic—use varying column spans (e.g., `col-span-4`, `col-span-8`) and offsets so the images do not form a perfect box. Use `ScrollTrigger.batch` to stagger their reveal via a clip-path mask from the bottom. When hovering over an image, replace the default mouse with a custom magnetic cursor that reads 'CLICK'."*

### 4. Interactive Details (Marquees & Pinned Sections)
> *"Build a Materials section featuring two rows of infinite scrolling marquees using pure CSS keyframes. The rows should move in opposite directions. Below that, implement a Philosophy section where a quote stays `position: sticky` in the center of the screen while the user scrolls past 300vh of overlapping imagery."*

---

## 💡 The Philosophy of Vibecoding

This repository serves as a testament to the fact that AI is capable of producing Awwwards-winning level code—**if** it is given the correct aesthetic constraints. The key to successful vibecoding is not in asking the AI to "write the code," but in acting as an Art Director who dictates the exact motion curves, font weights, and layout asymmetries.
