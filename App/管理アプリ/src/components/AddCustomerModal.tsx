import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Customer } from '../types';

interface AddCustomerModalProps {
  onClose: () => void;
  onAdd: (customer: Omit<Customer, 'id'>) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'お客様名を入力してください';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (phone && !/^[\d\-\(\)\s]+$/.test(phone)) {
      newErrors.phone = '有効な電話番号を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const customer: Omit<Customer, 'id'> = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        createdAt: new Date(),
      };
      
      onAdd(customer);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">新しいお客様を追加</h3>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">お客様名 *</label>
            <input
              type="text"
              className={`form-input ${errors.name ? 'border-red-500' : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: 株式会社サンプル"
              required
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">{errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">メールアドレス</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="例: info@example.com"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">電話番号</label>
            <input
              type="tel"
              className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="例: 03-1234-5678"
            />
            {errors.phone && (
              <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">住所</label>
            <textarea
              className="form-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="例: 東京都渋谷区..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button type="submit" className="button">
              お客様を追加
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

export default AddCustomerModal; 