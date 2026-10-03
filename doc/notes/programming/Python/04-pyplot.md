---
title: "04 pyplot"
date: 2026-09-02
categories: ["笔记", "编程", "Python"]
tags: ["Python", "编程"]
sidebar: false
---
锘?--
title: "04 pyplot.md"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["Python", "编程"]
  - python搴?
  - reference
  - python
  - matplotlib
  - 鏁版嵁鍙鍖?
---
# Matplotlib Pyplot 鍩虹

## 鏍稿績鎽樿

鏈瘒鐢ㄤ簬鏌ラ槄 `matplotlib.pyplot` 鐨勫熀纭€缁樺浘娴佺▼锛屽寘鎷鍏ラ厤缃€乣plot()`銆佹爣绛炬爣棰樸€佺綉鏍笺€佸瓙鍥惧拰甯歌鍥捐〃绫诲瀷銆?

## 1. 鍩虹鍑嗗

鍦ㄤ娇鐢?Pyplot 涔嬪墠锛岄€氬父闇€瑕佸鍏ョ浉搴旂殑搴撱€備负浜嗚В鍐冲浘琛ㄤ腑鏂囧瓧浣撴樉绀轰负鏂瑰潡锛堜贡鐮侊級鐨勯棶棰橈紝闇€瑕佽繘琛岀畝鍗曠殑閰嶇疆銆?

```python
import matplotlib.pyplot as plt
import numpy as np

# 瑙ｅ喅涓枃鏄剧ず闂锛圵indows甯哥敤榛戜綋 SimHei锛孧ac甯哥敤 Arial Unicode MS锛?
plt.rcParams['font.sans-serif'] = ['SimHei'] 
# 瑙ｅ喅璐熷彿 '-' 鏄剧ず涓烘柟鍧楃殑闂
plt.rcParams['axes.unicode_minus'] = False
```

---

## 2. 鏍稿績缁樺浘鍑芥暟 `plot()`

`plot()` 鏄渶鍩烘湰涔熸槸鏈€甯哥敤鐨勭粯鍥惧嚱鏁帮紝涓昏鐢ㄤ簬缁樺埗**鎶樼嚎鍥?*鎴?*鏁ｇ偣鍥?*銆?

### 鍩虹鐢ㄦ硶

```python
x = np.array([1, 2, 3, 4])
y = np.array([1, 4, 9, 16])

plt.plot(x, y)
plt.show() # 鏄剧ず鍥捐〃
```

> **娉ㄦ剰**锛氬鏋滃彧浼犲叆涓€涓暟缁?`plt.plot(y)`锛孭yplot 浼氳嚜鍔ㄥ皢瀹冪殑绱㈠紩 `[0, 1, 2, 3]` 浣滀负 x 杞寸殑鍧愭爣銆?

### 鏍煎紡鍖栧瓧绗︿覆 (Fmt)

浣犲彲浠ョ敤涓€涓揩鎹峰瓧绗︿覆鏉ュ悓鏃惰缃?*鏍囪 (marker)**銆?*绾垮瀷 (line)** 鍜?**棰滆壊 (color)**锛屾牸寮忎负 `fmt = '[marker][line][color]'`銆?

```python
plt.plot(x, y, 'o:r') # 鍦嗗湀鏍囪锛岀偣绾匡紝绾㈣壊
```

- **甯哥敤鏍囪 (Marker)**: `'o'` (瀹炲績鍦?, `'.'` (鐐?, `'*'` (鏄熷彿), `'+'` (鍔犲彿), `'s'` (姝ｆ柟褰?, `'^'` (涓婁笁瑙掑舰)銆?
    
- **甯哥敤绾垮瀷 (Line)**: `'-'` (瀹炵嚎), `'--'` (铏氱嚎), `':'` (鐐圭嚎), `'-.'` (鐐瑰垝绾?銆?
    
- **甯哥敤棰滆壊 (Color)**: `'r'` (绾?, `'g'` (缁?, `'b'` (钃?, `'c'` (闈?, `'m'` (娲嬬孩), `'y'` (榛?, `'k'` (榛?, `'w'` (鐧?銆?
    

### 璇︾粏灞炴€ц缃?

闄や簡鏍煎紡鍖栧瓧绗︿覆锛屼篃鍙互鏄惧紡澹版槑灞炴€э細

```python
plt.plot(x, y, marker='o', markersize=10, markerfacecolor='r', linestyle='--', linewidth=2, color='blue')
```

---

## 3. 鏍囩銆佹爣棰樹笌缃戞牸

涓轰簡璁╁浘琛ㄦ洿鍏峰彲璇绘€э紝闇€瑕佹坊鍔犺鏄庢€х殑鏂囧瓧鍜岃緟鍔╃嚎銆?

### 杞存爣绛句笌鏍囬

```python
plt.xlabel("X杞村悕绉?, fontsize=12, color="blue")
plt.ylabel("Y杞村悕绉?)
plt.title("鍥捐〃涓绘爣棰?, loc="center") # loc 鍙€? 'left', 'center', 'right'
```

### 缃戞牸绾?`grid()`

```python
# 寮€鍚綉鏍硷紝axis='x'/'y'/'both' 鎺у埗鏂瑰悜
plt.grid(True, axis='both', color='gray', linestyle='--', linewidth=0.5)
```

---

## 4. 缁樺埗澶氬浘 (Subplot)

`subplot()` 鍑芥暟鐢ㄤ簬鍦ㄥ悓涓€绐楀彛鍐呯粯鍒跺涓瓙鍥俱€傚畠鐨勫弬鏁伴€氬父鏄笁涓暣鏁?`(nrows, ncols, index)`锛屽垎鍒唬琛ㄨ鏁般€佸垪鏁板拰褰撳墠瀛愬浘鐨勭储寮曪紙浠?寮€濮嬶級銆?

```python
# 鍒涘缓 1琛?鍒?鐨勫浘琛紝褰撳墠婵€娲荤 1 涓瓙鍥?
plt.subplot(1, 2, 1)
plt.plot(x, y)
plt.title("鍥?")

# 婵€娲荤 2 涓瓙鍥?
plt.subplot(1, 2, 2)
plt.plot(y, x)
plt.title("鍥?")

plt.show()
```

> **蹇嵎鍐欐硶**锛歚plt.subplot(121)` 绛夊悓浜?`plt.subplot(1, 2, 1)`銆?

---

## 5. 鍏朵粬甯哥敤鍥捐〃绫诲瀷

闄や簡鎶樼嚎鍥撅紝Pyplot 杩樺彲浠ラ潪甯告柟渚垮湴缁樺埗鍚勭缁熻鍥捐〃銆?

### 鏁ｇ偣鍥?`scatter()`

鐢ㄤ簬瑙傚療涓や釜鍙橀噺涔嬮棿鐨勭浉鍏虫€с€?

```python
x = np.random.rand(50)
y = np.random.rand(50)
sizes = np.random.rand(50) * 100 # 姘旀场澶у皬
colors = np.random.rand(50)      # 姘旀场棰滆壊鏄犲皠

plt.scatter(x, y, s=sizes, c=colors, alpha=0.5, cmap='viridis')
```

### 鏌辩姸鍥?`bar()` 鍜?`barh()`

鐢ㄤ簬瀵规瘮涓嶅悓绫诲埆鐨勬暟鎹€?

```python
categories = ['A', 'B', 'C', 'D']
values = [3, 8, 1, 10]

plt.bar(categories, values, color='skyblue', width=0.5) # 鍨傜洿鏌辩姸鍥?
# plt.barh(categories, values, color='orange', height=0.5) # 姘村钩鏉″舰鍥?
```

### 楗煎浘 `pie()`

鐢ㄤ簬灞曠ず閮ㄥ垎鍗犳€讳綋鐨勬瘮渚嬨€?

```python
labels = ['鑻规灉', '棣欒晧', '姗欏瓙', '钁¤悇']
sizes = [25, 30, 15, 30]
explode = (0, 0.1, 0, 0) # 绐佸嚭鏄剧ず绗簩涓垏鐗囷紙棣欒晧锛?

plt.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%', shadow=True, startangle=90)
```

### 鐩存柟鍥?`hist()`

鐢ㄤ簬灞曠ず鏁版嵁鐨勫垎甯冩儏鍐点€?

```python
data = np.random.randn(1000) # 鐢熸垚姝ｆ€佸垎甯冩暟鎹?
plt.hist(data, bins=30, facecolor='g', alpha=0.75) # bins涓烘煴瀛愮殑鏁伴噺
```



