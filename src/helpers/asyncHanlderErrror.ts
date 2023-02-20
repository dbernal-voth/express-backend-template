import { Request, Response } from "express";

export default function asyncHandlerError(
  fn: (req: Request, res: Response) => Promise<void>
) {
  return function asyncHandlerErrorWrap(...args: any) {
    // eslint-disable-next-line prefer-spread
    const fnReturn = fn.apply(null, args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
}
