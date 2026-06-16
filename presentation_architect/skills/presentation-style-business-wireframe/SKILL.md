---
name: presentation-style-business-wireframe
description: Generates high-contrast, professional corporate presentations characterized by wireframe stroke cards, sharp top dividers, and disciplined geometric grids. Best for B2B pitches, technical deep-dives, and corporate training.
---

# Style Name: Business Wireframe (商務線框風)

## Overview
This style is highly professional and disciplined. It relies on a distinct "Top Divider" (a thin horizontal line at `y=0.4`) and heavy use of stroke-bordered cards (both rounded and sharp). It is NOT explosive or loud; it is calculated, clear, and highly structured.

## Design Recommendations (For Art Director)
When generating `_blueprint.yaml` for this style, follow these recommendations:

### 1. Color Palette
Use a highly contrasting, colorless or low-saturation palette.
- `primary_background`: `"F2F2F2"` (Light Gray)
- `accent_color`: `"36454F"` (Charcoal / Dark Slate)
- `text_main`: `"36454F"`

### 2. Typography
- Choose a clean, highly legible sans-serif font.
- Recommended `fontFace`: `"Calibri"` or `"Arial"`.

### 3. Layout Lock System (版式鎖定)
You MUST map your content to one of these strictly defined `layout_type` IDs. DO NOT invent new layout names. If a new structure is needed, request the Style Architect to define an extension.
- `BW01-cover`: Title floating above a central line, subtitle below.
- `BW02-section`: Full width dark horizontal block across the center.
- `BW03-split`: Title at top. Huge text on the left, a large rounded stroke card on the right (max 2 cards in YAML).
- `BW04-dark-card`: Title at top. A single massive dark rounded card spanning the screen (1 card in YAML).
- `BW05-grid-2`: Two sharp-edged stroke rectangles side-by-side (2 cards in YAML).
- `BW06-grid-3`: Three rounded stroke rectangles with an inner separator line (3 cards in YAML).
- `BW07-compare`: A DO/DON'T or Pros/Cons comparison with dark solid headers (2 cards in YAML).
- `BW08-process-4`: A 4-step flowchart using rounded cards and numbered overlapping badges with arrows (4 cards in YAML).

### 4. Typography Size-Weight Matrix
Enforce strict font-weight mappings based on point size to maintain the professional wireframe aesthetic:
- **Massive Titles (80pt+)**: Weight 200/300 (Light/ExtraLight)
- **Slide Headers (32pt-44pt)**: Weight 400 (Regular)
- **Card Headers (20pt-24pt)**: Weight 600 (SemiBold)
- **Body & Captions (14pt-16pt)**: Weight 400/500 (Regular/Medium)
