import UploadIcon from '@/components/icons/UploadIcon';
import Image from 'next/image';
import React from 'react';

const ImageUpload = ({ image, setImage }: { image: string, setImage: (image: string) => void }) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = typeof reader.result === 'string' ? reader.result.replace("data:", "").replace(/^.+,/, "") : '';
                setImage(`data:image/jpeg;base64,${base64String}`);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        <div className="w-full flex align-center justify-center py-4">
            <div className='flex items-center justify-center max-h-[200px]'>
                <input
                    type="file"
                    accept='image/*'
                    className='opacity-0 cursor-pointer absolute w-[144px] h-[144px]'
                    onChange={handleImageChange}
                />
                {!!image ?
                    <Image 
                        src={image} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        width={100}
                        height={100}
                    />
                    :
                    <span className='p-2 rounded-lg bg-[#E4E4E4]'> Upload Image <UploadIcon /> </span>
                }
            </div>
        </div>
    );
};

export default ImageUpload;
