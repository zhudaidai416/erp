const path = require('path');

module.exports = {
  babel: {
    plugins: [
      ["import", {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
      }]
    ]
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};