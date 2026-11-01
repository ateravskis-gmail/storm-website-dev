"""Render mobile inspection in an iPhone-style mockup.
Usage: python render-inspection-phone.py NORMALIZED_SCREENSHOT_DIRECTORY
Requires Pillow, numpy, imageio-ffmpeg. See README for source dimensions.
"""
from pathlib import Path
import sys, subprocess, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

import imageio_ffmpeg
SRC=Path(sys.argv[1])
OUT=Path(__file__).resolve().parents[1]/'public/demos/weekly-inspection-phone'
OUT.mkdir(parents=True,exist_ok=True)
W,H,FPS,SECONDS=800,1100,30,16
SW,SH=480,996
SX,SY=160,52
CW,CX,CY=456,12,74
REST=200
shots={n:Image.open(SRC/(n+'.png')).convert('RGB') for n in ['collapsed','expanded','photo','caption','pass']}
def fit(im,w):return im.resize((w,round(im.height*w/im.width)),Image.Resampling.LANCZOS)
above=fit(shots['collapsed'].crop((147,202,1140,1193)),CW)
card=fit(shots['expanded'].crop((106,558,1075,1654)),CW)
final=fit(shots['pass'].crop((90,554,1060,1782)),CW)
hh=round(139*CW/969)
header=card.crop((0,0,CW,hh))
blue=card.getpixel((8,25))
pixels=np.array(final)
green=(pixels[:,:,1].astype('int16')>pixels[:,:,0].astype('int16')+12)&(pixels[:,:,2]>170)&(pixels[:,:,0]>155)
pixels[green]=blue
saved=Image.fromarray(pixels)
saved.paste(header.crop((0,0,390,hh)),(0,0))
status=card.crop((0,round((1064-558)*CW/969),CW,round((1280-558)*CW/969)))
saved.paste(status,(0,round((1060-554)*CW/970)))
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',29)
ui_font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf',16)
photo=shots['caption'].copy()
ImageDraw.Draw(photo).rectangle((220,1340,917,1470),fill='white')
photo_scale=SW/1116
# Keep the supplied mobile layout, shortening only its empty upper whitespace.
photo_top=(12,14,1128,123)
photo_body=(12,410,1128,1710)
photo_top_h=round(109*photo_scale)
def ease(t):
 t=max(0,min(1,t));return t*t*t*(t*(6*t-15)+10)
def touch(im,point,t,at):
 u=(t-at)/.5
 if 0<=u<=1:
  layer=Image.new('RGBA',im.size);d=ImageDraw.Draw(layer);r=9+19*ease(u)
  x,y=point
  d.ellipse((x-r,y-r,x+r,y+r),fill=(18,139,245,round(35*(1-u))),outline=(18,139,245,round(215*(1-u))),width=2)
  d.ellipse((x-4,y-4,x+4,y+4),fill=(18,139,245,round(180*(1-u))))
  im.paste(layer,(0,0),layer)
def photo_point(x,y):return ((x-12)*photo_scale,CY+photo_top_h+100+(y-410)*photo_scale)
def report(t):
 im=Image.new('RGB',(SW,SH),'#f8fafc')
 opening=ease((t-1.3)/1)
 top=round(CY+REST+(above.height-REST)*(1-opening))
 im.paste(above,(CX,top-above.height))
 visible=round(hh+(card.height-hh)*opening)
 im.paste(card.crop((0,0,CW,visible)),(CX,top))
 if t<2.3:
  d=ImageDraw.Draw(im);x,y=CX+433,top+33
  d.rectangle((x-10,y-10,x+10,y+10),fill=blue)
  theta=math.pi*opening
  pts=[(x+px*math.cos(theta)-py*math.sin(theta),y+px*math.sin(theta)+py*math.cos(theta)) for px,py in [(-4,-2),(0,2),(4,-2)]]
  d.line(pts,fill='#94a3b8',width=2)
 if t>=9.3:im.paste(saved,(CX,CY+REST))
 if t>=11.25:im.paste(Image.blend(saved,final,ease((t-11.25)/.4)),(CX,CY+REST))
 touch(im,(CX+433,top+33),t,1.25)
 touch(im,(CX+387,CY+REST+479),t,4.8)
 touch(im,(CX+337,CY+REST+279),t,11.25)
 return im
def photo_scene(t):
 im=Image.new('RGB',(SW,SH),'white');shot=photo.copy();d=ImageDraw.Draw(shot)
 phrase='Compost sock is installed in accordance with\nSWPPP.'
 count=round(len(phrase)*max(0,min(1,(t-6.15)/2.3)))
 text=phrase[:count]
 d.multiline_text((234,1351),text,font=font,spacing=13,fill='#41494e')
 if 6<t<8.8 and int(t*3)%2==0:
  lines=text.split('\n');x=234+d.textlength(lines[-1],font=font);y=1354+42*(len(lines)-1)
  d.line((x+2,y,x+2,y+29),fill='#334155',width=2)
 im.paste(fit(shot.crop(photo_top),SW),(0,CY))
 im.paste(fit(shot.crop(photo_body),SW),(0,CY+photo_top_h+100))
 touch(im,photo_point(450,1380),t,6.05)
 touch(im,photo_point(575,1560),t,9.08)
 return im

# Reusable device shell: rounded glass, thin metallic rim, side keys and soft shadow.
shell=Image.new('RGB',(W,H),'#f8fafc')
shadow=Image.new('RGBA',(W,H));d=ImageDraw.Draw(shadow)
d.rounded_rectangle((149,49,663,1076),radius=72,fill=(15,23,42,60))
shadow=shadow.filter(ImageFilter.GaussianBlur(19));shell.paste(shadow,(0,0),shadow)
d=ImageDraw.Draw(shell)
for box in [(142,210,148,246),(142,278,148,344),(142,367,148,433),(652,294,658,398)]:d.rounded_rectangle(box,radius=3,fill='#555a63')
d.rounded_rectangle((146,37,654,1063),radius=66,fill='#666b73')
d.rounded_rectangle((149,39,651,1061),radius=64,fill='#101114')
d.rounded_rectangle((153,43,647,1057),radius=60,outline='#35373b',width=2)
screen_mask=Image.new('L',(SW,SH));ImageDraw.Draw(screen_mask).rounded_rectangle((0,0,SW-1,SH-1),radius=49,fill=255)
def frame(t):
 screen=report(t)
 if 4.95<=t<9.7:
  a=ease((t-4.95)/.35)*(1-ease((t-9.3)/.4))
  screen=Image.blend(screen,photo_scene(t),a)
 d=ImageDraw.Draw(screen)
 d.rectangle((0,0,SW,67),fill='white')
 d.text((32,22),'9:41',font=ui_font,fill='#111827')
 d.rounded_rectangle((173,12,307,47),radius=18,fill='#101114')
 d.ellipse((282,23,294,35),fill='#192330')
 for n in range(4):d.rounded_rectangle((370+n*5,32-n*3,372+n*5,37),radius=1,fill='#111827')
 d.arc((394,23,413,39),205,335,fill='#111827',width=2)
 d.arc((398,28,409,39),205,335,fill='#111827',width=2)
 d.ellipse((402,35,405,38),fill='#111827')
 d.rounded_rectangle((424,25,449,38),radius=3,outline='#555b65',width=1)
 d.rounded_rectangle((426,27,445,36),radius=1,fill='#111827')
 d.rectangle((450,29,452,34),fill='#555b65')
 d.rectangle((0,SH-28,SW,SH),fill='white')
 d.rounded_rectangle((165,SH-14,315,SH-9),radius=3,fill='#17191e')
 im=shell.copy();im.paste(screen,(SX,SY),screen_mask)
 return im

initial=frame(0);initial.save(OUT/'poster.png')
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
enc=subprocess.Popen([ffmpeg,'-v','error','-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'weekly-inspection-phone.mp4')],stdin=subprocess.PIPE)
previews=[]
for i in range(FPS*SECONDS):
 t=i/FPS;im=frame(t)
 if t>15:im=Image.blend(im,initial,ease((t-15)/.8))
 enc.stdin.write(im.tobytes())
 if i%2==0:previews.append(im.resize((480,660),Image.Resampling.LANCZOS))
 if i in [0,90,255,315,390]:im.save(SRC/f'check-{i}.png')
enc.stdin.close();assert enc.wait()==0
previews[0].save(OUT/'weekly-inspection-phone.gif',save_all=True,append_images=previews[1:],duration=[60,70,70]*80,loop=0,optimize=True)
subprocess.run([ffmpeg,'-v','error','-y','-i',str(OUT/'weekly-inspection-phone.mp4'),'-c:v','libvpx-vp9','-b:v','0','-crf','30','-an',str(OUT/'weekly-inspection-phone.webm')],check=True)
print('Rendered mobile inspection inside iPhone mockup: 800 × 1100, 16 seconds.')
