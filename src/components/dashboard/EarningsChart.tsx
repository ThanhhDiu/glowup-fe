import React, { useState } from 'react';
import './EarningsChart.css';

const earningsData7Days = [
  { day: 'Mon', value: 420 },
  { day: 'Tue', value: 580 },
  { day: 'Wed', value: 350 },
  { day: 'Thu', value: 750 },
  { day: 'Today', value: 680 },
  { day: 'Sat', value: 520 },
  { day: 'Sun', value: 300 },
];

const earningsData30Days = [
  { day: 'W1', value: 2800 },
  { day: 'W2', value: 3200 },
  { day: 'W3', value: 2900 },
  { day: 'W4', value: 3600 },
];

export const EarningsChart: React.FC = () => {
  const [period, setPeriod] = useState<'7' | '30'>('7');
  const data = period === '7' ? earningsData7Days : earningsData30Days;
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="earnings-chart-card">
      <div className="earnings-chart-header">
        <h3 className="earnings-chart-title">Earnings Overview</h3>
        <div className="earnings-period-toggle">
          <button
            className={`period-btn ${period === '7' ? 'active' : ''}`}
            onClick={() => setPeriod('7')}
          >
            7 Days
          </button>
          <button
            className={`period-btn ${period === '30' ? 'active' : ''}`}
            onClick={() => setPeriod('30')}
          >
            30 Days
          </button>
        </div>
      </div>

      <div className="chart-area">
        <div className="chart-bars-container">
          {data.map((item, index) => {
            const heightPercent = (item.value / maxValue) * 100;
            const isToday = item.day === 'Today';
            return (
              <div key={index} className="chart-bar-wrapper">
                <div className="chart-bar-group">
                  <div
                    className={`chart-bar-bg`}
                    style={{ height: `${heightPercent * 0.6}%` }}
                  ></div>
                  <div
                    className={`chart-bar-main ${isToday ? 'bar-today' : ''}`}
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div className="bar-tooltip">
                      {(item.value * 1000).toLocaleString('vi-VN')} đ
                    </div>
                  </div>
                </div>
                <span className={`chart-bar-label ${isToday ? 'label-today' : ''}`}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
