# 智海 AI（PWA 版）部署說明

資料夾內容：index.html（App 本體）、manifest.webmanifest、sw.js、icons/

## 本機測試
cd pwa && python3 -m http.server 8080   →  瀏覽器開啟 http://localhost:8080

## 上線（任選一種，需 https）
GitHub Pages / Netlify / Cloudflare Pages / Vercel：把整個資料夾原樣上傳即可。
- 四個檔案（index.html、manifest.webmanifest、sw.js、icons/）必須放在同一層目錄。
- 上線後，到 Google Cloud Console 把「新網址（例如 https://xxx.pages.dev）」加入 OAuth 用戶端的「已授權的 JavaScript 來源」，Drive 同步才能運作。

## 安裝
- Chrome／Edge（電腦、Android）：網址列安裝圖示，或 App 內「安裝智海 AI」按鈕。
- iPhone／iPad：Safari →「分享」→「加入主畫面」。

## 更新版本
修改 index.html 後，把 sw.js 第一行 VERSION 改成新字串（例如 zhihai-v2），使用者下次開啟即會取得新版。

## FlomiAI 下一階段（Vision 白板）
- 白板工具列新增「框選提問區域」與「辨識選取圖片」。
- 框選區域後，可將範圍內的節點文字整理成上下文並送交目前 LLM 連線。
- 選取圖片後，可呼叫支援視覺輸入的 OpenAI 相容、Gemini、Anthropic 或 Ollama 視覺模型進行教材辨識。
- 請在「設定 → LLM 連線管理」選取／設定支援圖片輸入的模型。一般文字模型不保證支援圖片。
- API 呼叫由瀏覽器直接送出；雲端供應商可能要求 API Key、CORS 設定與網路連線。不要在共用或公開裝置上儲存個人 API Key。
- OCR 結果會先提供人工校正；確認後才建立「圖片辨識結果」知識卡，取消則不匯入。圖片上傳限制為 12 MB，支援 JPG、PNG、WebP、GIF。


## 白板操作速查（v4）
- 新增：＋知識卡／矩形／圓形／箭頭；雙擊或 ✎ 編輯；右下角三角形調整大小。
- 連線：按「🔗連線」→ 點起點卡 → 點目標卡；點選連線後按 Delete 刪除。
- 手寫：「✎手寫」、「橡皮擦」、色票；「清除手寫」。
- 視圖：滾輪或雙指縮放、拖曳空白處平移、「符合視窗」。
- 快捷鍵：Delete 刪除、Ctrl+Z 復原、Ctrl+Y／Ctrl+Shift+Z 重做、Ctrl+D 複製、Esc 取消模式／框選。
- 資料：自動存於瀏覽器 localStorage；請定期「匯出白板」備份（格式 v2，相容舊版 JSON）。
