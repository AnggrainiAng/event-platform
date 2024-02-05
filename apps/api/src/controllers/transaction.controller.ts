import { getTransactionByIdAction } from '@/actions/transaction/getTransactionById.action';
import { updateTransactionAction } from '@/actions/transaction/updateTransactionAction';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  async getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await getTransactionByIdAction(Number(id));
      return res.status(result?.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await updateTransactionAction(id, req.body);
      res.status(result.status).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
