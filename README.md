# agy-pptx-studio

*Read this in other languages: [繁體中文](README-zh.md)*

Welcome to **agy-pptx-studio**, a dedicated ecosystem and monorepo designed specifically for AI-driven, highly aesthetic presentation (PPTX) generation. 

This repository centralizes tools, skills, and plugins necessary to construct, style, and generate rich slide decks using Antigravity AI agents. By utilizing Domain-Driven Design (DDD), this studio ensures all features within the ecosystem are cohesive and optimized for presentation creation.

---

## 1. Presentation Architect Workflow (Multi-Agent Department)
[Folder: `./presentation_architect`](./presentation_architect)

This plugin is structured as a **Multi-Agent Department**, acting as the brain for generating highly aesthetic, workflow-driven PPTX presentations. The workflow enforces a strict sequential pipeline, coordinated by the **presentation-orchestrator**, which receives the initial user command and delegates tasks to specialized subagents:

1. **Data Collection (presentation-researcher)**: The workflow begins by gathering raw data, performing deep analysis, and extracting necessary insights, saving them to a physical research file.
2. **Narrative Construction (presentation-strategist)**: Takes the raw data and constructs a logical, compelling narrative storyboard. It determines the flow of the slides and outputs a foundational outline.
3. **Style & Asset Allocation (presentation-art-director)**: Applies the design system constraints, selects typography and color palettes, invokes the image generator for necessary visuals, and finalizes the strict `_blueprint.yaml`.
4. **Execution (presentation-engineer)**: Executes the blueprint using the `pptxgenjs` Node.js library to render the final, physical `.pptx` file.

### The Style Architect & Existing Presentation Renovation
This ecosystem also includes a **presentation-style-architect** (風格版規劃工程師). This meta-agent is responsible for designing rigid layout geometries and highly flexible color systems.
- **Importing & Renovating Old Decks**: When a user provides an existing `.pptx` file, the orchestrator invokes a specialized Python script (`extract_pptx.py`) to extract the raw text outline. The Style Architect can then analyze this outline and perfectly map it onto modern, aesthetic design grids without breaking the original content structure.

---

## 2. Image Generation Enhancements
[Folder: `./antigravity-image-master`](./antigravity-image-master)

This plugin serves as the visual asset creator. It heavily modifies and enhances Antigravity's built-in `generate_image` command, overcoming native limitations to produce production-ready assets for presentations.

### Core Features:
- **Zero-Text / Zero-Subject Backgrounds**: The native image generation often creates messy, busy images. Our `background-generation-formula` enforces strict rules (e.g., `NO TEXT, NO WORD`) to generate clean, highly-readable backgrounds and UI overlays that perfectly complement presentation text without distraction.
- **Prompt Enhancer**: Uses a 7-layer structural formula (`image-generation-formula`) for general cinematic images, and a 5-layer formula (`diagram-generation-formula`) tailored specifically for conceptual visualizations like timelines, funnels, and process cycles.
- **Custom Aspect Ratio Solutions**: The native Antigravity image tool is locked to generating 1:1 square images. To solve this, the orchestrator uses a clever "padding prompt" technique to generate the widescreen image centered inside a square canvas. It then automatically executes a Python script (`crop_image.py`) to physically crop the output into precise 16:9, 9:16, or other custom aspect ratios required for presentations.

---

## Getting Started
*(Future usage instructions, environment setup, and prerequisites will be documented here.)*

---
*Built for the Antigravity AI Ecosystem.*
