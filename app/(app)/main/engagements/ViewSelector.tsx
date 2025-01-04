"use client"
import Typography from "@/components/Typography";
import { useOutsideClick } from "@/lib/hooks";
import React from "react";
import { useState } from "react";


export type View = "List" | "Calendar"
const options: View[] = ["List", "Calendar"];

interface ViewSelectorProps {
    view: View;
    setView: React.Dispatch<React.SetStateAction<View>>;
}

const ViewSelector = ({ view, setView }: ViewSelectorProps) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };
    const selectOption = (view: View) => {
        setView(view);
        setShowDropDown(false);
    };
    const ref = React.useRef(null);
    useOutsideClick(ref, () => setShowDropDown(false));

    return (
        <>
            <div ref={ref}>
                <div className="flex flex-row justify-center xl:justify-start items-end cursor-pointer" onClick={toggleDropDown}>
                    <Typography variant="h1">{view}</Typography>
                    <div className="h-[50px] pl-2 flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="15" viewBox="0 0 26 15" fill="" >
                            <path d="M13 15L0.00961876 0L25.9904 0L13 15Z" fill="#1E2A78" />
                        </svg>
                    </div>
                </div>

                {
                    showDropDown && (
                        <div className="absolute top-[190px] rounded-lg z-10 bg-white shadow w-[150px] p-[5px] ">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => selectOption(option)}
                                    className="hover:bg-[#97a1d6] cursor-pointer rounded-[5px] p-[5px]"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ViewSelector