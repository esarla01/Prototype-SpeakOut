import React, { useState, ChangeEvent } from 'react';

interface Props {
  placeholder: string;
}

export default function LargeTextInput({ placeholder }: Props) {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-4">
      <textarea
        rows={7} // Set the number of visible rows
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-primarydarkblue rounded-md shadow-sm focus:outline-none focus:border-primarydarkblue focus:ring focus:ring-[#bfdbfe] transition duration-200 placeholder-primarydarkblue text-base overflow-y-auto text-med font-inter text-black"
      />
    </div>
  );
};