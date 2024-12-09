"use client";

import { BookType } from "@/lib/types/book";
import Image from "next/image";
import { addBook, findSavedBook } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "./ui/button";
import AITools from "./AITools";
import ReadBook from "./ReadBook";

type BookProps = {
  book: BookType;
};

export default function SingleBook({ book }: BookProps) {
  const saveBook = () => {
    addBook("myBooks", book);
    toast(`Saved ${book.title}`);
  };

  const isBookSaved = () => {
    const found = findSavedBook("myBooks", book.id);
    if (found) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <div className="flex md:flex-row flex-col my-12 md:justify-start justify-center md:items-start items-center md:space-x-12 space-y-4">
        <div className="flex flex-col space-y-2 md:w-3/12 w-full">
          <Image
            src={book.coverImg}
            alt="Book Cover Image"
            width={220}
            height={38}
            priority
            className="w-full"
          />
          <ReadBook book={book} />
          <Button
            onClick={() => saveBook()}
            size="lg"
            disabled={isBookSaved()}
            variant="link"
            className="bg-green-500 text-white font-semibold"
          >
            {isBookSaved() ? "Saved" : "Save"}
          </Button>
        </div>
        <div className="md:w-9/12 w-full">
          <p className="font-semibold md:text-3xl text-xl tracking-tight">
            {book.title}
          </p>
          <p className="md:text-2xl text-lg mt-1">{book.author}</p>

          <div className="my-6 space-y-4">
            <p>
              Released on{" "}
              <span className="font-semibold">{book.releaseDate}</span>
            </p>
            <p>
              Language <span className="font-semibold">{book.language}</span>
            </p>
            <p>
              Category <span className="font-semibold">{book.category}</span>
            </p>
            <p>
              Credits <span className="font-semibold">{book.credits}</span>
            </p>
            <p>
              Original Publication{" "}
              <span className="font-semibold">{book.originalPublication}</span>
            </p>
            <p>
              Copyright status{" "}
              <span className="font-semibold">{book.copyrightStatus}</span>
            </p>
          </div>
        </div>
      </div>

      <AITools text={book.text} />
    </div>
  );
}
