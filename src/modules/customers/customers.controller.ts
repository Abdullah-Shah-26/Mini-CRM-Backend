import { Request, Response, NextFunction } from "express";
import { CustomersService } from "./customers.service";

const customersService = new CustomersService();

export class CustomersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await customersService.create(req.body);
      return res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await customersService.getAll(page, limit, search);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const customer = await customersService.getById(id);
      return res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const customer = await customersService.update(id, req.body);
      return res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await customersService.delete(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
