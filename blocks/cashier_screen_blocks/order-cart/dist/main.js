// Order Cart Block - Simple bundle
import React from 'react';

const OrderCart = () => {
    return React.createElement('div', {
        style: { height: '100%', padding: '10px', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', color: '#fff' }
    }, [
        React.createElement('h3', { key: 'title', style: { margin: '0 0 10px 0' } }, 'Current Order'),
        React.createElement('div', {
            key: 'empty',
            style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#888' }
        }, [
            React.createElement('div', { key: 'icon', style: { fontSize: '48px', marginBottom: '10px' } }, '🛒'),
            React.createElement('p', { key: 'text' }, 'Your cart is empty')
        ]),
        React.createElement('div', {
            key: 'footer',
            style: { borderTop: '1px solid #333', marginTop: '10px', paddingTop: '10px' }
        }, [
            React.createElement('div', {
                key: 'total',
                style: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }
            }, [
                React.createElement('span', { key: 'label' }, 'Total:'),
                React.createElement('span', { key: 'amount' }, '$0.00')
            ]),
            React.createElement('button', {
                key: 'pay',
                style: { width: '100%', padding: '10px', backgroundColor: '#4caf50', border: 'none', borderRadius: '4px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }
            }, 'Pay Now')
        ])
    ]);
};

export default OrderCart;
