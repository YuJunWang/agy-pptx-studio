import sys
import os
from PIL import Image
import argparse

def crop_image(input_path, output_path, ratio_str):
    try:
        w_ratio, h_ratio = map(float, ratio_str.split(':'))
    except ValueError:
        print(f"Error: Invalid ratio format '{ratio_str}'. Use W:H, e.g., 16:9")
        sys.exit(1)
        
    img = Image.open(input_path)
    width, height = img.size
    
    target_ratio = w_ratio / h_ratio
    current_ratio = width / height
    
    if abs(target_ratio - current_ratio) < 0.01:
        print("Image is already at the target ratio.")
        img.save(output_path, quality=95)
        return
        
    if target_ratio > current_ratio:
        # Target is wider (e.g. 16:9). We need to crop top and bottom.
        target_height = int(width * h_ratio / w_ratio)
        top_margin = (height - target_height) // 2
        bottom_margin = top_margin + target_height
        cropped = img.crop((0, top_margin, width, bottom_margin))
    else:
        # Target is taller (e.g. 9:16). We need to crop left and right.
        target_width = int(height * w_ratio / h_ratio)
        left_margin = (width - target_width) // 2
        right_margin = left_margin + target_width
        cropped = img.crop((left_margin, 0, right_margin, height))
        
    cropped.save(output_path, quality=95)
    print(f"Cropped successfully. Original: {width}x{height}, New: {cropped.size[0]}x{cropped.size[1]}. Saved to: {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Crop an image to a specific ratio from the center.")
    parser.add_argument("input", help="Input image path")
    parser.add_argument("output", help="Output image path")
    parser.add_argument("--ratio", required=True, help="Target ratio in W:H format (e.g., 16:9, 9:16)")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.input):
        print(f"Error: Input file '{args.input}' not found.")
        sys.exit(1)
        
    crop_image(args.input, args.output, args.ratio)
