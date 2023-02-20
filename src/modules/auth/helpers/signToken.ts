import jwt from "jsonwebtoken";
import { TWELVE_HOURS_IN_SECONDS } from "constants/time";
import config from "config";

const expires = TWELVE_HOURS_IN_SECONDS;

export default function signToken(user: {
  id: number;
  username: string;
  permissions: [string, number][];
}) {
  const payload = {
    sub: user.id,
    username: user.username,
    permissions: user.permissions,
  };
  return jwt.sign(payload, config.authJwtSecret, {
    expiresIn: expires,
  });
}
