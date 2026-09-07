#!/bin/bash

# Fix the 5 invalid SVG files
cd ~/Downloads/islamic-icons/library/assets/icons

# List of files to fix
files=(
    "mosque/mosque-svgrepo-com/fill.svg"
    "mosque/mosque-svgrepo-com(1)/fill.svg"
    "ornamen/islamic-crescent-with-small-star-svgrepo-com/fill.svg"
    "prayer/muslim-prayer-svgrepo-com/fill.svg"
    "quran/quran-svgrepo-com/fill.svg"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Fixing: $file"
        # Read file, remove XML declaration and comments, ensure it ends with </svg> and newline
        content=$(cat "$file" | grep -v '<?xml' | sed 's/<!--.*-->//g' | tr -d '\n')
        # Ensure it ends with </svg>
        if [[ ! "$content" =~ \</svg\>$ ]]; then
            content="${content}>"
        fi
        # Write back with proper ending
        echo "$content" > "$file"
    fi
done

echo "Fixed all invalid SVG files"
