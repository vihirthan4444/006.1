import React from 'react';

const CashierTopbar = () => {
    return (
        <div style={{ padding: '0 10px', display: 'flex', alignItems: 'center', height: '100%', width: '100%', color: '#ccc' }}>
            <div style={{ fontWeight: 'bold', marginRight: '20px', color: '#fff' }}>🍽️ Cashier Station</div>
            <div style={{ padding: '4px 12px', backgroundColor: '#333', borderRadius: '4px', marginRight: '10px', fontSize: '13px' }}>
                Table: <span style={{ color: '#4caf50', fontWeight: 'bold' }}>#5</span>
            </div>
            <div style={{ padding: '4px 12px', backgroundColor: '#333', borderRadius: '4px', fontSize: '13px' }}>
                Server: John Doe
            </div>
            <div style={{ flex: 1 }}></div>
            <div style={{ fontFamily: 'monospace' }}>
                {new Date().toLocaleTimeString()}
            </div>
        </div>
    );
};

export default CashierTopbar;
