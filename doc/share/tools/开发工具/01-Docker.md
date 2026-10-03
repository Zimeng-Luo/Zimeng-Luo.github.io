---
title: "01 Docker"
date: 2026-09-02
categories: ["分享", "工具", "开发工具"]
tags: ["开发工具", "工具"]
sidebar: false
---
锘?--
title: "01 Docker"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["开发工具", "工具"]
  - docker
  - reference
  - 寮€鍙戝伐鍏?
  - 鎿嶄綔绯荤粺
  - 瀹瑰櫒
  - 鎿嶄綔鍩虹
---
# Docker 鍩虹

## 鏍稿績鎽樿

鏈瘒鐢ㄤ簬鏌ラ槄 Docker 鐨勬渶灏忎娇鐢ㄦ祦绋嬶紝鍖呮嫭闀滃儚銆佸鍣ㄣ€佹媺鍙栭暅鍍忋€佽繍琛屽鍣ㄣ€佹煡鐪嬪鍣ㄣ€佽繘鍏ュ鍣ㄣ€佺洰褰曟寕杞藉拰甯歌鏄撻敊鐐广€?

## 1. 鏈€灏忓績鏅烘ā鍨?

鍏堣浣忎袱涓牳蹇冩蹇碉細

- 闀滃儚 `image`锛氫竴涓彲澶嶇敤鐨勭幆澧冩ā鏉裤€?
- 瀹瑰櫒 `container`锛氶暅鍍忓惎鍔ㄥ悗瀹為檯杩愯鐨勮繘绋嬪疄渚嬨€?

鍙互鍏堟妸瀹冪悊瑙ｆ垚锛?

- 闀滃儚鍍忊€滄ā鍏封€濄€?
- 瀹瑰櫒鍍忊€滄寜妯″叿鍚姩鍑烘潵鐨勮繍琛屽疄渚嬧€濄€?

## 2. Docker 鍦ㄥ涔犻樁娈电殑涓昏浠峰€?

- 蹇€熷鐜板埆浜虹殑鐜銆?
- 鍑忓皯鈥滄垜杩欓噷鑳借窇銆佷綘閭ｉ噷涓嶈兘璺戔€濈殑闂銆?
- 涓嶆妸鏈満 Python 鐜瓒婅瓒婁贡銆?

## 3. 瀹夎鍚庣殑绗竴妫€鏌?

瀹夎 Docker 鍚庡厛妫€鏌ワ細

```bash
docker --version
docker version
docker info
```

濡傛灉杩欎簺鍛戒护鑳芥甯歌繑鍥烇紝璇存槑 Docker 鍩烘湰鍙敤銆?

## 4. `docker pull`

浣滅敤锛氫粠闀滃儚浠撳簱鎷夊彇闀滃儚銆?

```bash
docker pull ubuntu:22.04
docker pull pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime
```

浣犲彧瑕佸厛璁颁綇锛?

- 鍓嶅崐娈垫槸闀滃儚鍚嶃€?
- 鍚庡崐娈靛啋鍙峰悗闈㈤€氬父鏄爣绛?`tag`銆?

## 5. `docker run`

浣滅敤锛氬惎鍔ㄤ竴涓鍣ㄣ€?

鏈€灏忎緥瀛愶細

```bash
docker run -it ubuntu:22.04 bash
```

甯歌鍙傛暟锛?

- `-i`锛氫繚鎸佹爣鍑嗚緭鍏ユ墦寮€銆?
- `-t`锛氬垎閰嶄竴涓粓绔€?
- `--rm`锛氶€€鍑哄悗鑷姩鍒犻櫎瀹瑰櫒銆?
- `--name`锛氱粰瀹瑰櫒璧峰悕瀛椼€?

渚嬪锛?

```bash
docker run --rm -it --name my-ubuntu ubuntu:22.04 bash
```

## 6. `docker ps`

浣滅敤锛氭煡鐪嬫鍦ㄨ繍琛岀殑瀹瑰櫒銆?

```bash
docker ps
docker ps -a
```

鍖哄垎锛?

- `docker ps`锛氬彧鐪嬫鍦ㄨ繍琛岀殑瀹瑰櫒銆?
- `docker ps -a`锛氱湅鎵€鏈夊鍣紝鍖呮嫭宸茬粡閫€鍑虹殑銆?

## 7. `docker exec`

浣滅敤锛氳繘鍏ュ凡缁忓湪杩愯涓殑瀹瑰櫒锛屾垨鍦ㄥ叾涓墽琛屽懡浠ゃ€?

```bash
docker exec -it my-ubuntu bash
docker exec my-ubuntu ls /workspace
```

閫傜敤鍦烘櫙锛?

- 瀹瑰櫒宸茬粡鍦ㄥ悗鍙拌窇鐫€銆?
- 浣犳兂杩涘幓鐪嬫枃浠躲€佹煡鏃ュ織銆佽ˉ鎵ц鍛戒护銆?

## 8. 鎸傝浇鏈湴鐩綍鍒板鍣?

杩欐槸瀛︿範闃舵闈炲父閲嶈鐨勪竴姝ャ€? 
濡傛灉涓嶆寕杞斤紝鏈湴鏀圭殑浠ｇ爜涓嶄細鑷姩鍑虹幇鍦ㄥ鍣ㄩ噷銆?

Linux / macOS 甯歌鍐欐硶锛?

```bash
docker run --rm -it -v $(pwd):/workspace ubuntu:22.04 bash
```

PowerShell 甯歌鍐欐硶锛?

```powershell
docker run --rm -it -v ${PWD}:/workspace ubuntu:22.04 bash
```

鍚箟鏄細

- 鎶婂綋鍓嶆湰鍦扮洰褰曟寕杞藉埌瀹瑰櫒閲岀殑 `/workspace`
- 杩欐牱浣犲湪鏈湴缂栬緫浠ｇ爜锛屽鍣ㄩ噷鑳界洿鎺ョ湅鍒?

## 9. 鍦ㄥ鍣ㄩ噷璺戜竴涓渶灏?PyTorch 绋嬪簭

濡傛灉浣犲彧鎯冲厛璺戦€氫竴涓渶灏忕ず渚嬶紝鍙互鐩存帴浣跨敤 PyTorch 瀹樻柟闀滃儚鎬濊矾锛?

```bash
docker run --rm -it pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime python -c "import torch; print(torch.__version__)"
```

濡傛灉瑕佷娇鐢ㄦ湰鏈?GPU锛屽父瑙佸啓娉曟槸锛?

```bash
docker run --rm -it --gpus all pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime python -c "import torch; print(torch.cuda.is_available())"
```

濡傛灉瑕佹妸褰撳墠椤圭洰鐩綍鎸傝繘鍘讳竴璧疯窇锛?

Linux / macOS锛?

```bash
docker run --rm -it --gpus all -v $(pwd):/workspace -w /workspace pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime python demo.py
```

PowerShell锛?

```powershell
docker run --rm -it --gpus all -v ${PWD}:/workspace -w /workspace pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime python demo.py
```

鍏朵腑锛?

- `-v 鏈湴鐩綍:/workspace`锛氭寕杞戒唬鐮佺洰褰?
- `-w /workspace`锛氭妸瀹瑰櫒鍐呭伐浣滅洰褰曞垏鍒?`/workspace`
- `--gpus all`锛氭妸鍙敤 GPU 鏆撮湶缁欏鍣?

## 10. Docker 閲屾渶瀹规槗閿欑殑鐐?

- 鍒嗕笉娓呴暅鍍忓拰瀹瑰櫒銆?
- 浠ヤ负閫€鍑哄鍣ㄥ氨绛変簬鍒犻櫎闀滃儚銆?
- 娌℃寕杞芥湰鍦扮洰褰曪紝缁撴灉瀹瑰櫒閲屾敼鐨勫唴瀹规壘涓嶅埌銆?
- 瀹瑰櫒閲岃矾寰勫拰鏈湴璺緞娣锋穯銆?
- 鎯崇敤 GPU锛屽嵈蹇樹簡鍔?`--gpus all`銆?
- 鎶婂鍣ㄥ綋铏氭嫙鏈虹敤锛屼粈涔堥兘鎵嬪伐瑁咃紝浣嗕笉璁板綍杩囩▼銆?



