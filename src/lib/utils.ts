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

export const getTokenFromCookie = (key: string) => {
  try {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${key}=`)
    );
    if (!tokenCookie) return null;
    return tokenCookie.split(`${key}=`)[1];
  } catch (error) {
    console.error("Error extracting token from cookie:", error);
    return null;
  }
};

export const deleteCookie = (cookieName: string): boolean => {
  // Check if cookie exists
  const cookies = document.cookie.split(";");
  const cookieExists = cookies.some((cookie) =>
    cookie.trim().startsWith(`${cookieName}=`)
  );

  if (!cookieExists) {
    return false;
  }

  // Build cookie string with past expiration
  const cookieValue = `${cookieName}=;`;
  document.cookie = cookieValue;

  return true;
};

// create a function to set a cookie with a given name and value
export const setCookie = (name: string, value: string, days: number) => {
  // calculate the expiration date
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  // build the set-cookie string
  const cookieValue = `${name}=${value}; expires=${date.toUTCString()}; path=/`;

  // set the cookie
  document.cookie = cookieValue;
};
