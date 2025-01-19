"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Sparkles,
  AlertTriangle,
  Newspaper,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PublishDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onAction: () => void;
  isLoading?: boolean;
}

function PublishDialog({
  isOpen = true,
  onClose = () => {},
  onAction,
  isLoading,
}: PublishDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (!isLoading) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold flex items-center justify-center gap-2 mb-4">
            <Newspaper className="w-6 h-6" />
            Publish Blog
          </DialogTitle>
          <DialogDescription className="mt-4 mb-10 text-lg text-muted-foreground">
            Publish your blog to make it available to your audience.
            <br />
            NOTE : Once the blog is published you wont be able to edit it!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onAction}
            className="w-full text-lg py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              "Publish"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default PublishDialog;
