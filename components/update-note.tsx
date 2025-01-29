"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import UpdateNoteForm from "@/components/update-note-form";
import { btnIconStyles, btnStyles } from "@/styles/styles";
import { Doc } from "@/convex/_generated/dataModel";

export default function UpdateNote({ note }: { note: Doc<"notes"> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} className={btnStyles}>
          <Edit className={btnIconStyles} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Your Note</DialogTitle>
          <DialogDescription>
            Type what ever note you want to be searchable later on.
          </DialogDescription>
        </DialogHeader>

        <UpdateNoteForm
          note={note}
          onUpdate={() => {
            setIsOpen(false);
            toast({
              title: "Note updated",
              description: "This note has been updated successfully.",
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
