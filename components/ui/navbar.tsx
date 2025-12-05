import { useState, useEffect } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
        try {
            const storedFname = localStorage.getItem("fname");
            const storedLname = localStorage.getItem("lname");
            if (storedFname) setFname(storedFname);
            if (storedLname) setLname(storedLname);
            console.log("Loaded from localStorage:", storedFname, storedLname);
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            setFname("");
            setLname("");
        }
    }, []);

    const logout = () => {
        router.push('/');
        localStorage.removeItem("fname");
        localStorage.removeItem("lname");
    }

    return (
        <div className="flex w-full justify-between items-center">
            <NavigationMenu>
                <NavigationMenuList className="flex items-center">
                    <NavigationMenuItem className="text-4xl m-3 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Saga
                    </NavigationMenuItem>
                    <NavigationMenuItem className="mx-1 cursor-pointer">
                        <NavigationMenuLink className="text-3xl" href="/home">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem onClick={logout} className="text-2xl m-3 cursor-pointer">
                        {fname} {lname}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}