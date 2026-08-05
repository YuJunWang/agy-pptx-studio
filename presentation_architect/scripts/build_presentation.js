const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Entry point for the Scheme D build process
async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error("Usage: node build_presentation.js <path_to_blueprint.yaml> [output_file.pptx]");
        process.exit(1);
    }

    const blueprintPath = path.resolve(args[0]);
    const outputPath = args[1] ? path.resolve(args[1]) : path.resolve('output_presentation.pptx');

    if (!fs.existsSync(blueprintPath)) {
        console.error(`Blueprint file not found at: ${blueprintPath}`);
        process.exit(1);
    }

    console.log(`[Builder] Loading blueprint from ${blueprintPath}...`);
    let blueprint;
    try {
        blueprint = yaml.load(fs.readFileSync(blueprintPath, 'utf8'));
    } catch (e) {
        console.error(`[Builder] Failed to parse YAML: ${e.message}`);
        process.exit(1);
    }

    const styleName = blueprint.style_name || blueprint.internal_design_system?.style_name;
    if (!styleName) {
        console.error("[Builder] ERROR: The YAML blueprint does not specify a 'style_name'.");
        process.exit(1);
    }

    const styleModulePath = path.resolve(__dirname, `../styles/${styleName}.js`);
    if (!fs.existsSync(styleModulePath)) {
        console.error(`[Builder] ERROR: Style engine not found for style '${styleName}' at ${styleModulePath}`);
        process.exit(1);
    }

    console.log(`[Builder] Loading style engine for '${styleName}'...`);
    const styleEngine = require(styleModulePath);

    if (typeof styleEngine.render !== 'function') {
        console.error(`[Builder] ERROR: The style module '${styleName}.js' does not export a 'render' function.`);
        process.exit(1);
    }

    console.log(`[Builder] Starting rendering process...`);
    try {
        await styleEngine.render(blueprint, outputPath);
        console.log(`[Builder] SUCCESS! Presentation saved to ${outputPath}`);
    } catch (e) {
        console.error(`[Builder] ERROR during rendering: ${e.stack}`);
        process.exit(1);
    }
}

main();
