import { Button } from 'flowbite-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/baseUrl';

const Hero = () => {
  const [events, setEvents] = useState([]);
  const getAllEvents = async () => {
    try {
      const reponse = await axios.get(`${baseUrl}/events/events`);
      setEvents(reponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <section className="item-center top-0  flex  flex-col xl:min-h-screen ">
      <div className="relative w-full ">
        <div className="absolute -z-10  w-full bg-gray-900 ">
          <Image
            src="/bg.avif"
            alt="background image"
            className="cover h-screen w-full object-cover opacity-20 "
            quality={100}
            width={900}
            height={900}
          />
        </div>
        <div className="min-w-full xl:pt-[100px] xl:px-44 ">
          <div className="mx-4 py-9 xl:mx-2">
            <svg
              className="mb-4 h-8 w-8 text-primary text-milk"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>

            <h1 className="mt-3 font-mono text-3xl font-bold text-orangee xl:text-8xl">
              Explore, Connect, Purchase Tickets For Events
            </h1>
            <h2 className=" font-mono text-xs font-bold italic text-milk xl:mt-10 xl:text-2xl">
              From iconic attractions to amazing experience, what will you book
              next?
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
