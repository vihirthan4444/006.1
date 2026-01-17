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
        const existingItemIndex = order.items.findIndex(item => item.menuItem.id === menuItem.id);

        let newItems: OrderItem[];
        if (existingItemIndex >= 0) {
            // Update existing item - create new array with updated item
            newItems = order.items.map((item, index) => {
                if (index === existingItemIndex) {
                    const newQuantity = item.quantity + quantity;
                    return {
                        ...item,
                        quantity: newQuantity,
                        subtotal: newQuantity * item.menuItem.price
                    };
                }
                return item;
            });
        } else {
            // Add new item
            const orderItem: OrderItem = {
                menuItem,
                quantity,
                subtotal: menuItem.price * quantity
            };
            newItems = [...order.items, orderItem];
        }

        return this.recalculateOrder({ ...order, items: newItems });
    }

    static removeItem(order: Order, menuItemId: string): Order {
        const newItems = order.items.filter(item => item.menuItem.id !== menuItemId);
        return this.recalculateOrder({ ...order, items: newItems });
    }

    static updateQuantity(order: Order, menuItemId: string, quantity: number): Order {
        if (quantity <= 0) {
            return this.removeItem(order, menuItemId);
        }

        const newItems = order.items.map(item => {
            if (item.menuItem.id === menuItemId) {
                return {
                    ...item,
                    quantity,
                    subtotal: quantity * item.menuItem.price
                };
            }
            return item;
        });

        return this.recalculateOrder({ ...order, items: newItems });
    }

    static recalculateOrder(order: Order): Order {
        const subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);
        const tax = subtotal * this.TAX_RATE;
        const total = subtotal + tax;

        return {
            ...order,
            subtotal,
            tax,
            total
        };
    }

    static completeOrder(order: Order, paymentMethod: 'cash' | 'card' | 'split'): Order {
        return {
            ...order,
            status: 'completed',
            completedAt: Date.now(),
            paymentMethod
        };
    }

    static clearOrder(order: Order): Order {
        return this.recalculateOrder({ ...order, items: [] });
    }
}
