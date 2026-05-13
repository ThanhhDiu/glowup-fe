export interface CancelledOrder {
    id: string;
    serviceName: string;
    subService: string;
    customerName: string;
    technicianName: string;
    cancelDate: string;
    cancelledBy: 'customer' | 'technician' | 'system'; // Xác định ai hủy
    cancelReason: string; // Lý do hủy
}