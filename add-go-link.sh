#!/bin/bash

# Script to easily create new go links
# Usage: ./add-go-link.sh <name> <url>

if [ $# -ne 2 ]; then
    echo "Usage: $0 <link-name> <target-url>"
    echo "Example: $0 cv https://example.com/my-cv.pdf"
    exit 1
fi

LINK_NAME=$1
TARGET_URL=$2
GO_DIR="go"

# Create the directory
mkdir -p "$GO_DIR/$LINK_NAME"

# Create the redirect file from template
sed "s|TARGET_URL_HERE|$TARGET_URL|g" "$GO_DIR/_template.html" > "$GO_DIR/$LINK_NAME/index.html"

echo "✅ Created go link: /$LINK_NAME/ → $TARGET_URL"
echo "Run 'quarto render' to update the site"
