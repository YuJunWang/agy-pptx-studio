# agy-pptx-studio

*Read this in other languages: [繁體中文](README-zh.md)*

Welcome to **agy-pptx-studio**, a dedicated ecosystem and monorepo designed specifically for AI-driven, highly aesthetic presentation (PPTX) generation. 

This repository centralizes tools, skills, and plugins necessary to construct, style, and generate rich slide decks using Antigravity AI agents. By utilizing Domain-Driven Design (DDD), this studio ensures all features within the ecosystem are cohesive and optimized for presentation creation.

## Included Plugins

This repository contains two core plugins that work together to provide a seamless presentation generation workflow:

### 1. [presentation-architect](./presentation_architect)
An AI agent skill and ecosystem for generating highly aesthetic, workflow-driven PPTX presentations.
- **Purpose**: Acts as the brain of the operation. It uses decoupled style JSON files to map narrative structures to actual PPTX slide layouts.
- **Capabilities**: Translates ideas into structures, applies visual styles, and uses Node.js logic to render actual `.pptx` files.

### 2. [antigravity-image-master](./antigravity-image-master)
Advanced prompt engineering methodologies, templates, and tools for specific AI image generation tasks.
- **Purpose**: Serves as the visual asset creator for your slides.
- **Capabilities**: Generates custom aspect-ratio images, background layouts, and structural diagrams specifically tailored to fit the constraints and aesthetics of modern slide decks.

## How They Work Together

1. **The Strategist**: The workflow usually begins within the `presentation-architect`, where an agent constructs the storyboard and decides on the necessary visual assets.
2. **The Art Director**: When a slide requires a custom graphic, diagram, or background, the `antigravity-image-master` plugin is invoked to generate the precise visual asset.
3. **The Engineer**: The `presentation-architect` then takes the generated text and generated images, merging them perfectly into the final PPTX file according to the chosen stylistic template.

## Getting Started

*(Future usage instructions, environment setup, and prerequisites will be documented here.)*

---
*Built for the Antigravity AI Ecosystem.*
