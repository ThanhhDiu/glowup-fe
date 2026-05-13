import React, { useEffect, useMemo, useState } from "react";
import Modal from "../common/Modal";
import "./css/repairRequestModal.css";
import {
    AlertTriangle,
    Bolt,
    CalendarDays,
    Camera,
    CheckCircle2,
    Circle,
    Fan,
    MapPin,
    Phone,
    Refrigerator,
    Shirt,
    Upload,
    Video,
    Wrench,
    X,
    Zap,
} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface RepairRequestModalProps {
    open: boolean;
    onClose: () => void;
    provider?: {
        name: string;
        avatar: string;
        rating: number;
        responseEta?: string;
        area?: string;
    };
}

type ServiceId = "aircon" | "washer" | "fridge" | "electric" | "camera" | "other";
type UrgencyId = "normal" | "today" | "urgent";

interface UploadedAsset {
    id: string;
    file: File;
    previewUrl: string;
}

const serviceOptions: Array<{ id: ServiceId; label: string; icon: React.ReactNode }> = [
    { id: "aircon", label: "Máy lạnh", icon: <Fan size={18} /> },
    { id: "washer", label: "Máy giặt", icon: <Shirt size={18} /> },
    { id: "fridge", label: "Tủ lạnh", icon: <Refrigerator size={18} /> },
    { id: "electric", label: "Điện nước", icon: <Zap size={18} /> },
    { id: "camera", label: "Camera", icon: <Camera size={18} /> },
    { id: "other", label: "Khác", icon: <Wrench size={18} /> },
];

const airconTypes = ["Treo tường", "Am tường", "Inverter", "Khác"];
const urgencyOptions: Array<{ id: UrgencyId; label: string; icon: string }> = [
    { id: "normal", label: "Không gấp", icon: "😌" },
    { id: "today", label: "Cần hôm nay", icon: "⚡" },
    { id: "urgent", label: "Khẩn cấp", icon: "🚨" },
];
const timeChips = ["Sáng", "Chiều", "Tối", "Cuối tuần"];
const issueChips = ["Không lạnh", "Chảy nước", "Không lên nguồn","Có mùi"];
const locationSuggestions = [
    "123 Nguyễn Hữu Cảnh, Bình Thạnh",
    "45 Lê Văn Sỹ, Phú Nhuận",
    "12 Võ Văn Kiệt, Quận 1",
];

const selectedServiceLabel = (service: ServiceId) => {
    const match = serviceOptions.find((item) => item.id === service);
    return match?.label ?? "Máy lạnh";
};

const RepairRequestModal: React.FC<RepairRequestModalProps> = ({open, onClose, provider}) => {
    const navigate = useNavigate();
    const [service, setService] = useState<ServiceId>("aircon");
    const [airconType, setAirconType] = useState(airconTypes[0]);
    const [brand, setBrand] = useState("Daikin");
    const [description, setDescription] = useState("");
    const [uploads, setUploads] = useState<UploadedAsset[]>([]);
    const [urgency, setUrgency] = useState<UrgencyId>("normal");
    const [timeSlot, setTimeSlot] = useState("Sáng");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("123 Nguyễn Hữu Cảnh, Bình Thạnh");
    const [phone, setPhone] = useState("0901234567");

    const summaryError = useMemo(() => {
        if (!description.trim()) return "Chưa có mô tả lỗi";
        if (!address.trim()) return "Chưa có địa chỉ";
        return null;
    }, [address, description]);

    const appendIssueChip = (chip: string) => {
        setDescription((prev) => {
            if (!prev.trim()) return chip;
            if (prev.toLowerCase().includes(chip.toLowerCase())) return prev;
            return `${prev.trim()}\n- ${chip}`;
        });
    };

    const onFileSelected: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const selectedFiles = Array.from(event.target.files ?? []);
        if (!selectedFiles.length) return;

        const nextUploads = selectedFiles.map((file, index) => ({
            id: `${file.name}-${Date.now()}-${index}`,
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        setUploads((prev) => [...prev, ...nextUploads].slice(0, 8));
        event.target.value = "";
    };

    const removeUpload = (id: string) => {
        setUploads((prev) => {
            const target = prev.find((item) => item.id === id);
            if (target) {
                URL.revokeObjectURL(target.previewUrl);
            }
            return prev.filter((item) => item.id !== id);
        });
    };

    useEffect(() => {
        return () => {
            uploads.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        };
    }, [uploads]);

    const onSubmit = () => {
        const payload = {
            provider: {
                name: providerName,
                avatar: providerAvatar,
                rating: providerRating,
            },
            request: {
                service,
                serviceLabel: selectedServiceLabel(service),
                deviceType: service === "aircon" ? airconType : "Khác",
                brand,
                description,
                urgency,
                timeSlot,
                date,
                address,
                phone,
                attachments: uploads.map((item) => ({
                    name: item.file.name,
                    type: item.file.type,
                    previewUrl: item.previewUrl,
                })),
            },
        };

        navigate("/customer/chat", {
            state: {
                prefillRepairRequest: payload,
            },
        });
        onClose();
    };

    const severityText = urgencyOptions.find((item) => item.id === urgency)?.label ?? "Không gấp";
    const providerName = provider?.name ?? "Thợ kỹ thuật";
    const providerAvatar = provider?.avatar ?? "https://placehold.co/80x80";
    const providerRating = provider?.rating ?? 4.8;
    const providerResponseEta = provider?.responseEta ?? "Phản hồi trong ~5 phút";

    return (
        <Modal open={open} onClose={onClose}>
            <div className="repair-modal">
                <button className="repair-close" onClick={onClose} aria-label="Close modal">
                    <X size={20}/>
                </button>

                <div className="repair-headline">
                    <div>
                        <h2>Yêu cầu sửa chữa</h2>
                        <p>Mô tả nhanh sự cố để thợ tư vấn và báo giá chính xác hơn</p>
                    </div>
                    <div className="provider-mini-card">
                        <img src={providerAvatar} alt={providerName} />
                        <div>
                            <strong>{providerName}</strong>
                            <span>
                                <Bolt size={14}/> {providerRating.toFixed(1)}
                            </span>
                            <small>{providerResponseEta}</small>
                        </div>
                    </div>
                </div>

                <div className="repair-layout">
                    <div className="repair-body">
                        <section className="repair-section">
                            <h3>1. Chọn dịch vụ</h3>
                            <div className="service-grid">
                                {serviceOptions.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`service-card ${service === item.id ? "active" : ""}`}
                                        onClick={() => setService(item.id)}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="repair-section">
                            <h3>2. Thiết bị cụ thể</h3>
                            {service === "aircon" ? (
                                <>
                                    <div className="inline-label">Loại máy</div>
                                    <div className="radio-grid">
                                        {airconTypes.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                className={`radio-option ${airconType === item ? "active" : ""}`}
                                                onClick={() => setAirconType(item)}
                                            >
                                                {airconType === item ? <CheckCircle2 size={16}/> : <Circle size={16}/>}
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                    <label className="input-label" htmlFor="repair-brand">Hãng</label>
                                    <select id="repair-brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                        <option>Daikin</option>
                                        <option>Panasonic</option>
                                        <option>LG</option>
                                        <option>Toshiba</option>
                                        <option>Khác</option>
                                    </select>
                                </>
                            ) : (
                                <p className="soft-note">Thông tin thiết bị sẽ được bổ sung nhanh trong khung chat sau khi gửi yêu cầu.</p>
                            )}
                        </section>

                        <section className="repair-section">
                            <h3>3. Mô tả sự cố</h3>
                            <textarea
                                id="repair-desc"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={"Ví dụ:\n- Máy lạnh không lạnh\n- Có tiếng kêu lớn\n- Chảy nước\n- Đã thử bật lại nhưng không được"}
                            />
                            <div className="chip-row">
                                {issueChips.map((chip) => (
                                    <button key={chip} type="button" className="chip" onClick={() => appendIssueChip(chip)}>
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="repair-section">
                            <h3>4. Upload hình/video</h3>
                            <label className="upload-box" htmlFor="repair-upload">
                                <input id="repair-upload" type="file" accept="image/*,video/*" multiple onChange={onFileSelected} />
                                <Upload size={20} />
                                <strong>+ Tải ảnh hoặc video</strong>
                                <p>Giúp thợ chẩn đoán nhanh hơn</p>
                            </label>
                            {uploads.length > 0 && (
                                <div className="preview-grid">
                                    {uploads.map((item) => (
                                        <div className="preview-item" key={item.id}>
                                            {item.file.type.startsWith("video/") ? (
                                                <video src={item.previewUrl} muted playsInline />
                                            ) : (
                                                <img src={item.previewUrl} alt={item.file.name} />
                                            )}
                                            <button type="button" onClick={() => removeUpload(item.id)} aria-label="Xóa tệp">
                                                <X size={14}/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="repair-section">
                            <h3>5. Mức độ khẩn cấp</h3>
                            <div className="urgency-grid">
                                {urgencyOptions.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`urgency-card ${urgency === item.id ? "active" : ""}`}
                                        onClick={() => setUrgency(item.id)}
                                    >
                                        <span>{item.icon}</span>
                                        <strong>{item.label}</strong>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="repair-section">
                            <h3>6. Thời gian mong muốn</h3>
                            <div className="chip-row">
                                {timeChips.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        className={`chip ${timeSlot === item ? "active" : ""}`}
                                        onClick={() => setTimeSlot(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                            <label className="input-label" htmlFor="repair-date">Ngày hẹn</label>
                            <div className="input-icon-wrap">
                                <CalendarDays size={16} />
                                <input id="repair-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </section>

                        <section className="repair-section">
                            <h3>7. Địa chỉ</h3>
                            <div className="input-icon-wrap">
                                <MapPin size={16} />
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Nhập khu vực cần sửa"
                                />
                            </div>
                            <div className="location-list">
                                {locationSuggestions
                                    .filter((item) => {
                                        const keyword = address.trim().toLowerCase();
                                        if (!keyword) return true;
                                        return item.toLowerCase().includes(keyword);
                                    })
                                    .slice(0, 3)
                                    .map((item) => (
                                        <button key={item} type="button" onClick={() => setAddress(item)}>
                                            {item}
                                        </button>
                                    ))}
                            </div>
                            <div className="mini-map">
                                <MapPin size={16} />
                                <span>{address || "Bản đồ khu vực"}</span>
                            </div>
                        </section>

                        <section className="repair-section">
                            <h3>8. Số điện thoại liên hệ</h3>
                            <div className="input-icon-wrap">
                                <Phone size={16} />
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="privacy-badge">✅ Chỉ chia sẻ cho thợ sau khi xác nhận</div>
                        </section>

                        <button type="button" className="btn-submit" onClick={onSubmit} disabled={Boolean(summaryError)}>
                            Bắt đầu chat với thợ
                        </button>
                    </div>

                    <aside className="repair-summary">
                        <h4>Tổng kết nhanh</h4>
                        <dl>
                            <div>
                                <dt>Dịch vụ</dt>
                                <dd>{selectedServiceLabel(service)}</dd>
                            </div>
                            <div>
                                <dt>Lỗi chính</dt>
                                <dd>{description.trim() || "Chưa cập nhật"}</dd>
                            </div>
                            <div>
                                <dt>Khu vực</dt>
                                <dd>{address || provider?.area || "Chưa cập nhật"}</dd>
                            </div>
                            <div>
                                <dt>Thời gian</dt>
                                <dd>{`${timeSlot}${date ? ` - ${date}` : ""}`}</dd>
                            </div>
                            <div>
                                <dt>Mức độ</dt>
                                <dd>{severityText}</dd>
                            </div>
                        </dl>
                        <button type="button" className="btn-submit secondary" onClick={onSubmit} disabled={Boolean(summaryError)}>
                            Gửi yêu cầu và nhận tư vấn
                        </button>
                        {summaryError && (
                            <p className="summary-warning">
                                <AlertTriangle size={14} /> {summaryError}
                            </p>
                        )}
                        <p className="summary-hint">
                            <Video size={14}/> Thêm hình/video để thợ dễ xác định vấn đề hơn.
                        </p>
                    </aside>
                </div>
            </div>
        </Modal>
    );
};

export default RepairRequestModal;
