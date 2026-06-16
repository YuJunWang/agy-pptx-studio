import zipfile
import io
import sys
import argparse
import re

def patch_fonts(pptx_path, latin_font, ea_font):
    with open(pptx_path, "rb") as f:
        buffer = io.BytesIO(f.read())
    
    out_buffer = io.BytesIO()
    
    with zipfile.ZipFile(buffer, "r") as zip_ref:
        with zipfile.ZipFile(out_buffer, "w", compression=zipfile.ZIP_DEFLATED) as new_zip:
            for item in zip_ref.infolist():
                content = zip_ref.read(item.filename)
                
                if item.filename.endswith(".xml"):
                    try:
                        text = content.decode("utf-8")
                        
                        # 1. Theme files: Force set the major/minor default fonts
                        if "ppt/theme/" in item.filename:
                            text = re.sub(r'<a:latin typeface="[^"]*"', f'<a:latin typeface="{latin_font}"', text)
                            text = re.sub(r'<a:ea typeface="[^"]*"', f'<a:ea typeface="{ea_font}"', text)
                            
                        # 2. Charts & Slides: Nuke any hardcoded PMingLiU (新細明體)
                        text = text.replace('typeface="PMingLiU"', f'typeface="{ea_font}"')
                        text = text.replace('typeface="新細明體"', f'typeface="{ea_font}"')
                        text = text.replace('font="PMingLiU"', f'font="{ea_font}"')
                        text = text.replace('font="新細明體"', f'font="{ea_font}"')
                        
                        # 3. pptxgenjs often applies the chinese font to the latin tag as well. Split them!
                        text = text.replace(f'<a:latin typeface="{ea_font}"', f'<a:latin typeface="{latin_font}"')
                        
                        new_zip.writestr(item, text.encode("utf-8"))
                    except UnicodeDecodeError:
                        new_zip.writestr(item, content)
                else:
                    new_zip.writestr(item, content)
                    
    with open(pptx_path, "wb") as f:
        f.write(out_buffer.getvalue())

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Patch fonts in a PPTX file via Zip manipulation")
    parser.add_argument("pptx_path", help="Path to the PPTX file")
    parser.add_argument("--latin", help="The Latin (English) font to enforce", required=True)
    parser.add_argument("--ea", help="The East Asian (Chinese) font to enforce", required=True)
    
    args = parser.parse_args()
    patch_fonts(args.pptx_path, args.latin, args.ea)
    print(f"Successfully patched {args.pptx_path} | Latin: {args.latin} | EA (Chinese): {args.ea}")
