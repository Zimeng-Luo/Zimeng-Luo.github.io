---
title: "02 鎴愬憳鍑芥暟銆乼his鎸囬拡涓庡璞℃寚閽?"
date: 2026-09-02
categories: ["笔记", "编程", "C++"]
tags: ["C++", "编程"]
sidebar: false
---
锘?--
title: "02 鎴愬憳鍑芥暟銆乼his鎸囬拡涓庡璞℃寚閽?"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["C++", "编程"]
  - c++闈㈠悜瀵硅薄
  - reference
  - cpp
  - member-function
  - pointer
---
# C++ 鎴愬憳鍑芥暟銆乼his 鎸囬拡涓庡璞℃寚閽?

## 鏍稿績鎽樿

鎴愬憳鍑芥暟璐熻矗鎿嶄綔瀵硅薄鐘舵€侊紝璋冪敤鏃朵細闅愬紡缁戝畾鍒版煇涓璞°€俙this` 鎸囬拡鎸囧悜褰撳墠瀵硅薄锛涘璞℃寚閽堜繚瀛樺璞″湴鍧€锛屽苟鐢?`->` 璁块棶鎴愬憳銆?

## 鎴愬憳鍑芥暟

| 姒傚康 | 璇存槑 |
| --- | --- |
| 绫诲唴瀹氫箟 | 鍐欏湪绫诲畾涔夊唴閮紝閫氬父鏄唴鑱斿€欓€?|
| 绫诲瀹氫箟 | 鍦ㄧ被涓０鏄庯紝鍦ㄧ被澶栫敤 `绫诲悕::鍑芥暟鍚峘 瀹氫箟 |
| `const` 鎴愬憳鍑芥暟 | 鎵胯涓嶄慨鏀瑰綋鍓嶅璞＄姸鎬?|
| 璋冪敤鏂瑰紡 | 瀵硅薄鐢?`.`锛屽璞℃寚閽堢敤 `->` |

```cpp
class Box {
private:
    double length = 0.0;

public:
    void setLength(double len);
    double getLength() const {
        return length;
    }
};

void Box::setLength(double len) {
    if (len > 0) {
        length = len;
    }
}
```

`Box::setLength` 涓殑 `::` 鏄綔鐢ㄥ煙瑙ｆ瀽杩愮畻绗︼紝琛ㄧず璇ュ嚱鏁板睘浜?`Box` 绫汇€?

## this 鎸囬拡

`this` 鏄垚鍛樺嚱鏁颁腑闅愬紡瀛樺湪鐨勬寚閽堬紝鎸囧悜褰撳墠璋冪敤璇ュ嚱鏁扮殑瀵硅薄銆?

```cpp
class MyClass {
private:
    int value = 0;

public:
    void setValue(int value) {
        this->value = value;
    }

    MyClass& add(int n) {
        value += n;
        return *this;
    }
};
```

| 鐢ㄦ硶                   | 璇存槑               |
| -------------------- | ---------------- |
| `this->member`       | 璁块棶褰撳墠瀵硅薄鎴愬憳         |
| `this->member = ...` | 娑堥櫎鍙傛暟鍚嶅拰鎴愬憳鍚嶅啿绐?     |
| `return *this;`      | 杩斿洖褰撳墠瀵硅薄锛屾敮鎸侀摼寮忚皟鐢?   |
| 鍙嬪厓鍑芥暟                 | 涓嶆槸鎴愬憳鍑芥暟锛屾病鏈?`this` |
| 闈欐€佹垚鍛樺嚱鏁?              | 灞炰簬绫绘湰韬紝娌℃湁 `this`  |

## 瀵硅薄鎸囬拡

瀵硅薄鎸囬拡淇濆瓨绫诲璞″湴鍧€锛屽彲閫氳繃 `->` 璁块棶鎴愬憳銆?

```cpp
Box box;
Box* ptr = &box;
ptr->setLength(10.0);
```

鍔ㄦ€佸垱寤哄璞℃椂锛宍new` 杩斿洖瀵硅薄鎸囬拡锛宍delete` 閲婃斁瀵硅薄銆?

```cpp
Box* ptr = new Box();
ptr->setLength(10.0);
delete ptr;
```

| 瑕佺偣 | 璇存槑 |
| --- | --- |
| 绌烘寚閽?| 浣跨敤鍓嶇‘璁や笉鏄?`nullptr` |
| 鍐呭瓨绠＄悊 | `new` 鍒涘缓鐨勫璞¤瀵瑰簲 `delete` |
| 涓?`this` 鍖哄埆 | 瀵硅薄鎸囬拡鐢变唬鐮佹樉寮忎繚瀛橈紝`this` 鐢辨垚鍛樺嚱鏁伴殣寮忚幏寰?|

## 鍐呰仈鍑芥暟

`inline` 鎻愮ず缂栬瘧鍣ㄥ彲鍦ㄨ皟鐢ㄧ偣灞曞紑鍑芥暟浣擄紝甯哥敤浜庣煭灏忋€侀绻佽皟鐢ㄧ殑鍑芥暟銆傜被鍐呭畾涔夌殑鎴愬憳鍑芥暟閫氬父涔熸槸鍐呰仈鍊欓€夈€?

```cpp
inline int maxValue(int x, int y) {
    return x > y ? x : y;
}
```

| 娉ㄦ剰 | 璇存槑 |
| --- | --- |
| 涓嶆槸寮哄埗 | 缂栬瘧鍣ㄥ彲浠ュ拷鐣?`inline` |
| 瀹氫箟鍙 | 閫氬父鎶婂唴鑱斿嚱鏁板畾涔夋斁鍦ㄥご鏂囦欢 |
| 閬垮厤婊ョ敤 | 澶嶆潅鍑芥暟銆侀€掑綊鍑芥暟閫氬父涓嶉€傚悎鍐呰仈 |



