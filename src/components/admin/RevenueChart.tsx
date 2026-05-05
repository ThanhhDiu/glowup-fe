import React, { useMemo } from 'react';
import './RevenueChart.css';

interface RevenueChartProps {
  timeRange: '7days' | '30days';
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ timeRange }) => {
  const chartData = useMemo(() => {
    if (timeRange === '7days') {
      return [
        { day: 'Thứ 2', value: 45, max: 100 },
        { day: 'Thứ 3', value: 55, max: 100 },
        { day: 'Thứ 4', value: 65, max: 100 },
        { day: 'Thứ 5', value: 50, max: 100 },
        { day: 'Thứ 6', value: 75, max: 100 },
        { day: 'Thứ 7', value: 90, max: 100 },
        { day: 'CN', value: 70, max: 100 },
      ];
    } else {
      return [
        { day: '1-5', value: 30, max: 100 },
        { day: '6-10', value: 45, max: 100 },
        { day: '11-15', value: 60, max: 100 },
        { day: '16-20', value: 55, max: 100 },
        { day: '21-25', value: 75, max: 100 },
        { day: '26-31', value: 80, max: 100 },
      ];
    }
  }, [timeRange]);

  return (
    <div className="rc-chart-container">
      <div className="rc-chart">
        <div className="rc-y-axis">
          <div className="rc-y-label">100</div>
          <div className="rc-y-label">75</div>
          <div className="rc-y-label">50</div>
          <div className="rc-y-label">25</div>
          <div className="rc-y-label">0</div>
        </div>

        <div className="rc-chart-area">
          <svg className="rc-line-chart" viewBox="0 0 800 250" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((val, i) => (
              <line
                key={`grid-${i}`}
                x1="0"
                y1={`${100 - val}%`}
                x2="100%"
                y2={`${100 - val}%`}
                className="rc-grid-line"
              />
            ))}

            {/* Area fill */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Line path */}
            <polyline
              className="rc-line"
              points={chartData
                .map(
                  (d, i) =>
                    `${((i / (chartData.length - 1)) * 100).toFixed(2)},${(100 - d.value).toFixed(2)}`
                )
                .join(' ')}
              fill="none"
            />

            {/* Area fill path */}
            <polygon
              className="rc-area"
              points={`0,100 ${chartData
                .map(
                  (d, i) =>
                    `${((i / (chartData.length - 1)) * 100).toFixed(2)},${(100 - d.value).toFixed(2)}`
                )
                .join(' ')} ${100},100`}
              fill="url(#areaGradient)"
            />

            {/* Data points */}
            {chartData.map((d, i) => (
              <circle
                key={`point-${i}`}
                cx={`${((i / (chartData.length - 1)) * 100).toFixed(2)}%`}
                cy={`${(100 - d.value).toFixed(2)}%`}
                r="4"
                className="rc-point"
              />
            ))}
          </svg>

          <div className="rc-x-axis">
            {chartData.map((d, i) => (
              <div key={`label-${i}`} className="rc-x-label">
                {d.day}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rc-chart-legend">
        <div className="rc-legend-item rc-legend-current">
          <div className="rc-legend-dot"></div>
          <span>Doanh thu hiện tại</span>
        </div>
        <div className="rc-legend-item rc-legend-average">
          <div className="rc-legend-dot"></div>
          <span>Trung bình</span>
        </div>
      </div>
    </div>
  );
};
