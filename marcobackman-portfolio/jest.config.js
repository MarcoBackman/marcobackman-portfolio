module.exports = {
    moduleDirectories: [
        'node_modules', // Ensure modules are resolved from node_modules
        '<rootDir>/src',
    ],
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest', // Transpile JSX/JS with Babel
    },
    moduleNameMapper: {
        // Explicitly map 'react-router-dom' if Jest struggles to resolve it
        '^react-router-dom$': '<rootDir>/node_modules/react-router-dom/dist/index.js',
        '\\.(css|scss|sass|less)$': 'identity-obj-proxy', // Mock CSS imports
    },
    testEnvironment: 'jsdom', // Ensures React can render components in tests
};