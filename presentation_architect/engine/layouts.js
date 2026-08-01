/**
 * 基礎排版引擎 (Base Layout Engine for pptxgenjs)
 * 這個檔案負責將 Art Director 輸出的 YAML (Data-Driven)
 * 轉換為 pptxgenjs 的絕對座標與繪圖邏輯。
 */

function getThemeConfig(themeId) {
    const themes = {
        "Swiss_Minimal": { radius: 0, shadow: false, titleWeight: "bold" },
        "Floating_Cards": { radius: 16, shadow: { type: "outer", color: "000000", opacity: 0.1, blur: 15 }, titleWeight: "bold" },
        "Business_Wireframe": { radius: 4, line: { color: "666666", width: 1 }, shadow: false, titleWeight: "normal" },
        "Magazine": { radius: 0, shadow: false, titleWeight: "normal", fontFace: "Georgia" } // e.g. Serif
    };
    return themes[themeId] || themes["Swiss_Minimal"];
}

// ---------------------------------------------------------
// 封面與過場 (Covers & Transitions)
// ---------------------------------------------------------
function render_L01_Cover_Standard(slide, content, themeId, colorPalette) {
    const theme = getThemeConfig(themeId);
    if (content.background_image_path) slide.background = { path: content.background_image_path };
    else slide.background = { color: colorPalette.background };

    if (themeId === "Floating_Cards") {
        slide.addShape(slide.pres.ShapeType.roundRect, { x: '10%', y: '20%', w: '80%', h: '60%', fill: { color: colorPalette.background, transparency: 10 }, rectRadius: theme.radius, shadow: theme.shadow });
    }

    slide.addText(content.title, { x: '15%', y: '35%', w: '70%', h: 1.5, fontSize: 54, color: colorPalette.primary, bold: theme.titleWeight === "bold", breakLine: true });
    if (content.subtitle) slide.addText(content.subtitle, { x: '15%', y: '50%', w: '70%', h: 1.0, fontSize: 24, color: colorPalette.accent_colors?.[0] || "888888", breakLine: true });
}

function render_L02_Cover_Blocks(slide, content, themeId, colorPalette) {
    // 實作 S01_Cover_Blocks: 3 vertical color blocks at bottom 2/3
    slide.background = { color: colorPalette.background };
    slide.addShape(slide.pres.ShapeType.rect, { x: 0, y: '33%', w: '33%', h: '67%', fill: { color: colorPalette.accent_colors?.[0] || "0000FF" } });
    slide.addShape(slide.pres.ShapeType.rect, { x: '33%', y: '33%', w: '33%', h: '67%', fill: { color: "FFFFFF" } });
    slide.addShape(slide.pres.ShapeType.rect, { x: '66%', y: '33%', w: '34%', h: '67%', fill: { color: "000000" } });
    slide.addText(content.title, { x: '5%', y: '10%', w: '90%', fontSize: 60, color: colorPalette.primary, bold: true });
}

function render_L03_Cover_Wireframe(slide, content, themeId, colorPalette) {
    // 實作 BW01: Title floating above a central line
    slide.background = { color: colorPalette.background };
    slide.addShape(slide.pres.ShapeType.line, { x: '10%', y: '50%', w: '80%', h: 0, line: { color: colorPalette.primary, width: 2 } });
    slide.addText(content.title, { x: '10%', y: '30%', w: '80%', h: 1.5, fontSize: 50, color: colorPalette.primary, valign: 'bottom' });
    if(content.subtitle) slide.addText(content.subtitle, { x: '10%', y: '55%', w: '80%', h: 1.0, fontSize: 20, color: "666666", valign: 'top' });
}

function render_L04_Section_Divider(slide, content, themeId, colorPalette) {
    // 實作 BW02 / M02
    slide.background = { color: colorPalette.background };
    slide.addShape(slide.pres.ShapeType.rect, { x: 0, y: '35%', w: '100%', h: '30%', fill: { color: colorPalette.primary } });
    slide.addText(content.title, { x: '10%', y: '40%', w: '80%', fontSize: 44, color: colorPalette.background, align: 'center' });
}

// ---------------------------------------------------------
// 核心內容與數據 (Core Content & Data)
// ---------------------------------------------------------
function render_L05_Quote_Split(slide, content, themeId, colorPalette) {
    // 實作 S02_Quote_Split
    slide.background = { color: colorPalette.background };
    const quote = content.quote_or_data || content.quote || "";
    const paragraph = content.paragraph || content.text || "";
    const author = content.author ? `\n\n— ${content.author}` : "";
    
    slide.addText(quote, { x: '5%', y: '20%', w: '40%', h: '60%', fontSize: 50, color: colorPalette.accent_colors?.[0] || colorPalette.primary, bold: true, breakLine: true, align: 'center', valign: 'middle' });
    slide.addShape(slide.pres.ShapeType.line, { x: '50%', y: '20%', w: 0, h: '60%', line: { color: "CCCCCC", width: 1 } });
    slide.addText(paragraph + author, { x: '55%', y: '25%', w: '40%', fontSize: 20, color: colorPalette.primary, breakLine: true });
    if(content.bullets) {
        content.bullets.forEach((b, i) => {
            slide.addText("• " + b, { x: '55%', y: 3.5 + (i * 0.6), w: '40%', fontSize: 16, color: "555555" });
        });
    }
}

function render_L06_Color_Split(slide, content, themeId, colorPalette) {
    // 實作 S03_Blue_Split
    slide.background = { color: colorPalette.background };
    slide.addShape(slide.pres.ShapeType.rect, { x: 0, y: 0, w: '40%', h: '100%', fill: { color: colorPalette.accent_colors?.[0] || "0A42D1" } });
    slide.addText(content.title, { x: '5%', y: '40%', w: '30%', fontSize: 48, color: "FFFFFF", breakLine: true });
    if (content.bullets) {
        content.bullets.forEach((b, i) => {
            slide.addShape(slide.pres.ShapeType.line, { x: '45%', y: 1.5 + (i * 1.5), w: '50%', h: 0, line: { color: "EEEEEE", width: 1 } });
            slide.addText(`0${i+1}`, { x: '45%', y: 1.6 + (i * 1.5), w: '5%', fontSize: 14, color: "999999" });
            slide.addText(b, { x: '50%', y: 1.6 + (i * 1.5), w: '45%', fontSize: 20, color: colorPalette.primary, breakLine: true });
        });
    }
}

function render_L07_Two_Columns(slide, content, themeId, colorPalette) {
    // 實作 BW05 / FC03
    const t = getThemeConfig(themeId);
    slide.background = { color: colorPalette.background };
    slide.addText(content.title, { x: '10%', y: '10%', w: '80%', fontSize: 36, color: colorPalette.primary, bold: t.titleWeight === "bold" });
    
    const cardY = '25%', cardW = '35%', cardH = '60%';
    // Left Card
    slide.addShape(slide.pres.ShapeType.roundRect, { x: '10%', y: cardY, w: cardW, h: cardH, fill: { color: "FFFFFF" }, rectRadius: t.radius, line: t.line, shadow: t.shadow });
    slide.addText(content.column_1?.title || "", { x: '12%', y: '28%', w: '31%', fontSize: 24, color: colorPalette.primary, bold: true });
    // Right Card
    slide.addShape(slide.pres.ShapeType.roundRect, { x: '55%', y: cardY, w: cardW, h: cardH, fill: { color: "FFFFFF" }, rectRadius: t.radius, line: t.line, shadow: t.shadow });
    slide.addText(content.column_2?.title || "", { x: '57%', y: '28%', w: '31%', fontSize: 24, color: colorPalette.primary, bold: true });
}

function render_L08_Three_Columns(slide, content, themeId, colorPalette) {
    // 實作 S05_Three_Pillars / BW06
    const t = getThemeConfig(themeId);
    slide.background = { color: colorPalette.background };
    slide.addText(content.title, { x: '5%', y: '10%', w: '90%', fontSize: 36, color: colorPalette.primary });
    
    for(let i=0; i<3; i++) {
        const xPos = 5 + (i * 32);
        const colData = content.columns?.[i] || content[`column_${i+1}`] || {};
        
        slide.addShape(slide.pres.ShapeType.roundRect, { x: `${xPos}%`, y: '25%', w: '28%', h: '65%', fill: { color: "FFFFFF" }, rectRadius: t.radius, line: t.line, shadow: t.shadow });
        slide.addText(`0${i+1}`, { x: `${xPos}%`, y: '70%', w: '28%', fontSize: 60, color: "F0F0F0", align: 'center' }); // Massive background number
        slide.addText(colData.title || "", { x: `${xPos+2}%`, y: '28%', w: '24%', fontSize: 20, color: colorPalette.primary, bold: true });
        
        if(colData.bullets) {
            colData.bullets.forEach((b, j) => {
                slide.addText("• " + b, { x: `${xPos+2}%`, y: 3.5 + (j * 0.5), w: '24%', fontSize: 16, color: "555555" });
            });
        }
    }
}

// ---------------------------------------------------------
// Other layouts (L09 - L20) are explicitly defined as empty stubs
// to be filled out by the execution engineer in the future.
// ---------------------------------------------------------
function render_L09_Four_Grid(slide, content, themeId, colorPalette) {
    const t = getThemeConfig(themeId);
    slide.background = { color: colorPalette.background };
    slide.addText(content.title, { x: '5%', y: '5%', w: '90%', fontSize: 36, color: colorPalette.primary, bold: t.titleWeight === "bold" });
    
    for (let i = 0; i < 4; i++) {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const xPos = 10 + (col * 42);
        const yPos = 20 + (row * 38);
        const cardData = content.cards?.[i] || content[`card_${i+1}`] || {};
        
        slide.addShape(slide.pres.ShapeType.roundRect, { x: `${xPos}%`, y: `${yPos}%`, w: '38%', h: '32%', fill: { color: "FFFFFF" }, rectRadius: t.radius, line: t.line, shadow: t.shadow });
        slide.addText(cardData.title || "", { x: `${xPos+2}%`, y: `${yPos+3}%`, w: '34%', fontSize: 20, color: colorPalette.primary, bold: true });
        slide.addText(cardData.description || cardData.text || "", { x: `${xPos+2}%`, y: `${yPos+12}%`, w: '34%', fontSize: 14, color: "555555" });
    }
}
function render_L10_Dark_Card(slide, content, themeId, colorPalette) {}
function render_L11_Metric_Dashboard(slide, content, themeId, colorPalette) {}
function render_L12_Compare(slide, content, themeId, colorPalette) {}
function render_L13_Horizontal_Timeline(slide, content, themeId, colorPalette) {}
function render_L14_Process_4(slide, content, themeId, colorPalette) {}
function render_L15_Circular_Process(slide, content, themeId, colorPalette) {}
function render_L16_Dual_Pipeline(slide, content, themeId, colorPalette) {}
function render_L17_Matrix_3x3(slide, content, themeId, colorPalette) {}
function render_L18_Stacked_Ledger(slide, content, themeId, colorPalette) {}
function render_L19_KPI_Tower(slide, content, themeId, colorPalette) {}
function render_L20_Image_Lead(slide, content, themeId, colorPalette) {
    // 實作 M04: Image on left, text on right
    slide.background = { color: colorPalette.background };
    if (content.image_path) {
        slide.addImage({ path: content.image_path, x: '5%', y: '10%', w: '45%', h: '80%', sizing: { type: 'cover' } });
    }
    slide.addText(content.title, { x: '55%', y: '20%', w: '40%', fontSize: 36, color: colorPalette.primary, fontFace: "Georgia" });
    slide.addText(content.paragraph, { x: '55%', y: '40%', w: '40%', fontSize: 16, color: "444444" });
}

module.exports = {
    render_L01_Cover_Standard, render_L02_Cover_Blocks, render_L03_Cover_Wireframe, render_L04_Section_Divider,
    render_L05_Quote_Split, render_L06_Color_Split, render_L07_Two_Columns, render_L08_Three_Columns,
    render_L09_Four_Grid, render_L10_Dark_Card, render_L11_Metric_Dashboard, render_L12_Compare,
    render_L13_Horizontal_Timeline, render_L14_Process_4, render_L15_Circular_Process, render_L16_Dual_Pipeline,
    render_L17_Matrix_3x3, render_L18_Stacked_Ledger, render_L19_KPI_Tower, render_L20_Image_Lead
};
