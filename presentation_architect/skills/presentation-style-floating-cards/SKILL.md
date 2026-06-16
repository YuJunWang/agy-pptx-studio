---
name: presentation-style-floating-cards
description: Use when the user requests a presentation with a warm, friendly, modern SaaS, educational, or highly detailed aesthetic with depth, floating elements, and gentle shadows.
---

# Presentation Style: Floating Cards

## Overview
A modern, approachable presentation design system characterized by soft geometric shapes, gentle drop shadows, and clearly segregated "cards" to organize complex information. This style prioritizes readability, approachability, and structural clarity over aggressive minimalism.

## When to Use
- User explicitly requests "modern SaaS style", "Glassmorphism", "warm", "approachable", or "friendly" design.
- The presentation is highly educational, data-dense, or contains step-by-step tutorials requiring distinct visual separation.
- The tone should be welcoming rather than authoritarian.

When NOT to use:
- Aggressive venture capital pitches where absolute authority and minimalism are requested (use `presentation-style-swiss` instead).

## Core Pattern: Depth & Segregation

The Floating Cards layout uses Z-depth to lift information off the background, making it easily digestible.

**1. Blueprint Architecture**
Information is always grouped into an array of `cards`, even if there's only one.
```yaml
layout_type: "grid-cards"
title: "核心價值"
subtitle: "打造溫潤的使用者體驗"
cards:
  - title: "模組化設計"
    text: "可自由抽換的元件"
  - title: "立體陰影"
    text: "透過 Z-Index 建立視覺階層"
```

## Quick Reference (Layout Lock System / 版式鎖定)

You MUST map your content to one of these strictly defined `layout_type` IDs. DO NOT invent new layout names. If a new structure is needed, request the Style Architect to define an extension (e.g. `FC04`).

| Layout ID | Usage | Engine Behavior / Geometry |
|---|---|---|
| `FC01-grid-cards` | Standard feature list | Calculates columns automatically (e.g. 1-4 columns), centers the grid, and draws rounded rectangles with drop shadows. |
| `FC02-hero-card` | Cover or Single Metric | A single massive card centered on the screen with maximum padding and a massive drop shadow. |
| `FC03-split-cards`| Comparisons | Two floating cards side by side over a blurred background. |

## Typography Size-Weight Matrix
Even in a friendly SaaS style, hierarchy is paramount. The larger the font, the thinner the weight:
- **Massive Metrics (80pt+)**: Weight 200/300 (Light/ExtraLight)
- **Card Titles (24pt-32pt)**: Weight 500/600 (Medium/SemiBold)
- **Body & Subtitles (14pt-18pt)**: Weight 400 (Regular)

## Implementation

The full `pptxgenjs` rendering engine configured for these layouts is located at:
[example_engine.js](example_engine.js)

**Required Background Image Generation Formula:**
Use `generate_image` with: `"Soft abstract blurred background, gentle light leaks, warm and friendly color palette, smooth gradients, highly out of focus, no distinct objects, modern ui aesthetic, --ar 16:9"`

## Common Mistakes

- **Mistake:** Using sharp edges or solid absolute black/white.
  - **Fix:** Always apply `rounding: true` (e.g., `rounding: 0.1`) and use slightly tinted colors for backgrounds (like off-white `#FAFAFA`) to reduce eye strain.
- **Mistake:** Forgetting shadows.
  - **Fix:** Every card MUST have `{ shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 10, offset: 5 } }`. This is the signature of the style.
- **Mistake:** Forgetting the font patching tool.
  - **Fix:** You MUST enforce modern, readable fonts globally. Always run `python patch_pptx_fonts.py <file> --latin "Inter" --ea "Taipei Sans TC Beta"` or `"Helvetica"` after generating the PPTX.
