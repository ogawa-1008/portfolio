const hasNodeRequire = typeof window !== 'undefined' && typeof window.require === 'function';
const db = hasNodeRequire ? window.require('./db') : null;
const fs = hasNodeRequire ? window.require('fs') : null;
const STORAGE_KEY = 'kakeibo_records';

const form = document.getElementById('form');
const list = document.getElementById('list');
const totals = document.getElementById('totals');
const monthSelect = document.getElementById('month');
const dateInput = document.getElementById('date');
const chartCtx = document.getElementById('chart').getContext('2d');
const pieChartCtx = document.getElementById('pieChart').getContext('2d');
const exportBtn = document.getElementById('export');

let chart;     // 棒グラフ
let pieChart;  // 円グラフ

if (dateInput) {
  dateInput.value = new Date().toISOString().slice(0, 10);
}

function formatMonthLabel(ym) {
  const [year, month] = ym.split('-');
  return `${year}年${Number(month)}月`;
}

function loadLocalRecords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

function saveLocalRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function addRecord(record, callback) {
  if (db) {
    db.run(
      `INSERT INTO records (item, amount, type, category, date) VALUES (?, ?, ?, ?, ?)`,
      [record.item, record.amount, record.type, record.category, record.date],
      callback
    );
    return;
  }

  const records = loadLocalRecords();
  const maxId = records.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0);
  records.push({
    id: maxId + 1,
    ...record
  });
  saveLocalRecords(records);
  callback(null);
}

function removeRecord(id, callback) {
  if (db) {
    db.run(`DELETE FROM records WHERE id = ?`, [id], callback);
    return;
  }

  const records = loadLocalRecords();
  const next = records.filter((r) => String(r.id) !== String(id));
  saveLocalRecords(next);
  callback(null);
}

function fetchRecords(selectedMonth, callback) {
  if (db) {
    let sql = 'SELECT * FROM records ORDER BY date DESC, id DESC';
    let params = [];
    if (selectedMonth !== 'all') {
      sql = `SELECT * FROM records WHERE strftime('%Y-%m', date)=? ORDER BY date DESC, id DESC`;
      params = [selectedMonth];
    }
    db.all(sql, params, callback);
    return;
  }

  let rows = loadLocalRecords();
  if (selectedMonth !== 'all') {
    rows = rows.filter((r) => String(r.date || '').slice(0, 7) === selectedMonth);
  }
  rows.sort((a, b) => `${b.date}-${b.id}`.localeCompare(`${a.date}-${a.id}`));
  callback(null, rows);
}

function fetchMonths(callback) {
  if (db) {
    db.all(
      `SELECT DISTINCT strftime('%Y-%m', date) AS ym
       FROM records
       WHERE date IS NOT NULL AND date != ''
       ORDER BY ym DESC`,
      [],
      (err, rows) => {
        if (err) {
          callback(err, []);
          return;
        }
        callback(null, rows.map((r) => r.ym).filter(Boolean));
      }
    );
    return;
  }

  const months = [...new Set(
    loadLocalRecords()
      .map((r) => String(r.date || '').slice(0, 7))
      .filter((m) => /^\d{4}-\d{2}$/.test(m))
  )].sort((a, b) => b.localeCompare(a));

  callback(null, months);
}

function updateMonthOptions(months, selectedMonth) {
  const currentValue = selectedMonth || monthSelect.value || 'all';
  monthSelect.innerHTML = '<option value="all">全期間</option>';

  months.forEach((ym) => {
    const option = document.createElement('option');
    option.value = ym;
    option.textContent = formatMonthLabel(ym);
    monthSelect.appendChild(option);
  });

  if (currentValue === 'all' || months.includes(currentValue)) {
    monthSelect.value = currentValue;
  } else {
    monthSelect.value = 'all';
  }
}

function loadMonthOptions(selectedMonth = monthSelect.value || 'all') {
  fetchMonths((err, months) => {
    if (err) {
      console.error(err);
      return;
    }
    updateMonthOptions(months, selectedMonth);
  });
}

// データ追加
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = document.getElementById('item').value.trim();
  const amount = Number(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value;
  const selectedDate = dateInput.value;

  if (!item || !Number.isFinite(amount) || amount <= 0 || !selectedDate) {
    alert('項目・金額・日付を正しく入力してください。');
    return;
  }

  addRecord(
    { item, amount, type, category, date: selectedDate },
    (err) => {
      if (err) console.error("DB保存エラー:", err);
      form.reset();
      dateInput.value = new Date().toISOString().slice(0, 10);
      const savedMonth = selectedDate.slice(0, 7);
      loadMonthOptions(savedMonth);
      loadData(savedMonth);
    }
  );
});

// データ削除
function deleteRecord(id) {
  removeRecord(id, (err) => {
    if (err) console.error(err);
    loadData(monthSelect.value);
  });
}

// レコード表示 + 合計計算 + グラフ
function displayRecords(rows) {
  list.innerHTML = '';
  let incomeTotal = 0;
  let expenseTotal = 0;

  // 円グラフ用：カテゴリー別支出
  const categoryTotals = {};

  // 日付ごとの貯金額（収入-支出）
  const dateToSavings = {};

  rows.forEach(r => {
    const li = document.createElement('li');
    const amountValue = Number(r.amount) || 0;

    const isIncome = r.type === 'income';
    const badgeClass = isIncome ? 'badge badge-income' : 'badge badge-expense';
    const amountClass = isIncome ? 'amount amount-income' : 'amount amount-expense';

    li.innerHTML = `
      <div class="item-main">
        <span class="${badgeClass}">${isIncome ? '収入' : '支出'}</span>
        <span class="item-title">${r.item}</span>
        <span class="item-meta">${r.category}｜${r.date}</span>
      </div>
      <div class="${amountClass}">¥${amountValue.toLocaleString()}</div>
    `;

    const delBtn = document.createElement('button');
    delBtn.textContent = '削除';
    delBtn.className = "btn-del";
    delBtn.addEventListener('click', () => deleteRecord(r.id));
    li.appendChild(delBtn);

    list.appendChild(li);

    if (isIncome) {
      incomeTotal += amountValue;
      dateToSavings[r.date] = (dateToSavings[r.date] || 0) + amountValue;
    } else {
      expenseTotal += amountValue;
      dateToSavings[r.date] = (dateToSavings[r.date] || 0) - amountValue;
      if (!categoryTotals[r.category]) categoryTotals[r.category] = 0;
      categoryTotals[r.category] += amountValue;
    }
  });

  const balance = incomeTotal - expenseTotal;

  totals.innerHTML = `
    <div class="totals-summary">
      <div>
        <div class="item-meta">収入合計</div>
        <div class="amount amount-income">¥${incomeTotal.toLocaleString()}</div>
      </div>
      <div>
        <div class="item-meta">支出合計</div>
        <div class="amount amount-expense">¥${expenseTotal.toLocaleString()}</div>
      </div>
      <div>
        <div class="item-meta">残高</div>
        <div class="amount" style="color:${balance >= 0 ? '#111827' : '#b91c1c'};">¥${balance.toLocaleString()}</div>
      </div>
    </div>
  `;

  // 日付順に整列
  const labels = Object.keys(dateToSavings).sort();
  const savingsData = labels.map(d => dateToSavings[d]);

  // 棒グラフ描画（貯金額を青で統一）
  if(chart) chart.destroy();
  chart = new Chart(chartCtx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: '貯金額', data: savingsData, backgroundColor: 'rgba(59, 130, 246, 0.8)' }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(0,0,0,0.06)' } }
      }
    }
  });

  // 円グラフ描画（カテゴリー別支出）
  if(pieChart) pieChart.destroy();
  pieChart = new Chart(pieChartCtx, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: ['#f87171','#60a5fa','#34d399','#facc15','#a78bfa']
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: '支出のカテゴリー別割合' }
      }
    }
  });
}

// データ取得
function loadData(selectedMonth = 'all') {
  fetchRecords(selectedMonth, (err, rows) => {
    if(err) { console.error(err); return; }
    displayRecords(rows);
  });
}

// 月選択変更
monthSelect.addEventListener('change', () => loadData(monthSelect.value));

// CSV出力
exportBtn.addEventListener('click', () => {
  fetchRecords('all', (err, rows) => {
    if(err) { console.error(err); return; }
    let csv = '日付,項目,金額,種類,カテゴリー\n';
    rows.forEach(r => {
      csv += `${r.date},${r.item},${r.amount},${r.type},${r.category}\n`;
    });

    if (fs) {
      fs.writeFileSync('kakeibo.csv', csv);
      alert('kakeibo.csv を出力しました');
      return;
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kakeibo.csv';
    link.click();
    URL.revokeObjectURL(url);
    alert('kakeibo.csv をダウンロードしました');
  });
});

// 初期表示
loadMonthOptions('all');
loadData();
