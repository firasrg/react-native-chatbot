module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./"],
          "extensions": [
            ".ts",
            ".tsx",
            ".jsx",
            ".js",
            ".json"
          ],
          "alias": {
            "@app": "./",
            "@EntryPoint": "./App.tsx",
            "@redux": "./@redux",
          }
        }
      ]
    ]
  };
};
