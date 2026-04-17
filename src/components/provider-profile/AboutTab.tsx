import React, { useState } from 'react';
import './AboutTab.css';
import { StarIcon } from '../common/Icons';

interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  rating: number;
  attachedImage?: string;
}

export const AboutTab: React.FC<{ onlyReviews?: boolean, onViewAllReviews?: () => void }> = ({ onlyReviews, onViewAllReviews }) => {
  const reviews: Review[] = [
    {
      id: '1',
      authorName: 'Chị Lan - Vinhomes Central Park',
      authorAvatar: 'https://i.pravatar.cc/150?img=5',
      timeAgo: '2 ngày trước',
      content: 'Anh Hùng làm việc rất kỹ, giải thích rõ ràng nguyên nhân máy lạnh bị rỉ nước. Dọn dẹp sạch sẽ sau khi xong việc. Rất hài lòng!',
      rating: 5,
      attachedImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: '2',
      authorName: 'Anh Tuấn - Quận 1',
      authorAvatar: 'https://i.pravatar.cc/150?img=11',
      timeAgo: '1 tuần trước',
      content: 'Sửa điện nhanh, đúng hẹn. Giá cả báo trước nên rất an tâm.',
      rating: 4,
    },
    {
      id: '3',
      authorName: 'Bác Bình - Thảo Điền',
      authorAvatar: 'https://i.pravatar.cc/150?img=8',
      timeAgo: '2 tuần trước',
      content: 'Lắp đặt chuyên nghiệp, nhân viên nhiệt tình, có trách nhiệm cao trong công việc.',
      rating: 5,
    },
    {
      id: '4',
      authorName: 'Chú Tâm - Gò Vấp',
      authorAvatar: 'https://i.pravatar.cc/150?img=12',
      timeAgo: '3 tuần trước',
      content: 'Làm việc ok, vui vẻ. Đã xong trong 30p.',
      rating: 5,
    },
    {
      id: '5',
      authorName: 'Chị Mai - Quận 3',
      authorAvatar: 'https://i.pravatar.cc/150?img=13',
      timeAgo: '1 tháng trước',
      content: 'Nhiệt tình nhưng tới trễ 10 phút. Tuy thế sửa rất kỹ.',
      rating: 4,
    },
    {
      id: '6',
      authorName: 'Anh Long - Tân Bình',
      authorAvatar: 'https://i.pravatar.cc/150?img=14',
      timeAgo: '1 tháng trước',
      content: 'Support siêu nhanh, giá hợp lý.',
      rating: 5,
    },
    {
      id: '7',
      authorName: 'Cô Huyền - Phú Nhuận',
      authorAvatar: 'https://i.pravatar.cc/150?img=15',
      timeAgo: '2 tháng trước',
      content: 'Hài lòng với dịch vụ này.',
      rating: 5,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(5);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const roundedRating = averageRating.toFixed(1);

  return (
    <div className="about-tab-container">
      {/* Về tôi */}
      {!onlyReviews && (
        <div className="profile-card">
          <h2 className="pc-title">Về tôi</h2>
          <p className="pc-text">
            Với hơn 10 năm kinh nghiệm trong lĩnh vực sửa chữa điện nước và điện lạnh tại TP. Hồ Chí Minh. Tôi cam kết mang đến dịch vụ chuyên nghiệp, minh bạch về giá cả và tận tâm trong từng chi tiết. Chuyên xử lý các ca khó cho căn hộ cao cấp và nhà phố.
          </p>
          <div className="pc-skills-wrapper">
            <span className="pc-skill-pill">Sửa máy lạnh</span>
            <span className="pc-skill-pill">Điện nước dân dụng</span>
            <span className="pc-skill-pill">Lắp đặt camera</span>
            <span className="pc-skill-pill">Vệ sinh máy giặt</span>
          </div>
        </div>
      )}

      {/* Đánh giá thực tế */}
      <div className="profile-card">
        <div className="review-header">
          <h2 className="pc-title mb-0">Đánh giá thực tế</h2>
          <div className="avg-rating-box">
            <span className="avg-rating-num">{roundedRating}</span>
            <div className="avg-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} size={16} className={star <= Math.round(averageRating) ? 'star-solid' : 'star-empty'} />
              ))}
            </div>
            <span className="review-count">({reviews.length} đánh giá)</span>
          </div>
        </div>

        <div className="review-list">
          {reviews.slice(0, visibleCount).map(review => (
            <div key={review.id} className="review-item">
              <div className="review-item-header">
                <img src={review.authorAvatar} alt={review.authorName} className="review-avatar" />
                <div className="review-author-info">
                  <h4 className="review-author-name">{review.authorName}</h4>
                  <span className="review-time">{review.timeAgo}</span>
                </div>
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} size={12} className={star <= review.rating ? 'star-solid' : 'star-empty'} />
                  ))}
                </div>
              </div>
              <p className="review-content">{review.content}</p>
              {review.attachedImage && (
                <div className="review-attachment">
                  <img src={review.attachedImage} alt="Attachment" className="review-img" />
                </div>
              )}
            </div>
          ))}
        </div>

        {onlyReviews ? (
          visibleCount < reviews.length && (
            <button className="view-more-btn" onClick={() => setVisibleCount(v => v + 3)}>Xem thêm</button>
          )
        ) : (
          <button className="view-more-btn" onClick={onViewAllReviews}>Xem tất cả</button>
        )}
      </div>
    </div>
  );
};
