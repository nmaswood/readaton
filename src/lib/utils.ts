import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BookType } from "./types/book";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFromLocalStorage(key: string) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return null;
  }
}

function saveToLocalStorage(key: string, books: BookType[]): boolean {
  try {
    const serializedData = JSON.stringify(books);
    localStorage.setItem(key, serializedData);
    return true;
  } catch {
    return false;
  }
}


export function findSavedBook(key: string, id: string): BookType | null {
  try {
    const data = localStorage.getItem(key);
    const books = data ? JSON.parse(data) : [];
    const found = books.find((book: BookType) => book.id === id)
    if (found) {
      return found;
    }
    return null;
  } catch {
    return null;
  }
}


export function addBook(key: string, book: BookType): boolean {
  try {
    const books = getFromLocalStorage(key) || [];
    const isDuplicate = books.some((item: BookType) =>
      item.id === book.id
    );

    if (!isDuplicate) {
      books.push(book);
      saveToLocalStorage(key, books);
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
