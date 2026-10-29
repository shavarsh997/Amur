"""Read every Search Console export sheet without modifying the workbook.

Usage: python3 scripts/seo-gsc-baseline.py export.xlsx
Requires pandas and its Excel reader (the bundled workspace runtime has both).
"""
import argparse
from datetime import date
import hashlib
import json
from pathlib import Path
import re

import pandas as pd

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("source", type=Path)
parser.add_argument("--output", type=Path, default=Path("docs/seo/GSC_BASELINE.json"))
parser.add_argument("--export-date", type=date.fromisoformat)
args = parser.parse_args()
source = args.source
filename_date = re.search(r"(\d{4}-\d{2}-\d{2})\.xlsx$", source.name)
export_date = args.export_date or (date.fromisoformat(filename_date[1]) if filename_date else None)
sheets = pd.read_excel(source, sheet_name=None)
data = {}
for name, frame in sheets.items():
    rows = json.loads(frame.to_json(orient="records", date_format="iso"))
    item = {"rowCount": len(frame), "columns": list(frame.columns), "rows": rows}
    if "Kлики" in frame and "Показы" in frame:
        clicks = int(frame["Kлики"].sum())
        impressions = int(frame["Показы"].sum())
        item["totals"] = {"clicks": clicks, "impressions": impressions,
                          "ctr": clicks / impressions if impressions else None}
    data[name] = item
report = {"source": source.name, "sha256": hashlib.sha256(source.read_bytes()).hexdigest(),
          "exportDate": export_date.isoformat() if export_date else None, "sheets": data,
          "limitations": ["Separate query and page reports cannot establish query + page overlap.",
                          "Missing rows are unavailable, not zero. Do not sum dimensions together.",
                          "No lead, conversion, backlink or field Core Web Vitals data supplied."]}
target = args.output
target.parent.mkdir(parents=True, exist_ok=True)
target.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
print(json.dumps({name: {"rowCount": item["rowCount"], "totals": item.get("totals"),
                         "sample": item["rows"][:8]}
                  for name, item in data.items()}, ensure_ascii=False, indent=2))
