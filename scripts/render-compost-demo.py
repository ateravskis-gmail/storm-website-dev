"""Render the product demo from before/after screenshots.

Usage: python render-compost-demo.py BEFORE.png AFTER.png
Requires Pillow and imageio-ffmpeg. Outputs website assets to public/demos/compost-sock.
"""
from pathlib import Path
import sys
import subprocess
from PIL import Image, ImageDraw, ImageFilter
import imageio_ffmpeg

OUT = Path(__file__).resolve().parents[1] / 'public/demos/compost-sock'
OUT.mkdir(parents=True, exist_ok=True)
W, H, FPS, DURATION = 1600, 900, 30, 8
S = .75
OX, OY = 32, 41
before = Image.open(sys.argv[1]).convert('RGB').resize((2048, 994), Image.Resampling.LANCZOS)
after = Image.open(sys.argv[2]).convert('RGB').resize((1536, 814), Image.Resampling.LANCZOS)
base = Image.new('RGB', (W, H), '#f7f9fb')
base.paste(after, (OX, OY))
def xy(x, y):
    return (round(OX+x*S), round(OY+y*S))
left, rowtop = xy(62,501)
right, rowbottom = xy(2022,615)
height = rowbottom-rowtop
bottom = xy(0,1021)[1]
lower = base.crop((left,rowbottom,right,bottom))
newrow = base.crop((left,rowtop,right,rowbottom))
chip = before.crop((595,179,869,221)).resize((206,32),Image.Resampling.LANCZOS).convert('RGBA')
# Retain only the pill itself, not the surrounding blue tray.
mask = Image.new('L',chip.size)
ImageDraw.Draw(mask).rounded_rectangle((1,1,204,31),radius=16,fill=255)
chip.putalpha(mask)
chipx, chipy = xy(603,162)

def smooth(t):
    t = max(0,min(1,t))
    return t*t*t*(t*(t*6-15)+10)

def overlay_rect(im, box, fill, outline=None, width=1, radius=5):
    layer=Image.new('RGBA',im.size)
    ImageDraw.Draw(layer).rounded_rectangle(box,radius=radius,fill=fill,outline=outline,width=width)
    im.paste(layer,(0,0),layer)

def cursor(im,x,y,opacity=1,pressed=False):
    # Supersampled pointer for clean diagonal edges at every output size.
    layer=Image.new('RGBA',(128,160))
    pts=[(12,8),(12,108),(38,86),(57,128),(75,120),(55,80),(89,80)]
    draw=ImageDraw.Draw(layer)
    draw.polygon(pts,fill=(22,34,56,round(255*opacity)))
    draw.line(pts+[pts[0]],fill=(255,255,255,round(255*opacity)),width=7,joint='curve')
    layer=layer.resize((32,40),Image.Resampling.LANCZOS)
    im.paste(layer,(round(x)-3,round(y)-2),layer)

def frame(t):
    im=base.copy()
    insert=smooth((t-3.05)/.65)
    growth=round(height*insert)
    ImageDraw.Draw(im).rectangle((left,rowtop,right,bottom),fill='white')
    # A real layout expansion: existing rows move together as the new row opens.
    if growth:
        row=newrow.crop((0,0,newrow.width,growth))
        im.paste(row,(left,rowtop))
    im.paste(lower,(left,rowtop+growth))
    if 3.05<t<5.6:
        a=int(38*(1-smooth((t-3.6)/2)))
        overlay_rect(im,(left,rowtop,right,rowtop+growth),(59,130,246,a))
        overlay_rect(im,(left,rowtop,left+3,rowtop+growth),(59,130,246,int(210*(1-smooth((t-4.2)/1.4)))))
    if t<1.65:
        im.paste(chip,(chipx,chipy),chip)
    # The SF-1 category reacts as the dragged item approaches.
    active=smooth((t-2.05)/.35)*(1-smooth((t-3.12)/.45))
    if active:
        x1,y1=xy(64,291);x2,y2=xy(2020,387)
        overlay_rect(im,(x1+1,y1+1,x2-1,y2-1),(55,119,255,round(15*active)),(64,128,255,round(180*active)),2)
    grab=(chipx+112,chipy+17)
    drop=xy(340,349)
    if t<1.4:
        u=smooth((t-.45)/.95)
        start=xy(1050,250)
        cx=start[0]+(grab[0]-start[0])*u
        cy=start[1]+(grab[1]-start[1])*u
    elif t<1.75:
        cx,cy=grab
    elif t<3.05:
        u=smooth((t-1.75)/1.3)
        cx=grab[0]+(drop[0]-grab[0])*u-22*4*u*(1-u)
        cy=grab[1]+(drop[1]-grab[1])*u
    else:
        u=smooth((t-3.35)/.9)
        cx=drop[0]+180*u
        cy=drop[1]+70*u
    if 1.65<=t<3.14:
        fade=1-smooth((t-3.03)/.11)
        drag=chip.copy()
        drag.putalpha(mask.point(lambda a: round(a*fade)))
        px,py=round(cx-112),round(cy-17-5*smooth((t-1.65)/.15))
        shadow=Image.new('RGBA',im.size)
        ImageDraw.Draw(shadow).rounded_rectangle((px,py+8,px+206,py+40),radius=18,fill=(28,59,115,round(55*fade)))
        shadow=shadow.filter(ImageFilter.GaussianBlur(9))
        im.paste(shadow,(0,0),shadow)
        im.paste(drag,(px,py),drag)
    # Restrained click feedback, only at grab and release.
    for at in [1.48,3.05]:
        p=(t-at)/.4
        if 0<=p<=1:
            r=7+17*smooth(p)
            overlay_rect(im,(cx-r,cy-r,cx+r,cy+r),(59,130,246,round(18*(1-p))),(59,130,246,round(100*(1-p))),2,round(r))
    visibility=smooth((t-.25)/.25)*(1-smooth((t-4.15)/.4))
    if visibility>0:
        cursor(im,cx,cy,visibility)
    return im

initial=frame(0)
initial.save(OUT/'poster.png')
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
encoder=subprocess.Popen([ffmpeg,'-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'compost-sock.mp4')],stdin=subprocess.PIPE,stderr=subprocess.PIPE)
previews=[]
for i in range(FPS*DURATION):
    t=i/FPS
    im=frame(t)
    if t>7:
        im=Image.blend(im,initial,smooth((t-7)/.75))
    encoder.stdin.write(im.tobytes())
    if i%2==0:
        previews.append(im.resize((960,540),Image.Resampling.LANCZOS))
    if i in [70,110,170]:
        im.save(OUT/f'check-{i}.png')
encoder.stdin.close()
errors=encoder.stderr.read().decode()
if encoder.wait():
    raise RuntimeError(errors)
previews[0].save(OUT/'compost-sock.gif',save_all=True,append_images=previews[1:],duration=[60,70,70]*40,loop=0,optimize=True)
subprocess.run([ffmpeg,'-y','-i',str(OUT/'compost-sock.mp4'),'-c:v','libvpx-vp9','-b:v','0','-crf','30','-an',str(OUT/'compost-sock.webm')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
print('Rendered 8-second loop: MP4, WebM, GIF, and poster.')
