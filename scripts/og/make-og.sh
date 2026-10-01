#!/usr/bin/env bash
# Render the share pictures public/og-en.png and public/og-es.png (1200×630)
# from scripts/og/card.html with headless Chromium. Run again after changing
# the card, the logo or the headline.
set -euo pipefail
cd "$(dirname "$0")"
chrome=$(command -v chromium || command -v google-chrome-stable || command -v google-chrome)
for lang in en es; do
  "$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --virtual-time-budget=3000 \
    --screenshot="$PWD/../../public/og-$lang.png" "file://$PWD/card.html?lang=$lang" 2>/dev/null
  echo "public/og-$lang.png"
done
