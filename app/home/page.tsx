"use client"
import { useState, useEffect } from "react";
import {
    Card,
    CardTitle,
} from "@/components/ui/card"
import NavBar from "@/components/ui/navbar";
import ClassCard from "@/components/ui/classCard";

export default function Home() {
    const [fname, setFname] = useState("")
    const [isMounted, setIsMounted] = useState(false);
    const [courses, setCourses] = useState<string[]>([]);

    useEffect(() => {
        setIsMounted(true);
        try {
            const storedFname = localStorage.getItem("fname");
            if (storedFname) setFname(storedFname);
            getCourses();
        } catch (error) {
            console.error("Error reading from localStorage:", error);
        }
    }, []);

    async function getCourses() {
        try {
            const userID = localStorage.getItem("userID");
            if (!userID) {
                console.error("No userID found in localStorage");
                return null;
            }
            
            const response = await fetch(`http://localhost:8000/courses/${userID}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            
            const data = await response.json();
            console.log(data);
            setCourses(data);
            return data;
        } catch (error) {
            console.error("Error fetching courses:", error);
            return null;
        }
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavBar></NavBar>
            <br></br>
            <div className="flex w-full justify-center items-center">
                <Card className="w-235 h-auto mt-6 mb-6 p-12">
                    <CardTitle className="text-3xl mb-6">Hello, {fname}</CardTitle>
                    <div className="flex flex-col gap-12">
                        <div className="flex gap-6 items-center">
                            <h1 className="text-3xl">1</h1>
                            <ClassCard courseCode={courses[0]}></ClassCard>
                            <ClassCard courseCode={courses[4]}></ClassCard>
                        </div>

                        <div className="flex gap-6 items-center">
                            <h1 className="text-3xl">2</h1>
                            <ClassCard courseCode={courses[1]}></ClassCard>
                            <ClassCard courseCode={courses[5]}></ClassCard>
                        </div>

                        <div className="flex gap-6 items-center">
                            <h1 className="text-3xl">3</h1>
                            <ClassCard courseCode={courses[2]}></ClassCard>
                            <ClassCard courseCode={courses[6]}></ClassCard>
                        </div>

                        <div className="flex gap-6 items-center">
                            <h1 className="text-3xl">4</h1>
                            <ClassCard courseCode={courses[3]}></ClassCard>
                            <ClassCard courseCode={courses[7]}></ClassCard>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}