import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "lib/db";

export default class AuthService {
  async verifyLogin(username: User["username"], password: Password["hash"]) {
    const userWithPassword = await prisma.user.findUnique({
      where: { username },
      include: {
        password: true,
      },
    });
    if (!userWithPassword || !userWithPassword.password) {
      throw new Error("Usuario y/o contraseña inválidos");
    }
    const isValid = await bcrypt.compare(
      password,
      userWithPassword.password.hash
    );

    if (!isValid) throw new Error("Usuario y/o contraseña inválidos");
    if (userWithPassword.disabledAt) {
      throw new Error("Esta cuenta se encuentra deshabilitada.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = userWithPassword;
    return userWithoutPassword;
  }

  async changeLastLogged(id: User["id"]) {
    return prisma.user.update({
      where: { id },
      data: {
        loggedAt: new Date(),
      },
    });
  }

  /*
  async updateUser(userId: User["id"], { name, permissions }: UserUpdateAttr) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(permissions && { permissions }),
      },
    });
  }

  async updatePassword(userId: User["id"], newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return prisma.password.update({
      where: { userId },
      data: {
        hash: hashedPassword,
      },
    });
  } */
}
