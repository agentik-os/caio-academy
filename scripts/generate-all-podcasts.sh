#!/bin/bash
# Generate all podcasts via OpenAI TTS (tts-1-hd)
# Stores MP3 in public/podcasts/{lang}/{section}--{slug}.mp3
# Serves directly via Next.js static file serving

set -uo pipefail

cd /home/hacker/VibeCoding/work/CAIO-Academy

OKEY=$(grep "^OPENAI_API_KEY=" .env.local | sed 's/^OPENAI_API_KEY=//' | tr -d '"' | tr -d "'" | tr -d ' \r\n')
if [ -z "$OKEY" ]; then echo "NO OPENAI KEY"; exit 1; fi

CONTENT_DIR="content"
OUTPUT_BASE="public/podcasts"
LOG="/tmp/podcast-gen-$(date +%Y%m%d-%H%M).log"
mkdir -p "$OUTPUT_BASE/fr" "$OUTPUT_BASE/en"

TOTAL=$(find "$CONTENT_DIR" -name "*.md" | wc -l)
DONE=0
SKIPPED=0
FAILED=0

echo "[START] $TOTAL docs to process" | tee "$LOG"

# Strip markdown to plain text
strip_md() {
  sed 's/```[^`]*```//g; s/`[^`]*`//g; s/^#.*//g; s/\[([^]]*)\]([^)]*)]//g; s/[*_~>|]//g; s/  */ /g' "$1" | tr '\n' ' ' | head -c 4000
}

generate_one() {
  local file="$1"
  local lang="$2"
  local voice="$3"

  # Build slug from path: content/caio/01-vision/01-Business-Plan-2025.md → caio-01-vision--01-Business-Plan-2025
  local rel="${file#content/}"
  local slug=$(echo "$rel" | sed 's/\.md$//; s/\//__/g')
  local outfile="$OUTPUT_BASE/$lang/${slug}.mp3"

  # Skip if already exists and > 10KB
  if [ -f "$outfile" ] && [ $(stat -c%s "$outfile" 2>/dev/null || echo 0) -gt 10000 ]; then
    SKIPPED=$((SKIPPED+1))
    return 0
  fi

  local text=$(strip_md "$file")
  local textlen=${#text}
  if [ "$textlen" -lt 50 ]; then
    echo "  [SKIP] too short ($textlen chars)" | tee -a "$LOG"
    SKIPPED=$((SKIPPED+1))
    return 0
  fi

  # Escape for JSON
  local json_input=$(python3 -c "import json,sys; print(json.dumps(sys.stdin.read()))" <<< "$text")

  local http_code=$(curl -s -w "%{http_code}" -X POST https://api.openai.com/v1/audio/speech \
    -H "Authorization: Bearer $OKEY" \
    -H "Content-Type: application/json" \
    -d "{\"model\":\"tts-1-hd\",\"voice\":\"$voice\",\"input\":$json_input}" \
    -o "$outfile" 2>/dev/null)

  if [ "$http_code" = "200" ] && [ -f "$outfile" ] && [ $(stat -c%s "$outfile") -gt 1000 ]; then
    DONE=$((DONE+1))
    local size=$(stat -c%s "$outfile")
    echo "  [OK] ${size}B" | tee -a "$LOG"
    return 0
  else
    FAILED=$((FAILED+1))
    echo "  [FAIL] HTTP $http_code" | tee -a "$LOG"
    rm -f "$outfile"
    return 1
  fi
}

I=0
find "$CONTENT_DIR" -name "*.md" | sort | while IFS= read -r file; do
  I=$((I+1))
  basename=$(basename "$file" .md)

  # Generate FR version (alloy voice)
  echo "[$I/$TOTAL] FR: $basename" | tee -a "$LOG"
  generate_one "$file" "fr" "alloy"

  # Generate EN version (onyx voice)
  echo "[$I/$TOTAL] EN: $basename" | tee -a "$LOG"
  generate_one "$file" "en" "onyx"

  # Rate limit: 1 second between requests
  sleep 1
done

echo "" | tee -a "$LOG"
echo "[FINAL] Done=$DONE | Skipped=$SKIPPED | Failed=$FAILED | Total=$TOTAL" | tee -a "$LOG"
echo "[FILES]" | tee -a "$LOG"
find "$OUTPUT_BASE" -name "*.mp3" | wc -l | tee -a "$LOG"
du -sh "$OUTPUT_BASE" | tee -a "$LOG"
