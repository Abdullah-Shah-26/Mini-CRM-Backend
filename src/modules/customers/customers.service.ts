import prisma from "../../config/database";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { NotFoundError } from "../../utils/errors";

export class CustomersService {
  async create(data: CreateCustomerDto) {
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
      },
    });

    return customer;
  }

  async getAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {};

    // Get total count
    const totalRecords = await prisma.customer.count({ where });

    // Get paginated data
    const customers = await prisma.customer.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      page,
      limit,
      totalRecords,
      totalPages,
      data: customers,
    };
  }

  async getById(id: number) {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    return customer;
  }

  async update(id: number, data: UpdateCustomerDto) {
    // Check if customer exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      throw new NotFoundError("Customer not found");
    }

    // Update customer
    const customer = await prisma.customer.update({
      where: { id },
      data,
    });

    return customer;
  }

  async delete(id: number) {
    // Check if customer exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      throw new NotFoundError("Customer not found");
    }

    // Delete customer
    await prisma.customer.delete({
      where: { id },
    });

    return { message: "Customer deleted successfully" };
  }
}
