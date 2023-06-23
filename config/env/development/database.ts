import path from "path";

// ./config/env/development/database.ts
export default ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: path.join(__dirname, "..", "..", "..", ".tmp", "data.db"),
    },
    useNullAsDefault: true,
  },
});
