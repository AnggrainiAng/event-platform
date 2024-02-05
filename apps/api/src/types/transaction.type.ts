export interface ITransaction {
  id: number;
  uuid: string;
  userId: number;
  eventId: number;
  statusId: number;
  qty: number;
  paymentProof: string;
  total: number;
  pointsUsed: number;
  createdAt: Date;
  updaetAt: Date;
}
