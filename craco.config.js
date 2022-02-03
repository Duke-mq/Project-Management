/* 修改主题色参考antd的官方文档 https://ant.design/docs/react/use-with-create-react-app-cn*/
const CracoLessPlugin = require('craco-less');
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': 'rgb(0,82,204)','@font-size-base': '16px' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};