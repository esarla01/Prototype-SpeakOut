import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateToAMPM(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Check whether AM or PM
  let newformat = hours >= 12 ? 'PM' : 'AM';

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  const minutesString = minutes < 10 ? '0' + minutes: minutes;

  return hours + ':' + minutesString + ' ' + newformat
}

export function formatDate(date: Date) {
  // Array of day names
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  // Array of month names
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // Get the day of the week, date, and month
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  // Return the formatted string
  return `${month} ${dayOfMonth},`;
}