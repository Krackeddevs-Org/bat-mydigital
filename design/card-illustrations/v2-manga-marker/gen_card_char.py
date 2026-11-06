"""Regenerate the Show & Tell card keeping a given composition but swapping in a given character.

Usage: python3 -I gen_card_char.py <character_ref> <composition_ref> <style_ref> <out_path>
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
    "Image 1 is the CHARACTER: a young woman with a short, chin-length dark indigo-black bob with soft bangs, "
    "rosy cheeks and a big open smile, wearing a dark indigo short-sleeve t-shirt over a white long-sleeve shirt "
    "and very wide violet plaid trousers (white grid lines, dark plaid blocks). Draw exactly this woman: same "
    "face, same hair, same outfit.\n"
    "Image 2 is the COMPOSITION to keep: high bird's-eye angle looking down at a small round stage platform with "
    "a laptop on a little round stand beside the presenter, a speech-bubble doodle with a lightbulb above, and "
    "a few clapping audience members cropped around the frame edges (their hair dark indigo, wearing striped "
    "tops). Replace that presenter with the woman from image 1: she stands on the platform holding a "
    "microphone, looking up at the viewer with a big smile, one hand open as she explains her project. Her "
    "shoes are plain dark indigo canvas shoes with white soles (no side stripes, no brand marks).\n"
    "Image 3 is the STYLE reference only (do not copy its character): josei-manga marker illustration, thin "
    "grey pencil outlines, flat saturated marker fills with visible streaks, bold plaid and stripe patterns, "
    "crisp white highlights, lots of white paper.\n"
    "PALETTE (strict): pure white paper background; violet #8C00FF accent; near-black indigo #1C0D48 for dark "
    "blocks, hair, stripes and shadows; a little pale warm skin tone only where skin shows; soft pale-grey cast "
    "shadows. No teal, no green, no blue, no yellow, no gradients, no text, no letters, no logos, no readable "
    "writing. Landscape 4:3, single illustration."
)


def part(path: str) -> dict:
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode()
    return {"inline_data": {"mime_type": mimetypes.guess_type(path)[0] or "image/png", "data": data}}


if __name__ == "__main__":
    char_ref, comp_ref, style_ref, out_path = sys.argv[1:5]
    body = {
        "contents": [{"parts": [part(char_ref), part(comp_ref), part(style_ref), {"text": PROMPT}]}],
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
