from __future__ import annotations

import json
import sys
from pathlib import Path

from pypdf import PdfReader


def main() -> None:
    source = Path(sys.argv[1])
    target = Path(sys.argv[2])
    pages: list[dict[str, object]] = []
    document = PdfReader(source)
    for index, page in enumerate(document.pages, start=1):
        pages.append({"page": index, "text": page.extract_text(extraction_mode="layout") or ""})
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(pages, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({"pages": len(pages), "target": str(target)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
