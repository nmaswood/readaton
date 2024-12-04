"use client";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PopoverContent } from "./ui/popover";
import { analyzeBook } from "@/app/actions/analyzeBook";
import { useState, useTransition } from "react";
import { Prompts } from "@/lib/enums/prompts";
import { ScrollArea } from "./ui/scroll-area";

export default function AITools({ text }: { text: string }) {
  const [isPending, startTransition] = useTransition();
  const [aiResponse, setAiResponse] = useState("");

  const [sheetOpen, setSheetOpen] = useState(false);

  const handleClick = (text: string, analysis: string) => {
    setSheetOpen(true);
    setAiResponse("");
    startTransition(async () => {
      const data = await analyzeBook(text, analysis);
      setAiResponse(data.response);
    });
  };

  return (
    <div className="fixed bottom-10 right-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="xl" className="font-medium">
            <Sparkles />
            AI Tools
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 invert space-y-4">
          <div
            className="space-y-2 cursor-pointer"
            onClick={() => handleClick(text, Prompts.PLOTSUMMARY)}
          >
            <h4 className="font-semibold leading-none">Plot Summary</h4>
            <p className="text-sm text-muted-foreground">
              Generate a concise, comprehensive overview of the book&apos;s key
              narrative elements
            </p>
          </div>

          <div
            className="space-y-2 cursor-pointer"
            onClick={() => handleClick(text, Prompts.KEYCHARACTERS)}
          >
            <h4 className="font-semibold leading-none">
              Identify Key Characters
            </h4>
            <p className="text-sm text-muted-foreground">
              Identify the key characters in the book
            </p>
          </div>

          <div
            className="space-y-2 cursor-pointer"
            onClick={() => handleClick(text, Prompts.SENTIMENTANALYSIS)}
          >
            <h4 className="font-semibold leading-none">Sentiment Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Dive deep into the book&apos;s emotional landscape,
            </p>
          </div>

          <div
            className="space-y-2 cursor-pointer"
            onClick={() => handleClick(text, Prompts.LANGUAGEDETECTION)}
          >
            <h4 className="font-semibold leading-none">Language Detection</h4>
            <p className="text-sm text-muted-foreground">
              Detect what language the book was written in
            </p>
          </div>
        </PopoverContent>
      </Popover>
      <Sheet open={sheetOpen} onOpenChange={(open) => setSheetOpen(open)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>AI Response</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div>
            {isPending && (
              <div className="flex justify-center items-center h-screen">
                <div className="inline-block animate-spin">
                  <Sparkles size={48} />
                </div>
              </div>
            )}
            {aiResponse && (
              <ScrollArea className="h-screen w-full rounded-md mx-auto">
                <div className="p-2 mx-auto border border-gray-200 rounded whitespace-pre-wrap font-mono mb-24">
                  {aiResponse}
                </div>
              </ScrollArea>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
