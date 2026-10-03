---
title: "01 JSON"
date: 2026-09-02
categories: ["笔记", "编程", "Python"]
tags: ["Python", "编程"]
sidebar: false
---
锘?--
title: "01 JSON.md"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["Python", "编程"]
  - python杩涢樁
  - reference
  - python
  - json
  - 鏁版嵁搴忓垪鍖?
---
# Python JSON

## 鏍稿績鎽樿

鏈瘒鐢ㄤ簬鏌ラ槄 Python 涓?JSON 鏁版嵁鐨勫簭鍒楀寲鍜屽弽搴忓垪鍖栵紝鍖呮嫭鏁版嵁绫诲瀷鏄犲皠銆乣dumps()` / `loads()`銆乣dump()` / `load()` 浠ュ強鏍煎紡鍖栬緭鍑恒€?

## 1. Python 涓?JSON 鏁版嵁绫诲瀷鏄犲皠

鍦ㄨ繘琛屾暟鎹浆鎹㈠墠锛屽繀椤讳簡瑙?Python 鏁版嵁绫诲瀷鍜?JSON 鏁版嵁绫诲瀷涔嬮棿鐨勫搴斿叧绯汇€傝繖鏄В鏋愭垚鍔熺殑鍩虹銆?

|**Python 鏁版嵁绫诲瀷**|**JSON 鏁版嵁绫诲瀷**|
|---|---|
|`dict` (瀛楀吀)|`object` (瀵硅薄锛屽嵆 `{}`)|
|`list`, `tuple` (鍒楄〃锛屽厓缁?|`array` (鏁扮粍锛屽嵆 `[]`)|
|`str` (瀛楃涓?|`string` (瀛楃涓?|
|`int`, `float` (鏁存暟锛屾诞鐐规暟)|`number` (鏁板瓧)|
|`True` / `False` (甯冨皵鍊?|`true` / `false`|
|`None` (绌哄€?|`null`|

## 2. 鍐呭瓨涓殑杞崲锛歚dumps()` 涓?`loads()`

杩欎袱涓柟娉曠敤浜庡湪**Python 瀵硅薄锛堥€氬父鏄瓧鍏革級**鍜?*JSON 瀛楃涓?*涔嬮棿杩涜杞崲銆傚甫鏈?`s` 鍚庣紑浠ｈ〃鎿嶄綔鐨勬槸 String锛堝瓧绗︿覆锛夈€?

- **`json.dumps(obj)`**: 灏?Python 瀵硅薄缂栫爜鎴?JSON 瀛楃涓诧紙搴忓垪鍖栵級銆?
    
- **`json.loads(s)`**: 灏?JSON 瀛楃涓茶В鐮佷负 Python 瀵硅薄锛堝弽搴忓垪鍖栵級銆?
    

**浠ｇ爜绀轰緥涓庨槻鍧戞寚鍗楋細**

```python
import json

python_dict = {
    "name": "寮犱笁",
    "age": 30,
    "is_student": False,
    "skills": ["Python", "Data Analysis"],
    "car": None
}

# 1. Python 杞?JSON 瀛楃涓?(dumps)
# 鍧戯細濡傛灉涓嶅姞 ensure_ascii=False锛屼腑鏂囦細琚浆涔夋垚 \uXXXX 鏍煎紡鐨?ASCII 瀛楃
json_str = json.dumps(python_dict, ensure_ascii=False)
print("杞崲鍚庣殑 JSON 瀛楃涓?")
print(json_str)
print(type(json_str)) # 杈撳嚭: <class 'str'>

# 2. JSON 瀛楃涓茶浆 Python 瀛楀吀 (loads)
parsed_dict = json.loads(json_str)
print("\n瑙ｆ瀽鍥炴潵鐨?Python 瀛楀吀:")
print(parsed_dict["name"]) # 杈撳嚭: 寮犱笁
print(type(parsed_dict))   # 杈撳嚭: <class 'dict'>
```

## 3. 鏂囦欢璇诲啓杞崲锛歚dump()` 涓?`load()`

杩欎袱涓柟娉曠敤浜庣洿鎺ュ湪**Python 瀵硅薄**鍜?*JSON 鏂囦欢**涔嬮棿杩涜璇诲啓銆傚畠浠笉闇€瑕佸甫鏈?`s` 鍚庣紑銆?

- **`json.dump(obj, fp)`**: 灏?Python 瀵硅薄鍐欏叆鍒?JSON 鏂囦欢涓€?
    
- **`json.load(fp)`**: 浠?JSON 鏂囦欢涓鍙栧苟瑙ｆ瀽涓?Python 瀵硅薄銆?
    

**浠ｇ爜绀轰緥锛?*

```python
import json

data = {"city": "鍖椾含", "temperature": 25.5}

# 1. 灏嗘暟鎹啓鍏?JSON 鏂囦欢 (dump)
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
    print("鏁版嵁宸叉垚鍔熷啓鍏?data.json 鏂囦欢")

# 2. 浠?JSON 鏂囦欢涓鍙栨暟鎹?(load)
with open("data.json", "r", encoding="utf-8") as f:
    loaded_data = json.load(f)
    print("\n浠庢枃浠朵腑璇诲彇鐨勬暟鎹?")
    print(loaded_data)
```

## 4. 鏍煎紡鍖栬緭鍑?(缇庡寲 JSON)

鍦ㄦ墦鍗版垨淇濆瓨 JSON 鏁版嵁鏃讹紝榛樿杈撳嚭鏄竴鏁磋绱у噾鐨勫瓧绗︿覆锛岄潪甯搁毦浠ラ槄璇汇€傛垜浠彲浠ラ€氳繃 `dumps()` 鎴?`dump()` 鐨勫弬鏁版潵杩涜缇庡寲鎺掔増銆?

**鏍稿績缇庡寲鍙傛暟锛?*

- **`indent`**: 璁剧疆缂╄繘鐨勭┖鏍兼暟锛堥€氬父璁剧疆涓?4锛夛紝璁╃粨鏋勫眰绾ф洿娓呮櫚銆?
    
- **`sort_keys`**: 璁剧疆涓?`True` 鏃讹紝浼氭寜鐓у瓧鍏哥殑閿紙Key锛夎繘琛屽瓧姣嶆帓搴忋€?
    
- **`separators`**: 鐢ㄤ簬鎺у埗鍒嗛殧绗︼紝榛樿鏄?`(', ', ': ')`銆備负浜嗘瀬鑷村帇缂╀綋绉紝鍙互鍘绘帀鍚庨潰鐨勭┖鏍艰涓?`(',', ':')`銆?
    

**浠ｇ爜绀轰緥锛?*

```python
import json

data = {"b": 2, "a": 1, "c": 3}

# 浣跨敤 indent 缂╄繘锛屽苟鎸夐敭鎺掑簭
pretty_json = json.dumps(data, indent=4, sort_keys=True)
print(pretty_json)
```

**杈撳嚭缁撴灉锛?*

```json
{
    "a": 1,
    "b": 2,
    "c": 3
}
```



