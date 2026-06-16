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
const accentColor = blueprint.internal_design_system.color_palette.complementary_color;
const slidesData = blueprint.slide_layout_blueprint;

slidesData.forEach((slideData) => {
    let slide = pres.addSlide();
    
    if (bgImage) {
        slide.addImage({ path: bgImage, x: 0, y: 0, w: 13.33, h: 7.5, sizing: { type: "cover" } });
    } else {
        slide.background = { color: "FFFFFF" };
    }

    if (slideData.layout_type === "swiss-massive") {
        slide.addText(slideData.title, { x: 0.5, y: 0.5, w: 12, h: 2, fontSize: 100, color: "000000", bold: true });
        slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 3, w: 8, h: 1, fill: { color: "000000" } });
        slide.addText(slideData.subtitle, { x: 0.5, y: 3, w: 8, h: 1, fontSize: 24, color: "FFFFFF" });
    } else if (slideData.layout_type === "swiss-feature") {
        slide.addText(slideData.title, { x: 0.5, y: 0.5, w: 12, h: 1.5, fontSize: 80, color: "000000", bold: true });
        if (slideData.cards) {
            slideData.cards.forEach((card, i) => {
                slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 3 + (i * 1.5), w: 0.5, h: 0.5, fill: { color: "FFCC00" } });
                slide.addText(card.title, { x: 1.5, y: 3 + (i * 1.5), w: 10, h: 0.5, fontSize: 24, color: "000000" });
            });
        }
    } else if (slideData.layout_type === "swiss-split") {
        slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 6.66, h: 7.5, fill: { color: "000000" } });
        slide.addText(slideData.title, { x: 0.5, y: 0.5, w: 5.5, h: 2, fontSize: 60, color: "FFFFFF", bold: true });
        slide.addText(slideData.subtitle, { x: 7.5, y: 0.5, w: 5, h: 2, fontSize: 24, color: "000000" });
    } else {
        slide.addText(slideData.title, { x: 0.5, y: 0.5, w: 12, h: 1, fontSize: 40, color: "000000" });
    }
});

pres.writeFile({ fileName: "Presentation.pptx" });
