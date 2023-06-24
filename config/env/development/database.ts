import path from "path";

// ./config/env/development/database.ts
export default ({ env }) => {
  const dbPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    ".tmp",
    "data.db"
  );

  return {
    connection: {
      client: "sqlite",
      connection: {
        filename: dbPath,
      },
      useNullAsDefault: true,
    },
  };
};
