"""Render the new weekly inspection workflow from supplied mobile screenshots.
Usage: python scripts/render-new-inspection-phone.py SOURCE_DIRECTORY
Requires Pillow, numpy, imageio-ffmpeg.
"""
from pathlib import Path
import sys, subprocess, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg
SRC=Path(sys.argv[1])
OUT=Path(__file__).resolve().parents[1]/'public/demos/new-inspection-phone'
OUT.mkdir(parents=True,exist_ok=True)
W,H,FPS,SECONDS=800,1100,30,20
SW,SH,SX,SY=480,996,160,52
ui_font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf',16)
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',29)
def fit(im,w):return im.resize((w,round(im.height*w/im.width)),Image.Resampling.LANCZOS)
def ease(t):
 t=max(0,min(1,t));return t*t*t*(t*(6*t-15)+10)
shots={n:Image.open(SRC/(n+'.png')).convert('RGB') for n in ['projects','report','weekly','forecast','photo','caption','saved','lower']}
projects=fit(shots['projects'].crop((47,22,1156,2005)),SW)
base=shots['weekly'].crop((22,25,1131,2009))
blank=base.copy()
blank.paste(shots['report'].crop((92,602,405,687)).resize((312,86)),(96-22,613-25))
report=fit(base,SW);unselected=fit(blank,SW)
s=SW/1109
forecast=fit(shots['forecast'].crop((42,58,1103,2005)),round(1049*s))
fy=round((1279-25)*s);fh=round(174*s);fx=round(30*s)
saved=fit(shots['saved'].crop((8,0,1123,1995)),SW)
photo=shots['caption'].copy()
ImageDraw.Draw(photo).rectangle((226,1380,922,1510),fill='white')
ps=SW/1118
ptop=round(108*ps)
def touch(im,point,t,at):
 u=(t-at)/.5
 if 0<=u<=1:
  layer=Image.new('RGBA',im.size);d=ImageDraw.Draw(layer);r=9+19*ease(u);x,y=point
  d.ellipse((x-r,y-r,x+r,y+r),fill=(18,139,245,round(35*(1-u))),outline=(18,139,245,round(215*(1-u))),width=2)
  d.ellipse((x-4,y-4,x+4,y+4),fill=(18,139,245,round(180*(1-u))))
  im.paste(layer,(0,0),layer)
def report_scene(t):
 im=Image.new('RGB',(SW,SH),'#f8fafc')
 selected=ease((t-3.15)/.25)
 doc=Image.blend(unselected,report,selected)
 # Scroll the forecast to the top, then expand its actual mobile contents.
 scroll=round(430*ease((t-4)/1.1))
 opening=ease((t-5.5)/.8)*(1-ease((t-8.7)/.8))
 extra=round((forecast.height-fh)*opening)
 im.paste(doc.crop((0,0,SW,fy)),(0,74-scroll))
 im.paste(doc.crop((0,fy+fh,SW,doc.height)),(0,74+fy+fh+extra-scroll))
 if opening>0:
  im.paste(forecast.crop((0,0,forecast.width,fh+extra)),(fx,74+fy-scroll))
 else:im.paste(doc.crop((0,fy,SW,fy+fh)),(0,74+fy-scroll))
 # Rotate the disclosure chevron through opening and closing.
 x=round((1040-22)*s);y=74+fy+round(86*s)-scroll
 d=ImageDraw.Draw(im);d.rectangle((x-10,y-15,x+10,y+15),fill='white')
 theta=opening*math.pi/2
 pts=[(x+a*math.cos(theta)-b*math.sin(theta),y+a*math.sin(theta)+b*math.cos(theta)) for a,b in [(-2,-4),(2,0),(-2,4)]]
 d.line(pts,fill='#41494e',width=2)
 touch(im,((250-22)*s,74+(655-25)*s),t,3.1)
 touch(im,(x,y),t,5.45);touch(im,(x,y),t,8.65)
 touch(im,((960-22)*s,74+(1578-25)*s-scroll),t,10.2)
 return im

def photo_scene(t):
 im=Image.new('RGB',(SW,SH),'white');shot=photo.copy();d=ImageDraw.Draw(shot)
 phrase='0.75" of rain in rain gauge'
 count=round(len(phrase)*max(0,min(1,(t-11.7)/2)))
 text=phrase[:count];d.text((239,1391),text,font=font,fill='#41494e')
 if 11.5<t<14.5 and int(t*3)%2==0:
  x=239+d.textlength(text,font=font);d.line((x+2,1394,x+2,1423),fill='#334155',width=2)
 im.paste(fit(shot.crop((16,49,1134,157)),SW),(0,74))
 im.paste(fit(shot.crop((16,460,1134,1740)),SW),(0,74+ptop+70))
 touch(im,((450-16)*ps,74+ptop+70+(1410-460)*ps),t,11.55)
 touch(im,((575-16)*ps,74+ptop+70+(1600-460)*ps),t,14.8)
 return im

def content(t):
 im=Image.new('RGB',(SW,SH),'#f8fafc');im.paste(projects,(0,74))
 touch(im,((593-47)*SW/1109,74+(584-22)*SW/1109),t,1.25)
 if t>=1.45:im=Image.blend(im,report_scene(t),ease((t-1.45)/.4))
 if 10.4<=t<15.3:im=Image.blend(im,photo_scene(t),ease((t-10.4)/.4))
 if t>=15:
  end=Image.new('RGB',(SW,SH),'#f8fafc');end.paste(saved,(0,74))
  im=Image.blend(photo_scene(t),end,ease((t-15)/.4))
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
 screen=content(t)
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
enc=subprocess.Popen([ffmpeg,'-v','error','-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'new-inspection-phone.mp4')],stdin=subprocess.PIPE)
previews=[]
for i in range(FPS*SECONDS):
 t=i/FPS;im=frame(t)
 if t>19:im=Image.blend(im,initial,ease((t-19)/.8))
 enc.stdin.write(im.tobytes())
 if i%2==0:previews.append(im.resize((480,660),Image.Resampling.LANCZOS))
 if i in [0,100,210,300,420,510]:im.save(SRC/f'check-{i}.png')
enc.stdin.close();assert enc.wait()==0
previews[0].save(OUT/'new-inspection-phone.gif',save_all=True,append_images=previews[1:],duration=[60,70,70]*100,loop=0,optimize=True)
subprocess.run([ffmpeg,'-v','error','-y','-i',str(OUT/'new-inspection-phone.mp4'),'-c:v','libvpx-vp9','-b:v','0','-crf','30','-an',str(OUT/'new-inspection-phone.webm')],check=True)
print('Rendered mobile inspection inside iPhone mockup: 800 × 1100, 20 seconds.')
