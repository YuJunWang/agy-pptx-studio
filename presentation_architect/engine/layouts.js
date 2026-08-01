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
// 引擎防呆機制 (Engine Safeguards)
// ---------------------------------------------------------
function calculateFontSize(text, baseSize) {
    if (!text) return baseSize;
    // 簡單的中文字元長度估算
    const charCount = text.length;
    if (charCount > 15) {
        console.warn(`[Safeguard] Text length (${charCount}) exceeds safe limits. Auto-scaling font size down 25%. Text: "${text.substring(0, 10)}..."`);
        return Math.floor(baseSize * 0.75);
    }
    if (charCount > 8) {
        return Math.floor(baseSize * 0.85);
    }
    return baseSize;
}

function checkListOverflow(list, maxItems) {
    if (list && list.length > maxItems) {
        console.warn(`[Safeguard] List has ${list.length} items, which exceeds the layout limit of ${maxItems}. Items may overflow!`);
    }
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

    const titleSize = calculateFontSize(content.title, 54);
    slide.addText(content.title, { x: '15%', y: '35%', w: '70%', h: 1.5, fontSize: titleSize, color: colorPalette.primary, bold: theme.titleWeight === "bold", breakLine: true });
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
    
    const titleSize = calculateFontSize(content.title, 50);
    slide.addText(content.title, { x: '10%', y: '30%', w: '80%', h: 1.5, fontSize: titleSize, color: colorPalette.primary, valign: 'bottom' });
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
    
    checkListOverflow(content.bullets, 6);
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
        const cardData = content.cards?.[i] || content[`grid_${i+1}`] || {};
        
        slide.addShape(slide.pres.ShapeType.roundRect, { x: `${xPos}%`, y: `${yPos}%`, w: '38%', h: '32%', fill: { color: colorPalette.background === "FFFFFF" ? "F4F4F4" : "FFFFFF" }, rectRadius: t.radius, line: t.line, shadow: t.shadow });
        slide.addText(cardData.title || "", { x: `${xPos+2}%`, y: `${yPos+3}%`, w: '34%', fontSize: 18, color: colorPalette.primary, bold: true });
        slide.addText(cardData.description || cardData.content || cardData.text || "", { x: `${xPos+2}%`, y: `${yPos+12}%`, w: '34%', fontSize: 13, color: "555555", breakLine: true });
    }
}
function render_L12_Compare(slide, content, themeId, colorPalette) {
    // Left = accent colored panel, Right = light panel — side-by-side comparison
    const t = getThemeConfig(themeId);
    slide.background = { color: colorPalette.background };
    const titleSize = calculateFontSize(content.title, 36);
    slide.addText(content.title || "", { x: '5%', y: '5%', w: '90%', fontSize: titleSize, color: colorPalette.primary, bold: true });

    const left = content.left_column || {};
    const right = content.right_column || {};
    const accent = colorPalette.accent_colors?.[0] || colorPalette.primary;

    // Left panel (accent)
    slide.addShape(slide.pres.ShapeType.roundRect, { x: '5%', y: '20%', w: '42%', h: '70%', fill: { color: accent }, rectRadius: t.radius });
    slide.addText(left.title || "", { x: '8%', y: '25%', w: '36%', fontSize: 22, color: "FFFFFF", bold: true });
    (left.bullets || []).forEach((b, i) => {
        slide.addText("✓  " + b, { x: '8%', y: 3.2 + (i * 0.65), w: '36%', fontSize: 14, color: "FFFFFF", breakLine: true });
    });

    // Right panel (light)
    slide.addShape(slide.pres.ShapeType.roundRect, { x: '53%', y: '20%', w: '42%', h: '70%', fill: { color: "F0F0F0" }, rectRadius: t.radius });
    slide.addText(right.title || "", { x: '56%', y: '25%', w: '36%', fontSize: 22, color: colorPalette.primary, bold: true });
    (right.bullets || []).forEach((b, i) => {
        slide.addText("✗  " + b, { x: '56%', y: 3.2 + (i * 0.65), w: '36%', fontSize: 14, color: "888888", breakLine: true });
    });
}
function render_L13_Horizontal_Timeline(slide, content, themeId, colorPalette) {
    const t = getThemeConfig(themeId);
    slide.background = { color: colorPalette.background };
    slide.addText(content.title || "", { x: '5%', y: '5%', w: '90%', fontSize: 32, color: colorPalette.primary, bold: true });
    const items = content.items || [];
    const count = Math.max(items.length, 1);
    const stepW = Math.floor(90 / count);
    slide.addShape(slide.pres.ShapeType.line, { x: '5%', y: '50%', w: '90%', h: 0, line: { color: colorPalette.accent_colors?.[0] || colorPalette.primary, width: 2 } });
    items.forEach((item, i) => {
        const xPos = 5 + (i * stepW);
        slide.addShape(slide.pres.ShapeType.ellipse, { x: `${xPos + stepW/2 - 2}%`, y: '44%', w: '4%', h: '12%', fill: { color: colorPalette.accent_colors?.[0] || colorPalette.primary } });
        slide.addText(item.title || item.label || "", { x: `${xPos}%`, y: '60%', w: `${stepW}%`, fontSize: 14, color: colorPalette.primary, align: 'center' });
        slide.addText(item.description || item.text || "", { x: `${xPos}%`, y: '68%', w: `${stepW}%`, fontSize: 11, color: "666666", align: 'center', breakLine: true });
    });
}
function render_L14_Process_4(slide, content, themeId, colorPalette) {
    // 4-step horizontal process diagram with arrows
    const t = getThemeConfig(themeId);
    slide.background = { color: colorPalette.background };
    const titleSize = calculateFontSize(content.title, 36);
    slide.addText(content.title || "", { x: '5%', y: '5%', w: '90%', fontSize: titleSize, color: colorPalette.primary, bold: true });

    const steps = [
        { label: content.step_1 || content.steps?.[0] || "Step 1", num: "01" },
        { label: content.step_2 || content.steps?.[1] || "Step 2", num: "02" },
        { label: content.step_3 || content.steps?.[2] || "Step 3", num: "03" },
        { label: content.step_4 || content.steps?.[3] || "Step 4", num: "04" },
    ];
    const accent = colorPalette.accent_colors?.[0] || colorPalette.primary;

    steps.forEach((step, i) => {
        const xPos = 5 + (i * 23);
        // Box
        slide.addShape(slide.pres.ShapeType.roundRect, { x: `${xPos}%`, y: '30%', w: '19%', h: '45%', fill: { color: i === 0 ? accent : "F4F4F4" }, rectRadius: t.radius });
        // Big number
        slide.addText(step.num, { x: `${xPos+1}%`, y: '33%', w: '17%', fontSize: 36, color: i === 0 ? "FFFFFF" : "DDDDDD", bold: true });
        // Label
        slide.addText(step.label, { x: `${xPos+1}%`, y: '55%', w: '17%', fontSize: 16, color: i === 0 ? "FFFFFF" : colorPalette.primary, bold: true, breakLine: true, align: 'center' });
        // Arrow (except last)
        if (i < 3) {
            slide.addText("→", { x: `${xPos + 19.5}%`, y: '48%', w: '3%', fontSize: 20, color: accent, align: 'center' });
        }
    });
}
function render_L10_Dark_Card(slide, content, themeId, colorPalette) {
    // Dark background, title + bullet list — ideal for bold statements
    slide.background = { color: colorPalette.primary };
    const titleSize = calculateFontSize(content.title, 44);
    slide.addText(content.title || "", { x: '10%', y: '20%', w: '80%', fontSize: titleSize, color: colorPalette.background, bold: true });
    (content.bullets || []).forEach((b, i) => {
        slide.addText("•  " + b, { x: '10%', y: 3.5 + (i * 0.7), w: '80%', fontSize: 20, color: colorPalette.accent_colors?.[0] || "CCCCCC", breakLine: true });
    });
}
function render_L11_Metric_Dashboard(slide, content, themeId, colorPalette) {
    // KPI-style: title + 3 big-number metrics side by side
    const t = getThemeConfig(themeId);
    slide.background = { color: colorPalette.background };
    slide.addText(content.title || "", { x: '5%', y: '5%', w: '90%', fontSize: 32, color: colorPalette.primary, bold: true });
    const metrics = content.metrics || [];
    const accent = colorPalette.accent_colors?.[0] || colorPalette.primary;
    metrics.slice(0, 3).forEach((m, i) => {
        const xPos = 10 + (i * 30);
        slide.addShape(slide.pres.ShapeType.roundRect, { x: `${xPos}%`, y: '25%', w: '25%', h: '55%', fill: { color: "F9F9F9" }, rectRadius: t.radius });
        slide.addText(m.value || "", { x: `${xPos}%`, y: '30%', w: '25%', fontSize: 48, color: accent, bold: true, align: 'center' });
        slide.addText(m.label || "", { x: `${xPos}%`, y: '60%', w: '25%', fontSize: 14, color: colorPalette.primary, align: 'center' });
    });
}
function render_L15_Circular_Process(slide, content, themeId, colorPalette) {
    // Fallback: render as a simple section divider
    render_L04_Section_Divider(slide, content, themeId, colorPalette);
}
function render_L16_Dual_Pipeline(slide, content, themeId, colorPalette) {}
function render_L17_Matrix_3x3(slide, content, themeId, colorPalette) {}
function render_L18_Stacked_Ledger(slide, content, themeId, colorPalette) {}
function render_L19_KPI_Tower(slide, content, themeId, colorPalette) {}
function render_L20_Image_Lead(slide, content, themeId, colorPalette) {
    // M04: Image on left, text on right
    slide.background = { color: colorPalette.background };
    if (content.image_path) {
        slide.addImage({ path: content.image_path, x: '5%', y: '10%', w: '45%', h: '80%', sizing: { type: 'cover' } });
    }
    const titleSize = calculateFontSize(content.title, 36);
    slide.addText(content.title || "", { x: '55%', y: '20%', w: '40%', fontSize: titleSize, color: colorPalette.primary, bold: true });
    if (content.paragraph || content.content) {
        slide.addText(content.paragraph || content.content, { x: '55%', y: '40%', w: '40%', fontSize: 16, color: "444444", breakLine: true });
    }
}

module.exports = {
    render_L01_Cover_Standard, render_L02_Cover_Blocks, render_L03_Cover_Wireframe, render_L04_Section_Divider,
    render_L05_Quote_Split, render_L06_Color_Split, render_L07_Two_Columns, render_L08_Three_Columns,
    render_L09_Four_Grid, render_L10_Dark_Card, render_L11_Metric_Dashboard, render_L12_Compare,
    render_L13_Horizontal_Timeline, render_L14_Process_4, render_L15_Circular_Process, render_L16_Dual_Pipeline,
    render_L17_Matrix_3x3, render_L18_Stacked_Ledger, render_L19_KPI_Tower, render_L20_Image_Lead
};
