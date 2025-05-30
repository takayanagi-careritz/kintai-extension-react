# HRMOS勤怠入力 補助アプリ

## 概要

HRMOS勤怠入力を便利にするアプリの作成  
Vite + React + TS でChrome拡張機能を作成する

## はじめに

1. パッケージインストール
   ```sh
   npm i
   ```
2. ビルド
   ```sh
   npm run build
   ```

## 動かすには

1. Chrome を開いて [chrome://extensions/](chrome://extensions/) に行く
2. 右上の「デベロッパーモード」をオン
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. dist フォルダを選択
5. 「HRMOS勤怠入力 補助アプリ」の拡張機能アイコンを押す
6. 拡張機能UIが開かれる

## 開発するには

ホットリロードで開発したい！ので以下手順を実施

1. chrome拡張機能「[Extensions Reloader](https://chromewebstore.google.com/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid?hl=ja)」を追加
2. ビルド自動化
   ```sh
   npm run build-watch
   ```
3. これで変更を検知して、ビルド＋配置をおこなってくれる

## UIディレクトリ構造 思想

Atomic Designをベースに、/components 下から３つに分類
| ディレクトリ名 | 役割 | 特徴 |
| ----------- | ---------------------------------------------------- | ---------------- |
| `ui/` | Buttonのような**見た目だけで完結する最小単位**（例：Input, Icon, Spinner） | 原則ステートレス |
| `common/` | 単一用途に限定されない**中間レベル**の構成（例：Modal, Popup） | 状態は持ってもよいが汎用性あり |
| `features/` | 特定の画面・ユースケースに強く依存する複合構造（例：Frame, Sidebar） | 再利用性より「画面の意味」を優先 |

## コミットルール

| タグ        | 用途の説明                     | 例                                 |
| ----------- | ------------------------------ | ---------------------------------- |
| `add:`      | 新機能・新ファイルの追加       | `add: 勤怠自動入力ロジックを追加`  |
| `fix:`      | バグ修正                       | `fix: 日付ズレの不具合を修正`      |
| `update:`   | 挙動の変更・機能改善           | `update: 入力フォームのUX改善`     |
| `chore:`    | 本質的な変更ではない雑多な修正 | `chore: コメントを追加`            |
| `refactor:` | 仕様変更なしのコード整理       | `refactor: if文の構造を整理`       |
| `remove:`   | 機能やファイルの削除           | `remove: 不要なテストコードを削除` |
