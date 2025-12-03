"use client"
import { useState, useEffect } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import StudentCard from '../../components/ui/studentCard';
import {
    Field,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import schuduleCard from '../../components/ui/schuduleCard';

interface CourseResponse {
    roster_list: string[];
    courseName: string;
    teacher: string;
}

interface AttendanceRecord {
    studentID: string;
    status: string;
    comments?: string;
}

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircleIcon, Car, Router } from "lucide-react"
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
import NavBar from "@/components/ui/navbar";

async function fetchData(courseCode: string): Promise<CourseResponse> {
    const response = await fetch(`http://localhost:8000/course/${courseCode}`);
    if (!response.ok) throw new Error("Failed to fetch course data");
    return response.json();
}

export default function Home() {
    const [courseID, setCourseID] = useState("");
    const [studentIDs, setStudentIDs] = useState<string[]>([]);
    const [courseName, setCourseName] = useState("");
    const [teacher, setTeacher] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [userID, setUserID] = useState("")
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        try {
            const storedFname = localStorage.getItem("fname");
            const storedLname = localStorage.getItem("lname");
            const storedUserID = localStorage.getItem("userID");
            if (storedFname) setFname(storedFname);
            if (storedLname) setLname(storedLname);
            if (storedUserID) setUserID(storedUserID);
        } catch (error) {
            console.error("Error reading from localStorage:", error);
        }
    }, []);

    const handleOpenClick = async () => {
        console.log("Course ID:", courseID);
        const data = await fetchData(courseID);
        console.log("Full course data:", data);
        const roster = Array.isArray(data.roster_list)
            ? data.roster_list
            : [];
        console.log("Processed roster:", roster);
        setStudentIDs(roster);
        setCourseName(data.courseName);
        setTeacher(data.teacher);
        setAttendanceRecords(roster.map(id => ({
            studentID: id,
            status: "",
            comments: ""
        })));
        if (data.teacher === `${lname}, ${fname}`) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const updateAttendance = (index: number, status: string, comments?: string) => {
        setAttendanceRecords(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                status,
                comments: comments || updated[index].comments
            };
            return updated;
        });
    };

    const handleRecordAttendance = async () => {
        console.log("Recording attendance:", attendanceRecords);

        const response = await fetch(`http://localhost:8000/attendance/${courseID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(attendanceRecords),
        });

        console.log("Recorded Attendance");

        if (!response.ok) {
            toast.error("Failed to record attendance");
            return;
        }

        toast.success("Attendance recorded!");
    };


    if (!isMounted) {
        return null;
    }

    const logout = () => {
        router.push('/');
        localStorage.removeItem("fname");
        localStorage.removeItem("lname");
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
                            <Card className="w-89 h-auto p-4 bg-red-200">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">AP CSA</CardTitle>
                                    <Button className="w-18 bg-gradient-to-r from-indigo-500 to-purple-500">Open</Button>
                                </div>
                            </Card>
                            <Card className="w-89 h-auto p-4 bg-emerald-200">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">AP CSP</CardTitle>
                                    <Button className="w-18 bg-gradient-to-r from-indigo-500 to-purple-500">Open</Button>
                                </div>
                            </Card>
                        </div>

                        <div className="flex gap-6 items-center">
                            <h1 className="text-3xl">2</h1>
                            <Card className="w-89 h-auto p-4 bg-red-200">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">COMP PROGRAMMING</CardTitle>
                                    <Button className="w-18 bg-gradient-to-r from-indigo-500 to-purple-500">Open</Button>
                                </div>
                            </Card>
                            <Card className="w-89 h-auto p-4 bg-red-200">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">COMP PROGRAMMING</CardTitle>
                                    <Button className="w-18 bg-gradient-to-r from-indigo-500 to-purple-500">Open</Button>
                                </div>
                            </Card>
                        </div>

                        <div className="flex gap-6 items-center">
                            <h1 className="text-3xl">3</h1>
                            <Card className="w-89 h-auto p-4 bg-slate-200">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">No Course</CardTitle>
                                </div>
                            </Card>
                            <Card className="w-89 h-auto p-4 bg-red-200">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">AP CSA</CardTitle>
                                    <Button className="w-18 bg-gradient-to-r from-indigo-500 to-purple-500">Open</Button>
                                </div>
                            </Card>
                        </div>

                        <div className="flex gap-6 items-center">
                            <h1 className="text-3xl">4</h1>
                            <Card className="w-89 h-auto p-4 bg-red-200">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">COMP PROGRAMMING</CardTitle>
                                    <Button className="w-18 bg-gradient-to-r from-indigo-500 to-purple-500">Open</Button>
                                </div>
                            </Card>
                            <Card className="w-89 h-auto p-4 bg-amber-200">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">ASR - 12/25 Seats</CardTitle>
                                    <Button className="w-18 bg-gradient-to-r from-indigo-500 to-purple-500">Open</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}