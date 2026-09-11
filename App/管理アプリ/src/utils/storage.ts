import { FiscalYear, Customer, Order } from '../types';

const STORAGE_KEYS = {
  FISCAL_YEARS: 'fiscalYears',
  CUSTOMERS: 'customers',
  ORDERS: 'orders',
} as const;

// 年度データの永続化
export const saveFiscalYears = (fiscalYears: FiscalYear[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.FISCAL_YEARS, JSON.stringify(fiscalYears));
  } catch (error) {
    console.error('年度データの保存に失敗しました:', error);
  }
};

export const loadFiscalYears = (): FiscalYear[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FISCAL_YEARS);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Date型に変換
      return parsed.map((fy: any) => ({
        ...fy,
        startDate: new Date(fy.startDate),
        endDate: new Date(fy.endDate),
      }));
    }
  } catch (error) {
    console.error('年度データの読み込みに失敗しました:', error);
  }
  return [];
};

// お客様データの永続化
export const saveCustomers = (customers: Customer[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  } catch (error) {
    console.error('お客様データの保存に失敗しました:', error);
  }
};

export const loadCustomers = (): Customer[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Date型に変換
      return parsed.map((customer: any) => ({
        ...customer,
        createdAt: new Date(customer.createdAt),
      }));
    }
  } catch (error) {
    console.error('お客様データの読み込みに失敗しました:', error);
  }
  return [];
};

// 注文データの永続化
export const saveOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (error) {
    console.error('注文データの保存に失敗しました:', error);
  }
};

export const loadOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Date型に変換
      return parsed.map((order: any) => ({
        ...order,
        orderDate: new Date(order.orderDate),
      }));
    }
  } catch (error) {
    console.error('注文データの読み込みに失敗しました:', error);
  }
  return [];
}; 