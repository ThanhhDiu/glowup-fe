import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularServices.css';
import { 
  SnowflakeIcon, 
  WashingMachineIcon, 
  FridgeIcon, 
  BroomIcon, 
  WrenchIcon, 
  BugIcon, 
  MicrowaveIcon, 
  CarIcon 
} from '../common/Icons';
import { getCategories, type Category } from '../../services/categoryService';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const fallbackServices: ServiceItem[] = [
  { id: '1', name: 'Máy lạnh', description: 'Vệ sinh & Bảo trì', icon: <SnowflakeIcon /> },
  { id: '2', name: 'Giặt ủi', description: 'Sạch tận cơ sở', icon: <WashingMachineIcon /> },
  { id: '3', name: 'Tủ lạnh', description: 'Bảo trì định kỳ', icon: <FridgeIcon /> },
  { id: '4', name: 'Dọn dẹp', description: 'Theo giờ / Định kỳ', icon: <BroomIcon /> },
  { id: '5', name: 'Điện nước', description: 'Sửa chữa 24/7', icon: <WrenchIcon /> },
  { id: '6', name: 'Côn trùng', description: 'Phun / Diệt triệt để', icon: <BugIcon /> },
  { id: '7', name: 'Lò vi sóng', description: 'Sửa chữa & Bảo trì', icon: <MicrowaveIcon /> },
  { id: '8', name: 'Xe hơi', description: 'Rửa & Chăm sóc', icon: <CarIcon /> },
];

export const services: ServiceItem[] = fallbackServices;

const iconByTitle: Record<string, React.ReactNode> = {
  'Máy lạnh': <SnowflakeIcon />,
  'Giặt ủi': <WashingMachineIcon />,
  'Tủ lạnh': <FridgeIcon />,
  'Dọn dẹp': <BroomIcon />,
  'Điện nước': <WrenchIcon />,
  'Côn trùng': <BugIcon />,
  'Lò vi sóng': <MicrowaveIcon />,
  'Xe hơi': <CarIcon />,
};

const mapCategoryToServiceItem = (category: Category): ServiceItem => ({
  id: category.id,
  name: category.title,
  description: category.description,
  icon: category.iconUrl ? (
    <img
      src={category.iconUrl}
      alt={category.title}
      style={{ width: 32, height: 32, objectFit: 'contain' }}
    />
  ) : (
    iconByTitle[category.title] || <WrenchIcon />
  ),
});

export const PopularServices: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [loading, setLoading] = useState(true);

  const handleServiceClick = (service: ServiceItem) => {
    navigate(`/provider?service=${encodeURIComponent(service.name)}`);
  };

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        setLoading(true);
        const categories = await getCategories('ACTIVE');
        const mapped = categories.slice(0, 8).map(mapCategoryToServiceItem);

        if (isMounted && mapped.length > 0) {
          setServices(mapped);
        }
      } catch (error) {
        console.error('Failed to load popular services:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="services-section">
      <div className="services-header">
        <div>
          <h2 className="section-title">Dịch vụ phổ biến</h2>
          <p className="section-subtitle">Tất cả những gì bạn cần cho một không gian hoàn hảo.</p>
        </div>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/services'); }} className="view-all-link">Xem tất cả dịch vụ →</a>
      </div>

      <div className="services-grid">
        {loading && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '24px 16px' }}>
            Đang tải dịch vụ...
          </div>
        )}

        {!loading && services.slice(0, 8).map(service => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => handleServiceClick(service)}
            role="button"
            tabIndex={0}
          >
            <div className="service-icon-container">
              {service.icon}
            </div>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
