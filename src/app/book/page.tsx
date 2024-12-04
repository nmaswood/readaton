"use client";

import SingleBook from "@/components/Book";
import { BookType } from "@/lib/types/book";
import { findSavedBook } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Book() {
  const searchParams = useSearchParams();
  const [book, setBook] = useState<BookType | null>(null);

  const id = searchParams.get("id");

  useEffect(() => {
    const found = findSavedBook("myBooks", id ?? "");
    if (found) {
      setBook(found);
    }
  }, [id]);

  if (!book) {
    return (
      <div>
        <p>Book not found</p>
      </div>
    );
  }

  return (
    <div>
      <SingleBook book={book} />
    </div>
  );
}
