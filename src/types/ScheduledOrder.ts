export interface ScheduledOrder {
    id: string;
    serviceName: string;
    subService: string;
    customerName: string;
    technicianName: string;
    time: string;
    address: string;
    statusText: string; // VD: "ĐÃ XÁC NHẬN", "ĐANG DI CHUYỂN"
    estPrice: number;
    note?: string;
}