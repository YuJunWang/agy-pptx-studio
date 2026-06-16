const pptxgen = require('pptxgenjs');
const fs = require('fs');
const yaml = require('js-yaml');

const fileContents = fs.readFileSync('_blueprint.yaml', 'utf8');
const blueprint = yaml.load(fileContents);

let pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.theme = { headFontFace: "Arial", bodyFontFace: "Arial" }; 

const bgImage = blueprint.background_image_path;
const colors = blueprint.internal_design_system.color_palette.colors;
const slidesData = blueprint.slide_layout_blueprint;

slidesData.forEach((slideData, index) => {
    let slide = pres.addSlide();
    
    // Background Image
    if (bgImage) {
        slide.addImage({ path: bgImage, x: 0, y: 0, w: 13.33, h: 7.5, sizing: { type: "cover", w: 13.33, h: 7.5 } });
    }

    // Title and Subtitle
    slide.addText(slideData.title, {
        x: 0.5, y: 0.5, w: 12.0, h: 1.0,
        fontSize: 44, bold: true, color: colors[0], align: "center", valign: "middle"
    });
    
    if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
            x: 0.5, y: 1.5, w: 12.0, h: 0.6,
            fontSize: 24, color: "555555", align: "center", valign: "middle"
        });
    }

    // Grid Cards Logic
    if (slideData.cards && slideData.cards.length > 0) {
        let numCards = slideData.cards.length;
        let cardSpacing = 0.5;
        let totalW = 12.33; // margins
        let cardW = (totalW - (cardSpacing * (numCards - 1))) / numCards;
        let cardH = 4.0;
        let startX = 0.5;
        let startY = 2.5;

        slideData.cards.forEach((card, i) => {
            let cx = startX + i * (cardW + cardSpacing);
            
            // Draw floating card with shadow
            slide.addShape(pres.ShapeType.roundRect, {
                x: cx, y: startY, w: cardW, h: cardH,
                fill: { color: "FFFFFF" },
                rectRadius: 0.1,
                shadow: { type: 'outer', color: '000000', opacity: 0.15, blur: 15, offset: 8 }
            });

            // Card Content
            if (card.title) {
                slide.addText(card.title, {
                    x: cx + 0.2, y: startY + 0.2, w: cardW - 0.4, h: 0.8,
                    fontSize: 28, bold: true, color: colors[0], align: "center"
                });
            }
            if (card.text) {
                slide.addText(card.text, {
                    x: cx + 0.2, y: startY + 1.2, w: cardW - 0.4, h: 2.5,
                    fontSize: 18, color: "333333", align: "left", valign: "top"
                });
            }
        });
    }
});

pres.writeFile({ fileName: "Presentation_Floating_Cards.pptx" }).then(() => {
    console.log("Presentation generated successfully.");
});
