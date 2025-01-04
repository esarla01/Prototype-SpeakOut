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
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full flex align-center justify-center pt-4">
            <div className='w-[144px] h-[144px] flex items-center justify-center bg-[#E4E4E4] border border-[#61646D] rounded-full'>
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
                        className="w-full h-full object-cover rounded-full" 
                        width={100}
                        height={100}
                    />
                    :
                    <span className="text-white text-3xl"> <UploadIcon /> </span>
                }
            </div>
        </div>
    );
};

export default ImageUpload;
