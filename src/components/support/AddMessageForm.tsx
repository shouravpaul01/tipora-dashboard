"use client";

import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { useAddMessageMutation } from "@/redux/api/supportApi";
import { FormTextarea } from "../shared/form/FormTextarea";
import { FormFileUpload } from "../shared/form/FormFileUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface AddMessageFormProps {
  ticketId: string;
  onSuccess?: () => void;
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
}

interface AddMessageFormValues {
  message: string;
  isInternalNote: boolean;
  attachments: File[];
}

export default function AddMessageForm({
  ticketId,
  onSuccess,
  dialogOpen,
  setDialogOpen,
}: AddMessageFormProps) {
  const methods = useForm<AddMessageFormValues>({
    defaultValues: {
      message: "",
      isInternalNote: false,
      attachments: [],
    },
  });

  const [addMessage, { isLoading }] = useAddMessageMutation();

  const message = methods.watch("message");
  const isInternalNote = methods.watch("isInternalNote");

  const handleSubmit = async (values: AddMessageFormValues) => {
    if (!values.message.trim()) {
      methods.setError("message", {
        type: "manual",
        message: "Message is required",
      });
      return;
    }

    const formData = new FormData();
    const payload={
        message:values.message.trim(),
        isInternalNote:Boolean(values.isInternalNote)
    }
    formData.append("bodyData", JSON.stringify(payload));

    values.attachments?.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      await addMessage({ ticketId, formData }).unwrap();
      methods.reset();
      toast.success(
        values.isInternalNote
          ? "Internal note added successfully"
          : "Message sent successfully",
      );
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message");
    }
  };

  return (
   <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
   <DialogContent className="max-w-2xl! p-0">
  <DialogHeader className="px-6 pt-6">
    <DialogTitle className="text-lg font-bold">Reply to Ticket</DialogTitle>
  </DialogHeader>

  <FormProvider {...methods}>
    <form
      onSubmit={methods.handleSubmit(handleSubmit)}
      className="flex max-h-[80vh] flex-col"
    >
      {/* Scrollable content */}
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
        <FormTextarea
          name="message"
          label="Message"
          placeholder="Type your reply..."
          rows={10}
          
        />

        <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
          <div>
            <Label
              htmlFor="internal-note"
              className="font-medium"
            >
              Internal Note
            </Label>

            <p className="mt-1 text-xs text-muted-foreground">
              Only support staff can see internal notes.
            </p>
          </div>

          <Switch
            id="internal-note"
            checked={isInternalNote}
            onCheckedChange={(value) =>
              methods.setValue("isInternalNote", value)
            }
          />
        </div>

        <FormFileUpload
          name="attachments"
          label="Attachments"
          description="Upload screenshots or other relevant files."
          multiple
          mode="all"
          maxSizeMB={10}
          height="h-36"
        />
      </div>

      {/* Fixed bottom */}
      <div className="border-t  px-6 py-4">
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || !message.trim()}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  </FormProvider>
</DialogContent>
</Dialog>
  );
}
