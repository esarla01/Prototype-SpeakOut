import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

interface Props {
    label: string;
    onDelete?: () => void;
}

export default function IdentityTag({ label, onDelete }: Props) {
    return (
        <div className='bg-[#1E2A78] px-3 py-1.5 rounded-full text-white text-sm font-sans font-medium inline-block m-1'>
            <span className="flex flex-row">
                {!!onDelete &&
                    <button
                        onClick={onDelete}>
                        <IoCloseOutline className="text-white text-xl" />
                    </button>
                }
                {label}
            </span>
        </div>
    );
}