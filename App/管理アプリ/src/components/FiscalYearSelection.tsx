import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Check, Users } from 'lucide-react';
import { FiscalYear } from '../types';
import { mockFiscalYears } from '../data/mockData';
import AddFiscalYearModal from './AddFiscalYearModal';
import { useNavigate } from 'react-router-dom';
import { saveFiscalYears, loadFiscalYears } from '../utils/storage';

interface FiscalYearSelectionProps {
  onFiscalYearSelect: (fiscalYear: FiscalYear) => void;
  selectedFiscalYear: FiscalYear | null;
}

const FiscalYearSelection: React.FC<FiscalYearSelectionProps> = ({
  onFiscalYearSelect,
  selectedFiscalYear,
}) => {
  const [fiscalYears, setFiscalYears] = useState<FiscalYear[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  // 初期データの読み込み
  useEffect(() => {
    const savedFiscalYears = loadFiscalYears();
    if (savedFiscalYears.length > 0) {
      setFiscalYears(savedFiscalYears);
    } else {
      setFiscalYears(mockFiscalYears);
    }
  }, []);

  const handleAddFiscalYear = (newFiscalYear: Omit<FiscalYear, 'id'>) => {
    const fiscalYear: FiscalYear = {
      ...newFiscalYear,
      id: Date.now().toString(),
    };
    
    // 他の年度を非アクティブにする
    const updatedFiscalYears = fiscalYears.map(fy => ({
      ...fy,
      isActive: false,
    }));
    
    const newFiscalYears = [...updatedFiscalYears, fiscalYear];
    setFiscalYears(newFiscalYears);
    saveFiscalYears(newFiscalYears);
    setShowAddModal(false);
  };

  const handleFiscalYearSelect = (fiscalYear: FiscalYear) => {
    onFiscalYearSelect(fiscalYear);
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
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">年度選択</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            className="button button-secondary"
            onClick={() => navigate('/customers')}
          >
            <Users size={20} />
            お客様一覧
          </button>
          <button
            className="button"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={20} />
            年度を追加
          </button>
        </div>
      </div>

      <div className="grid grid-3">
        {fiscalYears.map((fiscalYear) => (
          <div
            key={fiscalYear.id}
            className={`card cursor-pointer max-w-full ${
              selectedFiscalYear?.id === fiscalYear.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleFiscalYearSelect(fiscalYear)}
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-blue-500" />
              <h3 className="text-lg font-semibold">{fiscalYear.year}年度</h3>
              {fiscalYear.isActive && (
                <span className="badge badge-success">アクティブ</span>
              )}
            </div>
            
            <div className="text-sm text-gray-600 mb-3">
              <div>開始日: {formatDate(fiscalYear.startDate)}</div>
              <div>終了日: {formatDate(fiscalYear.endDate)}</div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {fiscalYear.isActive ? '現在の年度' : '過去の年度'}
              </span>
              {selectedFiscalYear?.id === fiscalYear.id && (
                <Check size={20} className="text-green-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {fiscalYears.length === 0 && (
        <div className="text-center py-8">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            年度が登録されていません
          </h3>
          <p className="text-gray-500 mb-4">
            新しい年度を追加して、顧客情報の管理を開始してください。
          </p>
          <button
            className="button"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={20} />
            最初の年度を追加
          </button>
        </div>
      )}

      {showAddModal && (
        <AddFiscalYearModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddFiscalYear}
          existingYears={fiscalYears.map(fy => fy.year)}
        />
      )}
    </div>
  );
};

export default FiscalYearSelection; 