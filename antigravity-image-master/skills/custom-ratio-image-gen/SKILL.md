---
name: custom-ratio-image-gen
description: Generate images with custom aspect ratios (e.g., 16:9, 9:16, 21:9) using a prompt trick and an automated Python cropping script. Use this whenever the user requests non-1:1 aspect ratio images.
---

# Custom Aspect Ratio Image Generation Skill

## Background
The `generate_image` tool by default only generates 1:1 square images. When users request specific aspect ratios like 16:9 (widescreen), 9:16 (vertical), or 4:3, we can use a special prompt trick to tell the AI to draw the main subject in the center with the desired ratio, padded with solid colors, and then crop it automatically.

## Trigger Conditions
Use this skill whenever the user explicitly requests an image with an aspect ratio other than 1:1, or requests a format that implies a specific ratio (e.g., "wallpaper", "video cover", "mobile wallpaper", "16:9", "9:16").

## Workflow

### 1. Generate the Raw Image
Call the `generate_image` tool using the following Prompt template. You MUST replace the bracketed sections with the appropriate content based on the requested ratio and subject.

**Prompt Template:**
`A single [W:H] cinematic illustration placed in the CENTER of a square canvas. The [top and bottom OR left and right] background areas are solid [fill color, e.g. soft pastel pink #FADADD]. The central [W:H] illustration depicts: [subject description]. Style: [style keyword]. 4k resolution, high quality, sharp details.`

*Note: If W > H (e.g., 16:9), pad "top and bottom". If H > W (e.g., 9:16), pad "left and right".*

### 2. Crop the Image
After the image is generated, the tool will return the saved file path (usually in the artifacts directory). You must run the included Python script to crop the image to the exact mathematical ratio.

**Command:**
`python C:\Users\wang6\.gemini\config\plugins\antigravity-image-master\skills\custom-ratio-image-gen\scripts\crop_image.py <input_path> <output_path> --ratio <W:H>`

- `<input_path>`: The raw generated image path.
- `<output_path>`: The desired final path.
- `<W:H>`: The target ratio, e.g., `16:9`, `9:16`.

### 3. Display Final Image
Embed the final cropped image in your response or in a markdown artifact to show the user.
