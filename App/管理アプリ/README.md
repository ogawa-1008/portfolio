# 顧客情報管理システム

デジタルでの顧客情報管理を進めるためのWebアプリケーションです。年度別の注文管理と料金自動計算機能を提供します。

## 機能

### 1. 年度管理
- 年度の追加・選択機能
- 年度別の注文データ管理
- アクティブ年度の設定

### 2. 注文管理
- お客様注文一覧の表示
- 新しい注文の追加
- 既存注文の編集・削除
- 年度別フィルタリング

### 3. 料金自動計算
- 商品数量入力による自動料金計算
- 複数商品の合計金額自動算出
- リアルタイムでの金額表示

### 4. 統計情報
- 年度別の総注文数
- 総売上金額
- 総商品数

## 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **ルーティング**: React Router DOM
- **アイコン**: Lucide React
- **スタイリング**: CSS3 (カスタムスタイル)

## セットアップ

### 前提条件
- Node.js 16.0以上
- npm または yarn

### インストール

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

3. ブラウザで `http://localhost:5173` にアクセス

### ビルド

本番用ビルド:
```bash
npm run build
```

## 使用方法

### 1. 年度選択
1. アプリケーションを起動すると年度選択画面が表示されます
2. 既存の年度をクリックして選択するか、「年度を追加」ボタンで新しい年度を作成
3. 年度追加時は開始日・終了日を設定し、アクティブ年度として設定可能

### 2. 注文管理
1. 年度を選択すると注文一覧画面に移動
2. 「新しい注文を追加」ボタンで注文を作成
3. お客様と商品を選択し、数量を入力
4. 料金は自動で計算され、リアルタイムで表示
5. 既存の注文は編集・削除が可能

### 3. 料金計算
- 商品を選択すると単価が自動表示
- 数量を入力すると小計が自動計算
- 複数商品の合計金額も自動算出

### 4. Googleフォーム連携
1. **Googleフォームの作成**
   - お客様名（必須）
   - メールアドレス
   - 電話番号
   - 住所
   
2. **CSVエクスポート**
   - Googleフォームの回答をCSV形式でエクスポート
   
3. **アプリケーションへのインポート**
   - お客様一覧画面で「CSVインポート」ボタンをクリック
   - CSVファイルをアップロード
   - データを確認してインポート実行

### 4. Googleフォーム連携
- GoogleフォームからCSVエクスポートしてインポート可能
- 一括でお客様情報を追加
- データの事前確認機能

## データ構造

### 年度 (FiscalYear)
```typescript
{
  id: string;
  year: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}
```

### 注文 (Order)
```typescript
{
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  orderDate: Date;
  fiscalYear: string;
}
```

### 注文アイテム (OrderItem)
```typescript
{
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
```

## 開発者向け情報

### プロジェクト構造
```
src/
├── components/          # Reactコンポーネント
│   ├── FiscalYearSelection.tsx
│   ├── AddFiscalYearModal.tsx
│   ├── OrderList.tsx
│   ├── AddOrderModal.tsx
│   └── EditOrderModal.tsx
├── data/               # モックデータ
│   └── mockData.ts
├── types/              # TypeScript型定義
│   └── index.ts
├── App.tsx             # メインアプリケーション
├── main.tsx            # エントリーポイント
└── index.css           # グローバルスタイル
```

### カスタマイズ

#### 新しい商品の追加
`src/data/mockData.ts` の `mockProducts` 配列に商品を追加:

```typescript
{
  id: '4',
  name: '新しい商品',
  unitPrice: 3000,
  description: '商品の説明',
}
```

#### 新しいお客様の追加
`src/data/mockData.ts` の `mockCustomers` 配列にお客様を追加:

```typescript
{
  id: '3',
  name: '新しいお客様',
  email: 'new@example.com',
  phone: '03-9999-9999',
  address: '東京都新宿区...',
  createdAt: new Date(),
}
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## サポート

問題や質問がある場合は、プロジェクトのIssuesページでお知らせください。 