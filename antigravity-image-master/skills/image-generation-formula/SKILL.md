---
name: image-generation-formula
description: Use when generating images, calling the generate_image tool, or when the user requests creating visual assets and illustrations.
---

# Image Generation Formula

## Overview
當需要呼叫 `generate_image` 工具或生成影像時，嚴禁使用隨意的單句描述。必須強制套用大師級生圖公式 (8層結構)，以確保底層 API 被正確觸發並產生高品質視覺資產。

## When to Use
- 使用者明確要求「生成圖片」、「畫一張圖」時。
- 為了豐富網頁 UI 或 Artifact 而需要自動配圖時。
- 準備呼叫 `generate_image` 工具前。

## Core Pattern: 7層結構公式

你的 Prompt 必須嚴格包含以下 7 個結構 (提供給 Orchestrator 做為內容素材)：
`[核心主體與動作] + [環境場景] + [構圖與取景] + [光影佈局] + [相機與鏡頭參數] + [美學與渲染風格] + [負面約束]`

## Quick Reference / Examples

### ❌ Bad Example (單句描述)
"A futuristic city at night."

### ✅ Good Example (完整大師級結構 - 僅內容)
"A cinematic wide shot of a futuristic cyberpunk city at midnight, flying cars leaving light trails, dramatic neon lighting in cyan and magenta, volumetric fog, shot on 35mm lens, hyper-realistic, Unreal Engine 5 render, no text, no watermark."
