import { useState } from "react";
import { CheckCircle, XCircle, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  isSuccess: boolean;
}

export function PurchaseDialog({
  isOpen,
  onClose,
  onAction,
  isSuccess,
}: PurchaseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold flex items-center justify-center gap-2 mb-4">
            {isSuccess ? (
              <>
                <CheckCircle className="h-8 w-8 text-green-500" />
                Purchase Successful
              </>
            ) : (
              <>
                <XCircle className="h-8 w-8 text-destructive" />
                Purchase Failed
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            {isSuccess
              ? "Thank you for purchasing a plan for our AI tool. We're excited to have you on board!"
              : "We apologize, but there was an issue processing your purchase. Don't worry, we're here to help."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8 min-h-[200px] text-center">
          {isSuccess ? (
            <>
              <Sparkles className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-primary mb-2">
                Welcome to Blogify Pro!
              </h3>
              <p className="text-muted-foreground mb-4">
                You can now generate 5 more blogs using our AI tool. Here are a
                few features you can enjoy:
              </p>
              <ul className="text-left text-sm space-y-2 mb-4">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> AI
                  Transciptions from audio, video and pdf files
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> AI
                  Translation supporting 10 languages
                </li>
              </ul>
            </>
          ) : (
            <>
              <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
              <h3 className="text-2xl font-semibold text-destructive mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-muted-foreground mb-4">
                Don't worry, your account hasn't been charged. Here are a few
                things you can try:
              </p>
              <ul className="text-left text-sm space-y-2 mb-4">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" /> Check
                  your payment details
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" /> Ensure
                  you have sufficient funds
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" /> Try a
                  different payment method
                </li>
              </ul>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onAction} className="w-full text-lg py-6">
            {isSuccess ? "Get Started with Premium AI" : "Try Purchase Again"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PurchaseDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleOpen = (success: boolean) => {
    setIsSuccess(success);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleAction = () => {
    console.log(
      isSuccess
        ? "Getting started with Premium AI..."
        : "Trying purchase again..."
    );
    handleClose();
  };

  return (
    <div className="flex gap-4">
      <Button onClick={() => handleOpen(true)}>Show Success Dialog</Button>
      <Button onClick={() => handleOpen(false)}>Show Failure Dialog</Button>
      <PurchaseDialog
        isOpen={isOpen}
        onClose={handleClose}
        onAction={handleAction}
        isSuccess={isSuccess}
      />
    </div>
  );
}
