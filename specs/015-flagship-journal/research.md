# Research: Flagship Journal

## Decision 1: Journal presentation will remain a React overlay above Phaser

**Decision**: Build the journal as a React-owned overlay that sits above the game canvas and takes focus when opened.

**Rationale**:

- The constitution already assigns text-heavy surfaces to React.
- The journal must support rich layout, layered content, formulas, diagrams, and responsive behavior.
- Keeping it out of Phaser avoids mixing gameplay rendering with document-style UI composition.

**Alternatives considered**:

- **Render the journal in Phaser**: rejected because it would make rich layout, text readability, and mobile behavior much harder.
- **Hybrid canvas journal**: rejected for the first slice because it would complicate layering, responsiveness, and maintainability.

## Decision 2: The journal will use a structured content-block model

**Decision**: Replace flat `simple` and `technical` body strings with staged journal entries made of typed content blocks.

**Rationale**:

- The hero Ohmdal entry needs text, formulas, annotations, diagrams, and reveal stages.
- A block model lets future entries vary in layout and richness without custom-coded pages each time.
- This also keeps content data-driven and outside scene logic.

**Alternatives considered**:

- **Keep the current string-only journal format**: rejected because it cannot express page composition or progressive reveals cleanly.
- **Use page images only**: rejected because it would make content iteration, responsiveness, and staged reveals too rigid.

## Decision 3: Visual composition will be HTML/CSS/SVG first, with images used as accents

**Decision**: Compose the page in React with HTML/CSS layout, SVG diagrams and drawn marks, and optional placed images for illustration details.

**Rationale**:

- Gives the notebook a crafted feel without turning all content into static images.
- Preserves readability and future localization/editability.
- Supports progressive reveal, highlight, and staged animation directly.

**Alternatives considered**:

- **All-raster page rendering**: rejected because it is brittle for content changes and mobile layout.
- **Canvas-only page rendering**: rejected because it is heavier to author and harder to keep accessible.

## Decision 4: Formula rendering should use a dedicated math renderer

**Decision**: Use KaTeX for math/formula rendering in the journal.

**Rationale**:

- It is fast and purpose-built for web math rendering.
- It fits well with React and document-style UI.
- It avoids shipping formulas as screenshots or overloading plain text formatting.

**Alternatives considered**:

- **MathJax**: viable, but heavier than needed for the current slice.
- **Render formulas as images**: rejected because it harms flexibility and consistency.

## Decision 5: Use controlled page transitions before full physical page simulation

**Decision**: Implement intentional page-open and page-turn transitions without depending on advanced physical page simulation for the first slice.

**Rationale**:

- The product requirement is premium feel, not maximum realism at all costs.
- Controlled transitions are easier to tune for desktop and mobile horizontal.
- This keeps performance and layout behavior predictable while still delivering a strong notebook illusion.

**Alternatives considered**:

- **Adopt full flip-book library immediately**: rejected for the first slice because it risks complexity, responsiveness issues, and tighter coupling to a third-party rendering model.
- **No page transitions**: rejected because the journal would lose too much identity.

## Decision 6: Reveal stages are triggered by gameplay beats, not by reading progress alone

**Decision**: Journal progression will be tied to explicit gameplay or narrative events such as room entry, first observation, first system interaction, and first restoration.

**Rationale**:

- The journal is supposed to understand lived experience, not become a manual unlocked by curiosity clicks alone.
- This keeps the journal aligned with the educational model: first world, then language, then formalization.
- The same event model can scale to future worlds.

**Alternatives considered**:

- **Unlock reveals by opening the journal repeatedly**: rejected because it disconnects progression from gameplay.
- **Unlock the whole entry at puzzle completion only**: rejected because it loses the layered magic of the notebook.

## Decision 7: The flagship Ohmdal entry should act as the canonical template

**Decision**: Ship one complete, premium Ohmdal entry that becomes the reference pattern for later journal work.

**Rationale**:

- The journal is central and should be proven through a real, high-quality slice.
- Designing abstract future-proof systems without a concrete hero case would be premature.
- Ohmdal already has the strongest narrative and pedagogical grounding in the current MVP.

**Alternatives considered**:

- **Design for all worlds equally now**: rejected because it spreads effort too early.
- **Build a generic shell with placeholder fake content only**: rejected because it would under-validate the experience.
