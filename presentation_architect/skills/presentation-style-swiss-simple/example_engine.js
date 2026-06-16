const pptxgen = require('pptxgenjs');
const fs = require('fs');
const yaml = require('js-yaml');

const fileContents = fs.readFileSync('_blueprint.yaml', 'utf8');
const blueprint = yaml.load(fileContents);

let pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5

// CRITICAL: Font mappings to simulate extreme weights
const fontExtralight = "Inter Light"; 
const fontRegular = "Inter";
const fontBold = "Inter SemiBold";

pres.theme = { headFontFace: fontExtralight, bodyFontFace: fontRegular }; 

const bgImage = blueprint.background_image_path;
const colors = blueprint.internal_design_system.color_palette.colors;
const accentColor = blueprint.internal_design_system.color_palette.complementary_color || "0A42D1";
const slidesData = blueprint.slide_layout_blueprint;

slidesData.forEach((slideData) => {
    let slide = pres.addSlide();
    
    if (bgImage) {
        slide.addImage({ path: bgImage, x: 0, y: 0, w: 13.33, h: 7.5, sizing: { type: "cover" } });
    } else {
        slide.background = { color: "FFFFFF" };
    }

    if (slideData.layout_type === "S01") { 
        slide.addText(slideData.title, { x: 0.5, y: 0.5, w: 12, h: 1, fontSize: 40, fontFace: fontExtralight, color: "000000" });
        
        let cardW = 3.8; let startX = 0.5;
        let cardColors = [accentColor, "F5F5F5", "000000"];
        let textColors = ["FFFFFF", "000000", "FFFFFF"];
        
        if(slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cx = startX + (i * (cardW + 0.3));
                slide.addShape(pres.ShapeType.rect, { x: cx, y: 2.0, w: cardW, h: 5.0, fill: { color: cardColors[i%3] } });
                slide.addText(card.title || "", { x: cx + 0.2, y: 6.0, w: cardW - 0.4, h: 0.5, fontSize: 20, fontFace: fontBold, color: textColors[i%3] });
                slide.addText(card.text || "", { x: cx + 0.2, y: 6.5, w: cardW - 0.4, h: 0.5, fontSize: 12, fontFace: fontRegular, color: textColors[i%3] });
            });
        }
    } 
    else if (slideData.layout_type === "S02") { 
        slide.addText(slideData.title, { x: 0.5, y: 1.0, w: 6.0, h: 4.0, fontSize: 60, fontFace: fontExtralight, color: "000000", lineSpacing: 60 });
        if(slideData.subtitle) {
            slide.addText(slideData.subtitle, { x: 0.5, y: 5.0, w: 6.0, h: 1.0, fontSize: 60, fontFace: fontExtralight, color: accentColor });
        }
        slide.addText(slideData.text || "", { x: 7.0, y: 2.0, w: 5.5, h: 1.5, fontSize: 14, fontFace: fontRegular, color: "000000" });
        slide.addShape(pres.ShapeType.rect, { x: 7.0, y: 4.0, w: 5.5, h: 0.02, fill: { color: "CCCCCC" } });
        
        if(slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cx = 7.0 + (i * 2.8);
                slide.addText(card.title || "", { x: cx, y: 4.5, w: 2.5, h: 0.5, fontSize: 14, fontFace: fontBold, color: "000000" });
                slide.addText(card.text || "", { x: cx, y: 5.0, w: 2.5, h: 1.0, fontSize: 12, fontFace: fontRegular, color: "555555" });
            });
        }
    }
    else if (slideData.layout_type === "S03") { 
        slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 5.33, h: 7.5, fill: { color: accentColor } });
        slide.addText(slideData.title, { x: 0.5, y: 2.5, w: 4.5, h: 3.0, fontSize: 48, fontFace: fontExtralight, color: "FFFFFF", lineSpacing: 50 });
        
        if(slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cy = 2.0 + (i * 1.5);
                slide.addText(`0${i+1}`, { x: 6.0, y: cy, w: 1.0, h: 0.8, fontSize: 32, fontFace: fontExtralight, color: accentColor });
                slide.addText(card.title || "", { x: 7.2, y: cy + 0.1, w: 5.0, h: 0.4, fontSize: 18, fontFace: fontBold, color: "000000" });
                slide.addText(card.text || "", { x: 7.2, y: cy + 0.5, w: 5.0, h: 0.4, fontSize: 12, fontFace: fontRegular, color: "555555" });
                slide.addShape(pres.ShapeType.rect, { x: 6.0, y: cy + 1.2, w: 6.5, h: 0.02, fill: { color: "CCCCCC" } });
            });
        }
    }
    else if (slideData.layout_type === "S05") { 
        let colW = 3.5; let startX = 1.0;
        if(slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cx = startX + (i * 4.0);
                slide.addText(card.title || "", { x: cx, y: 1.5, w: colW, h: 0.5, fontSize: 20, fontFace: fontBold, color: "000000" });
                slide.addText(card.text || "", { x: cx, y: 2.2, w: colW, h: 2.0, fontSize: 12, fontFace: fontRegular, color: "555555" });
                
                let numColor = i === 2 ? accentColor : "000000";
                slide.addText(`0${i+1}`, { x: cx, y: 5.5, w: colW, h: 1.5, fontSize: 80, fontFace: fontExtralight, color: numColor });
                slide.addShape(pres.ShapeType.rect, { x: cx, y: 7.0, w: colW, h: 0.02, fill: { color: "CCCCCC" } });
            });
        }
    }
    else if (slideData.layout_type === "S06") {
        slide.addText(slideData.title, { x: 0.6, y: 0.5, w: 12.0, h: 1.0, fontSize: 48, fontFace: fontExtralight, color: "000000" });
        let numCards = Math.min(slideData.cards ? slideData.cards.length : 0, 4);
        if (numCards > 0) {
            let colW = 12.0 / numCards;
            let maxVal = Math.max(...slideData.cards.map(c => parseFloat(c.metric_value) || 100));
            let maxH = 4.0;
            slideData.cards.forEach((card, i) => {
                let cx = 0.6 + (i * colW);
                let val = parseFloat(card.metric_value) || (maxVal * 0.5);
                let h = (val / maxVal) * maxH;
                let cy = 6.5 - h;
                slide.addShape(pres.ShapeType.rect, { x: cx + 0.2, y: cy, w: colW - 0.4, h: h, fill: { color: i===0 ? accentColor : "DDDDDD" } });
                slide.addText(card.metric_value || "", { x: cx, y: cy - 0.8, w: colW, h: 0.8, fontSize: 36, fontFace: fontExtralight, color: "000000", align: "center" });
                slide.addText(card.title || "", { x: cx, y: 6.6, w: colW, h: 0.6, fontSize: 16, fontFace: fontBold, color: "000000", align: "center" });
            });
        }
    }
    else if (slideData.layout_type === "S11") {
        slide.addText(slideData.title, { x: 0.6, y: 0.5, w: 12.0, h: 1.0, fontSize: 40, fontFace: fontExtralight, color: "000000" });
        slide.addShape(pres.ShapeType.rect, { x: 0.6, y: 3.75, w: 12.13, h: 0.02, fill: { color: "CCCCCC" } });
        let numCards = slideData.cards ? slideData.cards.length : 0;
        if(numCards > 0) {
            let step = 12.13 / Math.max(numCards - 1, 1);
            slideData.cards.forEach((card, i) => {
                let cx = 0.6 + (i * step);
                slide.addShape(pres.ShapeType.oval, { x: cx - 0.1, y: 3.65, w: 0.2, h: 0.2, fill: { color: accentColor } });
                let ty = i % 2 === 0 ? 2.0 : 4.2;
                slide.addText(card.title || "", { x: cx - 1.5, y: ty, w: 3.0, h: 0.5, fontSize: 20, fontFace: fontBold, color: "000000", align: "center" });
                slide.addText(card.text || "", { x: cx - 1.5, y: ty + 0.5, w: 3.0, h: 1.0, fontSize: 14, fontFace: fontRegular, color: "555555", align: "center" });
            });
        }
    }
    else if (slideData.layout_type === "S12") {
        slide.addText(slideData.title, { x: 0.6, y: 0.5, w: 12.0, h: 1.0, fontSize: 40, fontFace: fontExtralight, color: "000000" });
        if(slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cy = 2.0 + (i * 1.2);
                slide.addText(`0${i+1}`, { x: 0.6, y: cy, w: 0.8, h: 0.8, fontSize: 32, fontFace: fontExtralight, color: accentColor });
                slide.addText(card.title || "", { x: 1.5, y: cy + 0.1, w: 4.0, h: 0.4, fontSize: 16, fontFace: fontBold, color: "000000" });
                slide.addText(card.text || "", { x: 1.5, y: cy + 0.5, w: 4.0, h: 0.4, fontSize: 12, fontFace: fontRegular, color: "555555" });
                slide.addShape(pres.ShapeType.rect, { x: 0.6, y: cy + 1.0, w: 4.9, h: 0.02, fill: { color: "CCCCCC" } });
            });
        }
        slide.addShape(pres.ShapeType.donut, { x: 7.0, y: 2.0, w: 5.0, h: 5.0, fill: { color: "F5F5F5" } });
        slide.addText("Improves", { x: 7.0, y: 2.0, w: 5.0, h: 5.0, fontSize: 24, fontFace: fontBold, color: accentColor, align: "center", valign: "middle" });
    }
    else if (slideData.layout_type === "S15") {
        slide.addText(slideData.title, { x: 0.6, y: 0.5, w: 12.0, h: 1.0, fontSize: 40, fontFace: fontExtralight, color: "000000" });
        let cols = 3; let w = 3.8; let h = 2.0; let startX = 0.6; let startY = 1.8; let gap = 0.2;
        if (slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let row = Math.floor(i / cols); let col = i % cols;
                let cx = startX + col * (w + gap); let cy = startY + row * (h + gap);
                slide.addShape(pres.ShapeType.rect, { x: cx, y: cy, w: w, h: h, fill: { color: "F9F9F9" } });
                slide.addText(card.title || "", { x: cx + 0.2, y: cy + 0.2, w: w - 0.4, h: 0.5, fontSize: 24, fontFace: fontBold, color: "000000" });
                slide.addText(card.text || "", { x: cx + 0.2, y: cy + 0.8, w: w - 0.4, h: 1.0, fontSize: 14, fontFace: fontRegular, color: "555555" });
            });
        }
    }
    else if (slideData.layout_type === "S20") {
        slide.addText(slideData.title, { x: 0.6, y: 0.5, w: 12.0, h: 1.0, fontSize: 40, fontFace: fontExtralight, color: "000000" });
        if(slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cy = 2.0 + (i * 1.0);
                slide.addShape(pres.ShapeType.rect, { x: 0.6, y: cy, w: 12.13, h: 0.02, fill: { color: "CCCCCC" } });
                slide.addText(card.title || "", { x: 0.6, y: cy + 0.2, w: 4.0, h: 0.6, fontSize: 24, fontFace: fontBold, color: "000000" });
                slide.addText(card.metric_value || "", { x: 5.0, y: cy + 0.2, w: 3.0, h: 0.6, fontSize: 28, fontFace: fontExtralight, color: accentColor });
                slide.addText(card.text || "", { x: 8.5, y: cy + 0.2, w: 4.0, h: 0.6, fontSize: 14, fontFace: fontRegular, color: "555555" });
            });
        }
    }
    else if (slideData.layout_type === "S21") { 
        slide.addText(slideData.title, { x: 0.5, y: 1.5, w: 4.0, h: 2.0, fontSize: 44, fontFace: fontExtralight, color: "000000" });
        if(slideData.cards) {
            slideData.cards.slice(0,3).forEach((card, i) => {
                let cx = 5.5 + (i * 2.5);
                slide.addText(card.title || "", { x: cx, y: 1.5, w: 2.0, h: 0.5, fontSize: 12, fontFace: fontBold, color: "555555" });
                slide.addText(card.metric_value || "", { x: cx, y: 2.0, w: 2.0, h: 1.0, fontSize: 48, fontFace: fontExtralight, color: "000000" });
                slide.addShape(pres.ShapeType.rect, { x: cx, y: 3.2, w: 2.0, h: 0.02, fill: { color: "CCCCCC" } });
            });
        }
        slide.addText(slideData.subtitle || "74", { x: 0.5, y: 5.5, w: 2.0, h: 1.5, fontSize: 80, fontFace: fontExtralight, color: "000000" });
        slide.addText(slideData.text || "Yearly goal", { x: 2.5, y: 6.2, w: 3.0, h: 0.5, fontSize: 16, fontFace: fontBold, color: "000000" });
    }
    else {
        slide.addText(slideData.title, { x: 0.5, y: 0.5, w: 12, h: 1, fontSize: 40, fontFace: fontExtralight, color: "000000" });
    }
});

pres.writeFile({ fileName: "Presentation_Swiss_Simple_Final.pptx" });
