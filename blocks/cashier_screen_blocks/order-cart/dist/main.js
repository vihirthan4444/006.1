// Order Cart Block - Simplified and working version
(function () {
    class OrderCartComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                cartItems: [],
                total: 0
            };
            this.handleAddToCart = this.handleAddToCart.bind(this);
        }

        componentDidMount() {
            window.addEventListener('add-to-cart', this.handleAddToCart);
        }

        componentWillUnmount() {
            window.removeEventListener('add-to-cart', this.handleAddToCart);
        }

        handleAddToCart(event) {
            const product = event.detail;
            this.addToCart(product);
        }

        addToCart(product) {
            this.setState(prevState => {
                const existingItem = prevState.cartItems.find(item => item.id === product.id);
                let newItems;

                if (existingItem) {
                    newItems = prevState.cartItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    newItems = [...prevState.cartItems, { ...product, quantity: 1 }];
                }

                const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                return { cartItems: newItems, total: newTotal };
            });
        }

        updateQuantity(itemId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(itemId);
            } else {
                this.setState(prevState => {
                    const newItems = prevState.cartItems.map(item =>
                        item.id === itemId ? { ...item, quantity: newQuantity } : item
                    );
                    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    return { cartItems: newItems, total: newTotal };
                });
            }
        }

        removeItem(itemId) {
            this.setState(prevState => {
                const newItems = prevState.cartItems.filter(item => item.id !== itemId);
                const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                return { cartItems: newItems, total: newTotal };
            });
        }

        clearCart() {
            this.setState({ cartItems: [], total: 0 });
        }

        handleCheckout() {
            if (this.state.cartItems.length === 0) return;

            const totalWithTax = this.state.total * 1.1;
            alert(`Processing payment of $${totalWithTax.toFixed(2)}\n\nItems:\n${this.state.cartItems.map(item =>
                `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
            ).join('\n')}`);

            this.clearCart();
        }

        render() {
            const { cartItems, total } = this.state;
            const tax = total * 0.1;
            const totalWithTax = total * 1.1;

            return React.createElement('div', {
                style: {
                    height: '100%',
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#1e1e1e',
                    color: '#fff',
                    overflow: 'hidden'
                }
            }, [
                // Header
                React.createElement('div', {
                    key: 'header',
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid #333'
                    }
                }, [
                    React.createElement('h3', { key: 'title', style: { margin: 0, fontSize: '16px' } }, 'Current Order'),
                    cartItems.length > 0 && React.createElement('button', {
                        key: 'clear',
                        onClick: () => this.clearCart(),
                        style: {
                            padding: '4px 8px',
                            fontSize: '11px',
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer'
                        }
                    }, 'Clear')
                ]),

                // Cart Items or Empty State
                React.createElement('div', {
                    key: 'items',
                    style: {
                        flex: 1,
                        overflowY: 'auto',
                        marginBottom: '10px'
                    }
                }, cartItems.length === 0 ?
                    React.createElement('div', {
                        key: 'empty',
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            color: '#888'
                        }
                    }, [
                        React.createElement('div', { key: 'icon', style: { fontSize: '48px', marginBottom: '10px' } }, '🛒'),
                        React.createElement('p', { key: 'text', style: { margin: 0, fontSize: '14px' } }, 'Cart is empty'),
                        React.createElement('p', { key: 'hint', style: { margin: '5px 0 0 0', fontSize: '12px' } }, 'Add items from menu')
                    ])
                    :
                    cartItems.map(item =>
                        React.createElement('div', {
                            key: item.id,
                            style: {
                                backgroundColor: '#252526',
                                padding: '10px',
                                marginBottom: '8px',
                                borderRadius: '6px',
                                border: '1px solid #333'
                            }
                        }, [
                            React.createElement('div', {
                                key: 'info',
                                style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }
                            }, [
                                React.createElement('div', {
                                    key: 'name',
                                    style: { fontWeight: 'bold', fontSize: '13px' }
                                }, `${item.image || '🍽️'} ${item.name}`),
                                React.createElement('button', {
                                    key: 'remove',
                                    onClick: () => this.removeItem(item.id),
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        color: '#e74c3c',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        padding: 0,
                                        lineHeight: 1
                                    }
                                }, '×')
                            ]),
                            React.createElement('div', {
                                key: 'controls',
                                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                            }, [
                                React.createElement('div', {
                                    key: 'quantity',
                                    style: { display: 'flex', alignItems: 'center', gap: '8px' }
                                }, [
                                    React.createElement('button', {
                                        key: 'minus',
                                        onClick: () => this.updateQuantity(item.id, item.quantity - 1),
                                        style: {
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#333',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }
                                    }, '-'),
                                    React.createElement('span', {
                                        key: 'count',
                                        style: { minWidth: '20px', textAlign: 'center', fontSize: '13px' }
                                    }, item.quantity),
                                    React.createElement('button', {
                                        key: 'plus',
                                        onClick: () => this.updateQuantity(item.id, item.quantity + 1),
                                        style: {
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#333',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }
                                    }, '+')
                                ]),
                                React.createElement('div', {
                                    key: 'price',
                                    style: { color: '#4caf50', fontWeight: 'bold', fontSize: '13px' }
                                }, `$${(item.price * item.quantity).toFixed(2)}`)
                            ])
                        ])
                    )
                ),

                // Footer
                React.createElement('div', {
                    key: 'footer',
                    style: {
                        borderTop: '1px solid #333',
                        paddingTop: '12px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'subtotal',
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '6px',
                            fontSize: '12px',
                            color: '#aaa'
                        }
                    }, [
                        React.createElement('span', { key: 'label' }, 'Subtotal:'),
                        React.createElement('span', { key: 'amount' }, `$${total.toFixed(2)}`)
                    ]),
                    React.createElement('div', {
                        key: 'tax',
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                            fontSize: '12px',
                            color: '#aaa'
                        }
                    }, [
                        React.createElement('span', { key: 'label' }, 'Tax (10%):'),
                        React.createElement('span', { key: 'amount' }, `$${tax.toFixed(2)}`)
                    ]),
                    React.createElement('div', {
                        key: 'total',
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            paddingTop: '10px',
                            borderTop: '1px solid #444'
                        }
                    }, [
                        React.createElement('span', { key: 'label' }, 'Total:'),
                        React.createElement('span', {
                            key: 'amount',
                            style: { color: '#4caf50' }
                        }, `$${totalWithTax.toFixed(2)}`)
                    ]),
                    React.createElement('button', {
                        key: 'checkout',
                        onClick: () => this.handleCheckout(),
                        disabled: cartItems.length === 0,
                        style: {
                            width: '100%',
                            padding: '12px',
                            backgroundColor: cartItems.length === 0 ? '#555' : '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer'
                        }
                    }, cartItems.length === 0 ? 'Add Items' : `Pay $${totalWithTax.toFixed(2)}`)
                ])
            ]);
        }
    }

    const OrderCart = () => React.createElement(OrderCartComponent);

    // Export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = OrderCart;
    }
    if (typeof window !== 'undefined') {
        window.OrderCart = OrderCart;
    }
})();
