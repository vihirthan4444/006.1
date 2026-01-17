import React, { useState, useEffect } from 'react';
import { MenuItem, Order, Table } from '../types/cashier.types';
import { OrderService } from '../services/OrderService';
import './CashierScreen.css';

const CashierScreen: React.FC = () => {
    const [currentTable, setCurrentTable] = useState<Table | null>(null);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Mock data - in real app, this would come from database
    useEffect(() => {
        const mockMenuItems: MenuItem[] = [
            { id: '1', name: 'Margherita Pizza', price: 12.99, category: 'pizza', icon: '🍕', available: true },
            { id: '2', name: 'Pepperoni Pizza', price: 14.99, category: 'pizza', icon: '🍕', available: true },
            { id: '3', name: 'Veggie Pizza', price: 13.99, category: 'pizza', icon: '🍕', available: true },
            { id: '4', name: 'Classic Burger', price: 10.99, category: 'burgers', icon: '🍔', available: true },
            { id: '5', name: 'Cheese Burger', price: 11.99, category: 'burgers', icon: '🍔', available: true },
            { id: '6', name: 'Caesar Salad', price: 8.99, category: 'salads', icon: '🥗', available: true },
            { id: '7', name: 'Greek Salad', price: 9.99, category: 'salads', icon: '🥗', available: true },
            { id: '8', name: 'Chocolate Cake', price: 6.99, category: 'desserts', icon: '🍰', available: true },
            { id: '9', name: 'Ice Cream', price: 4.99, category: 'desserts', icon: '🍨', available: true },
            { id: '10', name: 'Coke', price: 2.99, category: 'beverages', icon: '🥤', available: true },
            { id: '11', name: 'Coffee', price: 3.99, category: 'beverages', icon: '☕', available: true },
        ];
        setMenuItems(mockMenuItems);

        // Auto-select table 5 for demo
        const mockTable: Table = { id: 't5', number: 5, capacity: 4, status: 'occupied' };
        setCurrentTable(mockTable);
        setCurrentOrder(OrderService.createOrder(mockTable.id));
    }, []);

    const categories = [
        { id: 'all', name: 'All', icon: '📋' },
        { id: 'pizza', name: 'Pizza', icon: '🍕' },
        { id: 'burgers', name: 'Burgers', icon: '🍔' },
        { id: 'salads', name: 'Salads', icon: '🥗' },
        { id: 'desserts', name: 'Desserts', icon: '🍰' },
        { id: 'beverages', name: 'Beverages', icon: '☕' },
    ];

    const filteredItems = selectedCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    const handleAddItem = (menuItem: MenuItem) => {
        if (!currentOrder || !menuItem.available) return;
        const updatedOrder = OrderService.addItem(currentOrder, menuItem);
        setCurrentOrder(updatedOrder);
    };

    const handleUpdateQuantity = (menuItemId: string, delta: number) => {
        if (!currentOrder) return;
        const item = currentOrder.items.find(i => i.menuItem.id === menuItemId);
        if (!item) return;
        const newQuantity = item.quantity + delta;
        const updatedOrder = OrderService.updateQuantity(currentOrder, menuItemId, newQuantity);
        setCurrentOrder(updatedOrder);
    };

    const handleClearOrder = () => {
        if (!currentOrder) return;
        const clearedOrder = OrderService.clearOrder(currentOrder);
        setCurrentOrder(clearedOrder);
    };

    const handlePayment = () => {
        if (!currentOrder || currentOrder.items.length === 0) return;
        // In real app, this would open payment dialog
        alert(`Processing payment of $${currentOrder.total.toFixed(2)}`);
        const completedOrder = OrderService.completeOrder(currentOrder, 'cash');
        console.log('Order completed:', completedOrder);
        // Reset for new order
        if (currentTable) {
            setCurrentOrder(OrderService.createOrder(currentTable.id));
        }
    };

    return (
        <div className="cashier-screen">
            <div className="cashier-header">
                <h1 className="cashier-title">🍽️ Restaurant Cashier</h1>
                {currentTable && (
                    <div className="table-info">
                        <span>Table:</span>
                        <span className="table-badge">#{currentTable.number}</span>
                    </div>
                )}
            </div>

            <div className="cashier-content">
                {/* Menu Section */}
                <div className="menu-section">
                    <div className="category-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.icon} {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="menu-items-grid">
                        {filteredItems.map(item => (
                            <div
                                key={item.id}
                                className={`menu-item-card ${!item.available ? 'unavailable' : ''}`}
                                onClick={() => handleAddItem(item)}
                            >
                                <div className="menu-item-icon">{item.icon}</div>
                                <div className="menu-item-name">{item.name}</div>
                                <div className="menu-item-price">${item.price.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Section */}
                <div className="order-section">
                    <div className="order-header">Current Order</div>

                    {currentOrder && currentOrder.items.length > 0 ? (
                        <>
                            <div className="order-items">
                                {currentOrder.items.map(item => (
                                    <div key={item.menuItem.id} className="order-item">
                                        <div className="order-item-info">
                                            <div className="order-item-name">{item.menuItem.name}</div>
                                            <div className="order-item-quantity">
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => handleUpdateQuantity(item.menuItem.id, -1)}
                                                >
                                                    −
                                                </button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => handleUpdateQuantity(item.menuItem.id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="order-item-price">${item.subtotal.toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-summary">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>${currentOrder.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax (10%):</span>
                                    <span>${currentOrder.tax.toFixed(2)}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total:</span>
                                    <span>${currentOrder.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="order-actions">
                                <button className="action-btn btn-clear" onClick={handleClearOrder}>
                                    Clear
                                </button>
                                <button className="action-btn btn-payment" onClick={handlePayment}>
                                    Payment
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="empty-order">
                            <div className="empty-order-icon">🛒</div>
                            <div className="empty-order-text">No items in order<br />Select items from the menu</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CashierScreen;
