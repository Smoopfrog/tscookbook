import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_DB_CONNECTION: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
});
