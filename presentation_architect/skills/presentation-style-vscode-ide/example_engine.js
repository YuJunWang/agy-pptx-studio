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
const bgEditor = ds.color_palette.primary_background || '1E1E1E';
const bgTitleBar = '252526';
const bgActivityBar = '333333';
const bgStatusBar = ds.color_palette.accent_color || '007ACC';

// Syntax colors
const colorKeyword = 'C586C0'; // Purple
const colorFunc = 'DCDCAA';    // Yellow
const colorString = 'CE9178';  // Orange
const colorComment = '6A9955'; // Green
const colorType = '4EC9B0';    // Mint

const fontMono = ds.typography.title || 'Consolas';
const fontSans = ds.typography.body || 'Arial';

function drawVSCodeChrome(slide, windowTitle) {
    // Background of slide
    slide.background = { color: bgEditor };

    // 1. Title Bar (Top)
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.3, fill: { color: bgTitleBar } });
    slide.addText(windowTitle || "main.py - Visual Studio Code", {
        x: 0, y: 0, w: 13.33, h: 0.3, fontSize: 10, color: '999999', fontFace: fontSans, align: 'center', valign: 'middle'
    });

    // 2. Activity Bar (Left)
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 0.3, w: 0.5, h: 6.9, fill: { color: bgActivityBar } });
    // Add fake icons (just tiny colored squares for aesthetic)
    slide.addShape(pres.ShapeType.rect, { x: 0.15, y: 0.5, w: 0.2, h: 0.2, fill: { color: 'FFFFFF' } });
    slide.addShape(pres.ShapeType.rect, { x: 0.15, y: 0.9, w: 0.2, h: 0.2, fill: { color: '858585' } });

    // 3. Status Bar (Bottom)
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 7.2, w: 13.33, h: 0.3, fill: { color: bgStatusBar } });
    slide.addText("master*", {
        x: 0.1, y: 7.2, w: 2.0, h: 0.3, fontSize: 10, color: 'FFFFFF', fontFace: fontSans, align: 'left', valign: 'middle'
    });
}

function drawLineNumbers(slide, startY, count) {
    let numbers = [];
    for(let i=1; i<=count; i++) numbers.push(i.toString());
    slide.addText(numbers.join('\n'), {
        x: 0.5, y: startY, w: 0.5, h: count * 0.4, 
        fontSize: 16, color: '858585', fontFace: fontMono, align: 'right', valign: 'top', lineSpacing: 24
    });
}

// 3. Render Slides
blueprint.slides.forEach(slideData => {
    let slide = pres.addSlide();
    drawVSCodeChrome(slide, slideData.keyword ? `${slideData.keyword.toLowerCase()}.py` : "main.py");

    if (slideData.layout_type === 'vscode-cover') {
        // Draw some line numbers
        drawLineNumbers(slide, 2.0, 5);
        
        // Syntax highlighted title: def Title():
        slide.addText([
            { text: "def ", options: { color: colorKeyword } },
            { text: slideData.title, options: { color: colorFunc, bold: true } },
            { text: "():", options: { color: 'CCCCCC' } }
        ], {
            x: 1.5, y: 2.5, w: 11.0, h: 1.0, fontSize: 44, fontFace: fontMono, align: 'left', valign: 'middle'
        });

        if (slideData.subtitle) {
            slide.addText([
                { text: `    """\n    ${slideData.subtitle}\n    """`, options: { color: colorComment, italic: true } }
            ], {
                x: 1.5, y: 3.6, w: 11.0, h: 1.5, fontSize: 24, fontFace: fontMono, align: 'left', valign: 'top'
            });
        }
    } 
    else if (slideData.layout_type === 'vscode-mac-window') {
        slide.addText(`// ${slideData.title}`, {
            x: 1.5, y: 0.8, w: 11.0, h: 0.5, fontSize: 28, color: colorComment, fontFace: fontMono, italic: true
        });

        // Draw Mac Window
        slide.addShape(pres.ShapeType.roundRect, { x: 1.5, y: 1.5, w: 10.0, h: 5.0, rectRadius: 0.05, fill: { color: '2D2D2D' } });
        // Header
        slide.addShape(pres.ShapeType.rect, { x: 1.5, y: 1.5, w: 10.0, h: 0.4, fill: { color: '3C3C3C' } });
        // Mac Dots
        slide.addShape(pres.ShapeType.ellipse, { x: 1.6, y: 1.6, w: 0.15, h: 0.15, fill: { color: 'FF5F56' } });
        slide.addShape(pres.ShapeType.ellipse, { x: 1.85, y: 1.6, w: 0.15, h: 0.15, fill: { color: 'FFBD2E' } });
        slide.addShape(pres.ShapeType.ellipse, { x: 2.1, y: 1.6, w: 0.15, h: 0.15, fill: { color: '27C93F' } });

        if (slideData.cards && slideData.cards.length > 0) {
            slide.addText(slideData.cards[0].text, {
                x: 1.8, y: 2.2, w: 9.4, h: 4.0, fontSize: 20, color: 'D4D4D4', fontFace: fontMono, align: 'left', valign: 'top'
            });
        }
    }
    else if (slideData.layout_type === 'vscode-agent-grid') {
        slide.addText(`class ${slideData.title.replace(/\s+/g, '')}:`, {
            x: 1.5, y: 0.8, w: 11.0, h: 0.5, fontSize: 28, color: colorType, fontFace: fontMono
        });

        let startX = 1.5;
        let startY = 1.8;
        let cardColors = [colorType, colorKeyword, colorFunc];
        
        if (slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let cx = startX + (i % 3) * 3.6;
                let cy = startY + Math.floor(i / 3) * 2.5;
                
                // Card bg
                slide.addShape(pres.ShapeType.roundRect, { x: cx, y: cy, w: 3.3, h: 2.2, rectRadius: 0.05, fill: { color: '252526' } });
                // Top Border
                slide.addShape(pres.ShapeType.rect, { x: cx, y: cy, w: 3.3, h: 0.1, fill: { color: cardColors[i % 3] } });
                
                slide.addText(card.title, { x: cx+0.2, y: cy+0.3, w: 2.9, h: 0.4, fontSize: 20, color: cardColors[i % 3], fontFace: fontMono, bold: true });
                slide.addText(card.text, { x: cx+0.2, y: cy+0.8, w: 2.9, h: 1.2, fontSize: 14, color: 'CCCCCC', fontFace: fontSans });
            });
        }
    }
    else if (slideData.layout_type === 'vscode-chat-flow') {
        slide.addText(`async function ${slideData.title.replace(/\s+/g, '')}() {`, {
            x: 1.5, y: 0.8, w: 11.0, h: 0.5, fontSize: 24, color: colorFunc, fontFace: fontMono
        });

        let startY = 1.6;
        if (slideData.cards) {
            slideData.cards.forEach((card, i) => {
                let isRight = (i % 2 !== 0);
                let cx = isRight ? 7.0 : 2.0;
                let cy = startY + (i * 1.3);
                let bgColor = isRight ? '0E639C' : '333333';
                
                // Author meta
                slide.addText(card.title, {
                    x: cx, y: cy, w: 4.0, h: 0.3, fontSize: 12, color: '858585', fontFace: fontMono, align: isRight ? 'right' : 'left'
                });
                // Chat Bubble
                slide.addShape(pres.ShapeType.roundRect, { x: cx, y: cy+0.3, w: 4.0, h: 0.8, rectRadius: 0.1, fill: { color: bgColor } });
                slide.addText(card.text, {
                    x: cx+0.2, y: cy+0.3, w: 3.6, h: 0.8, fontSize: 16, color: 'FFFFFF', fontFace: fontSans, align: 'left', valign: 'middle'
                });
            });
        }
    }
});

pres.writeFile({ fileName: "presentation_output.pptx" }).then(() => {
    console.log("Presentation generated successfully.");
});
