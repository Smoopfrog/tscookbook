import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import recipesRoutes from "./routes/recipes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

const allowedOrigins = ["https://tscookbook.onrender.com"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors<Request>({ origin: "https://tscookbook.onrender.com" }));

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
