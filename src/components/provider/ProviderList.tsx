import React, { useEffect, useMemo, useState } from 'react';
import './ProviderList.css';
import { ProviderCard, type ProviderProps } from './ProviderCard';
import { PremiumProviderCard } from './PremiumProviderCard';
import { ChevronDownIcon } from '../common/Icons';
import RepairRequestModal from "../modal/RepairRequestModal.tsx";
import { getAllTechnicians } from '../../services/providerService';
import { mapTechnicianToProviderListItem, type ProviderListItemView } from '../../services/technicianMapper';

type ProviderListItem = ProviderListItemView;

interface Props {
    onNavigate?: (page: string, data?: any) => void;
    selectedService?: string;
    currentPage?: number;
    setCurrentPage?: (page: number) => void;
    setTotalPages?: (total: number) => void;
}

export const ProviderList: React.FC<Props> = ({
    onNavigate,
    selectedService,
    setCurrentPage,
    setTotalPages
}) => {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('PHỔ BIẾN NHẤT');
    const [providers, setProviders] = useState<ProviderListItem[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<ProviderProps | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalProviders, setTotalProviders] = useState(0);

    const sortProviders = (items: ProviderListItem[]) => {
        const sorted = [...items];

        sorted.sort((a, b) => {
            if (!selectedService) {
                if (a.type === 'premium' && b.type !== 'premium') return -1;
                if (b.type === 'premium' && a.type !== 'premium') return 1;
            }

            if (selectedSort === 'PHỔ BIẾN NHẤT') {
                return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
            }

            if (selectedSort === 'ĐÁNH GIÁ CAO NHẤT') {
                return (b.rating ?? 0) - (a.rating ?? 0);
            }

            if (selectedSort === 'GIÁ THẤP NHẤT') {
                const getPriceValue = (item: ProviderListItem) => {
                    if (item.type === 'premium') return Number.MAX_SAFE_INTEGER;
                    const raw = item.price.replace(/[^0-9]/g, '');
                    return Number(raw || Number.MAX_SAFE_INTEGER);
                };

                return getPriceValue(a) - getPriceValue(b);
            }

            return 0;
        });

        return sorted;
    };

    const handleNavigate = (page: string, data?: any) => {
        if (page === 'open-modal') {
            setSelectedProvider(data);
            return;
        }
        onNavigate?.(page, data);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchProviders = async () => {
            try {
                setLoading(true);
                setError(null);

                const technicians = await getAllTechnicians({
                    service: selectedService,
                });

                if (!isMounted) return;

                setProviders(technicians.map(mapTechnicianToProviderListItem));
                setTotalProviders(technicians.length);
                if (setTotalPages) setTotalPages(1);
            } catch (fetchError) {
                console.error('Failed to fetch providers:', fetchError);
                if (isMounted) {
                    setError('Không thể tải danh sách thợ');
                    setProviders([]);
                    setTotalProviders(0);
                    if (setTotalPages) setTotalPages(1);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProviders();

        return () => {
            isMounted = false;
        };
    }, [selectedService, setTotalPages]);

    const sortedProviders = useMemo(() => sortProviders(providers), [providers, selectedSort, selectedService]);

    const pageTitle = selectedService
        ? `Thợ chuyên ${selectedService}`
        : 'Thợ sửa chữa chuyên nghiệp';

    const resultCount = totalProviders;

    useEffect(() => {
        if (setCurrentPage) setCurrentPage(1);
    }, [selectedService, selectedSort, setCurrentPage]);

    return (
        <div className="provider-list-container">
            <div className="pl-header">
                <div className="pl-header-left">
                    <h1 className="pl-title">{pageTitle}</h1>
                    <p className="pl-subtitle">
                        Tìm thấy {resultCount} chuyên gia
                        {selectedService && <span className="pl-service-tag">{selectedService}</span>}
                        {' '}tại khu vực TP.HCM
                    </p>
                </div>
                <div className="pl-sort" style={{ position: 'relative' }}>
                    <span className="sort-label">SẮP XẾP:</span>
                    <button className="sort-btn" onClick={() => setIsSortOpen(!isSortOpen)}>
                        {selectedSort} <ChevronDownIcon size={14} className="sort-icon" />
                    </button>

                    {isSortOpen && (
                        <div className="sort-dropdown">
                            {['PHỔ BIẾN NHẤT', 'ĐÁNH GIÁ CAO NHẤT', 'GIÁ THẤP NHẤT'].map(option => (
                                <div
                                    key={option}
                                    className={`sort-option ${selectedSort === option ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedSort(option);
                                        setIsSortOpen(false);
                                    }}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="pl-cards">
                {loading && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px' }}>
                        <p>Đang tải danh sách thợ...</p>
                    </div>
                )}

                {error && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', color: '#e74c3c' }}>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && sortedProviders.map((p) => {
                    if (p.type === 'premium') {
                        return <PremiumProviderCard key={p.id} provider={p} onNavigate={onNavigate} />;
                    }
                    return <ProviderCard key={p.id} provider={p} onNavigate={handleNavigate} />;
                })}
            </div>

            {!loading && !error && resultCount === 0 && (
                <div className="pl-empty">
                    <p>Hiện chưa có thợ nào cho dịch vụ "{selectedService}".</p>
                    <p>Hãy thử tìm kiếm dịch vụ khác.</p>
                </div>
            )}

            <RepairRequestModal
                open={!!selectedProvider}
                onClose={() => setSelectedProvider(null)}
                provider={selectedProvider || undefined}
            />
        </div>
    );
};
