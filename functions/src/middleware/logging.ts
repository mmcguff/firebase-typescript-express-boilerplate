import * as functions from "firebase-functions";

export const loggingMiddleware = async (req:any, res:any, next:any) => {
  const reqBody = Object.keys(req.body).length > 0 ?
  `body:${JSON.stringify(req.body)}` : "";
  functions.logger.info(`${req.method} ${req.originalUrl} ${reqBody}`);
  next();
};
