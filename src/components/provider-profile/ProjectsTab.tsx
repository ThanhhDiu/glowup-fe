import React from 'react';

export const ProjectsTab: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Bảo trì hệ thống lạnh Vinhomes',
      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80', // Ảnh cục lạnh điều hòa
      desc: 'Sửa chữa và bảo dưỡng 15 máy lạnh.'
    },
    {
      id: 2,
      title: 'Lắp camera an ninh nhà phố',
      img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80', // Ảnh camera an ninh ngoài trời
      desc: 'Thi công 4 mắt camera ngoài trời.'
    },
    {
      id: 3,
      title: 'Bơm ga máy lạnh Dĩ An',
      img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80', // Ảnh kỹ thuật viên đang cầm dụng cụ sửa chữa
      desc: 'Khắc phục sự cố rò rỉ khí ga.'
    },
  ];

  return (
    <div className="profile-card">
      <h2 className="pc-title">Dự án tiêu biểu</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {projects.map(p => (
          <div key={p.id} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <img src={p.img} alt={p.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#000C33' }}>{p.title}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#4A5E8B' }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
