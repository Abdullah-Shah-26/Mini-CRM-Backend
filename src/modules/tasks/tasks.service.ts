import prisma from "../../config/database";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { NotFoundError, ForbiddenError } from "../../utils/errors";

export class TasksService {
  async create(data: CreateTaskDto) {
    // Check if assigned user exists and has EMPLOYEE role
    const assignedUser = await prisma.user.findUnique({
      where: { id: data.assignedTo },
    });

    if (!assignedUser) {
      throw new NotFoundError("Assigned user not found");
    }

    if (assignedUser.role !== "EMPLOYEE") {
      throw new ForbiddenError("Tasks can only be assigned to employees");
    }

    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: data.customerId },
    });

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    // Create task
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        assignedTo: data.assignedTo,
        customerId: data.customerId,
        status: data.status || "PENDING",
      },
    });

    return task;
  }

  async getAll(userId: number, userRole: string) {
    // Admin sees all tasks, Employee sees only their tasks
    const where = userRole === "ADMIN" ? {} : { assignedTo: userId };

    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return tasks;
  }

  async updateStatus(
    taskId: number,
    data: UpdateTaskStatusDto,
    userId: number,
    userRole: string,
  ) {
    // Check if task exists
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    // Employee can only update their own tasks
    if (userRole === "EMPLOYEE" && task.assignedTo !== userId) {
      throw new ForbiddenError("You can only update tasks assigned to you");
    }

    // Update task status
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status: data.status },
    });

    return updatedTask;
  }
}
