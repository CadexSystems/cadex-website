#!/usr/bin/env python3
"""
Luminous Cartography — Discover Your Opportunity (Final)
Museum-quality composition: human silhouettes in a data-illuminated space.
Deep teal, cyan luminescence, amber accents. NO TEXT.
"""

from PIL import Image, ImageDraw, ImageFilter
import math
import random

random.seed(42)

W, H = 1200, 800

# ─── Palette ───
DEEP = (6, 22, 38)
MID = (10, 34, 52)
LIGHT_BG = (14, 42, 60)
CYAN = (0, 215, 235)
CYAN_M = (0, 165, 190)
CYAN_D = (0, 85, 110)
CYAN_F = (0, 50, 70)
AMBER = (240, 185, 55)
AMBER_D = (160, 120, 30)
FIG_1 = (170, 195, 215)  # Brightest figure
FIG_2 = (130, 155, 175)
FIG_3 = (95, 120, 140)
FIG_4 = (70, 95, 115)
GRID = (12, 38, 54)

img = Image.new('RGB', (W, H), DEEP)
draw = ImageDraw.Draw(img)

# ─── Radial gradient background ───
cx_bg, cy_bg = 540, 320
for y in range(H):
    for x in range(W):
        dx = (x - cx_bg) / (W * 0.6)
        dy = (y - cy_bg) / (H * 0.6)
        d = min(1.0, math.sqrt(dx*dx + dy*dy))
        r = int(LIGHT_BG[0]*(1-d) + DEEP[0]*d)
        g = int(LIGHT_BG[1]*(1-d) + DEEP[1]*d)
        b = int(LIGHT_BG[2]*(1-d) + DEEP[2]*d)
        draw.point((x, y), fill=(r, g, b))

# ─── Subtle grid ───
for gx in range(0, W, 48):
    draw.line([(gx, 0), (gx, H)], fill=GRID, width=1)
for gy in range(0, H, 48):
    draw.line([(0, gy), (W, gy)], fill=GRID, width=1)

# ─── Main display panel ───
sx1, sy1 = 280, 110
sx2, sy2 = 880, 470

# Screen glow
glow = Image.new('RGB', (W, H), (0,0,0))
gd = ImageDraw.Draw(glow)
for e in range(40, 0, -1):
    a = int(6 + e * 0.4)
    gd.rectangle([sx1-e, sy1-e, sx2+e, sy2+e], outline=(0, a, int(a*1.3)), width=1)
glow = glow.filter(ImageFilter.GaussianBlur(20))
px = img.load(); gpx = glow.load()
for y in range(H):
    for x in range(W):
        r1,g1,b1 = px[x,y]; r2,g2,b2 = gpx[x,y]
        px[x,y] = (min(255,r1+r2),min(255,g1+g2),min(255,b1+b2))
draw = ImageDraw.Draw(img)

# Screen interior
for y in range(sy1+1, sy2):
    t = (y - sy1) / (sy2 - sy1)
    draw.line([(sx1+1, y), (sx2-1, y)], fill=(7+int(t*4), 24+int(t*10), 40+int(t*8)))
draw.rectangle([sx1, sy1, sx2, sy2], outline=CYAN_D, width=2)

# Corner brackets
blen = 18
for (bx, by, dx, dy) in [(sx1,sy1,1,1),(sx2,sy1,-1,1),(sx1,sy2,1,-1),(sx2,sy2,-1,-1)]:
    draw.line([(bx, by), (bx+dx*blen, by)], fill=CYAN, width=2)
    draw.line([(bx, by), (bx, by+dy*blen)], fill=CYAN, width=2)

# ─── Screen content: sophisticated bar chart ───
n_bars = 16
bw = 24
bg = 6
total = n_bars * (bw + bg)
bsx = sx1 + (sx2 - sx1 - total) // 2
bby = sy2 - 45
heights = [45,65,55,80,72,100,90,120,105,140,125,160,148,180,170,210]

for i, bh in enumerate(heights):
    bx = bsx + i * (bw + bg)
    top = bby - bh
    is_last = (i >= n_bars - 2)
    for y in range(top, bby):
        t = (y - top) / max(1, bh)
        if is_last:
            r = int(AMBER[0] * (0.15 + 0.45*(1-t)))
            g = int(AMBER[1] * (0.15 + 0.45*(1-t)))
            b = int(AMBER[2] * (0.1 + 0.25*(1-t)))
        else:
            r = int(CYAN_D[0] * (0.25 + 0.45*(1-t)))
            g = int(CYAN_D[1] * (0.25 + 0.45*(1-t)))
            b = int(CYAN_D[2] * (0.25 + 0.45*(1-t)))
        draw.line([(bx, y), (bx+bw, y)], fill=(r, g, b))
    tc = AMBER if is_last else CYAN_M
    draw.line([(bx, top), (bx+bw, top)], fill=tc, width=2)

# Horizontal gridlines in screen
for i in range(6):
    ly = sy1 + 35 + i * 65
    draw.line([(sx1+12, ly), (sx2-12, ly)], fill=(8,36,50), width=1)

# ─── Trend line over chart ───
tpts = [(bsx + i*(bw+bg) + bw//2, bby - h - 12) for i, h in enumerate(heights)]
# Bezier-like smooth
smooth = []
for i in range(len(tpts)-1):
    x1,y1 = tpts[i]; x2,y2 = tpts[i+1]
    for t in range(15):
        f = t/15
        smooth.append((int(x1+(x2-x1)*f), int(y1+(y2-y1)*f)))
smooth.append(tpts[-1])

# Trend glow
for off in [5,4,3,2]:
    c = (0, int(35/off), int(50/off))
    draw.line([(p[0],p[1]+off) for p in smooth], fill=c, width=off*2)
draw.line(smooth, fill=CYAN, width=2)

# Dots on trend
for p in tpts[::2]:
    draw.ellipse([p[0]-2,p[1]-2,p[0]+2,p[1]+2], fill=CYAN)
# Peak dot with glow
pk = tpts[-1]
for r in range(10,2,-1):
    a = (10-r)/8
    c = (int(AMBER[0]*a*0.4), int(AMBER[1]*a*0.4), int(AMBER[2]*a*0.3))
    draw.ellipse([pk[0]-r,pk[1]-r,pk[0]+r,pk[1]+r], fill=c)
draw.ellipse([pk[0]-3,pk[1]-3,pk[0]+3,pk[1]+3], fill=AMBER)

# ─── Mini gauges in screen ───
# Circular gauge top-left
gcx, gcy = sx1+55, sy1+45
draw.arc([gcx-22,gcy-22,gcx+22,gcy+22], 0, 360, fill=CYAN_F, width=2)
draw.arc([gcx-22,gcy-22,gcx+22,gcy+22], -90, 160, fill=CYAN, width=3)
draw.ellipse([gcx-2,gcy-2,gcx+2,gcy+2], fill=CYAN)

# Small donut chart top-right
dcx, dcy = sx2-55, sy1+45
draw.arc([dcx-20,dcy-20,dcx+20,dcy+20], 0, 360, fill=CYAN_F, width=4)
draw.arc([dcx-20,dcy-20,dcx+20,dcy+20], -90, 90, fill=AMBER, width=4)
draw.arc([dcx-20,dcy-20,dcx+20,dcy+20], 90, 200, fill=CYAN_M, width=4)

# ─── Roadmap timeline below screen ───
tl_y = 520
tl_x1, tl_x2 = 220, 1000
draw.line([(tl_x1, tl_y), (tl_x2, tl_y)], fill=CYAN_F, width=1)

phases = [300, 440, 580, 720, 860]
for i, px_v in enumerate(phases):
    completed = i <= 2
    if i > 0:
        prev = phases[i-1]
        c = CYAN_M if completed else CYAN_F
        draw.line([(prev, tl_y), (px_v, tl_y)], fill=c, width=2)
    # Diamond node
    s = 7
    diamond = [(px_v, tl_y-s), (px_v+s, tl_y), (px_v, tl_y+s), (px_v-s, tl_y)]
    fc = AMBER if i == len(phases)-1 else (CYAN if completed else CYAN_F)
    draw.polygon(diamond, fill=fc)
    # Vertical connector to screen
    for dy in range(sy2+8, tl_y-12, 5):
        draw.line([(px_v, dy), (px_v, min(dy+2, tl_y-12))], fill=(0,40,55), width=1)

# ─── HUMAN FIGURES (sophisticated silhouettes) ───
def person(draw, cx, gy, h, pose="stand", col=FIG_1, face=1):
    """Render a refined human silhouette. face: 1=right, -1=left"""
    hr = int(h * 0.058)  # head radius
    hy = gy - h + hr  # head center y
    sw = int(h * 0.13)  # shoulder half-width
    hw = int(h * 0.08)  # hip half-width
    th = int(h * 0.30)  # torso height
    lh = int(h * 0.38)  # leg height
    aw = int(h * 0.032) # arm width
    nw = hr // 2

    # Shadow on ground
    sh_c = (max(0,col[0]//6), max(0,col[1]//6), max(0,col[2]//6))
    draw.ellipse([cx-int(h*0.12), gy-2, cx+int(h*0.12), gy+4], fill=sh_c)

    # Head
    draw.ellipse([cx-hr, hy-hr, cx+hr, hy+hr], fill=col)

    # Neck
    nt = hy + hr
    nb = nt + int(h*0.035)
    draw.rectangle([cx-nw, nt, cx+nw, nb], fill=col)

    # Torso
    tt = nb
    tb = tt + th
    draw.polygon([(cx-sw,tt),(cx+sw,tt),(cx+hw,tb),(cx-hw,tb)], fill=col)

    # Legs
    gap = int(h*0.013)
    # Left
    draw.polygon([
        (cx-hw, tb), (cx-gap, tb),
        (cx-gap-1, gy), (cx-hw+1, gy)
    ], fill=col)
    # Right
    draw.polygon([
        (cx+gap, tb), (cx+hw, tb),
        (cx+hw-1, gy), (cx+gap+1, gy)
    ], fill=col)

    # Arms
    ay = tt + int(th*0.08)
    if pose == "stand":
        for s in [-1, 1]:
            ax = cx + s*sw
            draw.polygon([
                (ax, ay-aw), (ax, ay+aw),
                (ax+s*4, tb-int(th*0.15)+aw), (ax+s*4, tb-int(th*0.15)-aw)
            ], fill=col)

    elif pose == "point":
        # Pointing arm
        pa = cx + face*sw
        pe_x = pa + face*int(h*0.26)
        pe_y = ay - int(h*0.10)
        draw.polygon([
            (pa, ay-aw), (pa, ay+aw),
            (pe_x, pe_y+aw), (pe_x, pe_y-aw)
        ], fill=col)
        # Hand dot
        draw.ellipse([pe_x-3, pe_y-3, pe_x+3, pe_y+3], fill=col)
        # Other arm
        oa = cx - face*sw
        draw.polygon([
            (oa, ay-aw), (oa, ay+aw),
            (oa-face*4, tb-int(th*0.2)+aw), (oa-face*4, tb-int(th*0.2)-aw)
        ], fill=col)

    elif pose == "hips":
        for s in [-1, 1]:
            ax = cx + s*sw
            ebx = ax + s*int(h*0.09)
            eby = ay + int(th*0.35)
            hpx = cx + s*(hw+3)
            hpy = tb - int(th*0.08)
            draw.polygon([(ax,ay-aw),(ax,ay+aw),(ebx,eby+aw),(ebx,eby-aw)], fill=col)
            draw.polygon([(ebx,eby-aw),(ebx,eby+aw),(hpx,hpy+aw),(hpx,hpy-aw)], fill=col)

    elif pose == "crossed":
        cy_arm = ay + int(th*0.28)
        ext = int(h*0.05)
        draw.rectangle([cx-sw-ext, cy_arm-aw*2, cx+sw+ext, cy_arm+aw*2], fill=col)

    elif pose == "tablet":
        for s in [-1, 1]:
            ax = cx + s*sw
            fx = cx + s*int(h*0.06)
            fy = ay + int(th*0.38)
            draw.polygon([(ax,ay-aw),(ax,ay+aw),(fx,fy+aw),(fx,fy-aw)], fill=col)
        # Tablet
        tw, tth = int(h*0.07), int(h*0.09)
        ty = ay + int(th*0.32)
        draw.rectangle([cx-tw, ty, cx+tw, ty+tth], fill=(0,40,55), outline=CYAN_D, width=1)

    # Subtle highlight edge (depth)
    highlight_c = (min(255,col[0]+30), min(255,col[1]+30), min(255,col[2]+30))
    draw.line([(cx-hr, hy), (cx-hr+2, hy-hr+3)], fill=highlight_c, width=1)

# ─── Place 5 figures ───
ground = 600

# Left group
person(draw, 185, ground, 210, "point", FIG_1, 1)    # Pointing at screen
person(draw, 100, ground+8, 190, "stand", FIG_2, 1)  # Standing beside

# Center behind screen (smaller = depth)
person(draw, 560, ground-15, 160, "tablet", FIG_4, 1)

# Right group
person(draw, 935, ground, 205, "hips", FIG_1, -1)    # Confident pose
person(draw, 1040, ground+5, 188, "crossed", FIG_2, -1) # Arms crossed

# ─── Ground plane ───
for y in range(ground+8, H):
    t = (y - ground - 8) / (H - ground - 8)
    a = max(0, int(12*(1-t)))
    draw.line([(0,y),(W,y)], fill=(DEEP[0]+a//4, DEEP[1]+a, DEEP[2]+int(a*1.2)))

# Perspective floor grid
for fy in range(ground+20, H, 22):
    t = (fy - ground) / (H - ground)
    a = int(18*(1-t))
    draw.line([(0,fy),(W,fy)], fill=(0,25+a,38+a), width=1)
for i in range(-6, 26):
    vt = 540 + (i-10)*28
    vb = 540 + (i-10)*75
    a = max(3, 18 - abs(i-10)*2)
    draw.line([(vt, ground+8),(vb, H)], fill=(0,18+a,28+a), width=1)

# ─── Floating particles ───
random.seed(77)
for _ in range(100):
    px_v = random.randint(30, W-30)
    py_v = random.randint(30, ground-30)
    sz = random.choice([1,1,1,2])
    br = random.randint(25, 75)
    draw.ellipse([px_v, py_v, px_v+sz, py_v+sz], fill=(0, br, int(br*1.2)))

# ─── Connection arcs (figure to screen) ───
# Subtle dotted arcs connecting people to screen
for fx, fy, tx, ty in [
    (185, ground-160, sx1, 300),
    (935, ground-160, sx2, 300),
]:
    for t in range(0, 80, 8):
        f = t / 80
        x = int(fx + (tx-fx)*f)
        y = int(fy + (ty-fy)*f - 15*math.sin(f*math.pi))
        draw.ellipse([x-1, y-1, x+1, y+1], fill=(0, 45, 60))

# ─── Ambient glow layer ───
glow2 = Image.new('RGB', (W,H), (0,0,0))
gd2 = ImageDraw.Draw(glow2)
for gx, gy, gr, gc in [
    (540, 300, 180, (0,10,16)),
    (pk[0], pk[1], 50, (20,15,4)),
    (185, 480, 60, (0,10,15)),
    (935, 480, 60, (0,10,15)),
]:
    for r in range(gr, 0, -3):
        a = r/gr
        gd2.ellipse([gx-r,gy-r,gx+r,gy+r], fill=(int(gc[0]*a),int(gc[1]*a),int(gc[2]*a)))
glow2 = glow2.filter(ImageFilter.GaussianBlur(30))
px = img.load(); gpx2 = glow2.load()
for y in range(H):
    for x in range(W):
        r1,g1,b1 = px[x,y]; r2,g2,b2 = gpx2[x,y]
        px[x,y] = (min(255,r1+r2),min(255,g1+g2),min(255,b1+b2))

# ─── Vignette ───
for y in range(H):
    for x in range(W):
        dx = (x - W*0.47) / (W*0.55)
        dy = (y - H*0.42) / (H*0.55)
        d = math.sqrt(dx*dx + dy*dy)
        if d > 0.65:
            f = max(0.3, 1.0 - (d-0.65)*1.3)
            r,g,b = px[x,y]
            px[x,y] = (int(r*f), int(g*f), int(b*f))

# ─── Micro noise ───
random.seed(99)
for y in range(0, H, 2):
    for x in range(0, W, 2):
        r,g,b = px[x,y]
        n = random.randint(-2,2)
        px[x,y] = (max(0,min(255,r+n)),max(0,min(255,g+n)),max(0,min(255,b+n)))

out = "/Users/brianyeah/Projects/cadex-website/discover-opportunity.png"
img.save(out, "PNG")
print(f"Done: {out} — {img.size}")
