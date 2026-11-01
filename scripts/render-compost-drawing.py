"""Render drawing demo. Usage: python render-compost-drawing.py SOURCE_DIRECTORY.
Source directory contains before.png, menu.png, drawing.png, after.png.
Requires Pillow and imageio-ffmpeg.
"""
import sys
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

SRC=Path(sys.argv[1])
OUT=Path(__file__).resolve().parents[1]/'public/demos/compost-drawing'
OUT.mkdir(parents=True,exist_ok=True)
W,H,FPS,SECONDS=1600,900,30,10
NATIVE=2728
S=W/NATIVE
images={n:Image.open(SRC/(n+'.png')).convert('RGB') for n in ['before','menu','drawing','after']}
base=images['before'].crop((0,0,NATIVE,round(H/S)))
# Freeze the viewport: screenshots share map coordinates but have different heights.
# Use only the relevant UI overlays from each subsequent screenshot.
menu_box=(129,606,715,1427)
menu=images['menu'].crop(menu_box)
tool_box=(30,215,125,320)
tool_idle=images['menu'].crop(tool_box)
sed_box=(32,610,122,694)
sed_active=images['menu'].crop(sed_box)
badge_box=(2150,194,2496,272)
badge=images['drawing'].crop(badge_box)
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf',68)
small=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf',23)
start=(640,670)
end=(2280,670)
finished_box=(586,624,2338,718)
finished_stroke=images['after'].crop(finished_box).convert('RGBA')
finished_mask=Image.new('L',finished_stroke.size)
ImageDraw.Draw(finished_mask).rounded_rectangle((0,0,finished_stroke.width-1,finished_stroke.height-1),radius=47,fill=255)

def ease(t):
    t=max(0,min(1,t));return t*t*t*(t*(6*t-15)+10)

def mix(a,b,u):
    return tuple(x+(y-x)*u for x,y in zip(a,b))

def paste_alpha(im,patch,pos,a):
    if a<=0:return
    layer=patch.convert('RGBA');layer.putalpha(round(255*min(1,a)))
    im.paste(layer,pos,layer)

def pointer(im,p,a):
    if a<=0:return
    x,y=p
    layer=Image.new('RGBA',im.size)
    points=[(x,y),(x,y+48),(x+12,y+38),(x+22,y+58),(x+31,y+54),(x+21,y+34),(x+38,y+34)]
    d=ImageDraw.Draw(layer)
    d.polygon(points,fill=(18,32,50,round(255*a)))
    d.line(points+[points[0]],fill=(255,255,255,round(255*a)),width=4,joint='curve')
    im.paste(layer,(0,0),layer)

def frame(t):
    im=base.copy()
    # The screenshot was captured while saving; settle to Saved during the loop.
    ImageDraw.Draw(im).rectangle((519,38,635,81),fill='white')
    ImageDraw.Draw(im).text((527,46),'Saved',font=small,fill='#94a3b8')
    active=ease((t-1.25)/.2)*(1-ease((t-6.5)/.2))
    paste_alpha(im,tool_idle,tool_box[:2],active)
    paste_alpha(im,sed_active,sed_box[:2],active)
    menu_a=ease((t-1.3)/.22)*(1-ease((t-2.75)/.2))
    # Popup fades into place without moving the plan underneath it.
    paste_alpha(im,menu,menu_box[:2],menu_a)
    badge_a=ease((t-2.8)/.2)*(1-ease((t-6.5)/.2))
    paste_alpha(im,badge,(badge_box[0],badge_box[1]+8),badge_a)
    progress=ease((t-3.75)/2.45)
    finish=ease((t-6.5)/.32)
    x=start[0]+(end[0]-start[0])*progress
    if t>=3.65:
        layer=Image.new('RGBA',im.size)
        d=ImageDraw.Draw(layer)
        r=round(55-8*finish)
        color=tuple(round(a+(b-a)*finish) for a,b in zip((14,165,223,255),(24,126,52,230)))
        d.rectangle((start[0],start[1]-r,x,start[1]+r),fill=color)
        for cap in [start[0],x]:
            d.ellipse((cap-r,start[1]-r,cap+r,start[1]+r),fill=color)
        for tick in range(8):
            tx=start[0]+tick*(end[0]-start[0])/7
            if tx<=x+1:
                d.rectangle((tx-7,start[1]-13,tx+7,start[1]+13),fill=(8,45,61,255))
        if finish<1 and progress>.025:
            label=f'{round(128*progress)} ft'
            center=(start[0]+x)/2
            d.text((center,start[1]+64),label,font=font,anchor='mt',fill=(15,23,42,round(255*(1-finish))),stroke_width=5,stroke_fill=(255,255,255,round(235*(1-finish))))
        im.paste(layer,(0,0),layer)
        if finish>0:
            exact=finished_stroke.copy()
            exact.putalpha(finished_mask.point(lambda value:round(value*finish)))
            im.paste(exact,finished_box[:2],exact)
    # Mouse selects the tool, chooses Compost Sock, then clicks and draws.
    if t<1.25:
        p=mix((390,330),(78,652),ease((t-.4)/.85))
    elif t<2.65:
        p=mix((78,652),(358,1235),ease((t-1.65)/.85))
    elif t<3.65:
        p=mix((358,1235),start,ease((t-2.95)/.65))
    elif t<6.5:
        p=(x,start[1])
    else:
        p=mix(end,(2390,810),ease((t-6.85)/.7))
    for click in [1.25,2.65,3.65,6.28,6.46]:
        u=(t-click)/.32
        if 0<=u<=1:
            layer=Image.new('RGBA',im.size);d=ImageDraw.Draw(layer)
            r=12+24*ease(u)
            d.ellipse((p[0]-r,p[1]-r,p[0]+r,p[1]+r),outline=(14,165,233,round(165*(1-u))),width=3)
            im.paste(layer,(0,0),layer)
    pointer(im,p,ease((t-.2)/.25)*(1-ease((t-7.3)/.3)))
    return im.resize((W,H),Image.Resampling.LANCZOS)

initial=frame(0)
initial.save(OUT/'poster.png')
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
encoder=subprocess.Popen([ffmpeg,'-v','error','-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'compost-drawing.mp4')],stdin=subprocess.PIPE)
preview=[]
for i in range(FPS*SECONDS):
    t=i/FPS
    im=frame(t)
    if t>9:im=Image.blend(im,initial,ease((t-9)/.75))
    encoder.stdin.write(im.tobytes())
    if i%2==0:preview.append(im.resize((960,540),Image.Resampling.LANCZOS))
    if i in [64,150,240]:im.save(SRC/f'check-{i}.png')
encoder.stdin.close()
assert encoder.wait()==0
preview[0].save(OUT/'compost-drawing.gif',save_all=True,append_images=preview[1:],duration=[60,70,70]*50,loop=0,optimize=True)
subprocess.run([ffmpeg,'-v','error','-y','-i',str(OUT/'compost-drawing.mp4'),'-c:v','libvpx-vp9','-b:v','0','-crf','30','-an',str(OUT/'compost-drawing.webm')],check=True)
print('Rendered ten-second drawing loop.')
