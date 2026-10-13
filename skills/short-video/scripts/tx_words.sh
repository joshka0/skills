#!/bin/bash
# usage: tx_words.sh <wav> <out.json>  — word + segment timestamps
KEY="${PRAZE_OPENROUTER_API_KEY:-$OPENROUTER_API_KEY}"
{ printf '{"model":"microsoft/mai-transcribe-2","input_audio":{"data":"'; base64 -i "$1" | tr -d '\n'; printf '","format":"wav"},"response_format":"verbose_json","timestamp_granularities":["word","segment"]}'; } \
  | curl -sS https://openrouter.ai/api/v1/audio/transcriptions -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" --data-binary @- -o "$2"
