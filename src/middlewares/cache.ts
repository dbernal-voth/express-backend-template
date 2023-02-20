import { Request, Response, NextFunction } from "express";
const period = 60 * 5; // 5 minutes

export function setCache(req: Request, res: Response, next: NextFunction) {
  // here you can define period in second, this one is 5 minutes

  // you only want to cache for GET requests
  if (req.method == "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    // for the other requests set strict no caching parameters
    res.set("Cache-control", `no-store`);
  }

  // remember to call next() to pass on the request
  next();
}
