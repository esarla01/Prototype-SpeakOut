import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface props {
    variant?: "h1" | "h2" | "h3" | "h4" | "p1" | "p2" | "b1" | "b2"
    children: ReactNode
}

export default function Typography({ variant="h1", children } : props) {
  let classes = ""
  if (variant == "h1") {
    classes = cn("text-[40px] text-primarydarkblue break-words")
  }
  else if (variant == "h2") {
    classes = cn("text-[24px] font-[400] break-words")
  }
  else if (variant == "h3") {
    classes = "text-[24px] font-inter break-words"
  }
  else if (variant == "h4") {
    classes = "text-[20px] font-inter break-words"
  }
  else if (variant == "p1") {
    classes = "text-[16px] font-inter break-words"
  }
  else if (variant == "p2") {
    classes = "text-[12px] font-inter break-words"
  }
  else if (variant == "b1") {
    classes = "text-[16px] font-inter font-bold break-words"
  }
  else if (variant == "b2") {
    classes = "text-[14px] font-inter break-words"
  }

  return (
    <p className={classes}>
      {children}
    </p>
  );
};


