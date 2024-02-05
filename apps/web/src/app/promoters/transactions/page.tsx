'use client';
import SidebarPromoter from '../components/SidebarPromoter';
import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/lib/baseUrl';
import { useAppSelector } from '@/lib/hooks';
import ModalAccept from './ModalAccept';
import ModalDecline from './ModalDecline';
import ModalProofOfPayment from './ModalProofOfPayment';

interface IStatus {
  id: number;
  title: string;
  createdAt: Date;
}

interface IData {
  uuid: string;
  eventId: number;
  qty: number;
}

interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  referralCode: string;
}

interface IRole {
  id: number;
  userId: number;
  name: string;
}
interface IEvent {
  id: number;
  title: string;
  description: string;
  locationId: number;
  startDate: Date;
  endDate: Date;
  price: number;
  limit: number;
  booked: number;
  thumbnail: string;
  userId: number;
  createdAt: Date;
  updateAt: Date;
}

export interface ITransaction {
  id: number;
  uuid: string;
  userId: number;
  eventId: number;
  statusId: number;
  qty: number;
  paymentImg: string;
  total: number;
  pointsUsed: number;
  createdAt: Date;
  updaetAt: Date;
  status: IStatus;
  user: IUser;
  event: IEvent;
}

const Transactions = () => {
  // const [transactions, setTransactions] = useState([
  //   {
  //     id: 52,
  //     customer: 'Anggi',
  //     event: 'Taylor Swift Concert',
  //     quantity: 1,
  //     total: '$422',
  //     status: 'Transaction Success',
  //   },
  //   {
  //     id: 53,
  //     customer: 'Budi',
  //     event: 'Ed Sheeran Concert',
  //     quantity: 2,
  //     total: '$800',
  //     status: 'Waiting Admin Confirmation',
  //   },
  //   {
  //     id: 54,
  //     customer: 'Citra',
  //     event: 'Coldplay Concert',
  //     quantity: 1,
  //     total: '$399',
  //     status: 'Waiting Payment',
  //   },
  //   {
  //     id: 55,
  //     customer: 'Dewi',
  //     event: 'The Weeknd Concert',
  //     quantity: 1,
  //     total: '$499',
  //     status: 'Cancelled Transaction)',
  //   },
  //   {
  //     id: 56,
  //     customer: 'Eko',
  //     event: 'K-Pop Festival',
  //     quantity: 3,
  //     total: '$1200',
  //     status: 'Expired Transaction',
  //   },
  //   {
  //     id: 57,
  //     customer: 'Fina',
  //     event: 'Rock in Rio',
  //     quantity: 2,
  //     total: '$850',
  //     status: 'Rejected Transaction',
  //   },
  // ]);

  const [openModal, setOpenModal] = useState(false);
  const selector = useAppSelector((state) => state.user);
  const [transactions, setTransaction] = useState<ITransaction[]>();
  const [image, setImage] = useState('');
  const [modalDecline, setModalDecline] = useState(false);
  const [modalAccept, setModalAccept] = useState(false);
  const [modalProof, setModalProof] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const handleAccept = (transactionId: any) => {
    setSelectedTransactionId(transactionId);
    setModalAccept(true);
  };
  const handleDecline = (transactionId: any) => {
    setSelectedTransactionId(transactionId);
    setModalDecline(true);
  };

  useEffect(() => {
    if (selector.id) {
      handleGetTransaction();
    }
  }, [selector.id]);

  const handleGetTransaction = async () => {
    try {
      const { data } = await axios.get(
        baseUrl + '/transactions/filter/' + selector.id,
      );
      setTransaction(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (image: string) => {
    setModalProof(true);
    setImage(image);
  };

  // const confirmDecline = () => {
  //   console.log('Declined transaction', selectedTransactionId);
  //   // Update the transactions state with the declined transaction
  //   setTransactions((currentTransactions) =>
  //     currentTransactions.map((transaction) =>
  //       transaction.id === selectedTransactionId
  //         ? { ...transaction, status: 'Rejected Transaction' }
  //         : transaction,
  //     ),
  //   );
  //   setOpenModal(false);
  // };

  // const confirmAccept = () => {
  //   console.log('Declined transaction', selectedTransactionId);
  //   // Update the transactions state with the declined transaction
  //   setTransactions((currentTransactions) =>
  //     currentTransactions.map((transaction) =>
  //       transaction.id === selectedTransactionId
  //         ? { ...transaction, status: 'Transaction Success' }
  //         : transaction,
  //     ),
  //   );
  //   setOpenModal(false);
  // };
  // Determine if the Accept and Decline buttons should be displayed for a transaction

  const shouldShowActions = (status: number) => {
    return [1, 2].includes(status);
  };

  return (
    <div className="flex w-full ">
      <SidebarPromoter activeLink={'transactions'} />
      <div className="bg-white p-20 w-full">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          Transactions
        </h1>

        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Customer</Table.HeadCell>
              <Table.HeadCell>Event</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Total</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Action</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {transactions?.map((transaction: ITransaction) => (
                <Table.Row
                  key={transaction.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {transaction.id}
                  </Table.Cell>
                  <Table.Cell>
                    {transaction?.user?.firstName} {transaction?.user?.lastName}
                  </Table.Cell>
                  <Table.Cell>{transaction?.event?.title}</Table.Cell>
                  <Table.Cell>{transaction?.qty}</Table.Cell>
                  <Table.Cell>{transaction?.total}</Table.Cell>
                  <Table.Cell>{transaction?.status.title}</Table.Cell>
                  <Table.Cell className="flex justify-between">
                    <Button
                      className="font-medium hover:underline "
                      onClick={() => handleImage(transaction.paymentImg || '')}
                    >
                      View
                    </Button>
                    {shouldShowActions(transaction.status.id) && (
                      <>
                        <Button
                          className="font-medium hover:underline "
                          onClick={() => handleAccept(transaction.id)}
                        >
                          Accept
                        </Button>

                        <Button
                          className="font-medium hover:underline "
                          onClick={() => handleDecline(transaction.id)}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <ModalProofOfPayment
        openModal={modalProof}
        setOpenModal={setModalProof}
        image={image}
      />
      <ModalAccept
        openModal={modalAccept}
        setOpenModal={setModalAccept}
        selectedTransactionId={selectedTransactionId}
        refreshData={handleGetTransaction}
      />
      <ModalDecline
        openModal={modalDecline}
        setOpenModal={setModalDecline}
        selectedTransactionId={selectedTransactionId}
        refreshData={handleGetTransaction}
      />
    </div>
  );
};

export default Transactions;



