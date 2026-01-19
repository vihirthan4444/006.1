/**
 * Example: How to integrate Product View Block with other blocks
 * This demonstrates the Block I/O Architecture in action
 */

import React, { useState } from 'react';
import ProductView from './index';
import { MenuItem } from './types';
import { sampleMenuItems } from './sampleData';

/**
 * Example Parent Component that manages block connections
 */
export const ProductViewExample = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [lastSelectedProduct, setLastSelectedProduct] = useState<MenuItem | null>(null);

    // Handle output from Product View Block
    const handleProductViewOutput = (outputId: string, data: MenuItem) => {
        if (outputId === 'product-selected') {
            console.log('Product selected:', data);
            setLastSelectedProduct(data);

            // In a real application, this would propagate to Order Cart Block:
            // connectionService.propagateData('product-view', 'product-selected', data);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Category Selector (could be another block) */}
            <div style={{
                padding: '16px',
                backgroundColor: '#2d2d2d',
                borderBottom: '1px solid #444',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
            }}>
                <h4 style={{ width: '100%', margin: '0 0 8px 0', color: '#fff' }}>
                    Select Category:
                </h4>
                {['all', 'Burgers', 'Pizza', 'Sides', 'Drinks', 'Mexican', 'Hot Dogs', 'Salads', 'Desserts'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: selectedCategory === cat ? '2px solid #4caf50' : '1px solid #666',
                            backgroundColor: selectedCategory === cat ? '#4caf50' : '#3a3a3a',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: selectedCategory === cat ? 'bold' : 'normal'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product View Block */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <ProductView
                    inputs={{
                        'menu-items': sampleMenuItems,
                        'selected-category': selectedCategory
                    }}
                    onOutput={handleProductViewOutput}
                />
            </div>

            {/* Debug Panel - Shows last selected product */}
            {lastSelectedProduct && (
                <div style={{
                    padding: '16px',
                    backgroundColor: '#2d2d2d',
                    borderTop: '1px solid #444',
                    color: '#fff'
                }}>
                    <h4 style={{ margin: '0 0 8px 0' }}>
                        🔌 Output Event: product-selected
                    </h4>
                    <pre style={{
                        margin: 0,
                        padding: '12px',
                        backgroundColor: '#1e1e1e',
                        borderRadius: '6px',
                        fontSize: '12px',
                        overflow: 'auto'
                    }}>
                        {JSON.stringify(lastSelectedProduct, null, 2)}
                    </pre>
                    <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#888' }}>
                        ℹ️ This data would be passed to the Order Cart Block via the Connection Service
                    </p>
                </div>
            )}
        </div>
    );
};

/**
 * Example: Block Connection Service (simplified)
 * In a real implementation, this would manage all block connections
 */
class BlockConnectionService {
    private connections: Map<string, Array<{ targetBlock: string; targetInput: string }>> = new Map();

    // Register a connection between blocks
    connect(
        sourceBlock: string,
        sourceOutput: string,
        targetBlock: string,
        targetInput: string
    ) {
        const key = `${sourceBlock}:${sourceOutput}`;
        if (!this.connections.has(key)) {
            this.connections.set(key, []);
        }
        this.connections.get(key)!.push({ targetBlock, targetInput });
        console.log(`✅ Connected: ${sourceBlock}.${sourceOutput} → ${targetBlock}.${targetInput}`);
    }

    // Propagate data from one block to connected blocks
    propagateData(sourceBlock: string, outputId: string, data: any) {
        const key = `${sourceBlock}:${outputId}`;
        const targets = this.connections.get(key) || [];

        targets.forEach(target => {
            console.log(`📤 Propagating ${outputId} to ${target.targetBlock}.${target.targetInput}`, data);
            // In real implementation, this would update the target block's inputs
        });
    }
}

/**
 * Example: Complete 3-Block System Setup
 */
export const setupCashierSystem = () => {
    const connectionService = new BlockConnectionService();

    // Setup connections as per block_io_diagrams.md
    connectionService.connect(
        'product-view',      // Source block
        'product-selected',  // Source output
        'order-cart',        // Target block
        'product-selected'   // Target input
    );

    connectionService.connect(
        'cashier-topbar',    // Source block
        'table-selected',    // Source output
        'order-cart',        // Target block
        'table-info'         // Target input
    );

    return connectionService;
};

export default ProductViewExample;
