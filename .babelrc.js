module.exports = (api) => {

    const env = api.env(); //process.env.BABEL_ENV || process.env.NODE_ENV

    //api.cache.using(() => env === 'development'); // TODO: research

    api.cache.never();

    const plugins = ['@babel/proposal-class-properties'];

    // if (env === 'development') {
    // TODO: прорисерчить react-hot-loader
    //     plugins.push('react-hot-loader/babel');
    // }

    return {
        presets: [
            '@babel/react',
            [
                '@babel/env',
                {
                    debug: false,
                    spec: true, // specification, делает код более медленным, но более надежным
                    loose: false, // делает код более быстрым, но отходит от стандарта
                    modules: false, // webpack хорошо работает только с ES2015 модулями
                },
            ],
    ],
        plugins,
        // dev (react-hot-loader нужен)
        // или
        // prod (react-hot-loader не нужен)
    }
};