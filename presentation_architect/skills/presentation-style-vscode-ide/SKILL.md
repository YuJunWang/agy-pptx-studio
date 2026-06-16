---
name: presentation-style-vscode-ide
description: A highly geeky, developer-centric presentation style that mimics the Visual Studio Code interface. Features syntax highlighting, Mac terminal windows, and iMessage chat bubbles. Best for technical pitches, engineering teams, and software architecture overviews.
---

# Style Name: VS Code IDE (工程師終端風)

## Overview
This style wraps the entire presentation inside a fake VS Code UI window. It relies heavily on monospace typography, syntax highlighting colors, and coding metaphors (e.g. `def Title():`).

## Design Recommendations (For Art Director)
When generating `_blueprint.yaml` for this style, follow these recommendations:

### 1. Color Palette
Use standard VS Code Dark Theme hex codes:
- `primary_background`: `"1E1E1E"` (VS Code Editor Dark)
- `accent_color`: `"007ACC"` (VS Code Status Bar Blue)
- `text_main`: `"D4D4D4"` (Standard Code Text)

### 2. Typography
- Highly recommended to use monospace fonts for the title.
- Recommended `fontFace`: `"Consolas"`, `"Fira Code"`, or `"Courier New"`.

### 3. Layout Lock System (版式鎖定)
You MUST map your content to one of these strictly defined `layout_type` IDs. DO NOT invent new layout names. If a new structure is needed, request the Style Architect to define an extension (e.g. `IDE05`).
- `IDE01-cover`: Cover slide. Renders the title as a Python function definition `def Title():` and the subtitle as a `"""docstring"""`.
- `IDE02-mac-window`: A slide containing a large dark terminal window with macOS Red/Yellow/Green window controls. Put your code snippet or main text in `cards[0].text`.
- `IDE03-agent-grid`: Displays a grid of cards (up to 6), each with a colored top-border (representing classes/modules). Perfect for explaining microservices or multi-agent architectures.
- `IDE04-chat-flow`: Displays a sequence of chat bubbles imitating an LLM or Agent communication flow. Alternates left and right. Put the agent name in `card.title` and message in `card.text`.

### 4. Typography Size-Weight Matrix
For a coding aesthetic, monospace fonts and proper sizing are critical:
- **Function/Class Titles (60pt+)**: Weight 300 (Light) - to mimic syntax highlighting without bulk.
- **Terminal Headers (24pt-32pt)**: Weight 500 (Medium)
- **Code Blocks & Docstrings (14pt-18pt)**: Weight 400 (Regular)
