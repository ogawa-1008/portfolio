import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FiscalYearSelection from './components/FiscalYearSelection';
import OrderList from './components/OrderList';
import CustomerList from './components/CustomerList';
import { FiscalYear } from './types';
import './App.css';

function App() {
  const [selectedFiscalYear, setSelectedFiscalYear] = useState<FiscalYear | null>(null);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>顧客情報管理システム</h1>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route 
              path="/" 
              element={
                selectedFiscalYear ? (
                  <Navigate to="/orders" replace />
                ) : (
                  <FiscalYearSelection 
                    onFiscalYearSelect={setSelectedFiscalYear}
                    selectedFiscalYear={selectedFiscalYear}
                  />
                )
              } 
            />
            <Route 
              path="/orders" 
              element={
                selectedFiscalYear ? (
                  <OrderList 
                    fiscalYear={selectedFiscalYear}
                    onBackToSelection={() => setSelectedFiscalYear(null)}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/customers" 
              element={
                <CustomerList 
                  onBackToSelection={() => {
                    setSelectedFiscalYear(null);
                    window.location.href = '/';
                  }}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 
