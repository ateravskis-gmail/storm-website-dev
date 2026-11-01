"""Render narrative writing/photo demo from normalized after.png and modal.png.
Usage: python render-swppp-narrative.py SOURCE_DIRECTORY
Requires Pillow and imageio-ffmpeg.
"""
from pathlib import Path
import sys, subprocess
from PIL import Image,ImageDraw,ImageFont,ImageFilter
import imageio_ffmpeg
SRC=Path(sys.argv[1])
OUT=Path(__file__).resolve().parents[1]/'public/demos/swppp-narrative'
OUT.mkdir(parents=True,exist_ok=True)
W,H,FPS,SECONDS=1600,900,30,16
source=Image.open(SRC/'after.png').convert('RGB')
modal=Image.open(SRC/'modal.png').convert('RGB').crop((450,145,1462,1201))
crop=(160,100,1985,1070)
S=1536/1825
def point(x,y):return (round(32+(x-160)*S),round(42+(y-100)*S))
def ease(t):
 t=max(0,min(1,t));return t*t*t*(t*(6*t-15)+10)
def move(a,b,u):return tuple(x+(y-x)*u for x,y in zip(a,b))
boxes=[(811,456,1918,480),(811,482,1924,506),(811,508,1927,532),(811,534,1015,558)]
total=sum(b[2]-b[0] for b in boxes)
lower=source.crop((792,647,1943,1067))
attachment=source.crop((792,573,1943,647))
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',17)
caption='View looking east at the project site.'
MS=.72
MW,MH=round(modal.width*MS),round(modal.height*MS)
MX,MY=(W-MW)//2,(H-MH)//2
modal_mask=Image.new('L',(MW,MH))
ImageDraw.Draw(modal_mask).rounded_rectangle((0,0,MW-1,MH-1),radius=21,fill=255)
def modalpoint(x,y):return (MX+(x-450)*MS,MY+(y-145)*MS)
def report(t):
 im=source.copy();d=ImageDraw.Draw(im)
 d.rectangle((805,450,1936,562),fill='white')
 remaining=total*max(0,min(1,(t-1.15)/4))
 caret=(811,467)
 for x1,y1,x2,y2 in boxes:
  width=min(x2-x1,max(0,round(remaining)))
  if width:
   im.paste(source.crop((x1,y1,x1+width,y2)),(x1,y1));caret=(x1+width,y1+3)
  remaining-=x2-x1
 if 1<t<6.1 and int(t*3)%2==0:
  d.line((caret[0]+2,caret[1],caret[0]+2,caret[1]+18),fill='#182338',width=2)
 if .85<t<6.6:d.rounded_rectangle((794,385,1941,570),radius=10,outline='#3b82f6',width=2)
 growth=round(74*ease((t-10.75)/.6))
 d.rectangle((792,573,1943,1067),fill='white')
 if growth:im.paste(attachment.crop((0,0,attachment.width,growth)),(792,573))
 im.paste(lower,(792,573+growth))
 result=Image.new('RGB',(W,H),'#f8fafc')
 result.paste(im.crop(crop).resize((1536,round(970*S)),Image.Resampling.LANCZOS),(32,42))
 return result
def pointer(im,p,a):
 if a<=0:return
 layer=Image.new('RGBA',(96,120));d=ImageDraw.Draw(layer)
 pts=[(6,4),(6,83),(27,66),(43,99),(57,92),(41,61),(68,61)]
 d.polygon(pts,fill=(20,33,53,round(255*a)))
 d.line(pts+[pts[0]],fill=(255,255,255,round(255*a)),width=5,joint='curve')
 layer=layer.resize((32,40),Image.Resampling.LANCZOS)
 im.paste(layer,(round(p[0])-2,round(p[1])-1),layer)
def frame(t):
 im=report(t)
 if 6.6<t<11.2:
  modal_image=modal.copy();d=ImageDraw.Draw(modal_image)
  d.rectangle((65,863,946,900),fill='white')
  count=round(len(caption)*max(0,min(1,(t-8)/1.8)))
  text=caption[:count]
  if t<7.8:d.text((80,873),'Optional caption shown in the SWPPP PDF',font=font,fill='#98a2b3')
  else:
   d.text((80,873),text,font=font,fill='#334155')
   if t<10 and int(t*3)%2==0:
    x=80+d.textlength(text,font=font);d.line((x+1,872,x+1,891),fill='#334155',width=1)
   d.rounded_rectangle((61,859,951,903),radius=5,outline='#3b82f6',width=2)
  backdrop=im.filter(ImageFilter.GaussianBlur(4))
  backdrop=Image.blend(backdrop,Image.new('RGB',(W,H),'#20252c'),.47)
  backdrop.paste(modal_image.resize((MW,MH),Image.Resampling.LANCZOS),(MX,MY),modal_mask)
  alpha=ease((t-6.6)/.35)*(1-ease((t-10.75)/.45))
  im=Image.blend(im,backdrop,alpha)
 field=point(910,473);icon=point(1062,413)
 input_point=modalpoint(720,1025);done=modalpoint(1374,1128)
 if t<1:p=move(point(1160,620),field,ease((t-.25)/.65))
 elif t<5.8:p=field
 elif t<6.6:p=move(field,icon,ease((t-5.8)/.65))
 elif t<7.8:p=move(icon,input_point,ease((t-7.05)/.65))
 elif t<10:p=input_point
 elif t<10.75:p=move(input_point,done,ease((t-10)/.5))
 else:p=move(done,point(1120,670),ease((t-11.25)/.7))
 for at in [.95,6.55,7.8,10.7]:
  u=(t-at)/.35
  if 0<=u<=1:
   layer=Image.new('RGBA',im.size);d=ImageDraw.Draw(layer);r=6+18*ease(u)
   d.ellipse((p[0]-r,p[1]-r,p[0]+r,p[1]+r),outline=(59,130,246,round(160*(1-u))),width=2)
   im.paste(layer,(0,0),layer)
 pointer(im,p,ease((t-.15)/.2)*(1-ease((t-12)/.3)))
 return im
initial=frame(0);initial.save(OUT/'poster.png')
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
enc=subprocess.Popen([ffmpeg,'-v','error','-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'swppp-narrative.mp4')],stdin=subprocess.PIPE)
previews=[]
for i in range(FPS*SECONDS):
 t=i/FPS;im=frame(t)
 if t>15:im=Image.blend(im,initial,ease((t-15)/.8))
 enc.stdin.write(im.tobytes())
 if i%2==0:previews.append(im.resize((960,540),Image.Resampling.LANCZOS))
 if i in [0,150,300,390]:im.save(SRC/f'check-{i}.png')
enc.stdin.close();assert enc.wait()==0
previews[0].save(OUT/'swppp-narrative.gif',save_all=True,append_images=previews[1:],duration=[60,70,70]*80,loop=0,optimize=True)
subprocess.run([ffmpeg,'-v','error','-y','-i',str(OUT/'swppp-narrative.mp4'),'-c:v','libvpx-vp9','-b:v','0','-crf','30','-an',str(OUT/'swppp-narrative.webm')],check=True)
print('Rendered 16-second SWPPP narrative loop.')
