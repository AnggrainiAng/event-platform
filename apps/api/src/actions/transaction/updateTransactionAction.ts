import { updateTransactionRepo } from '@/repositories/transaction/updateTransactionRepo';
import { ITransaction } from '@/types/transaction.type';

export const updateTransactionAction = async (
  id: number,
  body: ITransaction,
) => {
  try {
    const transaction = await updateTransactionRepo(id, body);
    return {
      status: 200,
      message: 'Success Update',
      data: transaction,
    };
  } catch (error) {
    throw error;
  }
};
