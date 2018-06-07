const vue = require("rollup-plugin-vue");
const nodeResolve = require("rollup-plugin-node-resolve");
const replace = require("rollup-plugin-replace");
const json = require("rollup-plugin-json");
const butternut = require("rollup-plugin-butternut");
const buble = require("rollup-plugin-buble");

const production = process.env.NODE_ENV === "production";

export default {
    entry: "src/js/main.js",
    format: "iife",
    moduleName: "website",
    useStrict: false,
    sourceMap: !production,
    dest: "deploy/docker/dist/js/bundle.js",
    plugins: [
        vue({compileTemplate: true}),
        replace({
            "process.env.NODE_ENV": JSON.stringify(production ? "production" : "development")
        }),
        json(),
        buble({
            transforms: {
                forOf: false,
                modules: false
            }
        }),
        nodeResolve({ browser: true, jsnext: true, main: true }),
        production ? butternut({ sourceMap: false }) : {}
    ]
}