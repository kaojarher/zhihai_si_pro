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
