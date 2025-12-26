"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Phone, ArrowRight, Loader2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store"; // Assuming store exports AppDispatch

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  preFilledPhone?: string;
}

type Step = "PHONE" | "OTP";

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  preFilledPhone,
}: AuthModalProps) {
  const [step, setStep] = useState<Step>("PHONE");
  const [phone_number, setPhone] = useState(preFilledPhone || "");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (preFilledPhone) {
      setPhone(preFilledPhone);
    }
  }, [preFilledPhone]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone_number.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      await dispatch(sendOtp({ phone_number })).unwrap();
      setLoading(false);
      setStep("OTP");
    } catch (error) {
      setLoading(false);
      // Toast handled in slice
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await dispatch(verifyOtp({ phone_number, otp, name })).unwrap();
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/account");
      }
      onClose();
      // Reset state after close
      setTimeout(() => {
        setStep("PHONE");
        setPhone("");
        setName("");
        setOtp("");
      }, 300);
    } catch (error) {
      setLoading(false);
      // Toast handled in slice
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-display">
            {step === "PHONE" ? "Login / Sign Up" : "Enter OTP"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === "PHONE"
              ? "Enter your mobile number to continue"
              : `We sent a code to +91 ${phone_number}`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {step === "PHONE" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Full Name"
                  className="pl-9"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className="pl-9"
                  value={phone_number}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) setPhone(value);
                  }}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading || phone_number.length < 10}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Send OTP <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4 flex flex-col items-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button
                onClick={handleVerifyOtp}
                className="w-full"
                disabled={loading || otp.length < 6}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Verify & Login"
                )}
              </Button>

              <button
                onClick={() => setStep("PHONE")}
                className="text-sm text-muted-foreground hover:text-primary underline"
              >
                Change Phone Number
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
