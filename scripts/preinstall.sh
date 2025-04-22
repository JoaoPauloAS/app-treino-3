#!/bin/bash
echo "🔧 Running preinstall script for Vercel deployment..."

# Remove react-router-dom from package.json if it exists
if grep -q "react-router-dom" package.json; then
  echo "📦 Removing react-router-dom from package.json"
  sed -i 's/"react-router-dom": "[^"]*",//g' package.json
fi

# Create directories if they don't exist
mkdir -p src/pages
mkdir -p src/components

echo "✅ Preinstall script completed successfully!" 