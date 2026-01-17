// Cashier Topbar Block - Simple bundle
import React from 'react';

const CashierTopbar = () => {
    return React.createElement('div', {
        style: { padding: '0 10px', display: 'flex', alignItems: 'center', height: '100%', width: '100%', color: '#ccc' }
    }, [
        React.createElement('div', { key: 'title', style: { fontWeight: 'bold', marginRight: '20px', color: '#fff' } }, '🍽️ Cashier Station'),
        React.createElement('div', {
            key: 'table',
            style: { padding: '4px 12px', backgroundColor: '#333', borderRadius: '4px', marginRight: '10px', fontSize: '13px' }
        }, [
            'Table: ',
            React.createElement('span', { key: 'num', style: { color: '#4caf50', fontWeight: 'bold' } }, '#5')
        ]),
        React.createElement('div', {
            key: 'server',
            style: { padding: '4px 12px', backgroundColor: '#333', borderRadius: '4px', fontSize: '13px' }
        }, 'Server: John Doe'),
        React.createElement('div', { key: 'spacer', style: { flex: 1 } }),
        React.createElement('div', {
            key: 'time',
            style: { fontFamily: 'monospace' }
        }, new Date().toLocaleTimeString())
    ]);
};

export default CashierTopbar;
