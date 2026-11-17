import json
d=json.load(open("fig.json"))
h='<html><body style="margin:0;display:flex;gap:10px;background:#ddd">'
for k in ["ink","ink_lisse"]:
    for bg in ["#f6f1e8","#141210"]:
        h+=f'<svg viewBox="0 0 720 900" width="300" style="background:{bg}"><path d="{d["base"]}" fill="#fff"/><path d="{d[k]}" fill="#141210"/><path d="{d["red"]}" fill="#c8323a"/></svg>'
open("prev.html","w").write(h+"</body></html>")
