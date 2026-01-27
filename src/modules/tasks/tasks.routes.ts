import { Router } from "express";
import { TasksController } from "./tasks.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validateDto } from "../../middleware/validate.middleware";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";

const router = Router();
const tasksController = new TasksController();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task (Admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - assignedTo
 *               - customerId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fix login bug
 *               description:
 *                 type: string
 *                 example: User reported login issue
 *               assignedTo:
 *                 type: integer
 *                 example: 2
 *               customerId:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, DONE]
 *                 example: PENDING
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Customer or user not found
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validateDto(CreateTaskDto),
  tasksController.create,
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks (Admin sees all, Employee sees only assigned)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, tasksController.getAll);

/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     summary: Update task status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, DONE]
 *                 example: IN_PROGRESS
 *     responses:
 *       200:
 *         description: Task status updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Employee updating someone else's task)
 *       404:
 *         description: Task not found
 */
router.patch(
  "/:id/status",
  authenticate,
  validateDto(UpdateTaskStatusDto),
  tasksController.updateStatus,
);

export default router;
