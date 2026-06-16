# agy-pptx-studio

*其他語言版本: [English](README.md)*

歡迎來到 **agy-pptx-studio**！這是一個專為 AI 驅動、追求極致美學的簡報 (PPTX) 生成所設計的生態系與 Monorepo (單一儲存庫)。

這個儲存庫集中了所有用來建立、排版與生成豐富投影片所需的工具、技能 (Skills) 與外掛 (Plugins)，並交由 Antigravity AI 代理人來執行。透過領域驅動設計 (DDD)，我們確保這個生態系內的所有功能都具有高度凝聚力，且完全針對「簡報製作」進行最佳化。

---

## 1. 多代理人協作流程 (Presentation Architect Workflow)
[資料夾位置: `./presentation_architect`](./presentation_architect)

此核心外掛被設計為一個 **「多代理人部門 (Multi-Agent Department)」**，作為生成高質感簡報的大腦。這套工作流會透過 **總指揮 (presentation-orchestrator)** 接收使用者的初始指令，並嚴格依照順序分配給專責的子代理人執行：

1. **資料收集 (presentation-researcher)**：流程的第一步會先蒐集原始資料、進行深度分析並萃取出必要的洞察資訊，輸出為純文字的研究檔案。
2. **敘事建構 (presentation-strategist)**：接收原始資料後，建構出具有邏輯且引人入勝的敘事故事板 (Storyboard)，決定投影片的起承轉合並產出文字大綱。
3. **風格與素材分配 (presentation-art-director)**：根據大綱套用嚴格的設計系統與網格限制，選擇合適的字體與配色，並調用生圖工具來產生需要的視覺素材，最終完成高度規格化的 YAML 藍圖 (`_blueprint.yaml`)。
4. **實作渲染 (presentation-engineer)**：接收最終的藍圖，使用 `pptxgenjs` (Node.js 函式庫) 渲染並輸出實體的 `.pptx` 簡報檔案。

### 風格版規劃工程師與舊檔翻新
這個生態系中還包含一位特別的 **「風格版規劃工程師 (presentation-style-architect)」**，專門負責設計嚴謹的網格排版與高彈性的色彩系統。
- **匯入現有簡報 (舊檔翻新)**：當使用者提供一份舊的 `.pptx` 檔案時，總指揮會呼叫特製的 Python 腳本 (`extract_pptx.py`) 擷取純文字大綱。規劃工程師接著就能分析這個大綱，將其完美映射到現代美學的排版網格上，確保在套用新風格的同時，原有的內容架構完全不被破壞。

---

## 2. 繪圖功能深度改造 (Image Generation Enhancements)
[資料夾位置: `./antigravity-image-master`](./antigravity-image-master)

此模組作為簡報視覺素材的生成中心。它深度改造並強化了 Antigravity 內建的 `generate_image` 指令，解決了原生工具的多項限制，確保能產出適合簡報使用的專業級素材。

### 核心功能改造：
- **無文字/無主角的簡報底圖**：原生的生圖工具很容易產出包含亂碼或元素過度擁擠的圖像。我們設計的 `background-generation-formula` 會強制加上極嚴格的限制（例如：`NO TEXT, NO WORD`），專門用來生成極致乾淨、閱讀性極高的簡報底圖與 UI 背景。
- **提示詞強化器 (Prompt Enhancer)**：包含用於生成高品質電影感插畫的「7 層結構公式 (`image-generation-formula`)」，以及專為時間軸、漏斗圖、循環圖等抽象概念設計的「5 層圖表結構公式 (`diagram-generation-formula`)」。
- **突破比例限制的裁切腳本**：Antigravity 內建的生圖指令目前只能輸出 1:1 的正方形圖片。為了解決這個問題，調度中心使用了一種巧妙的「留白填充 (Padding Prompt)」技巧來生成被包裹在正方形中的寬螢幕圖像，接著自動呼叫一段 Python 腳本 (`crop_image.py`)，將圖片物理裁切成精確的 16:9、9:16 或任何簡報所需的自訂比例。

---

## 開始使用
*(未來的使用說明、環境設定與前置需求將會記錄於此。)*

---
*專為 Antigravity AI 生態系打造。*
