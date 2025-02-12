module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@navigation": "./src/navigation",
            "@hooks": "./src/hooks",
            "@theme": "./src/theme",
            "@utils": "./src/utils",
            "@api": "./src/api",
            "@types": "./src/types",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
