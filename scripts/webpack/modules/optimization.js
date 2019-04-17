//Core
import { ContextReplacementPlugin } from 'webpack';
import ImageminWebpackPlugin from 'imagemin-webpack';
import TerserPlugin from 'terser-webpack-plugin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

/**
 *
 * production - оптимизация включена только в mode: 'production'
 * development - оптимизация включена только в mode: 'development'
 * ✔ - оптимизация включена в mode: 'production' и mode: 'development'
 *
 */
export const optimizeBuild = () => ({
    optimization: {
        nodeEnv: 'production',

        // dependency graph -> компиляция
        // module graph -> output
        // chunk graph -> output

        // production: минификация JavaScript.
        minimize:  false,
        minimizer: [new TerserPlugin()],

        //production: останавливает эмит борки при возникновении ошибки во время компиляции
        noEmitOnErrors: true,

        // ✔ Не добавляет в сборку пустые чанки - это уменьшает нагрузку на систему, что ускоряет ребилд
        removeEmptyChunks: true,

        // ✔ Объединяет эквивалентные чанки
        mergeDuplicateChunks: true,

        // ✔ Удаляет модуль из чанка, если этот модуль присутствует в родительском чанке (то есть уже доступен)
        removeAvailableModules: true,

        // production: находит наиболее часто используемые модули и дает им наименьшие идентификаторы
        // Таким образом наиболее часто используемые модули смогут быть загружены в сборку быстрее.
        // Эта настройка также помогает вебпаку более эффективно компрессировать финальную сборку.
        // TODO webpack 5 remove optimization.occurenceOrder
        occurrenceOrder: true,

        // ? эта настройка зависит от providedExports и usedExports
        // production: анализирует module graph и пытается найти модули, которые можно смержить в один
        concatenateModules: true, //module concatenation or scope hoisting

        // ✔ определяет экспортированные сущности для каждого модуля.
        // Эта информация помогает остальным продвинутым оптимизациям вебпак.
        providedExports: true,

        // production: определяет использованные экспортированные сущности для каждого модуля.
        // Эта информация помогает остальным продвинутым оптимизациям вебпак.
        // Пример: минификаторы и DCE(dead code elimination) могут удалять неиспользованные экспорты
        // ? эта настройка зависит от providedExports
        usedExports: true,

        // production: собирает зависимость более эффективно, если в package.json зависимости тоже стоит этот флаг.
        // ? эта настройка зависит от providedExports и usedExports
        sideEffects: true, //TODO: (TREE SHAKING) посмотреть

        // development: вместо числовых идентификаторов дает модулям более понятные имена.
        // TODO: webpack 5 add 'moduleIds: "named" default for development
        // TODO: webpack 5 'moduleIds: "size" default for production
        // TODO: webpack 5 remove optimization.namedModules
        namedModules: false,

        // Определяет механизм генерирования индентификатора для модуля
        // https://webpack.js.org/configuration/optimization/#optimizationmoduleids
        moduleIds: false,

        // development: вместо числовых идентификаторов дает чанкам более понятные имена.
        // TODO: webpack 5 add 'chunksIds: "named" default for development
        // TODO: webpack 5 'chunksIds: "size" default for production
        // TODO: webpack 5 remove optimization.namedChunks
        namedChunks: false,

        // Определяет механизм генерирования индентификатора для чанка
        // https://webpack.js.org/configuration/optimization/#optimizationchunkids
        chunkIds: false,

        //initial chunk (vendors code - react, react-dom)
        //async chunk (on demand)

        //Эта опция включена всегда. Конфигурируется в SplitChunksPlugin
        splitChunks: {
            //режим разделения кода. По умолчанию - async.
            chunks: 'all', // async, initial, all = (async + initial - is preferred)

            // Минимальный размер чанка для отделения.
            minSize: 30000, //bytes

            // Максимальный размер нового чанка для отделения.
            maxSize: 0,

            // Минимальное количество чанков, которые зависят от модуля
            // перед отделением этого модуля в отдельный чанк.
            minChunks: 1,

            // Максимальное количество одновременных параллельных запросов чанков для асинхронного сплит-поинта (динамический импорт).
            // Всегда предпочитаются чанки большего размера.
            maxAsyncRequests: 5,

            // Максимальное количество одновременных параллельных запросов чанков на один entrypoint.
            // Всегда предпочитаются чанки большего размера.
            maxInitialRequests: 3,

            // Символ-разделитель имени сплит-чанка (напр. vendors~main.js).
            automaticNameDelimiter: '~',
            // Определяет имя нового чанка
            name:                   true,

            // Мо-умолчанию cacheGroups наследует от остальных опций splitChunks ↑.
            // Уникальные для cacheGroups только test, priority и reuseExistingChunk.
            // Ключ каждой кеш-группы определяет её имя.
            // По-умолчанию вебпак устанавливает две кеш-группы:
            cacheGroups: {
                // Дефолтная кеш-группа. Выносит все зависимости из node_nodules в чанк vendors.
                vendors: {
                    // TODO: чекнуть исходный код webpack
                    // Выбирает модули, внесённые в данную кеш-группу. Если не указать будут выбраны все модули.
                    test:     /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    // Дефолтная кеш-группа. Выносит любой модуль-зависимость в отдельный чанк default
                    // при условии дублирования модуля-зависимости хотя-бы в двух чанках.
                    minChunks:          2,
                    // Приоритет кеш-группы. Если модуль попадает сразу в несколько кеш-групп, то выбирется
                    // кеш-группа с более высоким priority, или которая составляет чанк большего размера.
                    // У дефолтных кеш-групп отрицательный приоритет,
                    // поэтому кастомные кеш-группы приоритетнее (их priority 0 по-умолчанию).
                    priority:           -20,
                    // Если чанк содержит уже существующий отделённый чанк,
                    // то используется этот уже существующий отделённый чанк вместо создания нового
                    reuseExistingChunk: true,
                },
                test1: {
                    // Дефолтная кеш-группа. Выносит любой модуль-зависимость в отдельный чанк default
                    // при условии дублирования модуля-зависимости хотя-бы в двух чанках.
                    minChunks:          2,
                    // Приоритет кеш-группы. Если модуль попадает сразу в несколько кеш-групп, то выбирется
                    // кеш-группа с более высоким priority, или которая составляет чанк большего размера.
                    // У дефолтных кеш-групп отрицательный приоритет,
                    // поэтому кастомные кеш-группы приоритетнее (их priority 0 по-умолчанию).
                    priority:           -20,
                    // Если чанк содержит уже существующий отделённый чанк,
                    // то используется этот уже существующий отделённый чанк вместо создания нового
                    reuseExistingChunk: true,
                },
                test2: {
                    // Дефолтная кеш-группа. Выносит любой модуль-зависимость в отдельный чанк default
                    // при условии дублирования модуля-зависимости хотя-бы в двух чанках.
                    minChunks:          2,
                    // Приоритет кеш-группы. Если модуль попадает сразу в несколько кеш-групп, то выбирется
                    // кеш-группа с более высоким priority, или которая составляет чанк большего размера.
                    // У дефолтных кеш-групп отрицательный приоритет,
                    // поэтому кастомные кеш-группы приоритетнее (их priority 0 по-умолчанию).
                    priority:           -20,
                    // Если чанк содержит уже существующий отделённый чанк,
                    // то используется этот уже существующий отделённый чанк вместо создания нового
                    reuseExistingChunk: true,
                },
            },
        },
        //Выносит webpack runtime каждого entrypoint в отдельный чанк. false по умолчанию
        runtimeChunk: true, //TODO: разобрать
    },
});

export const optimizeImages = () => ({
    plugins: [
        new ImageminWebpackPlugin({
            imageminOptions: {
                plugins: [
                    imageminMozjpeg({
                        progressive: true,
                        quality:     60,
                    }),
                    imageminPngquant({
                        quality: 60,
                    }),
                    imageminSvgo()
                ],
            },
        })
    ],
});

export const filterMomentLocales = () => ({
    plugins: [
        new ContextReplacementPlugin(/moment[/\\]locale$/, /(en)/)
    ],
});
