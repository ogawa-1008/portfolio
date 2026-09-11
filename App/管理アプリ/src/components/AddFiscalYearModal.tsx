import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FiscalYear } from '../types';

interface AddFiscalYearModalProps {
  onClose: () => void;
  onAdd: (fiscalYear: Omit<FiscalYear, 'id'>) => void;
  existingYears: string[];
}

const AddFiscalYearModal: React.FC<AddFiscalYearModalProps> = ({
  onClose,
  onAdd,
  existingYears,
}) => {
  const [year, setYear] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentYear = new Date().getFullYear();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!year) {
      newErrors.year = '年度を入力してください';
    } else if (existingYears.includes(year)) {
      newErrors.year = 'この年度は既に存在します';
    } else if (parseInt(year) < currentYear - 10 || parseInt(year) > currentYear + 10) {
      newErrors.year = '有効な年度を入力してください';
    }

    if (!startDate) {
      newErrors.startDate = '開始日を入力してください';
    }

    if (!endDate) {
      newErrors.endDate = '終了日を入力してください';
    }

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = '終了日は開始日より後である必要があります';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const fiscalYear: Omit<FiscalYear, 'id'> = {
        year,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive,
      };
      
      onAdd(fiscalYear);
    }
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    if (errors.year) {
      setErrors(prev => ({ ...prev, year: '' }));
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">新しい年度を追加</h3>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">年度 *</label>
            <input
              type="number"
              className={`form-input ${errors.year ? 'border-red-500' : ''}`}
              value={year}
              onChange={(e) => handleYearChange(e.target.value)}
              placeholder="例: 2024"
              min={currentYear - 10}
              max={currentYear + 10}
            />
            {errors.year && (
              <div className="text-red-500 text-sm mt-1">{errors.year}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">開始日 *</label>
            <input
              type="date"
              className={`form-input ${errors.startDate ? 'border-red-500' : ''}`}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && (
              <div className="text-red-500 text-sm mt-1">{errors.startDate}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">終了日 *</label>
            <input
              type="date"
              className={`form-input ${errors.endDate ? 'border-red-500' : ''}`}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && (
              <div className="text-red-500 text-sm mt-1">{errors.endDate}</div>
            )}
          </div>

          <div className="form-group">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4"
              />
              <span>この年度をアクティブにする</span>
            </label>
            <p className="text-sm text-gray-600 mt-1">
              アクティブな年度は、新しい注文のデフォルト年度として使用されます。
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <button type="submit" className="button">
              年度を追加
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

export default AddFiscalYearModal; 