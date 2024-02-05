import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Category from './Category';
import { format } from 'date-fns';

interface ICardEvent {
  event: any;
}

const CardEventUniq: React.FC<ICardEvent> = ({ event }) => {
  const date = format(new Date(event.startDate), 'dd MMMM yyyy');
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(event.price);
  return (
    <section>
      <Link href={`/event/${event.id}`}>
        <div className="max-w-sm rounded-3xl min-h-full overflow-hidden shadow-lg bg-lightbrown group transform cursor-pointer  border  transition-colors duration-300 hover:border-transparent hover:bg-orangee">
          <div className="flex justify-between px-6 py-4">
            <div className="font-semibold">
              <p>{date}</p>
              <p>{formattedPrice}</p>
            </div>
          </div>
          <div className="container w-full h-[200px] relative ">
            <Image
              className="object-cover px-6 rounded-[40px] "
              src="/img1.jpg"
              alt="Sunset in the mountains"
              fill
            />
          </div>
          <div className=" px-6 pt-2 flex gap-2">
            {event.Event_category?.map((value: any) => {
              return <Category key={value.id} value={value} />;
            })}
          </div>
          <div className="px-6 py-4">
            <div className="font-bold line-clamp-2 font-mono text-4xl mb-2">
              {event.title}
            </div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet,
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default CardEventUniq;
