"""Check local page links, IDs, ARIA references, and JavaScript syntax."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parent.parent

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = set()
        self.links = []
        self.references = []
        self.scripts = []
        self.script = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f"{self.path}: duplicate ID {attrs['id']}"
            self.ids.add(attrs["id"])
        for key in ("href", "src"):
            if key in attrs:
                self.links.append(attrs[key])
        for key in ("aria-controls", "aria-labelledby"):
            self.references.extend(attrs.get(key, "").split())
        if tag == "script" and "src" not in attrs:
            self.script = []

    def handle_data(self, data):
        if self.script is not None:
            self.script.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self.script is not None:
            self.scripts.append("".join(self.script))
            self.script = None

pages = {}
for path in ROOT.glob("*.html"):
    page = Page(path)
    page.feed(path.read_text(encoding="utf-8"))
    pages[path.resolve()] = page

for path, page in pages.items():
    for reference in page.references:
        assert reference in page.ids, f"{path.name}: missing ARIA target {reference}"
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        assert target.exists(), f"{path.name}: missing link target {link}"
        if url.fragment and target in pages:
            assert unquote(url.fragment) in pages[target].ids, f"{path.name}: missing anchor {link}"
    for script in page.scripts:
        with tempfile.TemporaryDirectory() as directory:
            script_path = Path(directory) / "inline.js"
            script_path.write_text(script, encoding="utf-8")
            subprocess.run(["node", "--check", str(script_path)], check=True)

print(f"Validated {len(pages)} pages: local links, unique IDs, ARIA references, inline JavaScript.")
