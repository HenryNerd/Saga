"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Check your email for the magic link!")
    }
  }

  return (
    <>
      <Head>
        <title>Saga - Sign In</title>
      </Head>
      <main>
        <div className="min-h-screen bg-gray-800 flex items-center justify-center">
          <Card className="w-full max-w-sm bg-purple-300">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Saga</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-2 w-full"
              >
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
    </>
  )
}
