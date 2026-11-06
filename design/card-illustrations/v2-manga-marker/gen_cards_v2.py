"""Generate Build / Learn / Ship / Show & Tell card illustrations with Gemini (v2: manga marker style).

Usage: python3 -I gen_cards_v2.py <reference_image> <out_dir> [name ...]
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
    "Use the attached image ONLY as a style reference (do not copy its character, pose, hair or outfit): "
    "Japanese josei-manga marker illustration. Thin, slightly wobbly grey-graphite pencil outlines; flat, "
    "saturated alcohol-marker colour fills with visible marker streaks; bold hand-drawn textile patterns "
    "(chunky plaid with white grid lines, thick black-and-white stripes); crisp white highlights; a lot of pure "
    "white empty paper around the subject; a soft pale-grey cast shadow under objects; quiet, tender, slightly "
    "nostalgic mood. "
    "PALETTE (strict): pure white paper background; ONE vivid accent colour, violet #8C00FF, used for the main "
    "fabric / object fills and plaid; near-black indigo #1C0D48 for stripes, dark pattern blocks and deep shadows; "
    "a very small amount of pale warm skin tone only where skin shows. No teal, no green, no blue, no yellow, no "
    "gradients, no watercolour wash, no background scenery, no text, no letters, no logos, no readable writing "
    "(screens show only simple abstract shapes). Single illustration, landscape 4:3."
)

SCENES = {
    "build": (
        "BUILD. Straight top-down bird's-eye view of a desk, no full people: an open laptop with abstract wireframe "
        "boxes on its screen, two hands typing (sleeves in violet plaid), a sketchbook with a hand-drawn app screen "
        "doodle, a few sticky notes, a pencil, a coffee cup with a striped sleeve, a coiled charger cable. Objects "
        "arranged in a satisfying flat-lay composition with white space between them."
    ),
    "learn": (
        "LEARN. Over-the-shoulder close-up from behind and slightly above one seated participant wearing a violet "
        "plaid shirt, looking at their laptop; a mentor's hand and striped sleeve reaches in from the edge of the "
        "frame, pointing at the screen. Only one person's head and shoulders visible, plus the mentor's arm. A "
        "small lightbulb doodle floats above the screen."
    ),
    "ship": (
        "SHIP. Low worm's-eye angle looking up from the floor, but with natural, well-proportioned anatomy (head, "
        "torso and limbs in correct proportion, face clearly visible and smiling): a single young adult "
        "participant leaping joyfully in mid-air, both arms raised, holding an open laptop above their head like a "
        "trophy. They wear wide violet plaid trousers, a plain white long-sleeve top and plain dark indigo canvas "
        "shoes with white soles (no side stripes, no brand marks). A small hand-drawn paper rocket shoots up past "
        "them with a pencil-line trail and a few confetti squares. Lots of white empty paper around. The laptop is "
        "generic and unbranded: NO logo, NO apple, NO brand mark of any kind."
    ),
    "show-and-tell": (
        "SHOW AND TELL. Viewed from behind and slightly above, over the audience: one ADULT presenter (a young "
        "Malaysian woman in her late twenties wearing a dark indigo hijab, adult proportions, tall) stands on a "
        "simple low stage, turned three-quarters toward the audience, holding a microphone in one hand and "
        "gesturing with the other at a large projector screen showing simple abstract app shapes; she wears a "
        "violet plaid blazer, plain dark trousers and striped flat shoes. In the foreground at the bottom edge, "
        "only a few raised clapping hands from the audience, cropped, no faces. Minimal and airy. She must look "
        "nothing like the reference character (no long blonde or white hair, no child-like proportions)."
    ),
    "show-and-tell-over-shoulder": (
        "SHOW AND TELL. Camera from BEHIND and slightly to the side of the presenter, over her shoulder, looking "
        "out from the stage toward the audience: one ADULT woman presenter in her thirties with a short, sleek silver-white bob haircut (adult proportions, tall, clearly grown-up; her hair is short and silver-white, not long, not blonde), wearing a violet plaid blazer over a white shirt, dark indigo wide trousers and plain dark flat shoes (no stripes on the shoes, no brand marks), holding a microphone, one arm open toward the crowd as she explains her "
        "project. In front of her, a small seated audience drawn simply: rows of heads and several raised "
        "clapping hands, faces small and simplified, a few smiling. The edge of a projector screen glows at one "
        "side of the frame. Airy, lots of white paper."
    ),
    "show-and-tell-top-down": (
        "SHOW AND TELL. High bird's-eye angle from above the stage: one ADULT woman presenter in her thirties with a short, sleek silver-white bob haircut (adult proportions, tall, clearly grown-up; her hair is short and silver-white, not long, not blonde), wearing a violet plaid blazer over a white shirt, dark indigo wide trousers and plain dark flat shoes (no stripes on the shoes, no brand marks), holding a microphone, standing on a small round stage "
        "platform, looking up toward the viewer with a big smile, her open laptop on a little stand beside her "
        "and a speech-bubble doodle with a lightbulb above her. Around the platform, the tops of a few audience "
        "heads and clapping hands seen from above at the frame edges. Lots of white paper."
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
