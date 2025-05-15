import '@testing-library/jest-dom';

// Ajout du mock global TextEncoder pour JSDOM
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = require('util').TextEncoder;
}