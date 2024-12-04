"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { findBook, BookState } from "../actions/findBook";
import SingleBook from "@/components/Book";

const initialState: BookState = {
  book: null,
  errors: [],
};

export default function FindBook() {
  const [state, action, isPending] = useActionState(findBook, initialState);

  return (
    <div className="md:py-12 py-8 w-full mx-auto">
      <p className="text-center text-3xl font-bold tracking-tight">
        Find a book
      </p>
      <form action={action}>
        <div className="w-1/2 mx-auto my-6">
          <label className="font-semibold mb-1">Enter book ID</label>
          <div className="flex space-x-2 items-center">
            <Input
              placeholder="Book ID"
              className="border-2 border-black"
              required
              name="id"
            />
            <Button
              type="submit"
              disabled={isPending}
              className="font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </div>
      </form>
      {!isPending && state.book && <SingleBook book={state.book} />}
    </div>
  );
}
