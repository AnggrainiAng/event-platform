import prisma from '@/prisma';

export const getTransactionById = async (userId: number) => {
  try {
    const result = await prisma.transaction.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        event: true,
        TransactionDiscount: true,
        status: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
