"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmail } from "@/context/EmailContext";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

export default function Page() {
    const { email } = useEmail();
    const [message, setMessage] = useState("");
    const [timer, setTimer] = useState(60);
    const [isSending, setIsSending] = useState(false);

    // Countdown effect
    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    // Function to resend the OTP email
    const handleResend = async () => {
        if (isSending || timer > 0) return; // prevent spamming

        setMessage("");
        setIsSending(true);

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: true },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage(`A new code has been sent to ${email}`);
            setTimer(60); // restart 60-second countdown
        }

        setIsSending(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <Card className="w-full max-w-md bg-purple-300">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Sign In</CardTitle>
                    <Alert variant="default" className="mt-4 w-full">
                        <CheckCircle2Icon className="h-5 w-5 text-green-500 mr-2 inline" />
                        <div>
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                A code has been sent to {email}
                            </AlertDescription>
                        </div>
                    </Alert>
                    {message && (
                        <p className="text-center text-sm mt-2 text-black">{message}</p>
                    )}
                </CardHeader>

                <CardContent className="flex flex-col items-center text-center">
                    <InputOTP maxLength={6} className="justify-center">
                        <InputOTPGroup>
                            <InputOTPSlot className="bg-white" index={0} />
                            <InputOTPSlot className="bg-white" index={1} />
                            <InputOTPSlot className="bg-white" index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot className="bg-white" index={3} />
                            <InputOTPSlot className="bg-white" index={4} />
                            <InputOTPSlot className="bg-white" index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <div className="w-full mt-6 space-y-3">
                        <Button className="w-full">Sign In</Button>
                        <hr className="border-gray-300" />
                        <Button
                            variant="secondary"
                            className="w-full"
                            onClick={handleResend}
                            disabled={timer > 0 || isSending}
                        >
                            {timer > 0 ? `Re-Send Code (${timer}s)` : "Re-Send Code"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
