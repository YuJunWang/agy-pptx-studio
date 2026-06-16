# agy-pptx-studio

*其他語言版本: [English](README.md)*

歡迎來到 **agy-pptx-studio**！這是一個專為 AI 驅動、追求極致美學的簡報 (PPTX) 生成所設計的生態系與 Monorepo (單一儲存庫)。

這個儲存庫集中了所有用來建立、排版與生成豐富投影片所需的工具、技能 (Skills) 與外掛 (Plugins)，並交由 Antigravity AI 代理人來執行。透過領域驅動設計 (DDD)，我們確保這個生態系內的所有功能都具有高度凝聚力，且完全針對「簡報製作」進行最佳化。

## 包含的外掛 (Plugins)

本儲存庫包含兩個核心外掛，它們協同工作以提供無縫的簡報生成工作流：

### 1. [presentation-architect](./presentation_architect)
一個專注於生成高美感、工作流驅動的 PPTX 簡報的 AI 代理人技能生態系。
- **用途**：作為運作的大腦。它使用解耦的樣式 JSON 檔案，將敘事結構對應到實際的 PPTX 投影片版面上。
- **能力**：將文字想法轉化為結構、套用視覺設計風格，並使用 Node.js 邏輯來渲染產生實際的 `.pptx` 檔案。

### 2. [antigravity-image-master](./antigravity-image-master)
針對特定 AI 圖片生成任務所提供的高階提示詞工程 (Prompt Engineering) 方法論、模板與工具包。
- **用途**：作為投影片的視覺素材建立者。
- **能力**：生成自訂比例的圖片、背景版面配置與結構圖，這些素材皆是為了符合現代投影片的美學與尺寸限制而量身打造。

## 協同運作方式

1. **策略規劃 (The Strategist)**：工作流程通常從 `presentation-architect` 開始，代理人會在此建構故事板，並決定每一頁需要的視覺素材。
2. **藝術指導 (The Art Director)**：當投影片需要客製化圖形、資訊圖表或背景時，會呼叫 `antigravity-image-master` 外掛來生成精確的視覺素材。
3. **實作工程 (The Engineer)**：最後，`presentation-architect` 會將生成的文字與圖片整合，根據選擇的風格模板，完美地合併成最終的 PPTX 檔案。

## 開始使用

*(未來的使用說明、環境設定與前置需求將會記錄於此。)*

---
*專為 Antigravity AI 生態系打造。*
