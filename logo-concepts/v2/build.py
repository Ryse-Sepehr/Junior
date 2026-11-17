import json
d=json.load(open("fig.json"))
def fig(ink="ink", tie="var(--red)", shirt="#fff", suit="var(--ink)"):
    return f'<path d="{d["base"]}" fill="{shirt}"/><path d="{d[ink]}" fill="{suit}"/><path d="{d["red"]}" fill="{tie}"/>'
sym=f'''<svg width="0" height="0" style="position:absolute"><defs>
<symbol id="fT" viewBox="0 0 720 900">{fig("ink")}</symbol>
<symbol id="fL" viewBox="0 0 720 900">{fig("ink_lisse")}</symbol>
<symbol id="fR" viewBox="0 0 720 900">{fig("ink_lisse", tie="var(--ink)", shirt="var(--cream)")}</symbol>
<clipPath id="circ" clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5"/></clipPath>
</defs></svg>'''
html=open("board.tpl.html").read().replace("<!--SYM-->",sym)
open("index.html","w").write(html)
