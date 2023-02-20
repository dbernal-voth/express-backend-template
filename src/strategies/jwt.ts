import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import config from "config";
import UsersService, { User } from "modules/users/users.service";

interface ITokenPayload {
  username: string;
  permissions: [string, number][];
  sub: number;
  iat: number;
  exp: number;
}

type CB = (error: null | Error, user?: User) => void;

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function ({ username }: ITokenPayload, cb: CB) {
      try {
        const usersService = new UsersService();

        try {
          const user = await usersService.getUserByUsername(username);
          if (!user) return cb(Error("unauthorized"));

          const permissions =
            typeof user.permissions === "string"
              ? JSON.parse(user.permissions)
              : user.permissions;
          cb(null, {
            ...user,
            permissions,
          });
        } catch (err) {
          console.error(err);
          cb(Error("Error"));
        }
      } catch (error) {
        return cb(Error("internalError"));
      }
    }
  )
);
