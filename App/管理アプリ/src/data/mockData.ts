import { Customer, Order, FiscalYear, Product } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: '株式会社サンプル',
    email: 'info@sample.co.jp',
    phone: '03-1234-5678',
    address: '東京都渋谷区サンプル1-1-1',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'テスト商事',
    email: 'contact@test.co.jp',
    phone: '06-9876-5432',
    address: '大阪府大阪市テスト2-2-2',
    createdAt: new Date('2024-01-15'),
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: '商品A',
    unitPrice: 1000,
    description: '基本商品A',
  },
  {
    id: '2',
    name: '商品B',
    unitPrice: 2000,
    description: '基本商品B',
  },
  {
    id: '3',
    name: '商品C',
    unitPrice: 5000,
    description: '高級商品C',
  },
];

export const mockFiscalYears: FiscalYear[] = [
  {
    id: '1',
    year: '2024',
    startDate: new Date('2024-04-01'),
    endDate: new Date('2025-03-31'),
    isActive: true,
  },
  {
    id: '2',
    year: '2023',
    startDate: new Date('2023-04-01'),
    endDate: new Date('2024-03-31'),
    isActive: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    customerId: '1',
    customerName: '株式会社サンプル',
    items: [
      {
        id: '1',
        productName: '商品A',
        quantity: 5,
        unitPrice: 1000,
        totalPrice: 5000,
      },
      {
        id: '2',
        productName: '商品B',
        quantity: 2,
        unitPrice: 2000,
        totalPrice: 4000,
      },
    ],
    totalAmount: 9000,
    orderDate: new Date('2024-05-15'),
    fiscalYear: '2024',
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'テスト商事',
    items: [
      {
        id: '3',
        productName: '商品C',
        quantity: 1,
        unitPrice: 5000,
        totalPrice: 5000,
      },
    ],
    totalAmount: 5000,
    orderDate: new Date('2024-06-01'),
    fiscalYear: '2024',
  },
]; 