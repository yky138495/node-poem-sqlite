import time
import os
import json
import re
#pip3 install pillow
from PIL import Image,ImageDraw,ImageFont
import glob
from math import ceil, floor
from PIL import ImageColor
import random
from biplist import *
from datetime import datetime
import shutil
import chardet
import codecs
import math

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

path = BASE_DIR + '/'
app_make_gradual_icon=1

xwidth = 1204
yheight = 326
name='day1'
txt = name

def setup_download_dir(directory):
    """ 设置文件夹，文件夹名为传入的 directory 参数，若不存在会自动创建 """
    print(directory)
    if not os.path.exists(directory):
        try:
            os.makedirs(directory)
        except Exception as e:
            pass
    return True

def make_image_and_bg(str,txt):
    color = ImageColor.getrgb(str)
    img = Image.new("RGBA",(xwidth,yheight),color)
    img.save(path + txt +'.png')
    txt = txt
    make_image_text(img,txt)

def make_image_text(img,txt):
    x,y = img.size
        
    size = math.ceil(x /4.0)
    if x>y:
        size = math.ceil(y /4.0)

    txtl =list(txt)
    txtitme = ''
    p=1
    for str1 in txtl:
        if p%5==0:
            txtitme = txtitme + str1 + "\n"
        else:
            txtitme = txtitme + str1 + "   "
        p=p+1

    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(" /System/Library/Fonts/Hiragino Sans GB.ttc",size = size,encoding='unic')
    #“unic”（Unicode），“symb”（Microsoft Symbol），“ADOB”（Adobe Standard），“ADBE”（Adobe Expert）和“armn”（Apple Roman）
    #fill=(255, 255, 255, 0)

    word_count = math.ceil((p-1) /5.0)
    x_f = abs(ceil((x - 2 * size)/2.6))
    y_f = abs(ceil((y - (word_count * 2 - 1) * size)/2.0))
    w_font,h_font = font.getsize(txtitme)
    print(str(size) + '----' + str(x)+ '----' + str(y)+ '----' + str(w_font)+ '----' + str(h_font))
    d.text((x_f,y_f), txtitme, fill='white',font=font ,spacing=size)

    #font是个imagefont实例 spacing字体间距 direction rtl ttb
    img.save(path + txt +'.png')
    #img.show()
    img.close()



def make_image_and_bg_gradual(color1,color2,txt):
    color = ImageColor.getrgb(color1)
    height = yheight
    width = xwidth
    img = Image.new("RGBA",size = (xwidth,yheight),color = color)
    bg_1 = Hex_to_RGB(color1)
    bg_2 = Hex_to_RGB(color2)
    draw = ImageDraw.Draw(img)
    strp_r = (bg_2[0] - bg_1[0])/ height
    strp_g = (bg_2[1] - bg_1[1])/ height
    strp_b = (bg_2[2] - bg_1[2])/ height

    for y in range(0,height):
        bg_r = round(bg_1[0] + strp_r * y)
        bg_g = round(bg_1[1] + strp_g * y)
        bg_b = round(bg_1[2] + strp_b * y)
        for x in range(0,width):
            draw.point((x,y),fill=(bg_r,bg_g,bg_b))
    #img.show()
    img.save(path + txt +'.png')
    txt = txt
    make_image_text(img,txt)

def randomcolor():
    colorArr = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    color = ""
    for i in range(6):
        color += colorArr[random.randint(0,14)]
    return "#"+color

#16进制颜色格式颜色转换为RGB格式
def Hex_to_RGB(hex_str):
    r = int(hex_str[1:3],16)
    g = int(hex_str[3:5],16)
    b = int(hex_str[5:7],16)
    rgb = str(r)+','+str(g)+','+str(b)
    return (r,g,b)

def mark_icon(txt):
    color=''
    color_b=''
    color_e=''
    time.sleep(1)
    if int(app_make_gradual_icon)==0:
        color=randomcolor()
        app_main_color=color
        print(color)
    else:
        color_b=randomcolor()
        color_e=randomcolor()
        app_main_color=color_b
        icon_color_s = color_b.replace('#', '')
        icon_color_e = color_e.replace('#', '')
        icon_color_name = 'icon_' + icon_color_s +'__' + icon_color_e + '.png'
        print(color_b + "---" + color_e)

    if int(app_make_gradual_icon)==0:
        make_image_and_bg(color,txt)
        time.sleep(0.5)
    else:
        make_image_and_bg_gradual(color_b,color_e,txt)
        time.sleep(0.5)

if __name__ == "__main__":
    for n in range (1,6): #区间[1,6)
        mark_icon('day' + str(n))
 


