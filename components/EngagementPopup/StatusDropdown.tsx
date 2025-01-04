import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

const statusOptions = ["In-Person", "Virtual", "Hybrid"];

export default function StatusDropdown({ status, setStatus } : { status: string, setStatus: (status: string) => void }) {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    return (
        <div className="relative w-full">
            <div 
                className="border border-black rounded-md px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row justify-between w-full cursor-pointer"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
                <div className="mr-1">{status}</div>
                <span className="mt-1">
                    <AiOutlineDown className="text-sm" />
                </span>
            </div>
            {showStatusDropdown && (
                <div className="absolute w-full bg-white border border-[#d1d5db] rounded-md shadow-lg">
                    {statusOptions.map((option, index) => (
                        <div
                            key={index}
                            className="cursor-pointer px-4 py-2 hover:bg-[#d1d5db]"
                            onClick={() => {
                                setStatus(option)
                                setShowStatusDropdown(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}