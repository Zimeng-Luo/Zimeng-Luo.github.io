---
title: "03 numpy鍩虹"
date: 2026-09-02
categories: ["笔记", "编程", "Python"]
tags: ["Python", "编程"]
sidebar: false
---
锘?--
title: "03 numpy鍩虹.md"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["Python", "编程"]
  - python搴?
  - reference
  - python
  - numpy
  - 鏁扮粍
---
# NumPy 鍩虹

## 鏍稿績鎽樿

鏈瘒鐢ㄤ簬鏌ラ槄 NumPy 鐨勬牳蹇冩暟鎹粨鏋?`ndarray`銆佸父瑙佹暟鎹被鍨嬪拰鏁扮粍灞炴€с€傞噸鐐圭悊瑙ｆ暟缁勭淮搴︺€佸舰鐘躲€佸厓绱犳暟閲忋€佹暟鎹被鍨嬪拰鍗曞厓绱犲唴瀛樺崰鐢ㄣ€?

## 1. NumPy Ndarray 瀵硅薄

`ndarray`锛圢-dimensional array锛夋槸 NumPy 涓渶鏍稿績鐨勬暟鎹粨鏋勶紝瀹冩槸涓€涓?*鍚屾瀯鐨勫缁存暟缁?*銆傝繖鎰忓懗鐫€鏁扮粍涓殑鎵€鏈夊厓绱犻兘蹇呴』鏄悓涓€绉嶆暟鎹被鍨嬶紙閫氬父鏄暟瀛楋級锛岃繖浣垮緱瀹冨湪鍐呭瓨涓繛缁垎甯冿紝璁＄畻鏁堢巼杩滆秴 Python 鍘熺敓鐨勫垪琛紙List锛夈€?

**鏍稿績鍒涘缓鍑芥暟锛歚np.array()`**

```python
numpy.array(object, dtype=None, copy=True, order='K', subok=False, ndmin=0)
```

**甯哥敤鍙傛暟瑙ｆ瀽锛?*

- **`object`**: 浠讳綍鏆撮湶鏁扮粍鎺ュ彛鐨勫璞★紙濡?List銆乀uple 绛夛級銆?
    
- **`dtype`**: 寮哄埗鎸囧畾鏁扮粍鐨勬暟鎹被鍨嬶紙鍙€夛級銆?
    
- **`ndmin`**: 鎸囧畾鐢熸垚鏁扮粍鐨勬渶灏忕淮搴︼紙甯哥敤浜庡皢涓€缁存暟鎹己鍒惰浆涓轰簩缁存垨澶氱淮锛夈€?
    

**浠ｇ爜绀轰緥锛?*

```python
import numpy as np

# 1. 浠庡垪琛ㄥ垱寤轰竴缁存暟缁?
arr1 = np.array([1, 2, 3])
print(arr1)

# 2. 浠庡祵濂楀垪琛ㄥ垱寤轰簩缁存暟缁?
arr2 = np.array([[1, 2], [3, 4]])
print(arr2)

# 3. 浣跨敤 ndmin 寮哄埗鎸囧畾鏈€灏忕淮搴︼紙渚嬪灏嗕竴缁村垪琛ㄨ浆涓轰簩缁存暟缁勶級
arr3 = np.array([1, 2, 3], ndmin=2)
print(arr3)  # 杈撳嚭: [[1 2 3]]
```

## 2. NumPy 鏁版嵁绫诲瀷 (Data Types)

涓轰簡鏇寸簿缁嗗湴鎺у埗鍐呭瓨骞舵彁鍗囪绠楁€ц兘锛孨umPy 鎻愪緵浜嗘瘮 Python 鍘熺敓绫诲瀷锛坄int`, `float`锛変赴瀵屽緱澶氱殑鏁版嵁绫诲瀷锛堝 8浣嶃€?6浣嶃€?2浣嶃€?4浣嶇殑鏁存暟鎴栨诞鐐规暟锛夈€?

**甯哥敤鏁版嵁绫诲瀷锛?*

- **甯冨皵鍨?*: `bool_`
    
- **鏁村瀷**: `int8`, `int16`, `int32`, `int64` (鏃犵鍙锋暣鍨嬪姞 `u`鍓嶇紑锛屽 `uint8`)
    
- **娴偣鍨?*: `float16`, `float32`, `float64`
    
- **澶嶆暟鍨?*: `complex64`, `complex128`
    

**鏁版嵁绫诲瀷瀵硅薄 (dtype)锛?*

姣忎釜 `ndarray` 閮芥湁涓€涓叧鑱旂殑 `dtype` 瀵硅薄銆備綘鍙互鍦ㄥ垱寤烘暟缁勬椂鏄惧紡鎸囧畾瀹冿紝涔熷彲浠ョ敤瀹冩潵瀹氫箟缁撴瀯鍖栨暟鎹€?

**浠ｇ爜绀轰緥锛?*

```python
import numpy as np

# 1. 鍒涘缓鏁扮粍鏃舵樉寮忔寚瀹氭暟鎹被鍨嬩负 32 浣嶆诞鐐规暟
arr_float = np.array([1, 2, 3], dtype=np.float32)
print(arr_float)      # 杈撳嚭: [1. 2. 3.]
print(arr_float.dtype) # 杈撳嚭: float32

# 2. 绫诲瀷绠€鍐欙紙'i1'浠ｈ〃int8, 'i4'浠ｈ〃int32, 'f4'浠ｈ〃float32锛?
arr_int = np.array([1, 2, 3], dtype='i1') 
print(arr_int.dtype)   # 杈撳嚭: int8
```

## 3. NumPy 鏁扮粍灞炴€?(Array Attributes)

浜嗚В鏁扮粍鐨勫睘鎬э紝鍙互甯姪鎴戜滑蹇€熸帉鎻＄煩闃电殑褰㈢姸鍜屾暟鎹噺銆傝繖涔熸槸鍦ㄨ繘琛屾暟缁勫舰鐘跺彉鎹紙濡?`reshape`锛変箣鍓嶅繀椤昏妫€鏌ョ殑淇℃伅銆?

**鏍稿績灞炴€у垪琛細**

- **`ndarray.ndim`**: 绉╋紝鍗宠酱鐨勬暟閲忥紙缁村害鏁帮級銆備竴缁存暟缁勭З涓?锛屼簩缁存暟缁勶紙鐭╅樀锛夌З涓?銆?
    
- **`ndarray.shape`**: 鏁扮粍鐨勭淮搴︼紝杩斿洖涓€涓厓缁勩€備緥濡傚浜?`n` 琛?`m` 鍒楃殑鐭╅樀锛宍shape` 涓?`(n, m)`銆?
    
- **`ndarray.size`**: 鏁扮粍鍏冪礌鐨勬€讳釜鏁帮紝绛変簬 `shape` 灞炴€т腑鍚勪釜鍏冪粍鍏冪礌鐨勪箻绉€?
    
- **`ndarray.dtype`**: 鏁扮粍涓厓绱犵殑鏁版嵁绫诲瀷銆?
    
- **`ndarray.itemsize`**: 鏁扮粍涓瘡涓厓绱犲崰鐢ㄥ唴瀛樼殑澶у皬锛屼互瀛楄妭锛圔yte锛変负鍗曚綅锛堜緥濡?`int8` 涓?1锛宍float64` 涓?8锛夈€?
    

**浠ｇ爜绀轰緥锛?*

```python
import numpy as np

# 鍒涘缓涓€涓?2 琛?3 鍒楃殑浜岀淮鏁扮粍锛岀被鍨嬩负 int32 (鍗犵敤 4 瀛楄妭)
arr = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.int32)

print(f"鏁扮粍鍐呭:\n{arr}")
print(f"缁村害鏁?(ndim): {arr.ndim}")          # 杈撳嚭: 2
print(f"鏁扮粍褰㈢姸 (shape): {arr.shape}")        # 杈撳嚭: (2, 3)
print(f"鍏冪礌鎬绘暟 (size): {arr.size}")          # 杈撳嚭: 6
print(f"鏁版嵁绫诲瀷 (dtype): {arr.dtype}")        # 杈撳嚭: int32
print(f"鍗曞厓绱犲瓧鑺傚ぇ灏?(itemsize): {arr.itemsize}") # 杈撳嚭: 4
```



