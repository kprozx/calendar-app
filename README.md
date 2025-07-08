# イベントカレンダーアプリ

![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow)

## 🚀 概要
このアプリは **イベント管理ができるカレンダーアプリ** です。  
FullCalendarを使い、直感的にイベント操作が可能です。

## 🎥 デモ
![calendar demo](./demo.gif)

## 🔧 セットアップ方法

このアプリはローカルのHTMLファイルをブラウザで開くだけで動作します。

### ✅ 方法①（簡易）

1. このリポジトリをクローン
2. `index.html` をブラウザで直接開く（ダブルクリック or 右クリック→「ブラウザで開く」）

### 💡 方法②（推奨：Live Server）

VSCodeを使っている場合、拡張機能「Live Server」を使用すると、以下のように自動リロード付きで快適に開発できます。

1. VSCodeの拡張機能から「Live Server」をインストール  
2. `index.html` を右クリック → 「Open with Live Server」

※ `file://` で読み込むと、ブラウザのセキュリティ制約で動かない処理がある場合に備えて、Live Serverを使うのがおすすめです。

---

## ✨ 主な機能

- 📅 カレンダーでのイベント表示
- 🖊 モーダルからイベント追加・削除
- 🔍 イベント検索機能
- 🎌 日本の祝日自動表示
- 💾 ローカルストレージ保存対応

---

## 🛠 技術スタック

| フロントエンド | データ管理   | UIライブラリ     |
|----------------|--------------|------------------|
| HTML/CSS       | LocalStorage | FullCalendar.js |

---

## 🛣 今後の展望

- GitHub Pagesでの公開を想定した構成変更
- Firebaseなどのバックエンドとの連携
- UI/UX改善、レスポンシブ対応
- セキュリティ面や設計の見直し

---

## 🙋‍♂️ 作者について

このアプリは学習と実践を兼ねて作成しました。  
今後も改良を重ねながら、さまざまな技術に挑戦していきます！

---

## 📄 ライセンス

MIT License

Copyright (c) 2025 kprozx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
