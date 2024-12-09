import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { BookType } from "@/lib/types/book";

type Props = {
  books: BookType[];
};
export default function Books({ books }: Props) {
  if (!books.length) {
    return (
      <div className="flex justify-center items-center flex-col space-y-6 py-12">
        <p className="text-2xl font-semibold">
          You do not have any books saved yet
        </p>
        <Link href="/find">
          <Button size="lg" className="font-semibold">
            Find a book
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-end">
        <Link href="/find">
          <Button size="lg" className="font-semibold">
            Find a book
          </Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-8 grid-cols-2 p-8 place-items-center bg-gray-50 mt-4 rounded-md">
        {books.map((book: BookType) => {
          return (
            <Link href={`/book?id=${book.id}`} key={book.id}>
              <div className="rounded-md cursor-pointer place-self-center">
                <Image
                  src={book.coverImg}
                  alt={book.title}
                  width={300}
                  height={38}
                  priority
                />
                <div className="font-semibold line-clamp-2 h-12 overflow-hidden text-ellipsis w-[300px] mt-2">
                  <p className="font-semibold">{book.title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
