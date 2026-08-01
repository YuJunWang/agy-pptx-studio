# 基礎排版庫 (Base Layout Library)

這份文件定義了 `pptxgenjs` 引擎支援的所有基礎版型 (Layouts)。這些版型萃取自過往的 Swiss, Wireframe, Floating Cards 與 Magazine 風格。
**Strategist** 必須根據簡報內容的邏輯，從以下 20 個版型中選擇，並將 ID 交給 Art Director。

## 封面與過場 (Covers & Transitions)
- `L01_Cover_Standard`: 標準封面。大標題、副標題，背景滿版。(源自 FC02/M01)
- `L02_Cover_Blocks`: 色塊封面。底部三分之二被垂直色塊分割。(源自 Swiss S01)
- `L03_Cover_Wireframe`: 線框封面。標題懸浮於中央水平線上。(源自 BW01)
- `L04_Section_Divider`: 章節過場。巨大數字配上極大留白，或中央全寬深色橫帶。(源自 M02/BW02)

## 核心內容與數據 (Core Content & Data)
- `L05_Quote_Split`: 左半邊巨大數據/引言，右半邊段落與條列。(源自 Swiss S02 / M08)
- `L06_Color_Split`: 40/60 雙色分割。左側實心底色白字，右側編號清單。(源自 Swiss S03)
- `L07_Two_Columns`: 雙欄排版 (Grid 2)。左右兩張卡片或線框矩形。(源自 BW05 / FC03)
- `L08_Three_Columns`: 三欄卡片 (Grid 3 / Three Pillars)。底部巨大編號。(源自 Swiss S05 / BW06)
- `L09_Four_Grid`: 四象限矩陣。2x2 卡片。(通用擴充)
- `L10_Dark_Card`: 單一巨大深色卡片橫跨畫面。適合極重要的宣告。(源自 BW04)
- `L11_Metric_Dashboard`: 數據看板。左側大標題，右側三個巨大數據指標。(源自 Swiss S21)
- `L12_Compare`: Do/Don't 或 Pros/Cons 比較表。(源自 BW07)

## 圖表與結構 (Diagrams & Structures)
- `L13_Horizontal_Timeline`: 橫向時間軸，節點交錯。(源自 Swiss S11)
- `L14_Process_4`: 四步驟流程圖，帶有箭頭與重疊徽章。(源自 BW08)
- `L15_Circular_Process`: 左側編號清單，右側環狀流程圖。(源自 Swiss S12)
- `L16_Dual_Pipeline`: 雙重平行管道圖。(源自 M06)
- `L17_Matrix_3x3`: 3x3 矩形卡片陣列。(源自 Swiss S15)
- `L18_Stacked_Ledger`: 堆疊帳本。多列水平分隔線，適合新舊對比。(源自 Swiss S20)
- `L19_KPI_Tower`: 垂直幾何長條圖配上巨大頂部數字。(源自 Swiss S06)

## 圖像與敘事 (Images & Storytelling)
- `L20_Image_Lead`: 左側 16:10 巨幅照片，右側無襯線說故事內文。(源自 M04)

> 註：版型的具體座標 (x, y, w, h)、防遮掩與換行計算，已全部封裝於 `engine/layouts.js` 中。LLM 不需（也不應）在 YAML 中計算座標。
