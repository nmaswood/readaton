import { BookType } from "@/lib/types/book";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type ReadbookProps = {
  book: BookType;
};

export default function ReadBook({ book }: ReadbookProps) {
  return (
    <Dialog>
      <DialogTrigger className="bg-black text-white rounded-md h-12 px-8">
        Read
      </DialogTrigger>
      <DialogContent className="p-4 top-4 translate-y-0 max-w-6xl">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-screen w-full rounded-md mx-auto my-12">
          <div className="bg-gray-50 border border-gray-200 rounded px-4 mb-36">
            <p className="whitespace-pre-wrap font-mono text-justify">
              {book.text}
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
