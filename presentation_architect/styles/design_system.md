# 設計系統約束 (Design System Constraints)

本文件定義了不同的「視覺風格 (Style Theme)」。
**Art Director** 應根據使用者的需求或簡報主題，選擇一種風格，並將其 `style_theme` ID 寫入 YAML 中。
**Engine** 會讀取該風格的設定，並套用至選定的版型 (Layout) 上。

> 注意：色彩組合已抽離至 `color_palettes.json`。本文件僅定義幾何特徵與字體粗細等物理屬性。

## 支援的風格主題 (Supported Themes)

### 1. `Swiss_Minimal` (瑞士極簡風)
- **Vibe**: 權威、學術、極致對比、冷峻
- **Geometry**: 
  - 邊框 (Stroke): 無
  - 圓角 (Radius): 0 (絕對直角)
  - 陰影 (Shadow): 無
- **Typography**:
  - 標題 (Title): 極粗 (Weight 800-900)，極大
  - 內文 (Body): 標準 (Weight 400)
- **Engine Behavior**: 元素間距使用絕對網格對齊，區塊背景多為實心純色填滿。

### 2. `Floating_Cards` (現代 SaaS 浮動卡片)
- **Vibe**: 溫暖、友善、現代、科技
- **Geometry**: 
  - 邊框 (Stroke): 無 或 極淡的灰色邊框 (1px)
  - 圓角 (Radius): 16px - 24px
  - 陰影 (Shadow): 柔和的外陰影 (Blur: 15, Opacity: 0.1)
- **Typography**:
  - 標題 (Title): 粗體 (Weight 700)
  - 內文 (Body): 標準 (Weight 400)
- **Engine Behavior**: 所有的內容區塊都會被包裝在獨立的卡片中，卡片漂浮在乾淨的淺色背景上。

### 3. `Business_Wireframe` (商務線框)
- **Vibe**: 專業、顧問、嚴謹、結構化
- **Geometry**: 
  - 邊框 (Stroke): 強調邊框 (2px, 根據配色決定顏色)
  - 圓角 (Radius): 4px - 8px (微圓角)
  - 陰影 (Shadow): 無
- **Typography**:
  - 標題 (Title): 中粗 (Weight 600)
  - 內文 (Body): 標準 (Weight 400)
- **Engine Behavior**: 強調視覺分隔線。區塊之間使用細線條切割，而非純色塊堆疊。

### 4. `VS_Code_Dark` (工程師暗黑終端)
- **Vibe**: 駭客、代碼、硬核科技
- **Geometry**: 
  - 邊框 (Stroke): 1px (霓虹色系)
  - 圓角 (Radius): 8px
  - 陰影 (Shadow): 發光效果 (Glow / Blur 10, 霓虹色)
- **Typography**:
  - 標題與內文一律使用等寬字體 (Monospace，如 Consolas 或 Fira Code)
- **Engine Behavior**: 模擬視窗 UI，標題列帶有 macOS 的三個圓點。強制使用深色背景色彩。
