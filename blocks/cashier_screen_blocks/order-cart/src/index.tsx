import React from 'react';

const OrderCart = () => {
    return (
        <div style={{ height: '100%', padding: '10px', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', color: '#fff' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Current Order</h3>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#888' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛒</div>
                <p>Your cart is empty</p>
            </div>
            <div style={{ borderTop: '1px solid #333', marginTop: '10px', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span>$0.00</span>
                </div>
                <button style={{ width: '100%', padding: '10px', backgroundColor: '#4caf50', border: 'none', borderRadius: '4px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default OrderCart;
