import { Request, Response, NextFunction } from "express";
import { UsersService } from "./users.service";

const usersService = new UsersService();

export class UsersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await usersService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const user = await usersService.getById(id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const user = await usersService.updateRole(id, req.body);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
