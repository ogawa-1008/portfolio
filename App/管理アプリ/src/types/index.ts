export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  familyGroupId?: string;
  isRepresentative?: boolean;
  familyMembers?: Customer[];
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  orderDate: Date;
  fiscalYear: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface FiscalYear {
  id: string;
  year: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  unitPrice: number;
  description?: string;
} 