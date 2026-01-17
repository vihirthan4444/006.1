import { MenuItem, Order, OrderItem } from '../types/cashier.types';

export class OrderService {
    private static TAX_RATE = 0.10; // 10% tax

    static createOrder(tableId: string): Order {
        return {
            id: `order-${Date.now()}`,
            tableId,
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            status: 'pending',
            createdAt: Date.now()
        };
    }

    static addItem(order: Order, menuItem: MenuItem, quantity: number = 1): Order {
        const existingItem = order.items.find(item => item.menuItem.id === menuItem.id);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.subtotal = existingItem.quantity * existingItem.menuItem.price;
        } else {
            const orderItem: OrderItem = {
                menuItem,
                quantity,
                subtotal: menuItem.price * quantity
            };
            order.items.push(orderItem);
        }

        return this.recalculateOrder(order);
    }

    static removeItem(order: Order, menuItemId: string): Order {
        order.items = order.items.filter(item => item.menuItem.id !== menuItemId);
        return this.recalculateOrder(order);
    }

    static updateQuantity(order: Order, menuItemId: string, quantity: number): Order {
        const item = order.items.find(item => item.menuItem.id === menuItemId);
        if (item) {
            if (quantity <= 0) {
                return this.removeItem(order, menuItemId);
            }
            item.quantity = quantity;
            item.subtotal = item.quantity * item.menuItem.price;
        }
        return this.recalculateOrder(order);
    }

    static recalculateOrder(order: Order): Order {
        order.subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);
        order.tax = order.subtotal * this.TAX_RATE;
        order.total = order.subtotal + order.tax;
        return order;
    }

    static completeOrder(order: Order, paymentMethod: 'cash' | 'card' | 'split'): Order {
        order.status = 'completed';
        order.completedAt = Date.now();
        order.paymentMethod = paymentMethod;
        return order;
    }

    static clearOrder(order: Order): Order {
        order.items = [];
        return this.recalculateOrder(order);
    }
}
