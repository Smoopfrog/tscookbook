import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import recipesRoutes from "./routes/recipes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

const allowedOrigins = [
  "https://tscookbook.onrender.com",
  "http://localhost:3000",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
};

app.use(
  cors<Request>({
    origin: "https://tscookbook.onrender.com",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      secure: true,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_DB_CONNECTION,
    }),
  })
);

app.use("/api/users", userRoutes);
app.use("/api/recipes", requiresAuth, recipesRoutes);

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
