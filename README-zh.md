# agy-pptx-studio

*其他語言版本: [English](README.md)*

> 「agy-pptx-studio 不僅是一個排版工具，更是一個具備美學意識與高度模組化的自動化簡報生產線。」

![Release Status](https://img.shields.io/badge/Release-Public_Beta-orange)
![Architecture](https://img.shields.io/badge/Architecture-Multi--Agent-purple)
![Framework](https://img.shields.io/badge/Framework-Antigravity-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!IMPORTANT]
> **🚀 Beta 階段提示 (Public Beta Phase)**
> 本專案目前處於 Beta 測試階段。部分多代理人工作流 (Multi-Agent Workflow) 與生圖 API 的邊界條件可能會在未來的版本中進行調整。

**「關於 agy-pptx-studio」**

這是一個專為 AI 驅動、追求極致美學的簡報 (PPTX) 生成所設計的生態系與 Monorepo (單一儲存庫)。本專案集中了所有用來建立、排版與生成豐富投影片所需的工具、技能 (Skills) 與外掛 (Plugins)，並交由 Antigravity AI 代理人來執行。透過領域驅動設計 (DDD)，我們確保這個生態系內的所有功能都具有高度凝聚力，且完全針對「簡報製作」進行最佳化。

### 1. 🤖 多代理人協作流程 (Presentation Architect Workflow)
此核心外掛被設計為一個 **「多代理人部門 (Multi-Agent Department)」**，作為生成高質感簡報的大腦。這套工作流會透過 **總指揮 (presentation-orchestrator)** 接收使用者的初始指令，並嚴格依照順序分配給專責的子代理人執行：

> **workflow**：`[指令輸入]` ➔ 🔍 `研究員` ➔ 📝 `策略師` ➔ 🎨 `藝術指導` ➔ 🛠️ `實作工程師` ➔ `[輸出 PPTX]`

* **🔍 研究員 (presentation-researcher)**：
    流程的第一步會先蒐集原始資料、進行深度分析並萃取出必要的洞察資訊，輸出為純文字的研究檔案。
* **📝 策略師 (presentation-strategist)**：
    接收原始資料後，建構出具有邏輯且引人入勝的敘事故事板 (Storyboard)，決定投影片的起承轉合並產出文字大綱。
* **🎨 藝術指導 (presentation-art-director)**：
    根據大綱套用嚴格的設計系統與網格限制，選擇合適的字體與配色，並調用生圖工具來產生需要的視覺素材，最終完成高度規格化的 YAML 藍圖 (`_blueprint.yaml`)。
* **🛠️ 實作工程師 (presentation-engineer)**：
    接收最終的藍圖，使用 `pptxgenjs` (Node.js 函式庫) 渲染並輸出實體的 `.pptx` 簡報檔案。

### 2. 🏛️ 風格版規劃工程師與舊檔翻新 (Style Architect & Renovation)
這個生態系中還包含一位特別的 **「風格版規劃工程師 (presentation-style-architect)」**，專門負責設計嚴謹的網格排版與高彈性的色彩系統。
* **匯入現有簡報 (舊檔翻新)**：當使用者提供一份舊的 `.pptx` 檔案時，總指揮會呼叫特製的 Python 腳本 (`extract_pptx.py`) 擷取純文字大綱。規劃工程師接著就能分析這個大綱，將其完美映射到現代美學的排版網格上，確保在套用新風格的同時，原有的內容架構完全不被破壞。

### 3. 🖼️ 繪圖功能深度改造 (Image Generation Enhancements)
此模組作為簡報視覺素材的生成中心。它深度改造並強化了 Antigravity 內建的 `generate_image` 指令，解決了原生工具的多項限制，確保能產出適合簡報使用的專業級素材。

* **無文字/無主角的簡報底圖**：原生的生圖工具很容易產出包含亂碼或元素過度擁擠的圖像。我們設計的 `background-generation-formula` 會強制加上極嚴格的限制（例如：`NO TEXT, NO WORD`），專門用來生成極致乾淨、閱讀性極高的簡報底圖與 UI 背景。
* **提示詞強化器 (Prompt Enhancer)**：包含用於生成高品質電影感插畫的「7 層結構公式 (`image-generation-formula`)」，以及專為時間軸、漏斗圖、循環圖等抽象概念設計的「5 層圖表結構公式 (`diagram-generation-formula`)」。
* **突破比例限制的裁切腳本**：Antigravity 內建的生圖指令目前只能輸出 1:1 的正方形圖片。為了解決這個問題，調度中心使用了一種巧妙的「留白填充 (Padding Prompt)」技巧來生成被包裹在正方形中的寬螢幕圖像，接著自動呼叫一段 Python 腳本 (`crop_image.py`)，將圖片物理裁切成精確的 16:9、9:16 或任何簡報所需的自訂比例。

## 🛠️ 技術堆疊 (Tech Stack)
* **Agent Framework**: Antigravity, LangChain (Skills & Agents)
* **Presentation Rendering**: Node.js (`pptxgenjs`)
* **Image Processing**: Python (Pillow / Image Cropping scripts)
* **Design Systems**: YAML, JSON (Decoupled layout engines)

## 📂 檔案結構 (Architecture Directory)
```text
agy-pptx-studio/
├── presentation_architect/      # 多代理人簡報生成核心外掛
│   ├── plugin.json
│   ├── skills/                  # 各司其職的子代理人技能包
│   ├── scripts/                 # Python/Node.js 實作腳本 (extract_pptx 等)
│   └── styles/                  # 色彩、排版系統與網格藍圖
└── antigravity-image-master/    # 視覺素材與生圖強化外掛
    ├── plugin.json
    └── skills/                  # 生圖公式與比例裁切技能包
```

### 1. 取得與安裝專案 (Installation)
請將本專案複製並連結到你的 Antigravity 擴充套件資料夾中：
```bash
git clone https://github.com/YuJunWang/agy-pptx-studio.git
```
*(將專案內的兩個 plugin 資料夾直接放進或連結至你的 Antigravity `.gemini/config/plugins` 目錄下即可生效。)*

### 2. 指令範例 (Usage Example)
你可以透過一段完整的 Prompt 來直接啟動多代理人協作流程，讓大腦為你調度一切：

> 「根據這兩年的咖啡產業資訊研究，為一名台灣在地的咖啡供應商，製作一份用於創投的 15 分鐘簡報，以麥肯錫商業顧問的簡報風格執行，盡可能包含所需要的數據與圖表，其他沒有決定的細節由你決定。」

## 👨‍💻 作者 (Author)
**Yu-Jun Wang**
* [GitHub Profile](https://github.com/YuJunWang)

## 📄 授權條款 (License)
本專案採用 **[MIT License](LICENSE)** 授權。
你可以自由地使用、複製、修改與散佈本專案，但請保留原作者的版權聲明。
