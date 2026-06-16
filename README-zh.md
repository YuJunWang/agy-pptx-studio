# agy-pptx-studio

*其他語言版本: [English](README.md)*

歡迎來到 **agy-pptx-studio**！這是一個專為 AI 驅動、追求極致美學的簡報 (PPTX) 生成所設計的生態系與 Monorepo (單一儲存庫)。

這個儲存庫集中了所有用來建立、排版與生成豐富投影片所需的工具、技能 (Skills) 與外掛 (Plugins)，並交由 Antigravity AI 代理人來執行。透過領域驅動設計 (DDD)，我們確保這個生態系內的所有功能都具有高度凝聚力，且完全針對「簡報製作」進行最佳化。

## 包含的外掛 (Plugins)

本儲存庫包含兩個核心外掛，它們協同工作以提供無縫的簡報生成工作流：

### 1. [presentation-architect](./presentation_architect)
這是一個多代理人 (Multi-Agent) 部門架構的外掛，作為專注於生成高美感、工作流驅動 PPTX 簡報的核心大腦。
- **presentation-orchestrator (總指揮)**：主要的入口點，負責調度部門內的各項簡報製作任務。
- **presentation-researcher (研究員)**：負責蒐集數據、執行深度分析並提供簡報所需的洞察資訊。
- **presentation-strategist (策略師)**：建構敘事故事板 (Storyboard)，並產出核心的 YAML 藍圖架構。
- **presentation-engineer (實作工程師)**：使用 `pptxgenjs` 執行藍圖，套用設計系統並渲染出最終的 `.pptx` 簡報檔。

### 2. [antigravity-image-master](./antigravity-image-master)
作為視覺素材的生成中心，使用指揮官模式來管理進階提示詞與圖片比例裁切任務。
- **image-generation-orchestrator (生圖調度中心)**：主要的控制中心，負責判斷圖片比例、挑選合適的公式，並自動執行物理裁切腳本以符合簡報尺寸。
- **image-generation-formula (通用生圖公式)**：一個 7 層結構的提示詞公式，用於生成高度擬真、場景、插畫與電影感的圖像。
- **background-generation-formula (背景生圖公式)**：一個 4 層結構的提示詞公式，專門為了簡報底圖、UI 背景或需要疊加文字的場景所最佳化。
- **diagram-generation-formula (圖表生圖公式)**：一個 5 層結構的提示詞公式，專為時間軸、漏斗圖、循環圖等具象化概念圖表所設計。

## 協同運作方式

1. **策略規劃 (The Strategist)**：工作流程通常從 `presentation-architect` 開始，代理人會在此建構故事板，並決定每一頁需要的視覺素材。
2. **藝術指導 (The Art Director)**：當投影片需要客製化圖形、資訊圖表或背景時，會呼叫 `antigravity-image-master` 外掛來生成精確的視覺素材。
3. **實作工程 (The Engineer)**：最後，`presentation-architect` 會將生成的文字與圖片整合，根據選擇的風格模板，完美地合併成最終的 PPTX 檔案。

## 開始使用

*(未來的使用說明、環境設定與前置需求將會記錄於此。)*

---
*專為 Antigravity AI 生態系打造。*
