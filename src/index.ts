import CashierScreen from './ui/CashierScreen';
import metadata from './metadata.json';

// Block entry point
export default {
    metadata,
    component: CashierScreen,

    // Block lifecycle methods
    initialize: async () => {
        console.log('Restaurant Cashier Block initialized');
    },

    activate: async () => {
        console.log('Restaurant Cashier Block activated');
    },

    deactivate: async () => {
        console.log('Restaurant Cashier Block deactivated');
    },

    uninstall: async () => {
        console.log('Restaurant Cashier Block uninstalled');
    }
};
