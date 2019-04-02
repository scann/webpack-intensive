module.exports = (api) => {

    //const env = api.env(); //process.env.BABEL_ENV || process.env.NODE_ENV

    //api.cache.using(() => env === 'development'); // TODO: research

    api.cache.never();

    return {
        presets: [
            [
                '@babel/env',
                {
                    debug: true,
                    spec: true, // specification, делает код более медленным, но более надежным
                    loose: false, // делает код более быстрым, но отходит от стандарта
                    modules: false, // webpack хорошо работает только с ES2015 модулями
                },
            ],
    ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
        // dev (react-hot-loader нужен)
        // или
        // prod (react-hot-loader не нужен)
    }
};