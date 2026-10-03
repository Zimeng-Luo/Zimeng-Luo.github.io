---
title: "02 cmake涓巊++"
date: 2026-09-02
categories: ["笔记", "编程", "C++"]
tags: ["C++", "编程"]
sidebar: false
---
锘?--
title: "02 cmake涓巊++"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["C++", "编程"]
  - c++鍩虹
  - reference
  - cmake
  - 鏋勫缓绯荤粺
  - gcc鍛戒护
---
# CMake 涓?g++

## 鏍稿績鎽樿

`g++` 璐熻矗缂栬瘧锛孋Make 璐熻矗缁勭粐鏋勫缓銆傝繖閲屾妸涓よ€呮斁鍦ㄤ竴璧凤紝鎸夆€滅洿鎺ョ紪璇?-> CMake 鏋勫缓 -> 澶氭枃浠堕」鐩?-> include 鐩綍 -> 甯哥敤閫夐」鈥濇潵鏌ユ渶鐪佷簨銆?

## 1. g++ 閫熸煡

鏌ョ湅鐗堟湰锛?

```powershell
g++ -v
```

鏈€绠€鍗曠殑缂栬瘧锛?

```powershell
g++ helloworld.cpp
./a.out
```

鎸囧畾杈撳嚭鍚嶏細

```powershell
g++ helloworld.cpp -o helloworld
./helloworld
```

澶氭枃浠剁紪璇戯細

```powershell
g++ runoob1.cpp runoob2.cpp -o runoob
```

甯﹁皟璇曚俊鎭拰甯哥敤璀﹀憡锛?

```powershell
g++ -g -Wall -std=c++11 main.cpp
```

濡傛灉鐢?`gcc` 缂?C++锛岄€氬父闇€瑕佹墜鍔ㄩ摼鎺ユ爣鍑嗗簱锛?

```powershell
gcc main.cpp -lstdc++ -o main
```

甯哥敤閫夐」锛?

- `-c` 鍙紪璇戯紝涓嶉摼鎺?
- `-o FILE` 鎸囧畾杈撳嚭鏂囦欢
- `-I DIR` 娣诲姞澶存枃浠舵悳绱㈣矾寰?
- `-L DIR` 娣诲姞搴撴悳绱㈣矾寰?
- `-l LIB` 閾炬帴鎸囧畾搴?
- `-g` 鐢熸垚璋冭瘯淇℃伅
- `-O0/-O2/-O3` 鎺у埗浼樺寲绾у埆
- `-std=c++11` 鎸囧畾璇█鏍囧噯

## 2. CMake 鍦ㄥ仛浠€涔?

CMake 涓嶆槸缂栬瘧鍣ㄣ€傚畠鏍规嵁 `CMakeLists.txt` 鐢熸垚鏋勫缓瑙勫垯锛屽啀浜ょ粰 `g++`銆乣clang++` 鎴?MSVC 鍘荤湡姝ｇ紪璇戙€?

```text
C++ 婧愮爜
  -> CMakeLists.txt
  -> CMake 鐢熸垚鏋勫缓绯荤粺
  -> Ninja / Make / Visual Studio
  -> 缂栬瘧鍣?
  -> 鍙墽琛屾枃浠?/ 搴?
```

## 3. 鏈€灏?CMake 椤圭洰

```text
hello_cmake/
鈹溾攢鈹€ CMakeLists.txt
鈹斺攢鈹€ main.cpp
```

`CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.20)
project(hello_cmake)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
add_executable(hello main.cpp)
```

鏋勫缓鍜岃繍琛岋細

```powershell
mkdir build
cd build
cmake .. -G Ninja
cmake --build .
.\hello.exe
```

## 4. 澶氭枃浠堕」鐩?

```text
my_project/
鈹溾攢鈹€ CMakeLists.txt
鈹溾攢鈹€ main.cpp
鈹溾攢鈹€ math_utils.cpp
鈹斺攢鈹€ math_utils.h
```

`CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.20)
project(my_project)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
add_executable(my_app
    main.cpp
    math_utils.cpp
)
```

鍙妸鍙備笌缂栬瘧鐨?`.cpp` 鍐欒繘 `add_executable`銆?

## 5. include 鐩綍

```text
my_project/
鈹溾攢鈹€ CMakeLists.txt
鈹溾攢鈹€ include/
鈹?  鈹斺攢鈹€ math_utils.h
鈹斺攢鈹€ src/
    鈹溾攢鈹€ main.cpp
    鈹斺攢鈹€ math_utils.cpp
```

`CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.20)
project(my_project)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
add_executable(my_app
    src/main.cpp
    src/math_utils.cpp
)
target_include_directories(my_app PRIVATE include)
```

`target_include_directories` 鐢ㄦ潵鍛婅瘔缂栬瘧鍣ㄥ幓鍝噷鎵惧ご鏂囦欢銆?

## 6. Debug 涓?Release

```powershell
cmake .. -G Ninja -DCMAKE_BUILD_TYPE=Debug
cmake --build .
```

```powershell
cmake .. -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build .
```

- Debug: 渚夸簬璋冭瘯
- Release: 寮€鍚紭鍖栵紝杩愯鏇村揩

## 7. 甯哥敤閫熸煡

```powershell
cmake -S . -B build-ucrt -G "MinGW Makefiles" `
  -DCMAKE_C_COMPILER=D:/msys2/ucrt64/bin/gcc.exe `
  -DCMAKE_CXX_COMPILER=D:/msys2/ucrt64/bin/g++.exe `
  -DCMAKE_MAKE_PROGRAM=D:/msys2/ucrt64/bin/mingw32-make.exe
cmake --build build-ucrt
```

```powershell
Remove-Item -Recurse -Force build
mkdir build
cd build
cmake .. -G Ninja
cmake --build .
```



