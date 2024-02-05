import { baseUrl } from '@/lib/baseUrl';
import axios from 'axios';
import { Button, Modal } from 'flowbite-react';
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ModalDecline = ({
  openModal,
  setOpenModal,
  selectedTransactionId,
  refreshData,
}: any) => {
  const confirmDecline = async () => {
    try {
      await axios.patch(baseUrl + `/transactions/${selectedTransactionId}`, {
        statusId: 6,
      });
      refreshData();
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
    setOpenModal(false);
  };
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-700 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to decline this transaction?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={confirmDecline}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDecline;
