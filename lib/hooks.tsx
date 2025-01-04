import { useEffect } from "react";

export function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && 
            !ref.current.contains(event.target as Node) && 
            !((event.target as HTMLElement).classList.toString().includes("pac-") ||
              (event.target as HTMLElement).parentElement?.classList.toString().includes("pac-"))) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}