import os
import glob

styles_dir = r'C:\Users\wang6\.gemini\config\plugins\presentation_architect\styles'
js_files = glob.glob(os.path.join(styles_dir, '*.js'))

for js_path in js_files:
    style_name = os.path.basename(js_path).replace('.js', '')
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    broken_line = "console.log([] Presentation generated successfully at );"
    fixed_line = f"console.log(`[{style_name}] Presentation generated successfully at ${{outputPath}}`);"
    
    content = content.replace(broken_line, fixed_line)
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Fixed JS syntax errors via replace().")
