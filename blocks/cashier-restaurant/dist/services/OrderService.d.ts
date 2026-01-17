import { MenuItem, Order } from '../types/cashier.types';
export declare class OrderService {
    private static TAX_RATE;
    static createOrder(tableId: string): Order;
    static addItem(order: Order, menuItem: MenuItem, quantity?: number): Order;
    static removeItem(order: Order, menuItemId: string): Order;
    static updateQuantity(order: Order, menuItemId: string, quantity: number): Order;
    static recalculateOrder(order: Order): Order;
    static completeOrder(order: Order, paymentMethod: 'cash' | 'card' | 'split'): Order;
    static clearOrder(order: Order): Order;
}
//# sourceMappingURL=OrderService.d.ts.map