import { TransactionController } from '@/controllers/transaction.controller';
import { verifyToken } from '@/middleware/jwtVerifyToken';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.intializeRoutes();
  }

  private intializeRoutes(): void {
    this.router.get(
      '/filter/:id',
      this.transactionController.getTransactionById,
    );
    this.router.patch('/:id', this.transactionController.updateTransaction);
  }

  getRouter(): Router {
    return this.router;
  }
}
