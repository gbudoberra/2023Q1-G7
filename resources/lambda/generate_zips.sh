#!/bin/bash

directories=("applications" "pets" "ongs")

for dir in "${directories[@]}"; do
    echo "Executing in directory: $dir"
    (
        cd "$dir" || exit 1
        for file in "."/*.py; do
            filename=$(basename "$file" .py)
            zip -j "./$filename.zip" "$file"
        done
    )
    echo "Completed execution in directory: $dir"
done
