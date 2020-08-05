# coding:utf8

from PIL import Image
from PIL import ImageEnhance
from PIL import ImageFilter
import math
import os
import time

from xml.dom.minidom import parse
import xml.dom.minidom

DIR_ROOT = "assets\\atlas_ui"
# 使用minidom解析器打开 XML 文档
DOMTree = xml.dom.minidom.parse(DIR_ROOT + "\\package.xml")
movies = DOMTree.getElementsByTagName("image")
isSet = False
for data in movies:
    dataName = data.getAttribute("name")
    if dataName.find("@") != -1 and dataName.find("_") != -1 and not data.getAttribute("scale"):
        isSet = True
        print(dataName)
        arr = dataName.split("@")[1].split(".")[0].split("_")
        img = Image.open(DIR_ROOT + data.getAttribute("path") + dataName)
        imgW = img.size[0]
        imgH = img.size[1]
        outData = [arr[0], arr[1]]
        outData.append(str(imgW - int(arr[0]) - int(arr[2])))
        outData.append(str(imgH - int(arr[1]) - int(arr[3])))
        scale9grid = ",".join(outData)
        print("scale9grid => " + scale9grid)
        data.setAttribute('scale', "9grid") #设置attrib
        data.setAttribute('scale9grid', scale9grid) #设置attrib
if isSet:
    with open(DIR_ROOT + "\\package.xml", "w") as f:
        DOMTree.writexml(f,indent='',addindent='',newl='',encoding='UTF-8')