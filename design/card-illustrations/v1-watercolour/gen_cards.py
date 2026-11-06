"""Generate Build / Learn / Ship / Show & Tell card illustrations with Gemini,
using a reference image for style only.

Usage: python3 -I gen_cards.py <reference_image> <out_dir> [name ...]
Reads GEMINI_API_KEY from the environment (never printed). Uses curl because
python's SSL bundle is missing on this machine.
"""
import base64
import json
import mimetypes
import os
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor

MODEL = "gemini-3-pro-image"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"

STYLE = (
    "Use the attached image ONLY as a style reference: hand-drawn pencil line art with a soft, loose watercolour "
    "wash, visible grainy paper texture, gentle sketchy outlines, warm and friendly Malaysian slice-of-life mood, "
    "expressive happy faces, lots of airy empty paper space around the figures. Do not copy its characters, "
    "school uniforms or composition. The people are working adults (civil servants and young professionals) in "
    "smart-casual clothes, a diverse Malaysian mix (Malay women in hijab, Chinese, Indian, Malay men). "
    "COLOUR IS STRICT DUOTONE: line work only in deep indigo-purple #2A1467, washes only in tints of violet #8C00FF "
    "from very pale lavender to medium violet, on a near-white lavender paper background #F8F5FF. No other hues at "
    "all: no green, no skin-tone colour, no yellow, no grey-brown. No text, no letters, no logos, no readable "
    "writing anywhere (screens show only abstract shapes). Landscape composition, figures centred, softly vignetted "
    "edges fading to the paper colour."
)

SCENES = {
    "build": (
        "Scene: BUILD. Three participants around a table in a bright convention hall, laptops open, one sticking "
        "paper notes on the table while sketching an app idea, another typing with focus, a third pointing excitedly "
        "at the screen. Energetic, hands-on, collaborative."
    ),
    "learn": (
        "Scene: LEARN. A friendly mentor wearing a lanyard leans over a seated participant's shoulder, pointing at "
        "the laptop screen and explaining; the participant has an 'aha' smile. Another participant nearby takes "
        "notes. Behind them, a whiteboard with simple doodled boxes and arrows (no words)."
    ),
    "ship": (
        "Scene: SHIP. A participant throws both arms up in celebration in front of her laptop, which shows a simple "
        "rocket-launch shape on screen; two teammates cheer and high-five beside her; small paper confetti and a "
        "little doodled rocket with a swoosh trail floating above them."
    ),
    "show-and-tell": (
        "Scene: SHOW AND TELL. A participant stands on a low stage holding a microphone, presenting the app he "
        "built, gesturing at a large projector screen with abstract app shapes; in the foreground the backs of a "
        "seated audience clapping and smiling, one raising a hand. Warm, proud, supportive atmosphere."
    ),
}


def generate(name: str, prompt: str, ref_b64: str, ref_mime: str, out_dir: str) -> str:
    body = {
        "contents": [
            {
                "parts": [
                    {"inline_data": {"mime_type": ref_mime, "data": ref_b64}},
                    {"text": prompt + " " + STYLE},
                ]
            }
        ],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "4:3"}},
    }
    req_path = os.path.join(out_dir, f"{name}.req.json")
    with open(req_path, "w") as f:
        json.dump(body, f)
    res = subprocess.run(
        [
            "curl", "-sS", "--max-time", "280", URL,
            "-H", "Content-Type: application/json",
            "-H", "x-goog-api-key: " + os.environ["GEMINI_API_KEY"],
            "--data-binary", "@" + req_path,
        ],
        capture_output=True,
        text=True,
    )
    os.remove(req_path)
    try:
        data = json.loads(res.stdout)
    except json.JSONDecodeError:
        return f"{name}: bad response {res.stdout[:200]} {res.stderr[:200]}"
    if "error" in data:
        return f"{name}: API error {data['error'].get('message', '')[:300]}"
    for cand in data.get("candidates", []):
        for part in cand.get("content", {}).get("parts", []):
            inline = part.get("inlineData") or part.get("inline_data")
            if inline:
                ext = "png" if "png" in inline.get("mimeType", "png") else "jpg"
                path = os.path.join(out_dir, f"{name}.{ext}")
                with open(path, "wb") as f:
                    f.write(base64.b64decode(inline["data"]))
                return f"{name}: saved {path}"
    return f"{name}: no image returned {json.dumps(data)[:300]}"


if __name__ == "__main__":
    ref, out, *only = sys.argv[1:]
    os.makedirs(out, exist_ok=True)
    mime = mimetypes.guess_type(ref)[0] or "image/webp"
    with open(ref, "rb") as f:
        ref_b64 = base64.b64encode(f.read()).decode()
    scenes = {k: v for k, v in SCENES.items() if not only or k in only}
    with ThreadPoolExecutor(max_workers=4) as ex:
        for line in ex.map(lambda kv: generate(kv[0], kv[1], ref_b64, mime, out), scenes.items()):
            print(line)
