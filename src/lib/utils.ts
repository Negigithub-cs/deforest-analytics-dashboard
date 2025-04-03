
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatYear(year: number): string {
  const currentYear = new Date().getFullYear();
  if (year > currentYear) {
    return `${year} (Projected)`;
  }
  return year.toString();
}
