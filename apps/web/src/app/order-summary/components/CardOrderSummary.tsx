'use client';

import { CustomerGuard } from '@/lib/HOC/CustomerGuard';
import { baseUrl } from '@/lib/baseUrl';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import { Button, Modal, TextInput, Checkbox } from 'flowbite-react';
import { useState } from 'react';

import React from 'react';

export interface IReferralPoints {
  id?: number;
  userId: number;
  pointEarned: number;
  dateEarned?: Date;
  expiresOn: Date;
}

const CardOrderSummary = () => {
  const [openModal, setOpenModal] = useState(false);
  const selector = useAppSelector((state) => state.user);
  const [items, setItems] = useState([
    { id: 1, name: 'Early Bird', price: 1000000, quantity: 5 },
    { id: 2, name: 'Full Price', price: 1000000, discount: 10000, quantity: 1 },
  ]);
  const [usePoints, setUsePoints] = useState(false);
  const [showNoPointsMessage, setShowNoPointsMessage] = useState(false);
  const [points, setPoints] = useState(50000); // Assuming the customer has 50,000 points

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
    // Recalculate total if needed
  };
  const [point, setPoint] = useState(0);

  const handleUsePointsChange = async () => {
    const { data } = await axios.get(baseUrl + `/reward/points/${selector.id}`);
    setPoint(data.data.pointEarned);
    setUsePoints(!usePoints);
  };
  const handleSubmit = () => {
    // Handle the transaction submission with the current items and total
    console.log(`Submitting order with total: ${calculateTotal()}`);
    onCloseModal();
  };

  // Calculate the total based on the dummy data
  const calculateTotal = () => {
    const subtotal = items.reduce(
      (acc, item) => acc + (item.price - (item.discount || 0)) * item.quantity,
      0,
    );
    const discounts = 10000; // Rp. 10.000 discount for simplicity
    const rewards = 10000; // Rp. 10.000 reward for simplicity

    let total = subtotal - discounts - rewards;

    if (usePoints) {
      total -= point; // Deduct points if usePoints is true
    }

    return Math.max(total, 0); // Ensure total doesn't go below zero
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Open Transaction Modal</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Order Summary
            </h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span>{item.name}</span>
                <div className="flex items-center gap-2">
                  <TextInput
                    id={`quantity_${item.id}`}
                    type="number"
                    value={item.quantity.toString()}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value, 10) || 1,
                      )
                    }
                    min="1"
                    required
                  />
                  <span>IDR {item.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>Rp. {calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="use-points"
                className="flex items-center cursor-pointer"
              >
                <Checkbox
                  id="use-points"
                  checked={usePoints}
                  onChange={(e) => handleUsePointsChange()}
                />
                <span className="ml-2">Use Points</span>
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button color="gray" onClick={onCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Confirm</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomerGuard(CardOrderSummary);
