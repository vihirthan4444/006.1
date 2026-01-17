// Product View Block - Simple bundle
import React from 'react';

const products = [
    { id: 1, name: 'Burger', price: 5.99, image: '🍔' },
    { id: 2, name: 'Pizza', price: 8.99, image: '🍕' },
    { id: 3, name: 'Fries', price: 2.99, image: '🍟' },
    { id: 4, name: 'Soda', price: 1.99, image: '🥤' },
    { id: 5, name: 'Hot Dog', price: 4.99, image: '🌭' },
    { id: 6, name: 'Taco', price: 3.99, image: '🌮' },
    { id: 7, name: 'Salad', price: 6.99, image: '🥗' },
    { id: 8, name: 'Ice Cream', price: 3.50, image: '🍦' }
];

const ProductView = () => {
    return React.createElement('div', {
        style: { height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', color: '#fff' }
    }, [
        React.createElement('div', {
            key: 'header',
            style: { padding: '10px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        }, [
            React.createElement('h3', { key: 'title', style: { margin: 0 } }, 'Menu'),
            React.createElement('input', {
                key: 'search',
                type: 'text',
                placeholder: 'Search...',
                style: {
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #444',
                    backgroundColor: '#2d2d2d',
                    color: 'white'
                }
            })
        ]),
        React.createElement('div', {
            key: 'grid',
            style: { padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px', overflowY: 'auto' }
        }, products.map(p =>
            React.createElement('div', {
                key: p.id,
                style: {
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#252526',
                    transition: 'background-color 0.2s'
                },
                onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#333',
                onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#252526'
            }, [
                React.createElement('div', { key: 'img', style: { fontSize: '40px', marginBottom: '10px' } }, p.image),
                React.createElement('div', { key: 'name', style: { fontWeight: 'bold', marginBottom: '4px' } }, p.name),
                React.createElement('div', { key: 'price', style: { color: '#4caf50', fontSize: '14px' } }, `$${p.price.toFixed(2)}`)
            ])
        ))
    ]);
};

export default ProductView;