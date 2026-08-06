---
name: image-generation-orchestrator
description: The primary entry point for ALL image generation requests. It acts as the ratio controller, decides which sub-skill to use for content, and handles the custom ratio trick and cropping automatically.
---

# Image Generation Orchestrator

## Overview
你是圖片生成流程的「總指揮 (Orchestrator)」。當使用者要求生成圖片時，你必須**優先參考此技能**。
你的職責是判斷使用者需要的圖片比例、挑選合適的內容公式，並將比例語法與內容提示詞組合後呼叫 `generate_image`。若需要特殊比例，你還要負責在生成後呼叫裁切腳本。

## Workflow

### Step 1: 判斷圖片比例 (Aspect Ratio)
分析使用者需求，決定最終目標比例 (例如: 16:9, 9:16, 1:1)。
如果使用者沒有指定，根據常理推斷 (例如：簡報通常是 16:9，手機桌布通常是 9:16)。

### Step 2: 選擇內容公式 (Content Formula)
根據使用者需要的圖片內容，查閱並使用對應的下層技能來獲取 **核心提示詞 (Content Prompt)**：
- **高度擬真、場景、插畫、電影感**：使用 `image-generation-formula` (7層結構公式)。
- **簡報底圖、UI背景、需要疊加文字**：使用 `background-generation-formula` (4層結構公式)。
- **資訊架構圖 (時間軸、漏斗圖、循環圖等具象化概念圖表)**：使用 `diagram-generation-formula` (5層結構公式)。

### Step 3: 組合提示詞 (Prompt Assembly)
根據步驟 1 決定的比例，將核心提示詞組合為最終呼叫 `generate_image` 的 Prompt：

**情境 A: 比例為 1:1**
直接使用內容公式產出的提示詞，無須做任何畫布包裹。
*最終 Prompt: `<Content Prompt>`*

**情境 B: 比例為非 1:1 (例如 16:9, 9:16)**
1. **原生模式 (推薦)**：
   直接使用內容公式產出的 `<Content Prompt>`，並在呼叫 `generate_image` 時指定 `AspectRatio` 參數為目標比例。
2. **Fallback 降級模式** (僅在 native AspectRatio 故障或不支援該比例時使用)：
   必須使用「防呆畫布提示詞 (Prompt Trick)」包裹，確保長邊緊貼邊緣無留白（注意：若為 `background-generation-formula` 則**不套用**此包裹）：
   - 若 W > H (如 16:9)：`A single [W:H] cinematic illustration placed in the CENTER of a square canvas, extending fully from the LEFT edge to the RIGHT edge with zero margin. The top and bottom background areas are solid #FADADD. The central [W:H] illustration depicts: <Content Prompt>`
   - 若 H > W (如 9:16)：`A single [W:H] cinematic illustration placed in the CENTER of a square canvas, extending fully from the TOP edge to the BOTTOM edge with zero margin. The left and right background areas are solid #FADADD. The central [W:H] illustration depicts: <Content Prompt>`

## Step 4: 呼叫生成與驗證 (Execution)

1. **原生執行**：
   呼叫 `generate_image` 工具，傳入 `Prompt` 與對應的 `AspectRatio`。
2. **驗證與 Fallback 裁切**：
   取得生成的圖片路徑後，驗證其是否符合目標比例：
   - **符合目標比例**：直接將圖片呈現給使用者。
   - **不符合 (如 API 故障退回 1:1 或無效)**：啟動降級裁切機制。執行以下 Python 腳本將 1:1 原圖物理裁切：
     `python C:\Users\wang6\.gemini\config\plugins\antigravity-image-master\skills\custom-ratio-image-gen\scripts\crop_image.py <input_path> <output_path> --ratio <W:H>`
     *(請將 `<output_path>` 存在您的 `scratch` 資料夾下，並以 `_cropped.png` 結尾)*
3. 最後，將最終完成的圖片呈現給使用者。
