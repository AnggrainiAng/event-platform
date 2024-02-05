'use client';
import SidebarPromoter from '../components/SidebarPromoter';
import { FaSearch } from 'react-icons/fa';
import { Table } from 'flowbite-react';
import { baseUrl } from '@/lib/baseUrl';
import { useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface IEvent {
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
  updateAt: Date | null;
}

const Events = () => {
  const user = useAppSelector((state) => state.user);
  const [events, setEvents] = useState<IEvent[]>([]);

  const listEvent = async () => {
    try {
      if (user.id) {
        const { data } = await axios.get(`${baseUrl}/events/filter/${user.id}`);
        setEvents(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listEvent();
  }, [user.id]);

  return (
    <div className="flex w-full">
      <SidebarPromoter activeLink={'events'} />
      <div className="bg-white p-20 w-full">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          Events
        </h1>

        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Event</Table.HeadCell>
              <Table.HeadCell>Stock</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Created at</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {events.map((item) => {
                const date = new Date(item.createdAt);
                const formatDate = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                const monthName = formatDate.split(',')[0];
                let createdAt = `${date.getFullYear()} ${monthName}`;

                return (
                  <Table.Row
                    key={item.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </Table.Cell>
                    <Table.Cell>{`${item.booked}/${item.limit}`}</Table.Cell>
                    <Table.Cell>{`$${item.price}`}</Table.Cell>
                    <Table.Cell>{createdAt}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Events;
