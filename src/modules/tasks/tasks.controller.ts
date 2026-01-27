import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { TasksService } from "./tasks.service";

const tasksService = new TasksService();

export class TasksController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const task = await tasksService.create(req.body);
      return res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const userRole = req.user!.role;

      const tasks = await tasksService.getAll(userId, userRole);
      return res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const taskId = parseInt(req.params.id);
      const userId = req.user!.id;
      const userRole = req.user!.role;

      const task = await tasksService.updateStatus(
        taskId,
        req.body,
        userId,
        userRole,
      );
      return res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
}
