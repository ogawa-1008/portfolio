import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Order, Customer, Product, OrderItem } from '../types';

interface EditOrderModalProps {
  order: Order;
  onClose: () => void;
  onSave: (order: Order) => void;
  customers: Customer[];
  products: Product[];
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({
  order,
  onClose,
  onSave,
  customers,
  products,
}) => {
  const [customerId, setCustomerId] = useState(order.customerId);
  const [orderDate, setOrderDate] = useState(order.orderDate.toISOString().split('T')[0]);
  const [items, setItems] = useState<Array<{
    id: string;
    productId: string;
    quantity: number;
  }>>(
    order.items.map(item => {
      const product = products.find(p => p.name === item.productName);
      return {
        id: item.id,
        productId: product?.id || '',
        quantity: item.quantity,
      };
    })
  );

  const selectedCustomer = customers.find(c => c.id === customerId);

  // 料金自動計算
  const calculateItemTotal = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.unitPrice * quantity : 0;
  };

  const calculateOrderTotal = () => {
    return items.reduce((total, item) => {
      return total + calculateItemTotal(item.productId, item.quantity);
    }, 0);
  };

  const handleAddItem = () => {
    setItems([...items, { id: `temp-${Date.now()}`, productId: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: 'productId' | 'quantity', value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerId || items.some(item => !item.productId || item.quantity <= 0)) {
      alert('すべての項目を正しく入力してください。');
      return;
    }

    const orderItems: OrderItem[] = items
      .filter(item => item.productId && item.quantity > 0)
      .map((item) => {
        const product = products.find(p => p.id === item.productId)!;
        return {
          id: item.id,
          productName: product.name,
          quantity: item.quantity,
          unitPrice: product.unitPrice,
          totalPrice: product.unitPrice * item.quantity,
        };
      });

    const updatedOrder: Order = {
      ...order,
      customerId,
      customerName: selectedCustomer!.name,
      items: orderItems,
      totalAmount: calculateOrderTotal(),
      orderDate: new Date(orderDate),
    };

    onSave(updatedOrder);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div className="modal-header">
          <h3 className="modal-title">注文を編集</h3>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label">お客様 *</label>
              <select
                className="form-input"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
              >
                <option value="">お客様を選択してください</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">注文日 *</label>
              <input
                type="date"
                className="form-input"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-between items-center mb-2">
              <label className="form-label">商品 *</label>
              <button
                type="button"
                className="button"
                onClick={handleAddItem}
              >
                <Plus size={16} />
                商品を追加
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <select
                      className="form-input"
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      required
                    >
                      <option value="">商品を選択してください</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {formatCurrency(product.unitPrice)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={{ width: '120px' }}>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="数量"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  
                  <div style={{ width: '120px' }}>
                    <div className="form-input bg-gray-50">
                      {formatCurrency(calculateItemTotal(item.productId, item.quantity))}
                    </div>
                  </div>
                  
                  {items.length > 1 && (
                    <button
                      type="button"
                      className="button button-danger"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-right mb-4">
            <div className="text-xl font-semibold">
              合計: {formatCurrency(calculateOrderTotal())}
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="button">
              変更を保存
            </button>
            <button type="button" className="button button-secondary" onClick={onClose}>
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderModal; 