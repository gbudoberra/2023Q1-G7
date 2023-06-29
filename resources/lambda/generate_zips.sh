#!/bin/bash

(cd ./applications && ./generate_applications_zips.sh)

# Loop through each .py file in the directory
for file in "."/*.py; do
    # Get the filename without extension
    filename=$(basename "$file" .py)
    
    # Create the .zip file using tar
    zip -j "./$filename.zip" "$file"
done
