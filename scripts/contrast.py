def lum(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=0.04045 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
def cr(a,b):
    la,lb=sorted([lum(a),lum(b)],reverse=True); return (la+0.05)/(lb+0.05)
themes = {
 "light": dict(paper="#FFFFFF", paper2="#F1F6F9", paper3="#E4EDF3", ink="#13202F", ink2="#4A5568", link="#1D4E89", accent="#3F6680", accentline="#5E88A0", accentsoft="#E6F0F6", rule="#D3D8DF", rulestrong="#7A8494", danger="#A3312A", dangersoft="#FBECEA", success="#1F6658", successsoft="#E4F1ED", btn="#13202F", btntext="#FFFFFF", btnhover="#23364D", focus="#1D4E89"),
 "dark":  dict(paper="#0F1A28", paper2="#142336", paper3="#1B2D44", ink="#E8ECF2", ink2="#AEB8C7", link="#93B9EC", accent="#A8CCDA", accentline="#7BA8BF", accentsoft="#16293C", rule="#263850", rulestrong="#7584A0", danger="#F2978F", dangersoft="#3A1F22", success="#86CDBD", successsoft="#15302C", btn="#A8CCDA", btntext="#0F1A28", btnhover="#C2DDE8", focus="#93B9EC"),
}
checks = [
 ("Gövde metni (ink)","ink",["paper","paper2","paper3"],4.5),
 ("İkincil metin (ink-2)","ink2",["paper","paper2","paper3"],4.5),
 ("Bağlantı","link",["paper","paper2"],4.5),
 ("Mavi etiket/vurgu metni","accent",["paper","paper2","accentsoft"],4.5),
 ("Mavi çizgi (rota, anlamlı grafik)","accentline",["paper","paper2"],3.0),
 ("Form alanı sınırı","rulestrong",["paper","paper2"],3.0),
 ("Odak halkası","focus",["paper","paper2"],3.0),
 ("Hata metni","danger",["paper","dangersoft"],4.5),
 ("Başarı / Onaylı metni","success",["paper","successsoft"],4.5),
 ("Birincil düğme metni","btntext",["btn","btnhover"],4.5),
 ("Birincil düğme zemini (bileşen sınırı)","btn",["paper"],3.0),
]
for t,v in themes.items():
    print(f"\n### {'Açık' if t=='light' else 'Koyu'} tema\n")
    print("| Çift | Ön plan | Zemin | Oran | Hedef | Sonuç |\n|---|---|---|---|---|---|")
    for label,fg,bgs,target in checks:
        for bg in bgs:
            r=cr(v[fg],v[bg]); print(f"| {label} | `{v[fg]}` | {bg} `{v[bg]}` | {r:.2f} | {target} | {'✓' if r>=target else '✗'} |")
