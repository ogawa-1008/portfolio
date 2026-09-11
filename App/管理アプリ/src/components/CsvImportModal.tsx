import React, { useState } from 'react';
import { X, Upload, Download, FileText } from 'lucide-react';
import { Customer } from '../types';

interface CsvImportModalProps {
  onClose: () => void;
  onImport: (customers: Omit<Customer, 'id'>[]) => void;
}

const CsvImportModal: React.FC<CsvImportModalProps> = ({
  onClose,
  onImport,
}) => {
  const [, setCsvData] = useState<string>('');
  const [previewData, setPreviewData] = useState<Omit<Customer, 'id'>[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseCsvLine = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === '"') {
        const next = line[i + 1];
        if (inQuotes && next === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }

    values.push(current.trim());
    return values.map((value) => value.replace(/\r/g, ''));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvData(text);
      processCsvData(text);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const processCsvData = (csvText: string) => {
    setIsProcessing(true);
    setErrors([]);
    
    try {
      const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length < 2) {
        setErrors(['CSVファイルにデータが含まれていません']);
        setIsProcessing(false);
        return;
      }

      const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase());
      const dataLines = lines.slice(1);
      
      const customers: Omit<Customer, 'id'>[] = [];
      const newErrors: string[] = [];

      dataLines.forEach((line, index) => {
        const values = parseCsvLine(line);
        
        if (values.length < headers.length) {
          newErrors.push(`行 ${index + 2}: データが不完全です`);
          return;
        }

        const customer: any = {};
        headers.forEach((header, i) => {
          customer[header] = values[i] || '';
        });

        // 必須フィールドのチェック
        if (!customer.name && !customer['お客様名'] && !customer['会社名']) {
          newErrors.push(`行 ${index + 2}: お客様名が入力されていません`);
          return;
        }

        const processedCustomer: Omit<Customer, 'id'> = {
          name: customer.name || customer['お客様名'] || customer['会社名'] || '',
          email: customer.email || customer['メールアドレス'] || customer['メール'] || '',
          phone: customer.phone || customer['電話番号'] || customer['電話'] || '',
          address: customer.address || customer['住所'] || customer['アドレス'] || '',
          createdAt: new Date(),
        };

        customers.push(processedCustomer);
      });

      setPreviewData(customers);
      setErrors(newErrors);
    } catch (error) {
      setErrors(['CSVファイルの処理中にエラーが発生しました']);
    }
    
    setIsProcessing(false);
  };

  const handleImport = () => {
    if (previewData.length > 0) {
      onImport(previewData);
      onClose();
    }
  };

  const downloadTemplate = () => {
    const template = `お客様名,メールアドレス,電話番号,住所
株式会社サンプル,info@sample.co.jp,03-1234-5678,東京都渋谷区サンプル1-1-1
テスト商事,contact@test.co.jp,06-9876-5432,大阪府大阪市テスト2-2-2`;
    
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'お客様データテンプレート.csv';
    link.click();
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div className="modal-header">
          <h3 className="modal-title">CSVファイルからお客様をインポート</h3>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* テンプレートダウンロード */}
          <div className="card">
            <h4 className="font-semibold mb-2">1. テンプレートのダウンロード</h4>
            <p className="text-sm text-gray-600 mb-3">
              GoogleフォームからエクスポートしたCSVファイルを使用するか、以下のテンプレートをダウンロードして使用してください。
            </p>
            <button
              className="button button-secondary"
              onClick={downloadTemplate}
            >
              <Download size={16} />
              CSVテンプレートをダウンロード
            </button>
          </div>

          {/* ファイルアップロード */}
          <div className="card">
            <h4 className="font-semibold mb-2">2. CSVファイルのアップロード</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="button cursor-pointer">
                <FileText size={16} />
                CSVファイルを選択
              </label>
              <p className="text-sm text-gray-500 mt-2">
                または、ファイルをここにドラッグ&ドロップしてください
              </p>
            </div>
          </div>

          {/* エラー表示 */}
          {errors.length > 0 && (
            <div className="card bg-red-50 border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">エラー</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* プレビュー */}
          {previewData.length > 0 && (
            <div className="card">
              <h4 className="font-semibold mb-2">
                3. インポート予定データ ({previewData.length}件)
              </h4>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>お客様名</th>
                      <th>メールアドレス</th>
                      <th>電話番号</th>
                      <th>住所</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(0, 5).map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td className="max-w-xs truncate">{customer.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {previewData.length > 5 && (
                  <p className="text-sm text-gray-500 mt-2">
                    他 {previewData.length - 5} 件のデータがあります
                  </p>
                )}
              </div>
            </div>
          )}

          {/* インポートボタン */}
          {previewData.length > 0 && (
            <div className="flex gap-2">
              <button
                className="button"
                onClick={handleImport}
                disabled={isProcessing}
              >
                {isProcessing ? '処理中...' : `${previewData.length}件をインポート`}
              </button>
              <button
                className="button button-secondary"
                onClick={onClose}
              >
                キャンセル
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CsvImportModal; 
