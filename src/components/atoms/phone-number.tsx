import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PhoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (phoneNumber: string) => void;
}

const PhoneDialog: React.FC<PhoneDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }

    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit number");
      return;
    }

    onSubmit("+91" + phoneNumber);
    setPhoneNumber("");
    setError("");
    onOpenChange(false);
    toast.success("Phone number submitted successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Please enter your phone number
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <div className="flex">
              <div className="flex items-center px-3  border border-r-0 rounded-l-md">
                +91
              </div>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={handleInputChange}
                className="rounded-l-none bg-transparent "
                placeholder="Enter 10-digit number"
                autoComplete="tel"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button type="submit" className="w-full">
            Get a Call
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneDialog;
