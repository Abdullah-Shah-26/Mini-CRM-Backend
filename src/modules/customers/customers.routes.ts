import { Router } from "express";
import { CustomersController } from "./customers.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validateDto } from "../../middleware/validate.middleware";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

const router = Router();
const customersController = new CustomersController();

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer (Admin only)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Acme Corp
 *               email:
 *                 type: string
 *                 example: contact@acme.com
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *               company:
 *                 type: string
 *                 example: Acme Corporation
 *     responses:
 *       201:
 *         description: Customer created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Email or phone already exists
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validateDto(CreateCustomerDto),
  customersController.create,
);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers with pagination
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of customers
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, customersController.getAll);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 */
router.get("/:id", authenticate, customersController.getById);

/**
 * @swagger
 * /customers/{id}:
 *   patch:
 *     summary: Update customer (Admin only)
 *     tags: [Customers]
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
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Customer not found
 *       409:
 *         description: Email or phone already exists
 */
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateDto(UpdateCustomerDto),
  customersController.update,
);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer (Admin only)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Customer not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  customersController.delete,
);

export default router;
