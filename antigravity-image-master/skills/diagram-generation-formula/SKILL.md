---
name: diagram-generation-formula
description: Use this skill to generate prompts for conceptual Information Architecture Diagrams (Infographics) like funnels, timelines, or pyramids. It strictly follows the infographic layouts from the presentation company to ensure consistent visual metaphors.
---

# Diagram Generation Formula

## Overview
這是一個專門為了產生「資訊架構圖 (Information Architecture Diagrams)」而設計的圖片生成公式。
當藝術總監需要一張定性概念的架構圖（例如：漏斗圖、時間軸、冰山理論）時，使用此技能將簡報的需求轉換為能產生完美圖表的 Prompt。

> **⚠️ 圖片生成文字限制警告**
> AI 生成圖片對於準確拼寫多個單字有極高的失敗率。
> **防呆機制**：生成的 Prompt 中，最多只能標示 3-4 個極短的關鍵字或數字 (如："2023", "Awareness", "Step 1")。其餘複雜的細節說明文字，必須留白，由後續的簡報工程師 (Presentation Engineer) 在 PPTX 中用原生文字疊加上去。

## 核心公式 (5層結構)

你的 Prompt 必須嚴格包含以下 5 個結構 (提供給 Orchestrator 做為內容素材)：
`[圖表類型與排版] + [具體文字標示] + [視覺隱喻] + [色彩與材質] + [Infographic專用後綴]`

- **[Infographic專用後綴]**: 必須固定加上 `, clean infographic design, corporate presentation asset, highly readable layout, UI/UX illustration, 8k resolution.`

## 參考字典：20種 Infographic Layouts
此公式深度整合了 `resources/infographic_layouts.md` 的架構定義。請依照使用者語意，挑選對應的 Layout 並將其轉化為視覺隱喻：

1. **`bridge` (過渡/解決方案)** -> *視覺隱喻*：A glowing futuristic bridge connecting two separate neon cliffs.
2. **`circular-flow` (循環/流程)** -> *視覺隱喻*：A 3D isometric circular wheel with glowing interconnected arrows.
3. **`comparison-table` (比較)** -> *視覺隱喻*：Two contrasting podiums or balanced scales with distinct colors.
4. **`do-dont` (做與不做/對比)** -> *視覺隱喻*：Two contrasting side-by-side vertical panels, left panel in soft glowing emerald green with a clean checkmark, right panel in muted dark gray with a glowing amber-red cross mark.
5. **`equation` (公式轉換)** -> *視覺隱喻*：A minimalist input-process-output assembly line.
6. **`feature-list` (功能列表/平行展示)** -> *視覺隱喻*：A horizontal row of multiple floating translucent glass badges, each containing a unique minimalist glowing abstract vector icon.
7. **`fishbone` (因果分析)** -> *視覺隱喻*：A sleek structural skeleton or branching technology tree.
8. **`funnel` (漏斗/轉換)** -> *視覺隱喻*：A 3D glassmorphism funnel with floating glowing spheres dropping through levels.
9. **`grid-cards` (網格卡片/Bento Box)** -> *視覺隱喻*：A 3D glassmorphism bento box grid layout, with translucent panels of varying sizes containing simplified glowing charts and UI modules.
10. **`iceberg` (表面與深層)** -> *視覺隱喻*：A beautiful minimalist iceberg floating in dark water, showing a massive glowing structure underwater.
11. **`journey-path` (顧客旅程/路徑)** -> *視覺隱喻*：A winding isometric glowing pathway with distinct milestone markers.
12. **`layers-stack` (堆疊/技術棧)** -> *視覺隱喻*：A 3D floating stack of translucent glass and metal layered platforms.
13. **`mind-map` (心智圖/發散)** -> *視覺隱喻*：A glowing neural network or glowing nodes branching out from a central core.
14. **`nested-circles` (層級/核心邊緣)** -> *視覺隱喻*：Multiple concentric glowing rings surrounding a bright glowing core.
15. **`priority-quadrants` (優先級象限/2x2)** -> *視覺隱喻*：A 3D coordinate plane divided into four distinct illuminated glass quadrants with gradient accents and floating glowing spheres.
16. **`pyramid` (金字塔/層級)** -> *視覺隱喻*：A 3D isometric step-pyramid made of frosted glass layers.
17. **`scale-balance` (權衡/比較)** -> *視覺隱喻*：A minimalist golden scale weighing two glowing abstract concepts.
18. **`timeline-horizontal` (時間軸)** -> *視覺隱喻*：A straight horizontal glowing light-beam track with distinct floating nodes.
19. **`tree-hierarchy` (樹狀階層/組織關係)** -> *視覺隱喻*：A 3D vertical branching network structure, with a glowing master node at the top splitting into clean layered sub-nodes of frosted glass.
20. **`venn` (交集)** -> *視覺隱喻*：Overlapping translucent colored glass circles creating glowing intersections.


## Prompt 轉換範例

### 範例 A: 漏斗圖 (funnel)
*需求：需要一個行銷漏斗，上面要有三層文字 Awareness, Interest, Action。*
*Prompt:*
`A 3D glassmorphism funnel infographic, with floating glowing spheres dropping through three levels. The three levels have short bold floating text "Awareness", "Interest", and "Action". Dark corporate background with cyan and magenta glowing accents, frosted glass textures, clean infographic design, corporate presentation asset, highly readable layout, UI/UX illustration, 8k resolution.`

### 範例 B: 時間軸 (timeline-horizontal)
*需求：公司過去三年的重要里程碑，年份 2022, 2023, 2024。*
*Prompt:*
`A 3D isometric straight horizontal glowing light-beam timeline track with three distinct floating geometric nodes. Each node displays bold floating text "2022", "2023", and "2024". Minimalist dark navy background, subtle neon blue edge lighting, metallic surfaces, clean infographic design, corporate presentation asset, highly readable layout, UI/UX illustration, 8k resolution.`
