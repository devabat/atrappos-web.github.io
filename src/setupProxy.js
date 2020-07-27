// /client/src/setupProxy.js

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/api/*', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/*', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/chart/draw/duration', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/chart/edit/count', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/chart/edit/duration', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/chart/evaluation/count', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/chart/evaluation/per/path', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/chart/draw/types/count/per/user', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/chart/draw/types/total/count', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/chart/draw/types/distance/per/user', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/paths/chart/draw/types/total/distance', { target: 'http://localhost:5000', secure: false, changeOrigin: true }));
    app.use(proxy('/api/users/*', { target: 'http://localhost:5000', secure: false, changeOrigin: true }))
}
