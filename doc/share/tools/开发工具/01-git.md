---
title: "01 git"
date: 2026-09-02
categories: ["分享", "工具", "开发工具"]
tags: ["开发工具", "工具"]
sidebar: false
---
锘?--
title: "01 git"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["开发工具", "工具"]
  - git
  - reference
  - 寮€鍙戝伐鍏?
  - 鎿嶄綔绯荤粺
  - Git
  - 鐗堟湰鎺у埗
  - 鎿嶄綔鍩虹
---
# Git 鍩虹

## 鏍稿績鎽樿

Git 鏄垎甯冨紡鐗堟湰鎺у埗宸ュ叿锛岀敤浜庤褰曟枃浠跺彉鏇淬€佸洖閫€鍘嗗彶銆佸崗浣滃紑鍙戙€傛棩甯告渶灏忔祦绋嬫槸锛歚status` 鏌ョ湅鐘舵€侊紝`add` 鍔犲叆鏆傚瓨鍖猴紝`commit` 鐢熸垚鐗堟湰蹇収锛宍pull` / `push` 涓庤繙绋嬩粨搴撳悓姝ャ€?

## 1. 鍩烘湰姒傚康

| 姒傚康 | 浣滅敤 |
| --- | --- |
| 宸ヤ綔鍖?`working tree` | 褰撳墠姝ｅ湪缂栬緫鐨勬枃浠?|
| 鏆傚瓨鍖?`staging area` | 鍑嗗杩涘叆涓嬩竴娆℃彁浜ょ殑鍙樻洿 |
| 鏈湴浠撳簱 `repository` | 淇濆瓨鎻愪氦鍘嗗彶鐨?`.git` 鏁版嵁搴?|
| 杩滅▼浠撳簱 `remote` | GitHub銆丟itLab 绛夋湇鍔″櫒涓婄殑浠撳簱 |
| 鎻愪氦 `commit` | 涓€娆″甫璇存槑鐨勫巻鍙插揩鐓?|
| 鍒嗘敮 `branch` | 涓€鏉＄嫭绔嬪紑鍙戠嚎 |

鍩烘湰閾捐矾锛?

```bash
淇敼鏂囦欢 -> git add -> git commit -> git push
```

## 2. 鍒濆鍖栦笌鍏嬮殕

```bash
git init
git clone https://github.com/user/repo.git
git clone git@github.com:user/repo.git
```

- `git init`锛氭妸褰撳墠鐩綍鍒濆鍖栦负 Git 浠撳簱銆?
- `git clone`锛氫粠杩滅▼澶嶅埗浠撳簱鍒版湰鍦帮紝骞惰嚜鍔ㄥ叧鑱旇繙绋嬪湴鍧€銆?

## 3. 鏌ョ湅鐘舵€佷笌鍘嗗彶

```bash
git status
git log --oneline
git diff
git diff --staged
```

| 鍛戒护 | 鐢ㄩ€?|
| --- | --- |
| `git status` | 鏌ョ湅鍒嗘敮銆佷慨鏀广€佹殏瀛樺拰鏈窡韪枃浠?|
| `git log --oneline` | 绠€娲佹煡鐪嬫彁浜ゅ巻鍙?|
| `git diff` | 鏌ョ湅宸ヤ綔鍖哄皻鏈殏瀛樼殑宸紓 |
| `git diff --staged` | 鏌ョ湅鏆傚瓨鍖哄嵆灏嗘彁浜ょ殑宸紓 |

## 4. 鏆傚瓨涓庢彁浜?

```bash
git add file.md
git add .
git commit -m "add git basic notes"
```

- `git add file.md`锛氬彧鏆傚瓨鎸囧畾鏂囦欢銆?
- `git add .`锛氭殏瀛樺綋鍓嶇洰褰曚笅鐨勫鏁板彉鏇淬€?
- `git commit -m "..."`锛氭彁浜ゆ殏瀛樺尯鍐呭銆?

鎻愪氦淇℃伅搴旇鏄庘€滃仛浜嗕粈涔堚€濓紝閬垮厤鍙啓 `update`銆乣fix`銆乣test`銆?

## 5. 杩滅▼鍚屾

```bash
git remote -v
git pull
git pull origin main
git push
git push origin main
```

| 鍛戒护 | 鐢ㄩ€?|
| --- | --- |
| `git remote -v` | 鏌ョ湅杩滅▼浠撳簱鍦板潃 |
| `git pull` | 鎷夊彇骞跺悎骞惰繙绋嬫洿鏂?|
| `git push` | 鎺ㄩ€佹湰鍦版彁浜ゅ埌杩滅▼ |

鎷夊彇鍓嶅缓璁厛鎵ц `git status`锛岀‘璁ゆ湰鍦版槸鍚︽湁鏈彁浜や慨鏀广€?

## 6. 鍒嗘敮鎿嶄綔

```bash
git branch
git branch feature-notes
git checkout main
git checkout -b feature-notes
git switch main
git switch -c feature-notes
```

| 鍛戒护 | 鐢ㄩ€?|
| --- | --- |
| `git branch` | 鏌ョ湅鏈湴鍒嗘敮 |
| `git branch name` | 鍒涘缓鍒嗘敮 |
| `git checkout name` | 鍒囨崲鍒板凡鏈夊垎鏀?|
| `git checkout -b name` | 鍒涘缓骞跺垏鎹㈠垎鏀?|
| `git switch name` | 鏇存竻鏅扮殑鍒囨崲鍒嗘敮鍐欐硶 |
| `git switch -c name` | 鏇存竻鏅扮殑鍒涘缓骞跺垏鎹㈠啓娉?|

鍒嗘敮閫傚悎闅旂涓嶅悓浠诲姟锛岄伩鍏嶆墍鏈変慨鏀归兘鍫嗗湪 `main` 涓娿€?

## 7. 鎾ら攢涓庡洖閫€

```bash
git restore file.md
git restore --staged file.md
git commit --amend
git reset --soft HEAD~1
```

| 鍛戒护 | 鐢ㄩ€?|
| --- | --- |
| `git restore file.md` | 涓㈠純宸ヤ綔鍖轰腑鏌愪釜鏂囦欢鐨勬湭鏆傚瓨淇敼 |
| `git restore --staged file.md` | 鎶婃枃浠朵粠鏆傚瓨鍖虹Щ鍥炲伐浣滃尯 |
| `git commit --amend` | 淇敼鏈€杩戜竴娆℃彁浜?|
| `git reset --soft HEAD~1` | 鎾ゅ洖鏈€杩戜竴娆℃彁浜わ紝淇濈暀淇敼鍜屾殏瀛樼姸鎬?|

`reset --hard` 浼氫涪寮冧慨鏀癸紝浣跨敤鍓嶅繀椤荤‘璁ゆ病鏈夐渶瑕佷繚鐣欑殑鍐呭銆?

## 8. `.gitignore`

`.gitignore` 鐢ㄤ簬澹版槑涓嶉渶瑕?Git 璺熻釜鐨勬枃浠讹紝甯歌瀵硅薄鏄紦瀛樸€佹棩蹇椼€佽櫄鎷熺幆澧冨拰澶т綋绉骇鐗┿€?

```gitignore
__pycache__/
*.pyc
.venv/
env/
*.log
outputs/
checkpoints/
```

鍩烘湰鍘熷垯锛?

- 鍙啀鐢熸垚鐨勬枃浠堕€氬父涓嶆彁浜ゃ€?
- 鏈湴鐜鐩稿叧鏂囦欢閫氬父涓嶆彁浜ゃ€?
- 妯″瀷鏉冮噸銆佹暟鎹泦銆佷腑闂翠骇鐗╃瓑澶ф枃浠堕€氬父涓嶇洿鎺ユ彁浜ゃ€?

## 9. 鏈€灏忓伐浣滄祦

```bash
git status
git switch -c feature-notes
git add notes.md
git commit -m "add notes"
git pull
git push
```

璁板繂椤哄簭锛?

1. 鍏堢敤 `git status` 鐪嬫竻褰撳墠鐘舵€併€?
2. 鐢?`git add` 閫夋嫨瑕佹彁浜ょ殑鍙樻洿銆?
3. 鐢?`git commit` 淇濆瓨鏈湴鐗堟湰銆?
4. 鐢?`git pull` / `git push` 鍚屾杩滅▼銆?



