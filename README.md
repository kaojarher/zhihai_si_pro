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

## FlomiAI 視覺化白板（v3 新增）
- 側邊欄「FlomiAI 白板」：無限畫布、手寫／螢光筆／圖形／文字、節點連線、框選提問、AI 邊畫邊講（Web Speech 語音）、函數滑桿、識圖／OCR、連連看／流程填空／蘇格拉底批改。
- 識圖類功能需要支援 Vision 的模型：到「設定 → LLM 連線」選 GPT-4o／Claude／Gemini／Ollama LLaVA 等，Vision 欄可設為「啟用」。
- 白板資料存在 appData.boards（含圖片），隨「備份」匯出；圖片過多可能超出瀏覽器儲存上限，請定期匯出。
- 公式使用 KaTeX（cdnjs），首次使用需連網，之後由 Service Worker 快取。

## PLUG IN 外掛機制與 Podcast 工作室（v4 新增）
- 側邊欄新增「PLUG IN 外掛」區。開發者以 `registerPlugin({id,title,icon,badge,html,init,onShow})` 即可新增外掛，自動長出導覽按鈕與頁面。
- 內建外掛「Podcast 工作室」：貼上素材 → AI 產生雙人對話稿（可編輯）→ 合成 MP3 下載；另有瀏覽器語音試聽（無法匯出檔案）。
- MP3 合成引擎：① OpenAI 相容 TTS（`/audio/speech`，需 API Key，可沿用目前 OpenAI 連線）；② Puter TTS（免 Key，需登入 Puter）。
- 行動版選單修正：新增遮罩與關閉鈕，點遮罩／選單項目／Esc 皆可關閉。
