# agy-pptx-studio

*Read this in other languages: [繁體中文](README-zh.md)*

Welcome to **agy-pptx-studio**, a dedicated ecosystem and monorepo designed specifically for AI-driven, highly aesthetic presentation (PPTX) generation. 

This repository centralizes tools, skills, and plugins necessary to construct, style, and generate rich slide decks using Antigravity AI agents. By utilizing Domain-Driven Design (DDD), this studio ensures all features within the ecosystem are cohesive and optimized for presentation creation.

## Included Plugins

This repository contains two core plugins that work together to provide a seamless presentation generation workflow:

### 1. [presentation-architect](./presentation_architect)
This plugin has been structured as a multi-agent department, acting as the brain for generating highly aesthetic, workflow-driven PPTX presentations.
- **presentation-orchestrator**: The main entry point that delegates tasks across the department.
- **presentation-researcher**: Gathers data, performs analysis, and provides necessary insights.
- **presentation-strategist**: Constructs the narrative storyboard and generates the foundational YAML Blueprint.
- **presentation-engineer**: Executes the blueprint using `pptxgenjs`, applying design systems and rendering the final `.pptx` file.

### 2. [antigravity-image-master](./antigravity-image-master)
This plugin serves as the visual asset creator, using an orchestrator to manage advanced prompt engineering tasks and aspect-ratio crops.
- **image-generation-orchestrator**: The primary controller that decides aspect ratios, picks the right formula, and manages physical image cropping scripts.
- **image-generation-formula**: A 7-layer structural formula for high-fidelity scenes, illustrations, and cinematic graphics.
- **background-generation-formula**: A 4-layer structural formula specifically optimized for presentation slide backgrounds and UI overlays.
- **diagram-generation-formula**: A 5-layer structural formula designed for conceptual visualizations like timelines, funnels, and process cycles.

## How They Work Together

1. **The Strategist**: The workflow usually begins within the `presentation-architect`, where an agent constructs the storyboard and decides on the necessary visual assets.
2. **The Art Director**: When a slide requires a custom graphic, diagram, or background, the `antigravity-image-master` plugin is invoked to generate the precise visual asset.
3. **The Engineer**: The `presentation-architect` then takes the generated text and generated images, merging them perfectly into the final PPTX file according to the chosen stylistic template.

## Getting Started

*(Future usage instructions, environment setup, and prerequisites will be documented here.)*

---
*Built for the Antigravity AI Ecosystem.*
