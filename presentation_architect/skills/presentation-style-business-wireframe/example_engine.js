const fs = require('fs');
const pptxgen = require('pptxgenjs');
const yaml = require('js-yaml');

// 1. Read YAML Blueprint
const blueprintPath = process.argv[2] || '_blueprint.yaml';
const blueprint = yaml.load(fs.readFileSync(blueprintPath, 'utf8'));
const ds = blueprint.internal_design_system;

// 2. Initialize Presentation
let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Define standard colors
const primaryBg = ds.color_palette.primary_background || 'F2F2F2';
const strokeColor = ds.color_palette.accent_color || '36454F'; 
const textDark = ds.color_palette.text_main || '36454F';
const textLight = 'FFFFFF';
const fontFace = ds.typography.title || 'Calibri';

// Utility for drawing top divider
function drawTopDivider(slide) {
    slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.4, w: 12.33, h: 0.05, fill: { color: strokeColor } });
}

function drawHeader(slide, title) {
    drawTopDivider(slide);
    slide.addText(title, {
        x: 0.5, y: 0.6, w: 12.0, h: 1.0,
        fontSize: 28, color: textDark, fontFace: fontFace, bold: true, align: 'left', valign: 'top'
    });
}

// 3. Render Slides
blueprint.slides.forEach(slideData => {
    let slide = pres.addSlide();
    slide.background = { color: primaryBg };

    if (slideData.layout_type === 'business-cover') {
        // Slide 1: Cover
        slide.addShape(pres.ShapeType.rect, { x: 1.0, y: 3.0, w: 11.33, h: 0.05, fill: { color: strokeColor } });
        slide.addText(slideData.title, {
            x: 1.0, y: 1.5, w: 11.0, h: 1.5,
            fontSize: 44, color: textDark, fontFace: fontFace, bold: true, align: 'left', valign: 'bottom'
        });
        if (slideData.subtitle) {
            slide.addText(slideData.subtitle, {
                x: 1.0, y: 3.3, w: 11.0, h: 1.0,
                fontSize: 20, color: textDark, fontFace: fontFace, align: 'left', valign: 'top'
            });
        }
    } 
    else if (slideData.layout_type === 'business-section') {
        // Slide 8: Section
        slide.addShape(pres.ShapeType.rect, { x: 0, y: 3.0, w: 13.33, h: 1.5, fill: { color: strokeColor } });
        slide.addText(slideData.title, {
            x: 1.0, y: 3.0, w: 11.33, h: 1.5,
            fontSize: 44, color: textLight, fontFace: fontFace, bold: true, align: 'center', valign: 'middle'
        });
        if (slideData.subtitle) {
            slide.addText(slideData.subtitle, {
                x: 1.0, y: 4.8, w: 11.33, h: 1.0,
                fontSize: 20, color: textDark, fontFace: fontFace, align: 'center', valign: 'top'
            });
        }
    }
    else if (slideData.layout_type === 'business-split') {
        // Slide 2: Split
        drawHeader(slide, slideData.title);
        slide.addText(slideData.cards && slideData.cards[0] ? slideData.cards[0].title : "", {
            x: 1.0, y: 2.5, w: 5.0, h: 4.0,
            fontSize: 32, color: textDark, fontFace: fontFace, bold: true, align: 'left', valign: 'top'
        });
        // Rounded Card Right
        slide.addShape(pres.ShapeType.roundRect, { 
            x: 6.5, y: 2.5, w: 6.0, h: 3.0, rectRadius: 0.1, 
            fill: { color: 'FFFFFF' }, line: { color: strokeColor, width: 1.5 } 
        });
        slide.addText(slideData.cards && slideData.cards[1] ? slideData.cards[1].text : "", {
            x: 6.8, y: 2.8, w: 5.4, h: 2.4,
            fontSize: 18, color: textDark, fontFace: fontFace, align: 'left', valign: 'top'
        });
    }
    else if (slideData.layout_type === 'business-dark-card') {
        // Slide 4: Dark Card
        drawHeader(slide, slideData.title);
        slide.addShape(pres.ShapeType.roundRect, { 
            x: 1.5, y: 2.5, w: 10.33, h: 4.0, rectRadius: 0.1, fill: { color: strokeColor } 
        });
        slide.addText(slideData.cards ? slideData.cards[0].text : "", {
            x: 1.8, y: 2.8, w: 9.7, h: 3.4,
            fontSize: 20, color: textLight, fontFace: fontFace, align: 'left', valign: 'top'
        });
    }
    else if (slideData.layout_type === 'business-grid-2') {
        // Slide 7: Grid 2 (Sharp Rectangles)
        drawHeader(slide, slideData.title);
        let startX = 1.0;
        if (slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cx = startX + (i * 6.1);
                slide.addShape(pres.ShapeType.rect, { 
                    x: cx, y: 2.8, w: 5.2, h: 3.5, fill: { color: 'FFFFFF' }, line: { color: strokeColor, width: 1.5 } 
                });
                slide.addText([
                    { text: card.title + '\n', options: { fontSize: 24, bold: true } },
                    { text: card.text, options: { fontSize: 16 } }
                ], { x: cx + 0.3, y: 3.1, w: 4.6, h: 2.5, color: textDark, fontFace: fontFace, align: 'left', valign: 'top' });
            });
        }
    }
    else if (slideData.layout_type === 'business-grid-3') {
        // Slide 3: Grid 3 (Rounded with inner lines)
        drawHeader(slide, slideData.title);
        let startX = 1.0;
        if (slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cx = startX + (i * 3.8);
                slide.addShape(pres.ShapeType.roundRect, { 
                    x: cx, y: 2.8, w: 3.5, h: 3.5, rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: strokeColor, width: 1.5 } 
                });
                slide.addText(card.title, { x: cx, y: 3.1, w: 3.5, h: 0.5, fontSize: 20, bold: true, color: textDark, align: 'center', valign: 'top' });
                slide.addShape(pres.ShapeType.rect, { x: cx + 0.5, y: 3.8, w: 2.5, h: 0.02, fill: { color: strokeColor } });
                slide.addText(card.text, { x: cx + 0.3, y: 4.1, w: 2.9, h: 2.0, fontSize: 14, color: textDark, align: 'left', valign: 'top' });
            });
        }
    }
    else if (slideData.layout_type === 'business-compare') {
        // Slide 5: DO/DON'T Compare
        drawHeader(slide, slideData.title);
        let startX = 1.0;
        if (slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cx = startX + (i * 6.1);
                // Header block
                slide.addShape(pres.ShapeType.rect, { x: cx, y: 2.5, w: 5.2, h: 0.6, fill: { color: strokeColor } });
                slide.addText(card.title, { x: cx, y: 2.5, w: 5.2, h: 0.6, fontSize: 20, color: textLight, bold: true, align: 'center', valign: 'middle' });
                // Text block
                slide.addText(card.text, { x: cx, y: 3.4, w: 5.2, h: 3.0, fontSize: 18, color: textDark, align: 'left', valign: 'top' });
            });
        }
    }
    else if (slideData.layout_type === 'business-process-4') {
        // Slide 6: 4 Steps Flow
        drawHeader(slide, slideData.title);
        let startX = 0.5;
        if (slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cx = startX + (i * 3.1);
                // Card
                slide.addShape(pres.ShapeType.roundRect, { 
                    x: cx, y: 3.5, w: 2.6, h: 2.5, rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: strokeColor, width: 1.5 } 
                });
                // Number Badge
                slide.addShape(pres.ShapeType.ellipse, { x: cx + 1.0, y: 3.2, w: 0.6, h: 0.6, fill: { color: strokeColor } });
                slide.addText(String(i + 1), { x: cx + 1.0, y: 3.2, w: 0.6, h: 0.6, fontSize: 20, color: textLight, bold: true, align: 'center', valign: 'middle' });
                // Text
                slide.addText([
                    { text: card.title + '\n', options: { fontSize: 18, bold: true } },
                    { text: card.text, options: { fontSize: 14 } }
                ], { x: cx + 0.1, y: 4.0, w: 2.4, h: 1.8, color: textDark, align: 'center', valign: 'top' });
                // Arrow between cards
                if (i < 3) {
                    slide.addShape(pres.ShapeType.rightArrow, { x: cx + 2.7, y: 4.6, w: 0.3, h: 0.2, fill: { color: strokeColor } });
                }
            });
        }
    }
});

pres.writeFile({ fileName: "presentation_output.pptx" }).then(() => {
    console.log("Presentation generated successfully.");
});
