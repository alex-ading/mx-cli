import CommonjsPlugin from "@rollup/plugin-commonjs";
import NodeResolvePlugin from "@rollup/plugin-node-resolve";
import TypescriptPlugin from "@rollup/plugin-typescript";
import DtsPlugin from "rollup-plugin-dts";

const plugins = [
  NodeResolvePlugin(),
  CommonjsPlugin(),
  TypescriptPlugin(),
];

export default [
  {
    input: 'src/index.ts',
    plugins,
    output: [
      {
        file: "dist/esm/index.js",
        format: "esm"
      },
      {
        file: "dist/index.js",
        format: "umd",
        name: "skd"
      },
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/esm/index.d.ts",
      format: "esm"
    },
    plugins: [DtsPlugin()]
  }
];
