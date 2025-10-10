"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEmail } from "@/context/EmailContext";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react"

export default function Home() {
  const router = useRouter();
  const { email, setEmail } = useEmail();
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    if (error) setMessage(error.message);
    router.push("/auth/verify");
  };

  return (
    <main>
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <Card className="w-full max-w-sm bg-purple-300">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Saga</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleLogin} className="flex flex-col gap-2 w-full">
              <Input
                type="email"
                placeholder="Email"
                className="bg-white text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="outline">
                Sign In
              </Button>
            </form>
            {message && (
              <p className="text-center text-sm mt-2 text-black">{message}</p>
            )}
            <hr className="border-gray-300 my-2" />
            <h6 className="text-center">Saga | v1.0.0 | Build: Development</h6>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}