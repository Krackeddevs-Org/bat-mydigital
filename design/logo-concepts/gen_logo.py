"""Generate Build-a-thon logo concepts with Gemini image models.

Usage: python3 -I gen_logo.py <out_dir>
Reads GEMINI_API_KEY from the environment (never printed).
"""
import base64
import json
import os
import sys
import subprocess
from concurrent.futures import ThreadPoolExecutor

MODEL = "gemini-3-pro-image"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"

STYLE = (
    "Style reference: a bold esports / arcade sticker logo. The whole lockup sits on one chunky, solid black "
    "silhouette shape with a thick black outline and a 3D extruded depth / offset drop shadow, like a die-cut "
    "sticker. Letters are a heavy, blocky, condensed display typeface, slightly italic, with sharp chamfered corners, "
    "tightly kerned, in one bright colour on the black base. A second smaller word sits underneath in the same "
    "colour. On the left, a simple chunky icon tilted in perspective breaks out of the shape. Flat vector look, "
    "two or three colours only, no gradients, no photorealism, no extra text, no watermark. Crisp edges, centred, "
    "on a plain pure white background with generous padding. Spell every word exactly as given."
)

VARIANTS = {
    "purple-laptop": (
        "Logo for a hackathon. Main word: \"BUILD-A-THON\" (exact spelling, with hyphens). Small word above it: "
        "\"MyDIGITAL\". Letter colour: bright violet purple #8C00FF with white highlights; base shape black. "
        "Icon on the left: a chunky retro laptop opened at an angle with a \"</>\" code symbol on its screen. "
        + STYLE
    ),
    "purple-rocket": (
        "Logo for a hackathon. Main word: \"BUILD-A-THON\" (exact spelling, with hyphens). Smaller word underneath: "
        "\"BUILD · LEARN · SHIP\". Letter colour: lavender #C9A8FF and violet #8C00FF; base shape deep navy-black "
        "#120830. Icon on the left: a chunky pixel-style rocket blasting up out of the shape. " + STYLE
    ),
    "yellow-laptop": (
        "Logo for a hackathon. Main word: \"BUILD-A-THON\" (exact spelling, with hyphens). Smaller word underneath: "
        "\"MyDIGITAL\". Letter colour: bright yellow #FFE600; base shape black. Icon on the left: a chunky laptop "
        "tilted in perspective, its screen yellow with a black \"</>\" symbol. " + STYLE
    ),
    "yellow-purple-brackets": (
        "Logo for a hackathon. Main word: \"BUILD-A-THON\" (exact spelling, with hyphens). Smaller word underneath: "
        "\"MyDIGITAL\". Letter colour: bright yellow #FFE600 with a violet #8C00FF accent stripe; base shape black. "
        "Icon on the left: big chunky angle brackets \"</>\" in violet, tilted in 3D. " + STYLE
    ),
}


def generate(name: str, prompt: str, out_dir: str) -> str:
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "16:9"}},
    }
    req_path = os.path.join(out_dir, f"{name}.req.json")
    with open(req_path, "w") as f:
        json.dump(body, f)
    # curl uses the system trust store (python's SSL bundle is missing on this machine).
    res = subprocess.run(
        ["curl", "-sS", "--max-time", "240", URL, "-H", "Content-Type: application/json",
         "-H", "x-goog-api-key: " + os.environ["GEMINI_API_KEY"], "--data-binary", "@" + req_path],
        capture_output=True, text=True,
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
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        for line in ex.map(lambda kv: generate(kv[0], kv[1], out), VARIANTS.items()):
            print(line)
