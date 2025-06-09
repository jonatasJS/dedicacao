"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";

export default function Home() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };
  const handleSubmit = () => {
    if (otp === "0512") {
      router.push("/amor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Para acessar o site, coloque a senha abaixo:</h1>
      <InputOTP maxLength={4} value={otp} onChange={handleOtpChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSeparator />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <Button onClick={handleSubmit}>Acessar</Button>

      <p className="text-sm text-muted-foreground">
        Dica da senha: "a nossa senha usanda nos nossos celulares"
      </p>
    </div >
  );
}
