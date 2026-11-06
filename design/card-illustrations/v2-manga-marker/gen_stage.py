"""Generate the Show & Tell section illustration: the Ship-card character on stage.

Usage: python3 -I gen_stage.py <character_ref> <style_ref> <out_path>
Reads GEMINI_API_KEY from the environment (never printed). Uses curl because
python's SSL bundle is missing on this machine.
"""
import base64
import json
import mimetypes
import os
import subprocess
import sys

MODEL = "gemini-3-pro-image"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"

PROMPT = (
    "Image 1 is the CHARACTER reference: keep the same character and outfit, a young woman wearing very wide "
    "violet plaid trousers with white grid lines and dark plaid blocks, a dark indigo short-sleeve top over a "
    "white long-sleeve shirt, short dark hair. Image 2 is the STYLE reference only (do not copy its character): "
    "josei-manga marker illustration with thin grey pencil outlines, flat saturated marker fills with visible "
    "streaks, bold hand-drawn plaid and stripe patterns, crisp white highlights, lots of white paper.\n\n"
    "SCENE: SHOW AND TELL. The same young woman now stands on a simple low stage presenting the project she "
    "built. She holds a microphone in one hand and gestures enthusiastically with the other toward a large "
    "projector screen behind her that shows her app as simple abstract shapes (a list of rows with check marks "
    "and a few status pills, no readable text). Her face is visible in three-quarter view: bright, a little "
    "nervous, proudly explaining. Her open laptop sits on a small podium beside her. Camera: low angle from the "
    "audience floor looking up at the stage, slightly off to the side. At the very bottom edge, only the "
    "cropped backs of two or three audience heads and one raised clapping hand, no faces. Lots of airy white "
    "space. Her shoes are plain dark indigo canvas shoes with white soles (no side stripes, no brand marks).\n\n"
    "PALETTE (strict): pure white paper background; violet #8C00FF as the one accent colour; near-black indigo "
    "#1C0D48 for dark pattern blocks, stripes and shadows; a little pale warm skin tone only where skin shows; "
    "soft pale-grey cast shadows. No teal, no green, no blue, no yellow, no gradients, no watercolour wash, no "
    "text, no letters, no logos, no readable writing anywhere. Landscape 4:3, single illustration."
)


def part(path: str) -> dict:
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode()
    return {"inline_data": {"mime_type": mimetypes.guess_type(path)[0] or "image/webp", "data": data}}


if __name__ == "__main__":
    char_ref, style_ref, out_path = sys.argv[1:4]
    body = {
        "contents": [{"parts": [part(char_ref), part(style_ref), {"text": PROMPT}]}],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "4:3"}},
    }
    req_path = out_path + ".req.json"
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
    data = json.loads(res.stdout)
    if "error" in data:
        sys.exit("API error: " + data["error"].get("message", "")[:300])
    for cand in data.get("candidates", []):
        for p in cand.get("content", {}).get("parts", []):
            inline = p.get("inlineData") or p.get("inline_data")
            if inline:
                with open(out_path, "wb") as f:
                    f.write(base64.b64decode(inline["data"]))
                print("saved", out_path)
                sys.exit(0)
    sys.exit("no image returned: " + json.dumps(data)[:300])
