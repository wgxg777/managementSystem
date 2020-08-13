module.exports = {
    // baseUrl: './',
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
    configureWebpack: {
        externals: {
         'AMap': 'AMap' // 高德地图配置
        }
       }
}