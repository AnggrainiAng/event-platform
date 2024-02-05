import { getTransactionById } from '@/repositories/transaction/getTransactionByUserId';

export const getTransactionByIdAction = async (id: number) => {
  try {
    console.log(id);

    const data = await getTransactionById(id);
    if (!data) return { status: 404, message: 'Transaction is not found' };
    return {
      status: 200,
      message: 'Success Get Transaction by Id',
      data,
    };
  } catch (error) {
    throw error;
  }
};
