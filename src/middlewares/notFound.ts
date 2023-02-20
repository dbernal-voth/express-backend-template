import { Request, Response } from "express";

function notFoundHandler(_: Request, res: Response) {
  res.status(404).json({
    error: "Not Found",
    message: "missing",
  });
}

export default notFoundHandler;
