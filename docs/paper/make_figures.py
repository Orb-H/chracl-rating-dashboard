"""Generate figures/statistics for the rating-method paper from data/.
Run from the repo root: python docs/paper/make_figures.py"""
import glob, itertools, json, os, statistics as st
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager

for f in ("C:/Windows/Fonts/malgun.ttf",):
    if os.path.exists(f):
        font_manager.fontManager.addfont(f)
        plt.rcParams["font.family"] = font_manager.FontProperties(fname=f).get_name()
plt.rcParams["axes.unicode_minus"] = False

OUT = "docs/paper"
H = {os.path.basename(f)[:-5]: json.load(open(f, encoding="utf-8"))
     for f in glob.glob("data/histories/*.json")}
entries = json.load(open("data/entries.json", encoding="utf-8"))
order = [e["id"] for e in sorted(entries, key=lambda e: e["sortKey"])]

# Pairwise concordance of pre-match ratings with realised order
rows = []
for f in sorted(glob.glob("data/matches/*/*.json")):
    m = json.load(open(f, encoding="utf-8"))
    pr = []
    for p in m["participants"]:
        h = [x for x in H.get(p["id"], []) if x.get("entryId") == m["entryId"]]
        pl = p.get("ratedPlace", p["place"])
        if h and pl is not None:
            pr.append((h[0]["previousRating"], pl))
    out = {}
    for key in ("mu", "value"):
        c = d = 0
        for a, b in itertools.combinations(pr, 2):
            if a[1] == b[1] or a[0][key] == b[0][key]:
                continue
            ok = (a[0][key] > b[0][key]) == (a[1] < b[1])
            c += ok; d += not ok
        out[key] = (c, d)
    if sum(out["mu"]) >= 10:
        rows.append((m["id"], m["type"], m["kind"], len(pr), out))
tot = {k: [sum(r[4][k][0] for r in rows), sum(r[4][k][1] for r in rows)] for k in ("mu", "value")}
json.dump({"rows": rows, "total": tot}, open(f"{OUT}/stats.json", "w"), ensure_ascii=False, indent=1)
fig, ax = plt.subplots(figsize=(6.4, 2.9))
acc = [r[4]["mu"][0] / sum(r[4]["mu"]) for r in rows]
cols = ["#1f4e79" if r[1] == "MAIN" else "#9bb7d4" for r in rows]
ax.bar(range(len(rows)), acc, color=cols)
for i, r_ in enumerate(rows):
    ax.text(i, 0.02, str(sum(r_[4]["mu"])), fontsize=5, color="white", ha="center", rotation=90)
ax.axhline(0.5, color="#c00", lw=0.8, ls="--"); ax.text(-0.6, 0.465, "무작위(0.5)", fontsize=7, color="#c00", ha="right")
ax.set_xlim(-3.2, len(rows) - 0.4); ax.set_ylim(0.0, 1.0); ax.set_xticks([]); ax.set_xlabel("경기 (시간순; 진한 막대 = 본선, 연한 막대 = 퀄리파잉; 막대 안의 숫자 = 평가 쌍 수)", fontsize=8)
ax.set_ylabel("쌍별 일치율", fontsize=8); ax.tick_params(labelsize=7)
fig.tight_layout(); fig.savefig(f"{OUT}/fig2_accuracy.png", dpi=220); plt.close(fig)
print(tot, {k: v[0] / sum(v) for k, v in tot.items()}, len(rows))

# Table: per competition
for s in range(1, 5):
    fs = glob.glob(f"data/matches/season{s}/*.json")
    ms_ = [json.load(open(f, encoding="utf-8")) for f in fs]
    ents = {m["entryId"] for m in ms_}
    ppl = {p["id"] for m in ms_ for p in m["participants"]}
    part = sum(len(m["participants"]) for m in ms_)
    print(s, len(ents), len(ms_), len(ppl), part)
