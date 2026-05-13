export interface RequestData {
    id: string;
    customerName: string; // Tên khách (nếu view là thợ)
    technicianName?: string; // Tên thợ (nếu view là khách)
    timeAgo: string;
    deviceName: string;
    description: string;
    address: string;
    estPrice: number;
    expectedTime: string;
    images: string[];
}