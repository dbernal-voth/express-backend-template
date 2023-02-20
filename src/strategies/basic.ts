import passport from "passport";
import { BasicStrategy } from "passport-http";

import AuthService from "modules/auth/auth.service";

passport.use(
  new BasicStrategy({ passReqToCallback: true }, async function (
    _,
    username,
    password,
    cb
  ) {
    try {
      const authService = new AuthService();
      const user = await authService.verifyLogin(username, password);
      return cb(null, user);
    } catch (error: any) {
      console.log(error);
      return cb(error?.message || "Error al iniciar sesión");
    }
  })
);
