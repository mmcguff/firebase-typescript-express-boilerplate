// PACKAGES
import * as functions from "firebase-functions";
import * as express from "express";
import {userRouter} from "./routes/user";
import {loggingMiddleware} from "./middleware/logging";

const app = express();
app.use(loggingMiddleware);
app.use("/users", userRouter);


export const api = functions.https.onRequest(app);
