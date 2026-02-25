import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.]/g, " ") // Convert periods to spaces first
    .replace(/[^\w\s-]/g, "") // Remove remaining special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim();
}
