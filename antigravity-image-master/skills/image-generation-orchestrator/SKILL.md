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
必須使用「防呆畫布提示詞 (Prompt Trick)」包裹，確保長邊緊貼邊緣無留白：
1. 若 W > H (如 16:9)：`A single [W:H] cinematic illustration placed in the CENTER of a square canvas, extending fully from the LEFT edge to the RIGHT edge with zero margin. The top and bottom background areas are solid #FADADD. The central [W:H] illustration depicts: <Content Prompt>`
2. 若 H > W (如 9:16)：`A single [W:H] cinematic illustration placed in the CENTER of a square canvas, extending fully from the TOP edge to the BOTTOM edge with zero margin. The left and right background areas are solid #FADADD. The central [W:H] illustration depicts: <Content Prompt>`
*(提示：`#FADADD` 可替換為不會干擾主體的純色)*

### Step 4: 呼叫生成與裁切 (Execution)
1. 使用組合好的最終 Prompt 呼叫 `generate_image` 工具。
2. **(重要) 如果是情境 B (非 1:1)**，取得圖片路徑後，你必須開啟 Terminal 執行以下 Python 腳本進行物理裁切：
   `python C:\Users\wang6\.gemini\config\plugins\antigravity-image-master\skills\custom-ratio-image-gen\scripts\crop_image.py <input_path> <output_path> --ratio <W:H>`
   *(請將 `<output_path>` 存在您的 `scratch` 資料夾下，並以 `_cropped.png` 結尾)*
3. 最後，將最終裁切好的圖片 (或 1:1 原圖) 呈現給使用者。
