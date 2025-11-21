"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ExamplePage() {
    const router = useRouter()
    const [userID, setUserID] = useState("")
    const [studentData, setStudentData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    async function fetchData(id: string) {
        try {
            setLoading(true)
            console.log("Fetching student:", id)

            const response = await fetch(`http://localhost:8000/student/${id}`)
            const data = await response.json()

            console.log("Student data received:", data)
            setStudentData(data)

            if (data.firstName) localStorage.setItem("fname", data.firstName)
            if (data.lastName) localStorage.setItem("lname", data.lastName)
            localStorage.setItem("userID", id)

        } catch (error) {
            console.error("Error fetching student data:", error)
        } finally {
            setLoading(false)
            console.log("Redirecting to /home")
            router.push("/home")
        }
    }


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        console.log("User ID:", userID)
        fetchData(userID)
    }

    return (
        <div className="bg-gray-100 min-h-screen overflow-hidden">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem
                        className="text-4xl m-3 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        Saga
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-center text-xl">Sign In</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="userID">User ID:</Label>
                                    <Input
                                        id="userID"
                                        type="text"
                                        placeholder="123456"
                                        value={userID}
                                        onChange={(e) => setUserID(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <CardFooter className="flex-col gap-2 mt-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                >
                                    Log In
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
