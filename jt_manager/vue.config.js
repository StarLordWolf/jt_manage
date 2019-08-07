module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.jt.com',
                ws: true,
                changeOrigin: true
            },
            '/uploads': {
                target: 'http://www.jt.com',
                ws: true,
                changeOrigin: true
            },
        }
    }
}