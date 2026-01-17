export interface MenuItem {
    id: string;
    name: string;
    price: number;
    category: string;
    icon?: string;
    description?: string;
    available: boolean;
}
export interface OrderItem {
    menuItem: MenuItem;
    quantity: number;
    notes?: string;
    subtotal: number;
}
export interface Table {
    id: string;
    number: number;
    capacity: number;
    status: 'available' | 'occupied' | 'reserved';
    currentOrderId?: string;
}
export interface Order {
    id: string;
    tableId: string;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: number;
    completedAt?: number;
    paymentMethod?: 'cash' | 'card' | 'split';
}
export interface Receipt {
    orderId: string;
    tableNumber: number;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
    timestamp: number;
    paymentMethod: string;
}
export interface CashierState {
    currentTable: Table | null;
    currentOrder: Order | null;
    menuItems: MenuItem[];
    tables: Table[];
}
//# sourceMappingURL=cashier.types.d.ts.map