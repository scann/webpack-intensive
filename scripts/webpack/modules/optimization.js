//Core
import webpack from 'webpack';
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

        // production: собирает зависимость более эффективно, если в package.json зависимости стоит "sideEffects": false
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

export const loadLocales = () => ({
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb|uk/)
    ],
});
