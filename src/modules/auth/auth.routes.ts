import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import signToken from "./helpers/signToken";
import AuthService from "./auth.service";

//const refreshTokens: { [x: string]: string } = {};

require("../../strategies/basic");

export default function authRoutes(app: Router) {
  const router = Router();
  app.use("/auth", router);

  const authService = new AuthService();

  router.post(
    "/sign-in",
    async (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate("basic", function (error, user) {
        try {
          if (error || !user) return next(Error("Unauthorized"));
          req.login(user, { session: false }, async function (error) {
            if (error) return next(error);

            await authService.changeLastLogged(user.id);

            const { id, username, permissions, name } = user;

            /* const refreshToken = randToken.uid(256);
            refreshTokens[refreshToken] = username; */

            const token = signToken({ id, username, permissions });
            const userInfo = { id, username, name };
            res.status(200).json({ user: userInfo, token /* refreshToken */ });
          });
        } catch (err) {
          return next(err);
        }
      })(req, res, next);
    }
  );

  /*   router.post("/token", async (req: Request, res: Response) => {
    const { username, refreshToken } = req.body;
    if (!username || !refreshToken) return APIResponse.unauthorized(res);

    if (
      refreshToken in refreshTokens &&
      refreshTokens[refreshToken] == username
    ) {
      const user = await usersService.getUserByUsername(username);
      if (!user) return APIResponse.unauthorized(res);
      const token = signToken({
        id: user.id,
        username,
        permissions: user.permissions as [string, number][],
      });
      res.status(200).json({ token, done: true });
    } else {
      APIResponse.unauthorized(res);
    }
  }); */
}
