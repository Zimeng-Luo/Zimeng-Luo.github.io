---
title: "02 math搴?"
date: 2026-09-02
categories: ["笔记", "编程", "Python"]
tags: ["Python", "编程"]
sidebar: false
---
锘?--
title: "02 math搴?md"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["Python", "编程"]
  - python杩涢樁
  - reference
  - python
  - math
  - 鏍囧噯搴?
---
# Python math 搴?

## 鏍稿績鎽樿

鏈瘒鐢ㄤ簬鏌ラ槄 Python 鏍囧噯搴?`math` 鐨勫父鐢ㄥ嚱鏁帮紝鍖呮嫭鏁板甯搁噺銆佸彇鏁淬€佸箓涓庡鏁般€佷笁瑙掑嚱鏁般€佽搴﹁浆鎹€侀樁涔樺拰鏈€澶у叕绾︽暟銆?

## 1. 鏍稿績鏁板甯搁噺 (Constants)

`math` 妯″潡鍐呯疆浜嗗嚑涓垜浠湪鏁板璁＄畻涓瀬甯哥敤鐨勫父閲忥紝浣跨敤瀹冧滑姣斾綘鑷繁鎵嬪姩杈撳叆绮剧‘寰楀銆?

- **`math.pi`**: 鍦嗗懆鐜?$\pi$锛屽ぇ绾︾瓑浜?3.141592653589793銆?
    
- **`math.e`**: 鑷劧瀵规暟鐨勫簳鏁?$e$锛屽ぇ绾︾瓑浜?2.718281828459045銆?
    
- **`math.inf`**: 姝ｆ棤绌峰ぇ銆傚父鐢ㄤ簬鍦ㄧ畻娉曪紙濡傚鎵炬渶灏忓€硷級涓垵濮嬪寲涓€涓瀬澶х殑瀵规瘮鍊笺€傚鏋滄槸璐熸棤绌峰ぇ锛屽彲浠ヤ娇鐢?`-math.inf`銆?
    
- **`math.nan`**: 闈炴暟瀛?(Not a Number)锛岄€氬父鐢ㄤ簬琛ㄧず鏈畾涔夋垨涓嶅彲琛ㄧず鐨勭粨鏋溿€?
    

**浠ｇ爜绀轰緥锛?*

```python
import math

print(math.pi)
print(math.inf > 999999999) # 杈撳嚭: True
```

## 2. 鏁板€煎鐞嗕笌鑸嶅叆 (Rounding & Absolute)

铏界劧 Python 鍐呯疆浜?`round()` 鍜?`abs()`锛屼絾 `math` 妯″潡鎻愪緵浜嗘洿绮剧粏鐨勬帶鍒讹紝鐗瑰埆鏄湪澶勭悊娴偣鏁版椂銆?

- **`math.ceil(x)`**: 鍚戜笂鍙栨暣锛岃繑鍥炲ぇ浜庢垨绛変簬 x 鐨勬渶灏忔暣鏁般€?
    
- **`math.floor(x)`**: 鍚戜笅鍙栨暣锛岃繑鍥炲皬浜庢垨绛変簬 x 鐨勬渶澶ф暣鏁般€?
    
- **`math.trunc(x)`**: 鎴柇 x 鐨勫皬鏁伴儴鍒嗭紝鍙繚鐣欐暣鏁伴儴鍒嗐€?
    
- **`math.fabs(x)`**: 杩斿洖 x 鐨勭粷瀵瑰€笺€備笌鍐呯疆鐨?`abs()` 涓嶅悓锛宍math.fabs()` **鎬绘槸杩斿洖娴偣鏁?*銆?
    

**浠ｇ爜绀轰緥锛?*

```python
import math

x = 4.2
y = -4.8

print("鍚戜笂鍙栨暣 (ceil):", math.ceil(x))   # 杈撳嚭: 5
print("鍚戜笅鍙栨暣 (floor):", math.floor(y)) # 杈撳嚭: -5
print("鎴柇灏忔暟 (trunc):", math.trunc(y)) # 杈撳嚭: -4
print("缁濆鍊?(fabs):", math.fabs(-10))   # 杈撳嚭: 10.0
```

## 3. 骞傝繍绠椾笌瀵规暟 (Power & Logarithmic)

- **`math.pow(x, y)`**: 杩斿洖 x 鐨?y 娆℃柟銆傝櫧鐒跺拰 `x ** y` 绫讳技锛屼絾 `math.pow()` 浼氬皢鍙傛暟杞崲涓烘诞鐐规暟锛屽苟**濮嬬粓杩斿洖娴偣鏁?*銆?
    
- **`math.sqrt(x)`**: 杩斿洖 x 鐨勫钩鏂规牴銆?
    
- **`math.exp(x)`**: 杩斿洖 $e^x$ 锛坄math.e` 鐨?x 娆℃柟锛夈€?
    
- **`math.log(x, [base])`**: 杩斿洖 x 鐨勫鏁般€傚鏋滀笉浼?`base`锛岄粯璁よ繑鍥炶嚜鐒跺鏁帮紙浠?e 涓哄簳锛夈€傚鏋滀紶鍏?`base`锛屽垯杩斿洖浠?`base` 涓哄簳鐨勫鏁般€?
    
- **`math.log10(x)`**: 鐩稿綋浜?`math.log(x, 10)` 鐨勫揩鎹锋柟寮忥紝杩斿洖浠?10 涓哄簳鐨勫鏁般€?
    

**浠ｇ爜绀轰緥锛?*

```python
import math

print("骞虫柟鏍?", math.sqrt(16))      # 杈撳嚭: 4.0
print("骞傝繍绠?", math.pow(2, 3))     # 杈撳嚭: 8.0
print("浠?涓哄簳鐨勫鏁?", math.log(8, 2)) # 杈撳嚭: 3.0
```

## 4. 涓夎鍑芥暟涓庤搴﹁浆鎹?(Trigonometry)

鈿狅笍 `math` 妯″潡涓墍鏈夌殑涓夎鍑芥暟锛坰in, cos, tan 绛夛級锛屽畠浠帴鏀剁殑鍙傛暟閮芥槸**寮у害 (Radians)**
- **瑙掑害涓庡姬搴︿簰杞?*锛?
    
    - **`math.radians(x)`**: 灏嗚搴?x 杞崲涓哄姬搴︺€?
        
    - **`math.degrees(x)`**: 灏嗗姬搴?x 杞崲涓鸿搴︺€?
        
- **涓夎鍑芥暟**锛?
    
    - **`math.sin(x)`**: 杩斿洖 x锛堝姬搴︼級鐨勬寮﹀€笺€?
        
    - **`math.cos(x)`**: 杩斿洖 x锛堝姬搴︼級鐨勪綑寮﹀€笺€?
        
    - **`math.tan(x)`**: 杩斿洖 x锛堝姬搴︼級鐨勬鍒囧€笺€?
        

**浠ｇ爜绀轰緥锛?*

```python
import math

# 閿欒鍋氭硶锛氱洿鎺ヤ紶鍏ヨ搴?30锛岀粨鏋滄槸涓嶅鐨?
# print(math.sin(30)) 

# 姝ｇ‘鍋氭硶锛氬厛灏?30 搴﹁浆涓哄姬搴︼紝鍐嶆眰姝ｅ鸡鍊?
angle = 30
radians = math.radians(angle)
sin_value = math.sin(radians)

# 鍥犱负娴偣鏁扮簿搴﹂棶棰橈紝缁撴灉鍙兘鏄?0.49999999999999994
print(f"30搴︾殑姝ｅ鸡鍊? {sin_value}")
```

## 5. 瀹炵敤鐗规畩鍑芥暟

- **`math.factorial(x)`**: 杩斿洖 x 鐨勯樁涔橈紙x!锛夈€倄 蹇呴』鏄鏁存暟鎴?0锛屽惁鍒欎細鎶ラ敊 `ValueError`銆?
    
- **`math.gcd(a, b)`**: 杩斿洖鏁存暟 a 鍜?b 鐨勬渶澶у叕绾︽暟 (Greatest Common Divisor)銆?
    

**浠ｇ爜绀轰緥锛?*

```python
import math

print("5鐨勯樁涔?", math.factorial(5)) # 杈撳嚭: 120 (鍗?5*4*3*2*1)
print("12鍜?8鐨勬渶澶у叕绾︽暟:", math.gcd(12, 18)) # 杈撳嚭: 6
```



