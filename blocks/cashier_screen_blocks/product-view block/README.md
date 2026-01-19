# 🍕 Product View Block

A composable block for displaying products in a grid layout with category filtering and search functionality.

## Block I/O Architecture

### Inputs

| Input ID | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `menu-items` | `MenuItem[]` | ✅ Yes | - | List of products to display |
| `selected-category` | `string` | ❌ No | `"all"` | Filter products by category |

### Outputs

| Output ID | Type | Description |
|-----------|------|-------------|
| `product-selected` | `MenuItem` | Emitted when user clicks a product card |

### MenuItem Type

```typescript
interface MenuItem {
  id: number | string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
}
```

## Features

- ✅ **Category Filtering**: Automatically filters products based on `selected-category` input
- ✅ **Search Functionality**: Real-time search across product names
- ✅ **Responsive Grid**: Auto-adjusting grid layout
- ✅ **Visual Feedback**: Hover effects and smooth transitions
- ✅ **Empty States**: Helpful messages when no products match filters
- ✅ **Stats Display**: Shows product count and category information

## Usage Example

```tsx
import ProductView from './product-view-block';
import { MenuItem } from './product-view-block/types';

function App() {
  const menuItems: MenuItem[] = [
    { id: 1, name: 'Burger', price: 5.99, category: 'Food', image: '🍔' },
    { id: 2, name: 'Pizza', price: 8.99, category: 'Food', image: '🍕' },
    // ... more items
  ];

  const handleProductSelected = (product: MenuItem) => {
    console.log('Product selected:', product);
    // Connect to Order Cart Block or other blocks
  };

  return (
    <ProductView
      inputs={{
        'menu-items': menuItems,
        'selected-category': 'Food'
      }}
      onOutput={(outputId, data) => {
        if (outputId === 'product-selected') {
          handleProductSelected(data);
        }
      }}
    />
  );
}
```

## Block Connections

This block is designed to work with other blocks in the cashier system:

```
Product View Block → Order Cart Block
  (product-selected) → (product-selected)
```

Example connection:

```tsx
// Product View emits product-selected
<ProductView
  inputs={{ 'menu-items': items }}
  onOutput={(id, product) => {
    if (id === 'product-selected') {
      // Pass to Order Cart Block
      orderCartInputs['product-selected'] = product;
    }
  }}
/>
```

## Development

### Build

```bash
npm install
npm run build
```

This creates a bundled `dist/main.js` file that can be loaded by the block loader.

### File Structure

```
product-view block/
├── src/
│   ├── index.tsx       # Main component
│   ├── types.ts        # TypeScript definitions
│   └── sampleData.ts   # Sample menu data
├── dist/
│   └── main.js         # Bundled output
├── block.json          # Block metadata
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Block Metadata

The `block.json` file defines this block's interface for the marketplace:

```json
{
  "id": "product-view",
  "name": "Product View",
  "version": "1.0.0",
  "icon": "🍕",
  "inputs": [...],
  "outputs": [...]
}
```

## Integration with Block System

This block follows the composable block architecture:

1. **Inputs are reactive**: When parent updates inputs, the block re-renders
2. **Outputs are events**: User interactions emit typed events via `onOutput`
3. **Type-safe**: Full TypeScript support for inputs and outputs
4. **Reusable**: Can be used in any context that needs product display

## Version

**1.0.0** - Initial release with core functionality
