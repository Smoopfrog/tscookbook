import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import recipesRoutes from "./routes/recipes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import session from "express-session";
import env from "./util/validateEnv";
import { default as connectMongoDBSession } from "connect-mongodb-session";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

const allowedOrigins = [
  "https://tscookbook.onrender.com",
  "http://localhost:3000",
];

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: env.MONGO_DB_CONNECTION,
  collection: "mySessions",
});

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
    rolling: true,
    store: store,
  })
);

app.use(
  cors<Request>({
    credentials: true,
    origin: allowedOrigins,
  })
);

app.enable("trust proxy");
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipesRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured.";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
