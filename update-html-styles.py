#!/usr/bin/env python3
"""
Script to update HTML files to use external CSS files instead of inline styles.
This consolidates duplicate styles into shared CSS files.
"""

import os
import re
import glob

def update_html_file(filepath):
    """Update a single HTML file to use external CSS files."""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Check if file has inline styles
    if '<style>' not in content:
        print(f"  No inline styles found, skipping")
        return False
    
    # Determine which CSS files to include based on content
    css_files = []
    
    # Always include common styles
    css_files.append('style/slideshow-common.css')
    
    # Check for specific style patterns
    if 'portrait' in filepath.lower() or 'ai-portrait' in filepath.lower():
        css_files.append('style/portrait.css')
    elif 'ai-animated' in filepath.lower():
        css_files.append('style/ai-animated.css')
    elif 'ipad' in filepath.lower():
        css_files.append('style/ipad.css')
    else:
        # Default to fullscreen for most slideshow pages
        css_files.append('style/fullscreen.css')
    
    # Create the CSS link tags
    css_links = '\n  '.join([f'<link rel="stylesheet" href="{css}">' for css in css_files])
    
    # Find and replace the style section
    style_pattern = r'<style>.*?</style>'
    style_match = re.search(style_pattern, content, re.DOTALL)
    
    if style_match:
        # Replace the entire style section with CSS links
        content = re.sub(style_pattern, css_links, content, flags=re.DOTALL)
        
        # Write the updated content back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  Updated with CSS files: {', '.join(css_files)}")
        return True
    else:
        print(f"  No style section found")
        return False

def main():
    """Main function to update all HTML files."""
    print("HTML Style Consolidation Script")
    print("=" * 40)
    
    # Find all HTML files
    html_files = glob.glob("*.html")
    
    if not html_files:
        print("No HTML files found in current directory")
        return
    
    print(f"Found {len(html_files)} HTML files")
    print()
    
    updated_count = 0
    
    for html_file in html_files:
        if update_html_file(html_file):
            updated_count += 1
        print()
    
    print(f"Summary: Updated {updated_count} out of {len(html_files)} HTML files")
    print()
    print("CSS files created:")
    print("- style/slideshow-common.css (common styles for all slideshows)")
    print("- style/fullscreen.css (fullscreen-specific styles)")
    print("- style/portrait.css (portrait-specific styles)")
    print("- style/ai-animated.css (AI animated content styles)")
    print("- style/ipad.css (iPad-specific styles - already existed)")
    print("- style/color.css (color utilities - already existed)")

if __name__ == "__main__":
    main()
