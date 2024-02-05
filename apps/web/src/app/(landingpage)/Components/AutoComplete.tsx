'use client';
import Select from 'react-select';

import { useParams, useRouter } from 'next/navigation';

const AutoComplete = ({ event }: any) => {
  const router = useRouter();
  const params = useParams();

  const options = event.map((event: any) => {
    return { value: event.id, label: event.title };
  });

  const handleChange = (selectedOption: any) => {
    if (selectedOption && selectedOption.value) {
      router.push(`/event/${selectedOption.value}`);
    }
  };

  return (
    <div className="pt-6">
      <Select
        className=" w-[250px]  relative p-2 lg:p-4 lg:w-full  rounded-full bg-milk"
        options={options}
        isClearable={true}
        isSearchable={true}
        placeholder="Find your Event"
        onChange={handleChange}
      />
    </div>
  );
};

export default AutoComplete;
