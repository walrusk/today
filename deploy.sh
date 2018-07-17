#!/usr/bin/env bash

echo
echo "🚧  Building..."

yarn build

echo
echo "💣  Removing clutter..."
rm -f build/service-worker.js
rm -f build/asset-manifest.json

echo
echo "🔥  Deploying to firebase..."
firebase deploy --only hosting

echo
