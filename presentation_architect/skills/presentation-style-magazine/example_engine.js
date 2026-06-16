const pptxgen = require('pptxgenjs');
const fs = require('fs');
const yaml = require('js-yaml');

const fileContents = fs.readFileSync('_blueprint.yaml', 'utf8');
const blueprint = yaml.load(fileContents);

let pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';

// CRITICAL: Typography Dual-System for Magazine Style
const fontHeader = "Noto Serif"; // Serif
const fontBody = "Inter"; // Sans-serif

pres.theme = { headFontFace: fontHeader, bodyFontFace: fontBody }; 

const bgImage = blueprint.background_image_path;
const colors = blueprint.internal_design_system.color_palette.colors;
const accentColor = blueprint.internal_design_system.color_palette.complementary_color;
const slidesData = blueprint.slide_layout_blueprint;

slidesData.forEach((slideData, index) => {
    let slide = pres.addSlide();
    
    // Magazine uses very subtle backgrounds
    if (bgImage) {
        slide.addImage({ path: bgImage, x: 0, y: 0, w: 13.33, h: 7.5, sizing: { type: "cover", w: 13.33, h: 7.5 } });
    } else {
        slide.background = { color: "FDFCF8" }; // Editorial off-white
    }

    if (slideData.layout_type === "M01") {
        // M01: Cover
        slide.addText(slideData.title, {
            x: 1.0, y: 2.0, w: 11.0, h: 2.5,
            fontSize: 72, fontFace: fontHeader, color: colors[0], align: "left", valign: "bottom"
        });
        slide.addText(slideData.subtitle || "", {
            x: 1.0, y: 4.8, w: 8.0, h: 1.0,
            fontSize: 20, fontFace: fontBody, color: colors[0], align: "left"
        });
    }
    else if (slideData.layout_type === "M04") {
        // M04: Lead Image + Side Text
        // 16:10 image on the left
        slide.addShape(pres.ShapeType.rect, { x: 0.8, y: 1.0, w: 5.5, h: 5.5, fill: { color: "DDDDDD" } });
        
        slide.addText(slideData.title, {
            x: 6.8, y: 1.0, w: 5.5, h: 1.5,
            fontSize: 48, fontFace: fontHeader, color: colors[0]
        });
        
        let bodyText = slideData.text || (slideData.cards ? slideData.cards[0].text : "");
        slide.addText(bodyText, {
            x: 6.8, y: 2.8, w: 5.5, h: 3.5,
            fontSize: 16, fontFace: fontBody, color: colors[0], lineSpacing: 24
        });
    }
    else if (slideData.layout_type === "M05") {
        // M05: Image Grid
        slide.addText(slideData.title, {
            x: 1.0, y: 0.5, w: 11.33, h: 1.0,
            fontSize: 36, fontFace: fontHeader, color: colors[0]
        });
        
        let numImages = 3;
        let w = 3.5;
        let gap = 0.4;
        let startX = 1.0;
        
        for(let i=0; i<numImages; i++) {
            let cx = startX + i * (w + gap);
            // Strict uniform height images
            slide.addShape(pres.ShapeType.rect, { x: cx, y: 2.0, w: w, h: 4.5, fill: { color: "DDDDDD" } });
            if(slideData.cards && slideData.cards[i]) {
                slide.addText(slideData.cards[i].title, {
                    x: cx, y: 6.7, w: w, h: 0.5,
                    fontSize: 14, fontFace: fontBody, color: colors[0]
                });
            }
        }
    }
    else if (slideData.layout_type === "M08") {
        // M08: Big Quote
        slide.addText("“", {
            x: 1.0, y: 1.5, w: 2.0, h: 2.0,
            fontSize: 120, fontFace: fontHeader, color: accentColor
        });
        slide.addText(slideData.title, { // The quote
            x: 2.5, y: 2.5, w: 8.5, h: 2.5,
            fontSize: 44, fontFace: fontHeader, color: colors[0], lineSpacing: 50
        });
        slide.addText("— " + (slideData.subtitle || ""), {
            x: 2.5, y: 5.5, w: 8.5, h: 1.0,
            fontSize: 18, fontFace: fontBody, color: colors[0], align: "right"
        });
    }
});

pres.writeFile({ fileName: "Presentation_Magazine_Final.pptx" }).then(() => {
    console.log("Presentation generated successfully.");
});
