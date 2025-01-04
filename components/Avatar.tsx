import Image from 'next/image';
import React from 'react';

interface Props {
  image: string;
}

const Avatar: React.FC<Props> = ({ image }) => {
  return (
    <div className="w-[60px] h-[60px] border-2 border-black rounded-full overflow-hidden inline-block">
        <Image 
          src={image} 
          alt="Profile" 
          className="h-full w-full object-cover" 
          width={100}
          height={100}
        />
    </div>
  );
};

export default Avatar;
