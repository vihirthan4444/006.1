# 🍕 Product View Block - Quick Reference

## Block ID
`product-view`

## Version
`1.0.0`

## One-Line Description
Display products in a grid with category filtering and search

---

## Inputs

| ID | Type | Required | Default |
|----|------|----------|---------|
| `menu-items` | `MenuItem[]` | ✅ | - |
| `selected-category` | `string` | ❌ | `"all"` |

## Outputs

| ID | Type | When Emitted |
|----|------|--------------|
| `product-selected` | `MenuItem` | User clicks product card |

---

## Quick Start

```tsx
import ProductView from './product-view-block';

<ProductView
  inputs={{
    'menu-items': menuItems,
    'selected-category': 'Pizza'
  }}
  onOutput={(id, data) => {
    console.log('Output:', id, data);
  }}
/>
```

---

## MenuItem Type

```typescript
{
  id: number | string;
  name: string;
  price: number;
  category: string;
  image?: string;        // Emoji or URL
  description?: string;  // Short description
}
```

---

## Build

```bash
npm run build
# Output: dist/main.js (3.72 KiB)
```

---

## Connections

```
Product View → Order Cart
  product-selected → product-selected
```

---

## Files

- `src/index.tsx` - Main component
- `src/types.ts` - TypeScript types
- `src/sampleData.ts` - Test data
- `block.json` - Metadata
- `dist/main.js` - Bundle

---

## Status

✅ **COMPLETE** - Production ready
