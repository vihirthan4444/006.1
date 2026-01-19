import React, { useState, useMemo } from 'react';
import { BlockProps, MenuItem } from './types';

/**
 * Product View Block
 * 
 * Inputs:
 * - menu-items: MenuItem[] - List of products to display
 * - selected-category: string - Filter products by category (default: 'all')
 * 
 * Outputs:
 * - product-selected: MenuItem - Emitted when user clicks a product card
 */
const ProductView: React.FC<BlockProps> = ({ inputs, onOutput }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Get inputs with defaults
    const menuItems = inputs['menu-items'] || [];
    const selectedCategory = inputs['selected-category'] || 'all';

    // Filter products based on category and search query
    const filteredProducts = useMemo(() => {
        return menuItems.filter(item => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [menuItems, selectedCategory, searchQuery]);

    // Handle product selection
    const handleProductClick = (product: MenuItem) => {
        onOutput('product-selected', product);
    };

    // Get unique categories for display
    const categories = useMemo(() => {
        const cats = new Set(menuItems.map(item => item.category));
        return ['all', ...Array.from(cats)];
    }, [menuItems]);

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1e1e1e',
            color: '#fff'
        }}>
            {/* Header with search */}
            <div style={{
                padding: '12px',
                borderBottom: '1px solid #333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
            }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>
                    🍕 Menu
                    {selectedCategory !== 'all' && (
                        <span style={{
                            marginLeft: '8px',
                            fontSize: '14px',
                            color: '#888',
                            fontWeight: 'normal'
                        }}>
                            / {selectedCategory}
                        </span>
                    )}
                </h3>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #444',
                        backgroundColor: '#2d2d2d',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        minWidth: '200px'
                    }}
                />
            </div>

            {/* Product Grid */}
            <div style={{
                padding: '12px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '12px',
                overflowY: 'auto',
                flex: 1
            }}>
                {filteredProducts.length === 0 ? (
                    <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '40px',
                        color: '#888'
                    }}>
                        {searchQuery ? 'No products found matching your search.' : 'No products available.'}
                    </div>
                ) : (
                    filteredProducts.map(product => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            style={{
                                border: '1px solid #444',
                                borderRadius: '10px',
                                padding: '12px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: '#252526',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#333';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#252526';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '48px', marginBottom: '4px' }}>
                                {product.image || '📦'}
                            </div>
                            <div style={{
                                fontWeight: 'bold',
                                fontSize: '14px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {product.name}
                            </div>
                            {product.description && (
                                <div style={{
                                    fontSize: '11px',
                                    color: '#999',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {product.description}
                                </div>
                            )}
                            <div style={{
                                color: '#4caf50',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginTop: 'auto'
                            }}>
                                ${product.price.toFixed(2)}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer with stats */}
            <div style={{
                padding: '8px 12px',
                borderTop: '1px solid #333',
                fontSize: '12px',
                color: '#888',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>
                    Showing {filteredProducts.length} of {menuItems.length} products
                </span>
                <span>
                    {categories.length - 1} categories
                </span>
            </div>
        </div>
    );
};

export default ProductView;
export const component = ProductView;
