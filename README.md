# Next.js & Supabase サンプルチャットアプリ

## 初期設定

こちらを参考に Supabase と github の設定をすること <br />
https://zenn.dev/wadeen/articles/ddd2844ad3ae61

## 起動方法

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 機能

- GitHub 認証を使用したログイン
- Supabase を利用したリアルタイムチャット
- メッセージの送信と表示

## 必要な環境

- Node.js 16.x 以上
- Supabase プロジェクト
- GitHub OAuth アプリケーション

## ディレクトリ構成

```
next.config.js
package.json
README.md
tsconfig.json
app/
    globals.css
    layout.tsx
    page.tsx
    components/
        AppLayout.tsx
        ChatApp.tsx
        LogoutButton.tsx
        SignInGithub.tsx
lib/
    supabase.ts
    supabaseFunctions.ts
    hooks/
        useAuth.ts
types/
    supabase.ts
utils/
    dateToString.ts
public/
    favicon.ico
    github.svg
    next.svg
    noimage.png
    thirteen.svg
    vercel.svg
```

## 注意事項

- Supabase のプロジェクト URL と API キーを正しく設定してください。
- GitHub OAuth アプリケーションのリダイレクト URL を正しく設定してください。
