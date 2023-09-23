require("dotenv/config");

/** @type {import('@graphql-codegen/cli').CodegenConfig} */
const config = {
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        Authorization: `Bearer ${process.env?.GH_TOKEN}`,
        "user-agent": "node.js",
      },
    },
  },
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/graphql/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
  },
};

module.exports = config;
