module.exports = {
    // Directories for module resolution
    moduleDirectories: [
        'node_modules',
        '<rootDir>/src', // Include if using absolute imports from 'src'
    ],

    // Transpile JS/JSX and TS/TSX using Babel
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest', // Use Babel for transpiling JavaScript
    },

    // Module name mappings for mocking specific imports
    moduleNameMapper: {
        // Mock SCSS and other styles (no need for Webpack loaders in tests)
        '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    },

    // Use jsdom for DOM-related React component testing
    testEnvironment: 'jsdom',

    // Optional: Uncomment if react-router-dom needs explicit mapping
    // moduleNameMapper: {
    //    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom/dist/index.js',
    // },
};