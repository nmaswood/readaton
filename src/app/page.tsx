"use client";

import Animatedloader from "@/components/AnimatedLoader";
import Books from "@/components/Books";
import { BookType } from "@/lib/types/book";
import { getFromLocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = () => {
      const data = getFromLocalStorage("myBooks");
      setBooks(data);
      setLoading(false);
    };

    getBooks();
  }, []);

  if (loading) {
    return <Animatedloader />;
  }
  return (
    <div>
      <Books books={books} />
    </div>
  );
}
