import React from 'react';
import './FilterSidebar.css';
import { StarIcon } from '../common/Icons';

export const FilterSidebar: React.FC = () => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-section">
        <h3 className="filter-title">Lọc theo khu vực</h3>
        <div className="filter-options">
          <label className="filter-checkbox">
            <input type="checkbox" defaultChecked />
            <span className="checkmark"></span>
            <span className="filter-text">Quận 1, HCMC</span>
          </label>
          <label className="filter-checkbox">
            <input type="checkbox" />
            <span className="checkmark"></span>
            <span className="filter-text">Quận 7, HCMC</span>
          </label>
          <label className="filter-checkbox">
            <input type="checkbox" />
            <span className="checkmark"></span>
            <span className="filter-text">Thủ Đức, HCMC</span>
          </label>
          <label className="filter-checkbox">
            <input type="checkbox" />
            <span className="checkmark"></span>
            <span className="filter-text">Quận Bình Thạnh, HCMC</span>
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Đánh giá</h3>
        <div className="filter-options">
          <label className="filter-checkbox">
            <input type="radio" name="rating" />
            <span className="checkmark border-circle"></span>
            <div className="filter-rating">
              <StarIcon size={14} className="star-icon text-yellow-500" />
              <StarIcon size={14} className="star-icon text-yellow-500" />
              <StarIcon size={14} className="star-icon text-yellow-500" />
              <StarIcon size={14} className="star-icon text-yellow-500" />
              <StarIcon size={14} className="star-icon text-gray-300" />
              <span className="rating-text">4.0+</span>
            </div>
          </label>
        </div>
      </div>

      <div className="filter-section filter-toggle-section">
        <span className="filter-text-bold">Thợ đã xác minh</span>
        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider round"></span>
        </label>
      </div>
    </aside>
  );
};
