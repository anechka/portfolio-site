const nodeResolve = require("rollup-plugin-node-resolve");
const replace = require("rollup-plugin-re");
const json = require("rollup-plugin-json");
const terser = require("rollup-plugin-terser").terser;

const isDev = process.env.NODE_ENV !== "production";

export default {
    input: "src/js/vendor.js",
    output: {
        file: "deploy/docker/dist/js/vendor.js",
        format: "iife",
        sourcemap: false,
        interop: false,
        strict: false,
        exports: "named",
        name: "vendor"
    },

    plugins: [
        replace({
            exclude: "src/js/**",
            replaces: {
                "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production")
            }
        }),
        json(),
        nodeResolve({ browser: true, jsnext: true, main: true, modulesOnly: true }),
        (!isDev && terser({ sourcemap: false }))
    ]
}