import { MenuItem } from './types';

/**
 * Sample menu items for testing the Product View Block
 */
export const sampleMenuItems: MenuItem[] = [
    // Burgers
    { id: 1, name: 'Classic Burger', price: 5.99, category: 'Burgers', image: '🍔', description: 'Beef patty with lettuce and tomato' },
    { id: 2, name: 'Cheese Burger', price: 6.99, category: 'Burgers', image: '🍔', description: 'With melted cheddar cheese' },
    { id: 3, name: 'Double Burger', price: 8.99, category: 'Burgers', image: '🍔', description: 'Two beef patties' },

    // Pizza
    { id: 4, name: 'Margherita Pizza', price: 12.99, category: 'Pizza', image: '🍕', description: 'Classic tomato and mozzarella' },
    { id: 5, name: 'Pepperoni Pizza', price: 14.99, category: 'Pizza', image: '🍕', description: 'Loaded with pepperoni' },
    { id: 6, name: 'Veggie Pizza', price: 13.99, category: 'Pizza', image: '🍕', description: 'Fresh vegetables' },

    // Sides
    { id: 7, name: 'French Fries', price: 2.99, category: 'Sides', image: '🍟', description: 'Crispy golden fries' },
    { id: 8, name: 'Onion Rings', price: 3.99, category: 'Sides', image: '🧅', description: 'Beer-battered onion rings' },
    { id: 9, name: 'Mozzarella Sticks', price: 4.99, category: 'Sides', image: '🧀', description: 'Fried cheese sticks' },

    // Drinks
    { id: 10, name: 'Coca Cola', price: 1.99, category: 'Drinks', image: '🥤', description: 'Classic cola' },
    { id: 11, name: 'Lemonade', price: 2.49, category: 'Drinks', image: '🍋', description: 'Fresh squeezed' },
    { id: 12, name: 'Iced Tea', price: 2.29, category: 'Drinks', image: '🧃', description: 'Sweet or unsweet' },

    // Mexican
    { id: 13, name: 'Beef Taco', price: 3.99, category: 'Mexican', image: '🌮', description: 'Seasoned beef taco' },
    { id: 14, name: 'Chicken Burrito', price: 7.99, category: 'Mexican', image: '🌯', description: 'Grilled chicken burrito' },
    { id: 15, name: 'Nachos', price: 5.99, category: 'Mexican', image: '🧀', description: 'Loaded nachos' },

    // Hot Dogs
    { id: 16, name: 'Classic Hot Dog', price: 4.99, category: 'Hot Dogs', image: '🌭', description: 'All-beef hot dog' },
    { id: 17, name: 'Chili Dog', price: 5.99, category: 'Hot Dogs', image: '🌭', description: 'Topped with chili' },

    // Salads
    { id: 18, name: 'Caesar Salad', price: 6.99, category: 'Salads', image: '🥗', description: 'Romaine with Caesar dressing' },
    { id: 19, name: 'Greek Salad', price: 7.99, category: 'Salads', image: '🥗', description: 'Feta and olives' },

    // Desserts
    { id: 20, name: 'Vanilla Ice Cream', price: 3.50, category: 'Desserts', image: '🍦', description: 'Classic vanilla' },
    { id: 21, name: 'Chocolate Cake', price: 4.99, category: 'Desserts', image: '🍰', description: 'Rich chocolate cake' },
    { id: 22, name: 'Apple Pie', price: 4.50, category: 'Desserts', image: '🥧', description: 'Warm apple pie' }
];
