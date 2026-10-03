---
title: "14 vector 瀹瑰櫒"
date: 2026-09-02
categories: ["笔记", "编程", "C++"]
tags: ["C++", "编程"]
sidebar: false
---
锘?--
title: "14 vector 瀹瑰櫒"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["C++", "编程"]
  - c++鍩虹
  - reference
  - cpp
  - vector
  - STL
---
# C++ vector 瀹瑰櫒

## 鏍稿績鎽樿

`std::vector` 鏄?C++ STL 鐨勫姩鎬佹暟缁勫鍣紝鍏冪礌杩炵画瀛樺偍锛屾敮鎸佷笅鏍囬殢鏈鸿闂紝骞惰兘鍦ㄨ繍琛屾椂鑷姩鎵╁銆傚畠閫傚悎鏇夸唬澶у鏁伴渶瑕佲€滃彲鍙橀暱搴︽暟缁勨€濈殑鍦烘櫙锛屽父鐢ㄦ搷浣滃寘鎷坊鍔犮€佽闂€侀亶鍘嗐€佸垹闄ゅ拰娓呯┖銆?

## 1. 鍩烘湰鐢ㄦ硶

浣跨敤 `vector` 闇€瑕佸寘鍚ご鏂囦欢 `&lt;vector&gt;`銆?

```cpp
#include <iostream>
#include <vector>

std::vector<int> nums;
```

甯歌鍒濆鍖栵細

```cpp
std::vector<int> a;             // 绌?vector
std::vector<int> b(5);          // 5 涓?int锛岄粯璁ゅ垵濮嬪寲涓?0
std::vector<int> c(5, 10);      // 5 涓?int锛屽€奸兘鏄?10
std::vector<int> d{1, 2, 3, 4}; // 鍒楄〃鍒濆鍖?
```

## 2. 娣诲姞涓庡垹闄?

```cpp
std::vector<int> nums{1, 2, 3};

nums.push_back(4);             // 鏈熬娣诲姞
nums.emplace_back(5);          // 鏈熬鍘熷湴鏋勯€犲厓绱?
nums.pop_back();               // 鍒犻櫎鏈熬鍏冪礌
nums.insert(nums.begin(), 0);   // 鍦ㄥ紑澶存彃鍏?
nums.erase(nums.begin() + 1);   // 鍒犻櫎涓嬫爣 1 鐨勫厓绱?
nums.clear();                  // 娓呯┖鎵€鏈夊厓绱?
```

| 鎿嶄綔 | 璇存槑 |
| --- | --- |
| `push_back(x)` | 鎶婂凡鏈夊厓绱犺拷鍔犲埌鏈熬 |
| `emplace_back(args...)` | 鍦ㄦ湯灏剧洿鎺ユ瀯閫犲厓绱?|
| `pop_back()` | 鍒犻櫎鏈熬鍏冪礌锛屼笉杩斿洖琚垹鍏冪礌 |
| `insert(pos, x)` | 鍦ㄨ凯浠ｅ櫒浣嶇疆鎻掑叆 |
| `erase(pos)` | 鍒犻櫎杩唬鍣ㄦ寚鍚戠殑鍏冪礌 |
| `clear()` | 娓呯┖鍏冪礌锛屽閲忎笉涓€瀹氶噴鏀?|

`emplace_back` 甯哥敤浜庣粨鏋勪綋鎴栫被瀵硅薄锛屽彲鎶婃瀯閫犲弬鏁扮洿鎺ヤ紶缁欏厓绱犵被鍨嬨€?

```cpp
struct Student {
    std::string name;
    int age;

    Student(std::string n, int a) : name(n), age(a) {}
};

std::vector<Student> students;
students.emplace_back("Tom", 18);          // 鐩存帴鏋勯€?Student
students.push_back(Student("Alice", 20));  // 鍏堟瀯閫犱复鏃跺璞★紝鍐嶈拷鍔?
```

## 3. 璁块棶鍏冪礌

```cpp
std::vector<int> nums{3, 7, 11};

int a = nums[0];      // 涓嶆鏌ヨ秺鐣?
int b = nums.at(1);   // 瓒婄晫浼氭姏鍑哄紓甯?
int c = nums.front(); // 绗竴涓厓绱?
int d = nums.back();  // 鏈€鍚庝竴涓厓绱?
```

| 鏂瑰紡 | 鐗圭偣 |
| --- | --- |
| `nums[i]` | 蹇紝浣嗚秺鐣屾槸鏈畾涔夎涓?|
| `nums.at(i)` | 浼氭鏌ヨ秺鐣?|
| `front()` | 璁块棶棣栧厓绱?|
| `back()` | 璁块棶灏惧厓绱?|

## 4. 澶у皬涓庡閲?

```cpp
std::vector<int> nums;

nums.reserve(100); // 棰勭暀瀹归噺锛屽噺灏戞墿瀹规鏁?
nums.resize(10);   // 璋冩暣鍏冪礌涓暟
```

| 鍑芥暟           | 鍚箟              |
| ------------ | --------------- |
| `size()`     | 褰撳墠鍏冪礌涓暟          |
| `empty()`    | 鏄惁涓虹┖            |
| `capacity()` | 褰撳墠宸插垎閰嶅閲?        |
| `reserve(n)` | 棰勭暀鑷冲皯 `n` 涓厓绱犵殑瀹归噺 |
| `resize(n)`  | 鏀瑰彉瀹為檯鍏冪礌涓暟        |

## 5. 閬嶅巻

鑼冨洿 `for` 鏈€甯哥敤锛涢渶瑕佷慨鏀瑰厓绱犳椂浣跨敤寮曠敤銆?

```cpp
std::vector<int> nums{1, 2, 3};

for (int x : nums) {
    std::cout << x << " ";
}

for (int& x : nums) {
    x *= 2;
}
```

涔熷彲浠ヤ娇鐢ㄨ凯浠ｅ櫒锛?

```cpp
for (auto it = nums.begin(); it != nums.end(); ++it) {
    std::cout << *it << " ";
}
```

## 6. 浜岀淮 vector

浜岀淮 `vector` 甯哥敤浜庣煩闃垫垨琛ㄦ牸鏁版嵁銆?

```cpp
std::vector<std::vector<int>> matrix(3, std::vector<int>(4, 0));

matrix[0][1] = 5;
```

鍚箟锛氬垱寤?`3` 琛?`4` 鍒楃殑鏁存暟鐭╅樀锛屾墍鏈夊厓绱犲垵濮嬩负 `0`銆?

## 7. 甯歌鏄撻敊鐐?

- 浣跨敤 `nums[i]` 鍓嶆湭纭涓嬫爣鑼冨洿銆?
- 瀵圭┖ `vector` 璋冪敤 `front()`銆乣back()` 鎴?`pop_back()`銆?
- 娣锋穯 `size()` 鍜?`capacity()`锛氬墠鑰呮槸鍏冪礌涓暟锛屽悗鑰呮槸宸插垎閰嶇┖闂淬€?
- 鍦ㄥ惊鐜腑棰戠箒 `insert` 鎴?`erase` 涓棿鍏冪礌锛屾晥鐜囪緝浣庛€?
- `push_back`銆乣emplace_back`銆乣insert`銆乣erase` 鍙兘瀵艰嚧杩唬鍣ㄣ€佹寚閽堟垨寮曠敤澶辨晥銆?



