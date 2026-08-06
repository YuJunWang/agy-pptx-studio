---
name: background-generation-formula
description: Use when generating background images for presentations, web UI, or any medium where text readability and clean aesthetics are prioritized over complex scenes.
---

# Background Generation Formula

## Overview
當需要呼叫 `generate_image` 工具來生成「簡報底圖」、「UI 背景」或「需要疊加文字的圖像」時，嚴禁使用一般圖片生成公式 (該公式會導致畫面過於複雜)。必須強制套用此「簡報底圖專用公式」，確保產出的圖像具備極致的質感與完美的留白呼吸感，並且**絕對不可以出現任何文字**。

## Core Formula

你的 Prompt 必須嚴格包含以下結構 (提供給 Orchestrator 或生成工具)：
`[無主角宣告] + [抽象主體/形狀] + [色彩搭配] + [材質/紋理] + [光影/氛圍] + [簡報背景適用後綴]`

- **[簡報背景適用後綴]**: `, minimalist subjectless presentation background, soft edges, smooth gradients, no sharp lines, high resolution, 8k, NO TEXT, NO WORD, NO WATERMARK, clean space for text.`
- **[無主角與比例處理]**: 確保提示詞中包含 `subjectless, abstract` 等無明確主角的宣示，將視覺焦點均勻分散在背景紋理與色彩流動上。呼叫 `generate_image` 時直接指定目標 `AspectRatio`（如 `16:9` 或 `4:3`），**跳過**任何置中畫布包裹（Prompt Trick），直接生成滿版圖像，以獲取最完美、連續性佳的原生背景底圖。

## Reference Styles & Examples

以下是三組高度純粹、不干擾閱讀的優質背景提示詞範例，請在需要時參考或改寫：

### Style 1: 流動大理石 (柔和/有機)
- **範例 Prompt**: `Abstract flowing liquid marble, organic soft waves, two-tone smooth gradient of soft sage green and warm sandy beige, smoky silk texture, matte finish, soft diffused lighting, minimalist, tranquil and ethereal atmosphere, high resolution, elegant wallpaper background, NO TEXT, NO WORD, NO WATERMARK.`

### Style 2: 工程架構風格 (分析/嚴謹/紀律)
- **範例 Prompt**: `Ultra-minimalist architectural blueprint concept, extremely faint geometric wireframes and precise grid lines on a soft off-white and pale ice-blue gradient background, high-key lighting, frosted glass texture, representing order, logic, and software engineering discipline, clean corporate aesthetic, very low contrast to ensure maximum text readability, high resolution, 8k, NO TEXT, NO WORD, NO WATERMARK.`

### Style 3: 光影暈染風格 (創意/夢幻/啟發)
- **範例 Prompt**: `Abstract holographic light aura, smooth blurred gradient, pastel purple, coral pink, and soft peach, grainy gradient texture, ultra-smooth blur, glowing ethereal light leaks, dreamy minimalist presentation background, clean space for text, high resolution, NO TEXT, NO WORD, NO WATERMARK.`

## CRITICAL ADAPTATION WARNING (防呆機制)
1. **絕對無文字 (Zero Text Rule)**: 生成背景圖時，畫面中出現任何隨機生成的文字、浮水印或亂碼都是致命錯誤。請確保 Prompt 結尾帶有強烈的負面提示：`NO TEXT, NO WORD, NO WATERMARK`.
2. **主題自適應**: The Reference Styles are JUST frameworks. You **MUST NOT blindly copy** their exact words (like "sage green" or "liquid marble") if they do not fit the current topic! You MUST dynamically adapt the *Thematic Metaphor* and *Color Palette* to match the specific presentation topic.
