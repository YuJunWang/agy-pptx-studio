---
name: presentation-style-magazine
description: Use when the user requests a presentation with an editorial, humanistic, "Monocle magazine", or e-ink style. Features serif headers, fluid minimal backgrounds, and strict grid alignments for photos.
---

# Presentation Style: Magazine x E-ink (電子雜誌 × 電子墨水)

## Overview
A presentation design system focusing on high-end editorial layouts. It relies on serif typography for headers, sans-serif for body, precise photo grids, and extreme restraint in decoration. "Structure over decoration."

## When to Use
- User explicitly requests "Magazine style", "Monocle vibe", "Editorial", or "Humanistic".
- Target audience is for cultural sharing, industry observation, or a founder's personal story.
- Content relies heavily on documentary photography, big quotes, and storytelling.

When NOT to use:
- Data-heavy tech/financial pitches (use `presentation-style-swiss` instead).

## Core Rules

**1. Typography Dual-System**
- **Headers**: MUST be Serif (e.g. Noto Serif SC, Playfair Display).
- **Body & Lead text**: MUST be Sans-Serif (e.g. Inter, Noto Sans SC).
- **Metadata/Labels**: MUST be Monospace.

**2. Image as First Citizen**
- Images are strictly constrained to editorial ratios: 16:10, 4:3, or 21:9.
- Never stretch or use odd ratios. Never align images to the bottom of the slide. Use top-alignment inside strict grid cells.

**3. Layout Lock System (M-Series Layouts)**
You MUST use one of the officially registered Magazine layouts. DO NOT invent new layouts.
If a new structure is needed, request the Style Architect to define `M23`.

| Layout ID | Name | Usage | Engine Behavior / Geometry |
|---|---|---|---|
| `M01` | Cover | Opening | Minimalist left-aligned text, fluid background. |
| `M02` | Chapter Divider | Section start | Serif chapter number, massive negative space. |
| `M04` | Lead Image + Side Text | Storytelling | 16:10 large photo on the left, sans-serif story on the right. |
| `M05` | Image Grid | Multi-photo evidence | 2-3 uniform photos strictly cropped to identical heights. |
| `M06` | Dual Pipeline | Workflows | Two clean horizontal pipelines. |
| `M08` | Big Quote | Takeaways | Massive Serif quote, right-aligned author attribution. |

## Implementation Guidance
For `pptxgenjs` rendering:
- Use `generate_image` with: `"Fluid contour map, very subtle organic paper texture, extremely uniform color, elegant e-ink style, blank background, perfect for reading dark text over it, --ar 16:9"`
- Set the slide background to this subtle fluid texture.
- Enforce the font mappings in the YAML generation (`title_font: "Noto Serif"`, `body_font: "Inter"`).
