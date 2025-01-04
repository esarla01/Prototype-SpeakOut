"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  currentDate: Date;
}

export default function MonthSwitch({ currentDate }: Props) {
  const prevDate = () => {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();

    // Adjust for month and year when month is January
    if (month === 0) {
      month = 11;
      year--;
    } else {
      month--;
    }
    return new Date(year, month, day);
  };

  const nextDate = () => {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();

    // Adjust for month and year when month is December
    if (month === 11) {
      month = 0;
      year++;
    } else {
      month++;
    }

    return new Date(year, month, day);
  };

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="flex items-center justify-center">
      <Link
        href={`?${new URLSearchParams({date: prevDate().toISOString()})}`}
        replace={true}
        className="mx-2 text-blue-900 font-bold cursor-pointer"
      >
        <AiOutlineArrowLeft />
      </Link>

      <div
        className="mx-2 font-serif text-black text-regular text-3xl min-w-[225px] text-center"
      >
        {formattedDate}
      </div>

      <Link
        href={`?${new URLSearchParams({date: nextDate().toISOString()})}`}
        replace={false}
        className="mx-2 text-blue-900 font-bold cursor-pointer"
      >
        <AiOutlineArrowRight />
      </Link>
    </div>
  );
}