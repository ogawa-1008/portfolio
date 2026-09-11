import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Edit, Trash2, Mail, Phone, MapPin, ArrowLeft, Upload } from 'lucide-react';
import { Customer } from '../types';
import { mockCustomers } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import AddCustomerModal from './AddCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import CsvImportModal from './CsvImportModal';
import { saveCustomers, loadCustomers } from '../utils/storage';

interface CustomerListProps {
  onBackToSelection: () => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onBackToSelection: _onBackToSelection }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate();

  // 初期データの読み込み
  useEffect(() => {
    const savedCustomers = loadCustomers();
    if (savedCustomers.length > 0) {
      setCustomers(savedCustomers);
    } else {
      setCustomers(mockCustomers);
    }
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    const customer: Customer = {
      ...newCustomer,
      id: Date.now().toString(),
    };
    const newCustomers = [...customers, customer];
    setCustomers(newCustomers);
    saveCustomers(newCustomers);
    setShowAddModal(false);
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    const newCustomers = customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(newCustomers);
    saveCustomers(newCustomers);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('このお客様を削除しますか？')) {
      const newCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(newCustomers);
      saveCustomers(newCustomers);
    }
  };

  const handleImportCustomers = (importedCustomers: Omit<Customer, 'id'>[]) => {
    const newCustomers = [
      ...customers,
      ...importedCustomers.map(customer => ({
        ...customer,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      }))
    ];
    setCustomers(newCustomers);
    saveCustomers(newCustomers);
    alert(`${importedCustomers.length}件のお客様をインポートしました`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="container">
      <div className="flex items-center gap-4 mb-6">
        <button
          className="button button-secondary"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} />
          年度選択に戻る
        </button>
        <h2 className="text-2xl font-semibold">お客様一覧</h2>
      </div>

      {/* 検索と追加ボタン */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search size={20} className="text-gray-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="お客様名、メール、電話番号で検索..."
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            className="button button-secondary w-full sm:w-auto"
            onClick={() => setShowImportModal(true)}
          >
            <Upload size={20} />
            CSVインポート
          </button>
          <button
            className="button w-full sm:w-auto"
            onClick={() => setShowAddModal(true)}
            style={{ marginTop: '-0.5rem' }}
          >
            <Plus size={20} />
            お客様を追加
          </button>
        </div>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-3 mb-6">
        <div className="card">
          <div className="flex items-center gap-2">
            <Users size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{customers.length}</div>
              <div className="text-sm text-gray-600">総お客様数</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-2">
            <Mail size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold">{customers.filter(c => c.email).length}</div>
              <div className="text-sm text-gray-600">メール登録済み</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-2">
            <Phone size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold">{customers.filter(c => c.phone).length}</div>
              <div className="text-sm text-gray-600">電話番号登録済み</div>
            </div>
          </div>
        </div>
      </div>

      {/* お客様一覧テーブル */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="min-w-[120px]">お客様名</th>
                <th className="min-w-[200px]">メールアドレス</th>
                <th className="min-w-[150px]">電話番号</th>
                <th className="min-w-[200px]">住所</th>
                <th className="min-w-[100px]">登録日</th>
                <th className="min-w-[120px]">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="font-medium break-words">{customer.name}</td>
                  <td>
                    <div className="flex items-center gap-1 break-words">
                      <Mail size={16} className="text-gray-400 flex-shrink-0" />
                      <span className="break-all">{customer.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Phone size={16} className="text-gray-400 flex-shrink-0" />
                      <span className="break-all">{customer.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-start gap-1">
                      <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="break-words" title={customer.address}>
                        {customer.address}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">{formatDate(customer.createdAt)}</td>
                  <td>
                    <div className="flex gap-1 flex-wrap">
                      <button
                        className="button button-secondary"
                        onClick={() => setEditingCustomer(customer)}
                        title="編集"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="button button-danger"
                        onClick={() => handleDeleteCustomer(customer.id)}
                        title="削除"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {searchTerm ? '検索結果が見つかりません' : 'お客様が登録されていません'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? '検索条件を変更してください。' : '新しいお客様を追加してください。'}
            </p>
            {!searchTerm && (
              <button
                className="button"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={20} />
                最初のお客様を追加
              </button>
            )}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddCustomerModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCustomer}
        />
      )}

      {editingCustomer && (
        <EditCustomerModal
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSave={handleEditCustomer}
        />
      )}

      {showImportModal && (
        <CsvImportModal
          onClose={() => setShowImportModal(false)}
          onImport={handleImportCustomers}
        />
      )}
    </div>
  );
};

export default CustomerList; 