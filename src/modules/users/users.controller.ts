import { Request, Response } from "express";
import APIResponse from "helpers/Responses";
import UsersService from "./users.service";

export default class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const user = await this.usersService.getUserById(userId);
    APIResponse.listed(res, user);
  };

  search = async (req: Request, res: Response) => {
    const { search } = req.body;
    const users = await this.usersService.searchUsers(search);
    APIResponse.listed(res, users);
  };

  updatePassword = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const { password } = req.body;
    const user = await this.usersService.updatePassword(userId, password);
    APIResponse.updated(res, user);
  };

  disableUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const user = await this.usersService.disableUser(
      userId,
      res.locals.user.id
    );
    APIResponse.deleted(res, user);
  };

  create = async (req: Request, res: Response) => {
    const user = await this.usersService.createUser(req.body);
    APIResponse.created(res, user);
  };

  update = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const { name } = req.body;
    const permissions = req.body.permissions as [string, number][];
    const user = await this.usersService.updateUser(userId, {
      name,
      permissions,
    });
    APIResponse.updated(res, user);
  };
}
