/**
 * Type definitions for Product View Block
 */

export interface MenuItem {
    id: number | string;
    name: string;
    price: number;
    category: string;
    image?: string;
    description?: string;
}

export interface ProductViewInputs {
    'menu-items': MenuItem[];
    'selected-category'?: string;
}

export interface ProductViewOutputs {
    'product-selected': MenuItem;
}

export interface BlockProps {
    inputs: ProductViewInputs;
    onOutput: <K extends keyof ProductViewOutputs>(
        outputId: K,
        data: ProductViewOutputs[K]
    ) => void;
}
