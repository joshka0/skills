# Media hosting and transcripts

## Google Drive hosting

Google Drive is a workable public host when the Drive account is also linked to
Metricool. Metricool fetches the URL and copies the file to its own storage, so
the link only has to work at create time.

### Grant the CLI Drive access

`gcloud` does not include Drive scope by default. Re-authorize once:

```sh
gcloud auth login <account> --enable-gdrive-access --force
gcloud auth print-access-token
```

The token then works against the Drive v3 REST API for both reads and writes.

### Upload and share with the Drive API

Use `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`. A
`multipart/related` body needs a carriage return and line feed before the closing
boundary. Omitting it returns `400 Bad Request`.

```python
import json, requests
H = {"Authorization": "Bearer " + token}
body = {"metadata": ("metadata", json.dumps({"name": name, "parents": [folder_id]}),
                     "application/json; charset=UTF-8"),
        "file": (name, open(path, "rb"), "video/mp4")}
r = requests.post("https://www.googleapis.com/upload/drive/v3/files",
                  params={"uploadType": "multipart", "fields": "id,name,size"},
                  headers=H, files=body)
r.raise_for_status()
file_id = r.json()["id"]
```

Share it publicly:

```python
requests.post(f"https://www.googleapis.com/drive/v3/files/{file_id}/permissions",
              params={"sendNotificationEmail": "false"}, headers=H,
              json={"type": "anyone", "role": "reader"})
```

Link format Metricool expects: `https://drive.google.com/file/d/<file_id>/view?usp=sharing`.

Verify reachability without credentials before scheduling:

```sh
curl -s -o /dev/null -w "%{http_code}\n" "https://drive.google.com/file/d/<file_id>/view?usp=sharing"
curl -s -L -o /tmp/probe.mp4 "https://drive.google.com/uc?export=download&id=<file_id>"
```

A folder shared as `anyone` with `reader` grants its children, but share each file
explicitly when a direct link must work.

If you want the files private again after Metricool copies them, upload them into
a folder that is not shared. A permission that a file inherits from its folder
cannot be removed on the file: the API returns `403 cannotDeletePermission`. Only
a permission set on the file itself can be deleted. Keep the permission id that
the share call returns.

## Normalizing video

Downscale 4K vertical to platform-native 1080x1920:

```sh
ffmpeg -nostdin -v error -y -i "$src" \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 128k "$out"
```

Render a 16:9 copy that YouTube treats as a standard video, not a Short:

```sh
ffmpeg -nostdin -v error -y -i "$src" -filter_complex \
"[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,gblur=sigma=25,eq=brightness=-0.06[bg];[0:v]scale=-2:1080[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p[v]" \
  -map "[v]" -map 0:a -c:v libx264 -preset veryfast -crf 20 -movflags +faststart -c:a aac -b:a 128k "$out"
```

### ffmpeg gotchas

- Add `-nostdin` when ffmpeg runs inside a `while read` loop. Otherwise ffmpeg
  consumes the loop's stdin and mangles the remaining filenames.
- macOS ships bash 3.2, which has no associative arrays. Use `IFS='|' read` over
  a newline list instead of `declare -A`.

## Transcription with OpenRouter

Use `microsoft/mai-transcribe-2`, the model the Praize API uses. Extract mono
16 kHz WAV:

```sh
ffmpeg -nostdin -v error -y -i "$video" -vn -ac 1 -ar 16000 -c:a pcm_s16le "$audio"
```

The endpoint takes JSON with base64 audio, not a multipart file. Stream the body
through stdin, so no temp file is left to delete:

```sh
{ printf '{"model":"microsoft/mai-transcribe-2","input_audio":{"data":"'
  base64 -i "$audio" | tr -d '\n'
  printf '","format":"wav"},"response_format":"verbose_json"}'; } \
| curl -sS https://openrouter.ai/api/v1/audio/transcriptions \
    -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
    --data-binary @- -o "$out"
```

The transcript is in `.text`. Eight clips (4 minutes in total) took under a
minute in parallel.

Run secret-backed commands through Infisical and never print values. Run it from
the repo that holds `.infisical.json`, else it asks for `infisical init`. Put the
loop in a script file and run `infisical run ... -- <script>`. The permission
checker refuses `bash -c '<loop>'` because it cannot read inside it.

```sh
infisical run --silent --env dev --path /repos/personal/praze -- ./tx-all.sh
```

The Praize key is `PRAZE_OPENROUTER_API_KEY`.

The model writes "Praise" for "Praize", and mixed-language clips come back in
both languages. Check every product name against the real spelling before you
write captions.
