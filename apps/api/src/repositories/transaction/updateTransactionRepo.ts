import prisma from '@/prisma';
import { ITransaction } from '@/types/transaction.type';

export const updateTransactionRepo = async (id: number, body: ITransaction) => {
  try {
    const result = await prisma.transaction.update({
      where: { id },
      data: body,
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
