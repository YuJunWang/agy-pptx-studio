import os
import glob
import re
import shutil

base_dir = r'C:\Users\wang6\.gemini\config\plugins\presentation_architect'
skills_dir = os.path.join(base_dir, 'skills')
styles_dir = os.path.join(base_dir, 'styles')

os.makedirs(styles_dir, exist_ok=True)

style_folders = glob.glob(os.path.join(skills_dir, 'presentation-style-*'))

for folder in style_folders:
    folder_name = os.path.basename(folder)
    style_name = folder_name.replace('presentation-style-', '')
    
    skill_md_path = os.path.join(folder, 'SKILL.md')
    js_path = os.path.join(folder, 'example_engine.js')
    
    # 1. Process SKILL.md
    if os.path.exists(skill_md_path):
        with open(skill_md_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Strip YAML frontmatter
        content = re.sub(r'^---\n.*?---\n', '', content, flags=re.DOTALL)
        
        with open(os.path.join(styles_dir, f'{style_name}.md'), 'w', encoding='utf-8') as f:
            f.write(content.strip() + '\n')
            
    # 2. Process example_engine.js
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js_content = f.read()
            
        # We need to wrap the execution in a module.exports = { render: function(blueprint, outputPath) { ... } }
        # The old script usually reads:
        # const blueprintPath = process.argv[2] || '_blueprint.yaml';
        # const blueprint = yaml.load(fs.readFileSync(blueprintPath, 'utf8'));
        
        # Let's completely replace the file loading part and the writeFile part.
        
        new_js = []
        new_js.append("const pptxgen = require('pptxgenjs');")
        new_js.append("")
        new_js.append("module.exports = {")
        new_js.append("    render: async function(blueprint, outputPath = 'presentation_output.pptx') {")
        
        lines = js_content.split('\n')
        skip = False
        for line in lines:
            # Skip require lines
            if line.startswith("const fs = require('fs')") or line.startswith("const yaml = require('js-yaml')") or line.startswith("const pptxgen = require('pptxgenjs')"):
                continue
            # Skip blueprint loading lines
            if "process.argv" in line or "fs.readFileSync" in line or "yaml.load" in line:
                continue
            
            # Catch the save block
            if "pres.writeFile" in line:
                # Replace with returning a promise or waiting
                new_js.append("        return pres.writeFile({ fileName: outputPath }).then(() => {")
                new_js.append("            console.log([] Presentation generated successfully at );")
                new_js.append("        });")
                skip = True
                continue
                
            if skip:
                if line.strip() == "});" or line.strip() == "":
                    pass
                else:
                    new_js.append("        " + line)
                continue
                
            # Normal lines inside the function
            new_js.append("        " + line)
            
        new_js.append("    }")
        new_js.append("};")
        
        with open(os.path.join(styles_dir, f'{style_name}.js'), 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_js))
            
    # 3. Delete the old folder
    shutil.rmtree(folder)
    print(f"Migrated {style_name}")

print("Migration Complete.")
