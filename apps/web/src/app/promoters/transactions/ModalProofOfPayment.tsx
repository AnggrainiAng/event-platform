'use client';
import { baseUrl } from '@/lib/baseUrl';
import { Button, Modal } from 'flowbite-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ModalProofOfPayment = ({ openModal, setOpenModal, image }: any) => {
  return (
    <div>
      {openModal && (
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              {image ? (
                <Image
                  src={image}
                  height={800}
                  width={700}
                  alt="bukti pembayaran"
                />
              ) : (
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              )}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ModalProofOfPayment;