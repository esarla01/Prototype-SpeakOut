import { useOutsideClick } from "@/lib/hooks";
import { radialGradientBackground } from "@/lib/styles";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function PopupModal({ onClose, children }: { onClose: () => void, children: React.ReactNode }) {
    const ref = React.useRef(null)
    useOutsideClick(ref, onClose)

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center xs:w-full">
            <div className="absolute top-0 left-0 w-full h-full" style={radialGradientBackground}>
                <div ref={ref} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white border-[#380D5A] border md:rounded-xl p-6 text-left md:w-[70%] w-full flex flex-col overflow-y-auto md:h-auto h-full  max-h-screen">
                    <div className="flex justify-end">
                        <AiOutlineClose className="cursor-pointer" onClick={onClose} />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}