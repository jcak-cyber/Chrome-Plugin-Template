import { defineConfig, loadEnv } from "vite";
import path from "path";
import { HRMMiddleware } from "./rollup-plugins/hrm";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  const isDev = env.VITE_IS_DEV === 'true'

  const plugins = [
    vue(),
    vueJsx(),
    viteStaticCopy({
      targets: [
        { src: "../manifest.json", dest: "" }, // 复制 manifest.json 到 extensions 目录
        { src: "icons", dest: "" }, // 复制 src/icons/** 到 extensions/icons 目录
      ],
    }),
  ];
  
  if(isDev) plugins.push(HRMMiddleware())

  return {
    root: "src/",
    plugins,
    build: {
      outDir: path.resolve(__dirname, "extensions"),
      rollupOptions: {
        input: {
          popup: path.resolve(__dirname, "src/popup/index.html"),
          options: path.resolve(__dirname, "src/options/index.html"),
          content: path.resolve(__dirname, "src/content/content.ts"),
          background: path.resolve(
            __dirname,
            "src/background/service-worker.ts"
          ),
        },
        output: {
          assetFileNames: "assets/[name]-[hash].[ext]", // 静态资源
          chunkFileNames: "js/[name]-[hash].js", // 代码分割中产生的 chunk
          entryFileNames: (chunkInfo) => {
            // 入口文件
            if (!chunkInfo?.facadeModuleId || !chunkInfo?.name) {
              return "[name]/[name].js";
            }
            const baseName = path.basename(
              chunkInfo.facadeModuleId,
              path.extname(chunkInfo.facadeModuleId)
            );
            const saveArr = ["content", "service-worker"];
            return `[name]/${
              saveArr.includes(baseName) ? baseName : chunkInfo.name
            }.js`;
          },
          name: "[name].js",
        },
      },
    },
  };
});
