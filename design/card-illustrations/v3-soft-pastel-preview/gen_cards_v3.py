"""Preview: Build / Learn / Ship / Show & Tell cards in a soft, muted pastel line style.

Usage: python3 -I gen_cards_v3.py <style_ref> <character_ref> <out_dir> [name ...]
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

CHARACTER = (
    "the same young woman as in image 2: a short, chin-length dark bob with soft bangs, a gentle face, wearing a "
    "white short-sleeve shirt with a soft collar over a white long-sleeve top, and wide plaid trousers"
)

STYLE = (
    "Image 1 is the STYLE reference only (do not copy its character, uniform or pose): soft, quiet Japanese "
    "picture-book illustration. Thin, delicate, slightly broken warm-grey pencil line art; light flat colour "
    "applied like coloured pencil or a thin dry wash, with visible paper grain and slightly uneven edges; colour "
    "often stays a little inside or outside the lines; simple calm faces with small dot eyes; gentle, still, "
    "observational mood; lots of empty off-white paper. "
    "Image 2 is the CHARACTER reference: keep her hair and face, but redraw her fully in the image 1 style. "
    "PALETTE: muted, desaturated, toned-down pastels only, like the reference: dusty lavender and soft muted "
    "violet (#A99BD6, #8F7FC8) as the main accent, plus dusty blue-grey (#9DB4C0), muted ochre / mustard "
    "(#D9B46A), warm light grey (#BDB8B1), soft peach skin, charcoal-brown hair. No saturated or neon colours, "
    "no pure black fills, no strong contrast, no gradients, no heavy shadows (only a faint pale-grey cast "
    "shadow). Off-white paper background (#FAF8F4). No text, no letters, no logos, no brand marks, no readable "
    "writing anywhere (screens and notebooks show only simple soft shapes). Single illustration, landscape 4:3."
)

SCENES = {
    "build": (
        "BUILD. Straight top-down bird's-eye view of a desk, no full people: an open laptop with soft wireframe "
        "boxes on the screen, her two hands typing (sleeves visible), a spiral sketchbook with a doodled app "
        "screen, a few muted ochre sticky notes, a pencil, a paper coffee cup, a coiled charger cable. A calm, "
        "satisfying flat-lay with white space between objects."
    ),
    "learn": (
        f"LEARN. Over-the-shoulder view from behind and slightly above {CHARACTER}, seated at her laptop; a "
        "mentor's hand in a dusty blue-grey sleeve reaches in from the edge of the frame, pointing at the screen. "
        "Only her head and shoulders and the mentor's arm are visible. A tiny lightbulb doodle floats above the "
        "screen."
    ),
    "ship": (
        f"SHIP. Low worm's-eye angle looking up from the floor at {CHARACTER}, jumping with quiet joy, holding an "
        "open laptop up high with both hands; plain canvas shoes with no stripes or brand marks. A small "
        "hand-drawn paper rocket rises past her with a faint pencil trail and a few soft confetti squares. Lots "
        "of empty paper sky above."
    ),
    "show-and-tell": (
        f"SHOW AND TELL. High bird's-eye angle looking down at a small round stage platform: {CHARACTER} stands "
        "on it holding a microphone, looking up at the viewer with a small proud smile, one hand open as she "
        "explains; her laptop sits on a little round stand beside her; a speech-bubble doodle with a lightbulb "
        "floats above. A few audience members are cropped at the frame edges, seen from above, clapping softly."
    ),
}


def part(path: str) -> dict:
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode()
    return {"inline_data": {"mime_type": mimetypes.guess_type(path)[0] or "image/png", "data": data}}


def generate(name: str, scene: str, refs: list, out_dir: str) -> str:
    body = {
        "contents": [{"parts": refs + [{"text": scene + "\n\n" + STYLE}]}],
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
        for p in cand.get("content", {}).get("parts", []):
            inline = p.get("inlineData") or p.get("inline_data")
            if inline:
                path = os.path.join(out_dir, f"{name}.jpg")
                with open(path, "wb") as f:
                    f.write(base64.b64decode(inline["data"]))
                return f"{name}: saved {path}"
    return f"{name}: no image returned {json.dumps(data)[:300]}"


if __name__ == "__main__":
    style_ref, char_ref, out, *only = sys.argv[1:]
    os.makedirs(out, exist_ok=True)
    refs = [part(style_ref), part(char_ref)]
    scenes = {k: v for k, v in SCENES.items() if not only or k in only}
    with ThreadPoolExecutor(max_workers=4) as ex:
        for line in ex.map(lambda kv: generate(kv[0], kv[1], refs, out), scenes.items()):
            print(line)
