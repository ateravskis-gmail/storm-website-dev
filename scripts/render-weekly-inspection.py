"""Render weekly inspection demo from normalized screenshots in SOURCE_DIRECTORY.
Requires Pillow, numpy, imageio-ffmpeg. Source names: expanded, caption, pass (.png).
"""
from pathlib import Path
import sys, subprocess, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

SRC=Path(sys.argv[1])
OUT=Path(__file__).resolve().parents[1]/'public/demos/weekly-inspection'
OUT.mkdir(parents=True,exist_ok=True)
W,H,FPS,SECONDS=1600,900,30,16
CW,X,Y=1160,220,32
expanded=Image.open(SRC/'expanded.png').convert('RGB')
passed=Image.open(SRC/'pass.png').convert('RGB')
caption=Image.open(SRC/'caption.png').convert('RGB')
scale=CW/1320
def resized(im,width):
    return im.resize((width,round(im.height*width/im.width)),Image.Resampling.LANCZOS)
above=resized(expanded.crop((69,0,1389,813)),CW)
card=resized(expanded.crop((69,813,1389,1661)),CW)
final=resized(passed.crop((85,22,1771,1236)),CW)
header_h=round(112*scale)
header=card.crop((0,0,CW,header_h))
blue=card.getpixel((10,50))
# Keep the attached photo and photo count while restoring the pre-Pass state.
pixels=np.array(final)
green=(pixels[:,:,1].astype('int16')>pixels[:,:,0].astype('int16')+12)&(pixels[:,:,2]>170)&(pixels[:,:,0]>155)
pixels[green]=blue
saved=Image.fromarray(pixels)
saved.paste(header.crop((0,0,1035,header_h)),(0,0))
status=card.crop((0,round((1220-813)*scale),CW,round((1356-813)*scale)))
saved.paste(status,(0,round((544-22)*CW/1686)))
photo_base=caption.copy()
ImageDraw.Draw(photo_base).rectangle((397,1120,1145,1258),fill='white')
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',32)
phrase='Installed according to specifications.'
photo_crop=(180,145,1360,1415)
photo_scale=825/1270
photo_width=round(1180*photo_scale)
photo_x=(W-photo_width)//2
photo_y=36

def ease(t):
    t=max(0,min(1,t));return t*t*t*(t*(6*t-15)+10)
def move(a,b,u):return tuple(x+(y-x)*u for x,y in zip(a,b))
def photo_point(x,y):return (photo_x+(x-photo_crop[0])*photo_scale,photo_y+(y-photo_crop[1])*photo_scale)
def pointer(im,p,opacity=1):
    if opacity<=0:return
    layer=Image.new('RGBA',(96,120));d=ImageDraw.Draw(layer)
    pts=[(6,4),(6,83),(27,66),(43,99),(57,92),(41,61),(68,61)]
    d.polygon(pts,fill=(20,33,53,round(255*opacity)))
    d.line(pts+[pts[0]],fill=(255,255,255,round(255*opacity)),width=5,joint='curve')
    layer=layer.resize((32,40),Image.Resampling.LANCZOS)
    im.paste(layer,(round(p[0])-2,round(p[1])-1),layer)
def ring(im,p,t,start):
    u=(t-start)/.35
    if 0<=u<=1:
        layer=Image.new('RGBA',im.size);d=ImageDraw.Draw(layer);r=7+18*ease(u)
        d.ellipse((p[0]-r,p[1]-r,p[0]+r,p[1]+r),outline=(35,137,255,round(150*(1-u))),width=2)
        im.paste(layer,(0,0),layer)

def report(t):
    im=Image.new('RGB',(W,H),'#f7f9fb')
    opening=ease((t-1.3)/1)
    top=round(Y+above.height*(1-opening))
    im.paste(above,(X,top-above.height))
    if opening==1:
        ImageDraw.Draw(im).rectangle((0,0,W,Y-1),fill='#f7f9fb')
    visible=round(header_h+(card.height-header_h)*opening)
    im.paste(card.crop((0,0,CW,visible)),(X,top))
    # Chevron rotates through the disclosure transition.
    if t<2.3:
        d=ImageDraw.Draw(im)
        cx,cy=X+1126,top+50
        d.rectangle((cx-14,cy-14,cx+14,cy+14),fill=blue)
        theta=math.pi*opening
        pts=[]
        for px,py in [(-6,-3),(0,3),(6,-3)]:
            pts.append((cx+px*math.cos(theta)-py*math.sin(theta),cy+px*math.sin(theta)+py*math.cos(theta)))
        d.line(pts,fill='#95a3af',width=2)
    if t>=9.3:
        im.paste(saved,(X,Y))
    if t>=11.25:
        im.paste(Image.blend(saved,final,ease((t-11.25)/.4)),(X,Y))
    return im

def photo_scene(t):
    im=Image.new('RGB',(W,H),'white')
    shot=photo_base.copy();d=ImageDraw.Draw(shot)
    count=round(len(phrase)*max(0,min(1,(t-6.25)/2.15)))
    text=phrase[:count]
    d.text((410,1133),text,font=font,fill='#42494e')
    if 6.05<t<8.7 and int(t*3)%2==0:
        caret=410+d.textlength(text,font=font)
        d.line((caret+2,1134,caret+2,1170),fill='#334155',width=2)
    patch=shot.crop(photo_crop).resize((photo_width,825),Image.Resampling.LANCZOS)
    im.paste(patch,(photo_x,photo_y))
    return im

def frame(t):
    im=report(t)
    if 4.95<=t<9.7:
        a=ease((t-4.95)/.35)*(1-ease((t-9.3)/.4))
        im=Image.blend(im,photo_scene(t),a)
    initial_arrow=(X+1126,Y+above.height+50)
    add=(X+1056,Y+689)
    field=photo_point(520,1160)
    save=photo_point(680,1360)
    pass_button=(X+438,Y+432)
    if t<1.3:p=move((1220,600),initial_arrow,ease((t-.4)/.8))
    elif t<2.3:p=move(initial_arrow,(X+1126,Y+50),ease((t-1.3)/1))
    elif t<4.8:p=move((X+1126,Y+50),add,ease((t-4)/.8))
    elif t<6.05:p=move(add,field,ease((t-5.35)/.65))
    elif t<8.55:p=field
    elif t<9.3:p=move(field,save,ease((t-8.55)/.45))
    elif t<11.25:p=move(save,pass_button,ease((t-10.35)/.8))
    else:p=move(pass_button,(X+650,Y+570),ease((t-11.7)/.7))
    for at in [1.25,4.8,6.05,9.08,11.25]:ring(im,p,t,at)
    opacity=ease((t-.2)/.2)*(1-ease((t-12.2)/.3))
    pointer(im,p,opacity)
    return im

initial=frame(0);initial.save(OUT/'poster.png')
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
enc=subprocess.Popen([ffmpeg,'-v','error','-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'weekly-inspection.mp4')],stdin=subprocess.PIPE)
previews=[]
for i in range(FPS*SECONDS):
    t=i/FPS;im=frame(t)
    if t>15:im=Image.blend(im,initial,ease((t-15)/.8))
    enc.stdin.write(im.tobytes())
    if i%2==0:previews.append(im.resize((960,540),Image.Resampling.LANCZOS))
    if i in [0,90,240,315,390]:im.save(SRC/f'check-{i}.png')
enc.stdin.close();assert enc.wait()==0
previews[0].save(OUT/'weekly-inspection.gif',save_all=True,append_images=previews[1:],duration=[60,70,70]*80,loop=0,optimize=True)
subprocess.run([ffmpeg,'-v','error','-y','-i',str(OUT/'weekly-inspection.mp4'),'-c:v','libvpx-vp9','-b:v','0','-crf','30','-an',str(OUT/'weekly-inspection.webm')],check=True)
print('Rendered 16-second inspection loop.')
