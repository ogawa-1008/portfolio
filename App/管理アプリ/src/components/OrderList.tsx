import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, DollarSign, Package, Users } from 'lucide-react';
import { FiscalYear, Order } from '../types';
import { mockOrders, mockCustomers, mockProducts } from '../data/mockData';
import AddOrderModal from './AddOrderModal';
import EditOrderModal from './EditOrderModal';
import { useNavigate } from 'react-router-dom';
import { saveOrders, loadOrders } from '../utils/storage';

interface OrderListProps {
  fiscalYear: FiscalYear;
  onBackToSelection: () => void;
}

const OrderList: React.FC<OrderListProps> = ({ fiscalYear, onBackToSelection }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  // 初期データの読み込み
  useEffect(() => {
    const savedOrders = loadOrders();
    if (savedOrders.length > 0) {
      setOrders(savedOrders);
    } else {
      setOrders(mockOrders);
    }
  }, []);

  // 選択された年度の注文のみをフィルタリング
  const filteredOrders = useMemo(() => {
    return orders.filter(order => order.fiscalYear === fiscalYear.year);
  }, [orders, fiscalYear.year]);

  // 統計情報を計算
  const stats = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const totalAmount = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalItems = filteredOrders.reduce((sum, order) => 
      sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );

    return { totalOrders, totalAmount, totalItems };
  }, [filteredOrders]);

  const handleAddOrder = (newOrder: Omit<Order, 'id'>) => {
    const order: Order = {
      ...newOrder,
      id: Date.now().toString(),
    };
    const newOrders = [...orders, order];
    setOrders(newOrders);
    saveOrders(newOrders);
    setShowAddModal(false);
  };

  const handleEditOrder = (updatedOrder: Order) => {
    const newOrders = orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(newOrders);
    saveOrders(newOrders);
    setEditingOrder(null);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('この注文を削除しますか？')) {
      const newOrders = orders.filter(order => order.id !== orderId);
      setOrders(newOrders);
      saveOrders(newOrders);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  return (
    <div className="container">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <button
            className="button button-secondary"
            onClick={onBackToSelection}
          >
            <ArrowLeft size={20} />
            年度選択に戻る
          </button>
          <h2 className="text-2xl font-semibold">{fiscalYear.year}年度 注文一覧</h2>
        </div>
        <div className="flex gap-2 sm:ml-auto">
          <button
            className="button button-secondary"
            onClick={() => navigate('/customers')}
          >
            <Users size={20} />
            お客様一覧
          </button>
        </div>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-3 mb-6">
        <div className="card">
          <div className="flex items-center gap-2">
            <Package size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <div className="text-sm text-gray-600">総注文数</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-2">
            <DollarSign size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalAmount)}</div>
              <div className="text-sm text-gray-600">総売上</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-2">
            <Package size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <div className="text-sm text-gray-600">総商品数</div>
            </div>
          </div>
        </div>
      </div>

      {/* 注文一覧 */}
      <div className="flex flex-between mb-4">
        <h3 className="text-xl font-semibold">注文詳細</h3>
        <button
          className="button"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          新しい注文を追加
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            注文がありません
          </h3>
          <p className="text-gray-500 mb-4">
            {fiscalYear.year}年度の注文を追加してください。
          </p>
          <button
            className="button"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={20} />
            最初の注文を追加
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="card">
              <div className="flex flex-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">{order.customerName}</h4>
                  <p className="text-sm text-gray-600">
                    注文日: {formatDate(order.orderDate)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="button button-secondary"
                    onClick={() => setEditingOrder(order)}
                  >
                    <Edit size={16} />
                    編集
                  </button>
                  <button
                    className="button button-danger"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    <Trash2 size={16} />
                    削除
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <table className="table">
                  <thead>
                    <tr>
                      <th>商品名</th>
                      <th>数量</th>
                      <th>単価</th>
                      <th>小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{formatCurrency(item.unitPrice)}</td>
                        <td>{formatCurrency(item.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold">
                  合計: {formatCurrency(order.totalAmount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddOrderModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddOrder}
          fiscalYear={fiscalYear}
          customers={mockCustomers}
          products={mockProducts}
        />
      )}

      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={handleEditOrder}
          customers={mockCustomers}
          products={mockProducts}
        />
      )}
    </div>
  );
};

export default OrderList; 