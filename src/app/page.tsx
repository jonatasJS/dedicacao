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

export const dynamic = 'force-static';

export default function Home() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setErrorMessage("");
  };
  const handleSubmit = () => {
    if (otp === "0512") {
      localStorage.setItem('loggedIn', 'true');
      router.push("/amor");
    } else {
      setErrorMessage("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-center text-2xl font-bold">Para acessar o site, coloque a senha abaixo:</h1>
      <InputOTP maxLength={4} value={otp} onChange={handleOtpChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSeparator />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      <Button onClick={handleSubmit}>Acessar</Button>

      <p className="text-sm text-center text-muted-foreground">
        <strong>Dica da senha:</strong> "O dia e o mês em que a nossa história ganhou um sim especial."
      </p>
    </div >
  );
}
