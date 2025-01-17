import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loadScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const login = () => {
  const AUTH_URL = `${import.meta.env.VITE_API_BASE_URL}/authorize`;
  window.location.href = AUTH_URL;
};

export const getTokenFromCookie = () => {
  try {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("authtoken=")
    );
    if (!tokenCookie) return null;
    return tokenCookie.split("=")[1];
  } catch (error) {
    console.error("Error extracting token from cookie:", error);
    return null;
  }
};
