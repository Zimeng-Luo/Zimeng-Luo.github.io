---
title: "02 LaTeX璇硶"
date: 2026-09-02
categories: ["分享", "工具", "Markdown与LaTeX"]
tags: ["Markdown与LaTeX", "工具"]
sidebar: false
---
锘?--
title: "02 LaTeX璇硶"
type: reference
status: usable
confidence: medium
source: self-note
updated: 2026-09-02
tags: ["Markdown与LaTeX", "工具"]
  - latex
  - reference
  - markdown涓巐atex
  - 璁烘枃鍐欎綔
  - 鏂囨。鎺掔増
---
# LaTeX 璇硶

## 鏍稿績鎽樿

鏈瘒鐢ㄤ簬鏌ラ槄 LaTeX 璁烘枃鍐欎綔鐨勫熀纭€缁撴瀯锛屽寘鎷枃妗ｉ鏋躲€佸父鐢ㄥ畯鍖呫€佹爣棰樺眰绾с€佸垪琛ㄦ帓鐗堛€佸浘鐗囨彃鍏ュ拰 BibTeX 鍙傝€冩枃鐚鐞嗐€?

浣跨敤 LaTeX 鍐欒鏂囦竴鑸娇鐢?Overleaf銆?

[overleaf](https://www.overleaf.com/project)

## 1. 鏂囨。鍩虹楠ㄦ灦

浠讳綍涓€涓爣鍑嗙殑 LaTeX 鏂囨。閮界敱**瀵艰█鍖?*锛圥reamble锛岀敤浜庡叏灞€璁剧疆鍜屽紩鍏ュ畯鍖咃級鍜?*姝ｆ枃鍖?*锛圖ocument Environment锛夌粍鎴愩€?

```latex
% --- 瀵艰█鍖哄紑濮?---
\documentclass[12pt,a4paper,UTF8]{article} % 12鍙峰瓧浣擄紝A4绾稿紶锛孶TF-8缂栫爜锛宎rticle绫?
\usepackage{ctex} % 蹇呴』寮曞叆锛岀敤浜庢敮鎸佷腑鏂囨帓鐗?
% ... 姝ゅ寮曞叆鍏朵粬瀹忓寘 ...
% --- 瀵艰█鍖虹粨鏉?---

% --- 姝ｆ枃鍖哄紑濮?---
\begin{document}

% 浣犵殑璁烘枃姝ｆ枃鍐呭鍐欏湪杩欓噷

\end{document}
% --- 姝ｆ枃鍖虹粨鏉?---
```

## 2. 甯哥敤蹇呭瀹忓寘锛圥ackages锛?

鏍规嵁浣犵殑婧愮爜锛屼互涓嬫槸浣犲啓璁烘枃鏃堕€氬父闇€瑕侀厤缃殑瀹忓寘鍙婂姛鑳借鏄庯細

| **瀹忓寘浠ｇ爜**                                     | **鏍稿績浣滅敤**                           |
| -------------------------------------------- | ---------------------------------- |
| `\usepackage{amsmath}`                       | 鎻愪緵楂樼骇鏁板鍏紡鎺掔増鏀寔銆?                     |
| `\usepackage{graphicx}`                      | 鍏佽鎻掑叆鍥剧墖锛堥厤鍚?`\includegraphics` 浣跨敤锛夈€? |
| `\usepackage{float}`                         | 鎻愪緵涓ユ牸鐨勫浘琛ㄤ綅缃帶鍒讹紙濡傚己鍒跺浐瀹氬湪褰撳墠浣嶇疆鐨?`[H]` 鍙傛暟锛夈€?|
| `\usepackage{geometry}`                      | 鐢ㄤ簬鑷畾涔夐〉闈㈣竟璺濄€?                        |
| `\usepackage[numbers,sort&compress]{natbib}` | 寮哄ぇ鐨勫弬鑰冩枃鐚鐞嗭紝鏀寔鏁板瓧鏍囧彿鍜岃繛缁簭鍙峰帇缂╋紙濡?[1-3]锛夈€? |
| `\usepackage{url}`                           | 鍏佽鍦ㄥ弬鑰冩枃鐚垨姝ｆ枃涓牸寮忓寲鏄剧ず鍜岀偣鍑?URL 閾炬帴銆?       |

**椤甸潰杈硅窛璁剧疆绀轰緥锛?*

```latex
\geometry{left=2.5cm,right=2.5cm,top=2.5cm,bottom=2.5cm}
```

## 3. 鏍囬涓庡绾х粨鏋?

LaTeX 浼氳嚜鍔ㄤ负浣犲鐞嗙珷鑺傜紪鍙峰拰瀛椾綋澶у皬銆?

```latex
% --- 璁烘枃澶ф爣棰樿嚜瀹氫箟灞呬腑 ---
\begin{center}
    \textbf{\huge 绔嬮」鎶ュ憡} % \huge 琛ㄧず瓒呭ぇ鍙峰瓧浣擄紝\textbf 涓哄姞绮?
\end{center}
\vspace{1em} % 鎵嬪姩澧炲姞 1em 鐨勫瀭鐩寸┖鐧介棿璺?

% --- 绔犺妭灞傜骇 ---
\section{绔嬮」鑳屾櫙}       % 涓€绾ф爣棰?(渚嬪锛? 绔嬮」鑳屾櫙)
\subsection{闃舵涓€}      % 浜岀骇鏍囬 (渚嬪锛?.1 闃舵涓€)
\subsubsection{鍏蜂綋浠诲姟} % 涓夌骇鏍囬 (渚嬪锛?.1.1 鍏蜂綋浠诲姟)
```

## 4. 鏂囨湰楂樹寒涓庡垪琛ㄦ帓鐗?

鍦ㄦ⒊鐞嗙棝鐐规垨缃楀垪鎶€鏈矾绾挎椂锛屽垪琛ㄧ幆澧冩槸鏈€甯哥敤鐨勩€?

**灞€閮ㄦ枃鏈牸寮忓寲锛?*

- **鍔犵矖**锛歚\textbf{浣犵殑鏂囧瓧}`

- **涓嬪垝绾?*锛歚\underline{浣犵殑鏂囧瓧}`

- **寮哄埗鎹㈣**锛氬湪琛屽熬浣跨敤 `\\`

**鏈夊簭鍒楄〃锛堝甫鏁板瓧缂栧彿锛夛細**

```latex
\begin{enumerate}
    \item \textbf{鐥涚偣涓€}锛氫紶缁熸柟娉曟垚鏈繃楂?..
    \item \textbf{鐥涚偣浜寎锛氱畻娉曢噸寤洪毦搴﹀ぇ...
\end{enumerate}
```

**鏃犲簭鍒楄〃锛堝甫鍦嗙偣锛夛細**

```latex
\begin{itemize}
    \item \textbf{浜や簰鐣岄潰鑾峰彇} \\ 浣跨敤 Python 鏋勫缓鐣岄潰...
    \item \textbf{鏅鸿兘鑸嚎瑙勫垝} \\ 璋冪敤鍦板浘 API...
\end{itemize}
```

## 5. 楂樼骇鍥剧墖鎻掑叆鎶€宸?

浣犵殑婧愮爜涓ぇ閲忎娇鐢ㄤ簡甯?`[H]` 鍙傛暟鐨?`figure` 鐜锛岃繖鏄槻姝?LaTeX 鍥剧墖鈥滀贡璺戔€濓紙娴姩锛夌殑鏈€浣冲疄璺点€?

```latex
\begin{figure}[H] % [H] 蹇呴』閰嶅悎 float 瀹忓寘浣跨敤锛岃〃绀衡€滀弗鏍煎湪褰撳墠浣嶇疆(Here)鎻掑叆鈥?
    \centering % 鍥剧墖灞呬腑瀵归綈
    \includegraphics[width=0.8\textwidth]{01.png} % 瀹藉害璁句负椤甸潰鏂囨湰瀹藉害鐨?0.8 鍊?
    \caption{鍘熺敓VGGT鍦ㄥぇ鍦烘櫙涓嬪瓨鍦ㄧ殑鍥伴毦} % 鍥剧墖涓嬫柟鐨勬爣棰樿鏄?
    \label{fig:01} % 鎵撲笂鏍囩锛岀敤浜庢鏂囦腑鐨勪氦鍙夊紩鐢?
\end{figure}
```

> 馃挕 绠″琛ュ厖锛?
> 鍦ㄦ鏂囦腑濡傛灉鎯冲紩鐢ㄨ繖寮犲浘锛屽彧闇€鍐?`濡傚浘 \ref{fig:01} 鎵€绀篳锛岀郴缁熶細鑷姩濉叆姝ｇ‘鐨勫浘鍙枫€?

## 6. 鍙傝€冩枃鐚鐞?(BibTeX 閰嶅悎 Natbib)

褰撴枃鐚緝澶氭椂锛屼娇鐢?`.bib` 鏂囦欢鍒嗙绠＄悊鏄渶楂樻晥鐨勫仛娉曘€?

```latex
% 寮哄埗鍒楀嚭鏈湪姝ｆ枃涓洿鎺?\cite{} 寮曠敤鐨勬枃鐚紙灏嗘墍鏈夊紩鐢ㄧ殑 key 鍒楀嚭锛?
\nocite{lindenbergerLightGlueLocalFeature2023, liuCityGaussianRealTimeHighQuality2025}

% 璁剧疆鍙傝€冩枃鐚紩鐢ㄧ殑鏍煎紡锛坓bt7714-numerical 涓哄浗鏍囨暟瀛楁牸寮忥級
\bibliographystyle{gbt7714-numerical} 

% 鎸囧畾瀛樻斁鏂囩尞淇℃伅鐨?.bib 鏂囦欢鍚嶇О锛堜笉闇€瑕佸姞 .bib 鍚庣紑锛?
\bibliography{ref} 
```



