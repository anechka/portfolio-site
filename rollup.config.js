import vue from 'rollup-plugin-vue'
import json from 'rollup-plugin-json';
import serve from 'rollup-plugin-serve'

const terser = require("rollup-plugin-terser").terser;
const includePaths = require("rollup-plugin-includepaths");

const isDev = process.env.NODE_ENV !== "production";
const isWatchMode = process.env.ROLLUP_WATCH;

export default {
    input: "src/js/main.js",
    output: {
        file: "deploy/docker/dist/js/app.js",
        format: "iife",
        sourcemap: isDev,
        interop: false,
        strict: false,
        exports: "named",
        globals: {
            vue: "vendor.Vue",
            pluralize: "vendor.Pluralize",
            markdown: "vendor.markdown",
            Parallax: "vendor.Parallax"
        },
        name: "app"
    },
    external: [ "vue", "pluralize", "markdown", "Parallax" ],
    watch: {
        include: "src/js/**",
        exclude: "node_modules/**"
    },
    plugins: [
        includePaths({
            paths: ["src/js"],
            extensions: [".js", ".json", ".vue"]
        }),
        vue({ css: false }),
        json(),
        (!isDev && terser({ sourcemap: isDev, safari10: true, mangle: { reserved: ["Vue", "exports"]}})),
        isWatchMode && serve({
            contentBase: "deploy/docker/dist",
            host: "0.0.0.0",
            port: 8080,
        })
    ]
}