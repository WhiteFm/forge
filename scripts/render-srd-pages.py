from __future__ import annotations

import sys
from pathlib import Path

import pypdfium2 as pdfium


def main() -> None:
    source = Path(sys.argv[1])
    target = Path(sys.argv[2])
    page_numbers = [int(value) for value in sys.argv[3:]]
    target.mkdir(parents=True, exist_ok=True)
    document = pdfium.PdfDocument(source)
    for number in page_numbers:
        page = document[number - 1]
        image = page.render(scale=1.7).to_pil()
        image.save(target / f"page-{number}.png")
    print(f"rendered {len(page_numbers)} pages")


if __name__ == "__main__":
    main()
