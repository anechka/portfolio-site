import vue from 'rollup-plugin-vue'
import json from 'rollup-plugin-json';

const terser = require("rollup-plugin-terser").terser;
const includePaths = require("rollup-plugin-includepaths");

const isDev = process.env.NODE_ENV !== "production";

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
        (!isDev && terser({ sourcemap: false }))
    ]
}