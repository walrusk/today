const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const { resolve } = require('path');
const { vars: modifyVars } = require('./src/styles/vars.js');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    
    config = rewireLess.withLoaderOptions({modifyVars})(config, env);
    
    config.resolve = {
        alias: {
            '@': resolve('src/wedges'),
            'src': resolve('src'),
            'store': resolve('src/store'),
        }
    };
    
    return config;
};
