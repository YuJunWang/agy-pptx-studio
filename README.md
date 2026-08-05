# agy-pptx-studio

*Read this in other languages: [繁體中文](README-zh.md)*

> "agy-pptx-studio is not just a formatting tool; it's a highly modular, aesthetic-driven automated presentation production line."

![Release Status](https://img.shields.io/badge/Release-Public_Beta-orange)
![Architecture](https://img.shields.io/badge/Architecture-Multi--Agent-purple)
![Framework](https://img.shields.io/badge/Framework-Antigravity-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!IMPORTANT]
> **🚀 Public Beta Notice**
> This ecosystem is currently in the Public Beta phase. Some multi-agent workflows and image generation boundaries are subject to change in future releases.

**"About agy-pptx-studio"**

Welcome to **agy-pptx-studio**, a dedicated ecosystem and monorepo designed specifically for AI-driven, highly aesthetic presentation (PPTX) generation. This repository centralizes tools, skills, and plugins necessary to construct, style, and generate rich slide decks using Antigravity AI agents. By utilizing Domain-Driven Design (DDD), this studio ensures all features within the ecosystem are cohesive and optimized for presentation creation.

### 1. 🤖 Multi-Agent Workflow (Presentation Architect)
This core plugin is structured as a **Multi-Agent Department**, acting as the brain for generating highly aesthetic presentations. The workflow enforces a strict sequential pipeline, coordinated by the **Orchestrator**, which receives the initial user command and delegates tasks:

> **workflow**: `[User Input]` ➔ 🔍 `Researcher` ➔ 📝 `Strategist` ➔ 🎨 `Art Director` ➔ 🛠️ `Engineer` ➔ `[Output PPTX]`

* **🔍 Researcher (presentation-researcher)**:
    Begins by gathering raw data, performing deep analysis, and extracting necessary insights, saving them to a physical research file.
* **📝 Strategist (presentation-strategist)**:
    Constructs a logical, compelling narrative storyboard. It determines the flow of the slides and outputs a foundational outline.
* **🎨 Art Director (presentation-art-director)**:
    Applies design system constraints, selects typography and color palettes, invokes the image generator for necessary visuals, and finalizes the strict `_blueprint.yaml`.
* **🛠️ Engineer (presentation-engineer)**:
    Executes the blueprint using the `pptxgenjs` Node.js library to render the final, physical `.pptx` file.

### 2. 🎨 Style Registry Architecture (Scheme D)
This project operates on a decentralized **Style Registry Architecture** to guarantee absolute layout stability and unlimited expandability.
Instead of having the AI calculate `x, y` coordinates and guess layer orderings (which often results in broken designs), each visual theme is fully encapsulated into a self-contained module in the `styles/` directory:
* **Style Documentation (`.md`)**: A strict guideline for the AI Strategist and Art Director. It defines the exact `layout_type` IDs available for that specific style (e.g., `S01_Cover`, `S02_Split_Text`), ensuring the LLM only outputs supported layouts.
* **Style Engine (`.js`)**: A precise `pptxgenjs` rendering script (e.g., `styles/swiss-simple.js`) that handles the exact coordinate mapping, typography, and collision prevention for that specific theme.

### 3. 📝 Speaker Notes & Typography Control
To prevent AI from cluttering slide layouts with unnecessary explanations or bilingual translations (e.g., `Generative UI (生成式介面)`), the ecosystem features a strict **Bilingual Mandate**:
* **Pure Titles**: Slide titles must be pure and punchy (either all English or all Chinese).
* **Speaker Notes System**: All supplementary context, explanations, and Chinese translations for technical terms are automatically routed to the slide's **Speaker Notes** (`> Speaker Notes:`). This keeps the visual layout extremely clean while preserving the AI's deep context for the presenter.
* **Orchestration**: A central `scripts/build_presentation.js` engine reads the AI's YAML blueprint, dynamically loads the correct Style Engine, injects the speaker notes, and renders the flawless `.pptx`.

### 4. 🖼️ Image Generation Enhancements
This module serves as the visual asset creator. It heavily modifies and enhances Antigravity's built-in `generate_image` command, overcoming native limitations to produce production-ready assets.

* **Zero-Text / Zero-Subject Backgrounds**: The native image generation often creates messy images. Our `background-generation-formula` enforces strict rules (`NO TEXT, NO WORD`) to generate clean, highly-readable backgrounds and UI overlays.
* **Prompt Enhancer**: Uses a 7-layer structural formula for general cinematic images, and a 5-layer formula (`diagram-generation-formula`) tailored for conceptual visualizations like timelines, funnels, and process cycles.
* **Custom Aspect Ratio Solutions**: The native tool is locked to generating 1:1 square images. To solve this, the orchestrator uses a clever "padding prompt" technique combined with an automated Python script (`crop_image.py`) to physically crop the output into precise 16:9, 9:16, or custom aspect ratios.

## 🛠️ Tech Stack
* **Agent Framework**: Antigravity, LangChain (Skills & Agents)
* **Presentation Rendering**: Node.js (`pptxgenjs`)
* **Image Processing**: Python (Pillow / Image Cropping scripts)
* **Design Systems**: YAML, JSON (Decoupled layout engines)

## 📂 Architecture Directory
```text
agy-pptx-studio/
├── presentation_architect/      # Core multi-agent presentation generation plugin
│   ├── plugin.json
│   ├── skills/                  # Individual subagent skills (Strategist, Art Director, Engineer)
│   ├── scripts/                 # Node.js build orchestrator (build_presentation.js)
│   └── styles/                  # Style Registry containing .md guidelines and .js engines (e.g., swiss.js)
└── antigravity-image-master/    # Visual asset & image generation plugin
    ├── plugin.json
    └── skills/                  # Prompt formulas and ratio cropping tools
```

### 1. Installation
Clone this project and link the plugins to your Antigravity configuration:
```bash
git clone https://github.com/YuJunWang/agy-pptx-studio.git
```
*(Place or symlink the two plugin folders into your Antigravity `.gemini/config/plugins` directory to enable them in your workspace.)*

### 2. Usage Example
To trigger the complete multi-agent workflow, you can simply use a comprehensive prompt like this:

> "Based on coffee industry research from the past two years, act as a local coffee supplier in Taiwan and create a 15-minute pitch deck for venture capitalists. Execute this in a McKinsey consulting presentation style, including as much data and as many charts as necessary. You can decide on any other unspecified details."

## 👨‍💻 Author
**Yu-Jun Wang**
* [GitHub Profile](https://github.com/YuJunWang)

## 📄 License
This project is licensed under the **[MIT License](LICENSE)**.
