import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "lib/db";

export type { User } from "@prisma/client";

type UserCreationAttr = Pick<User, "name" | "username" | "permissions"> & {
  password: string;
};

type UserUpdateAttr = Partial<Pick<User, "name" | "permissions">>;

export default class UsersService {
  async getUserById(id: User["id"]) {
    return prisma.user.findUnique({ where: { id } });
  }

  async getUserByUsername(username: User["username"]) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  async createUser({
    name,
    username,
    permissions,
    password,
  }: UserCreationAttr) {
    const userExits = await this.getUserByUsername(username);
    if (userExits) throw new Error("username already exist");

    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        name,
        username,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        permissions: permissions || [],
      },
    });
  }

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
  }

  async searchUsers(searchText: string) {
    return prisma.user.findMany({
      where: {
        username: {
          contains: searchText,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async disableUser(userId: User["id"], disabledBy: User["id"]) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        disabledBy,
        disabledAt: new Date(),
      },
    });
  }
}
