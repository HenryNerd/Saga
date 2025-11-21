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
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(true);

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
            <div className="flex w-full justify-between items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem className="text-4xl m-3 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Saga
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem onClick={logout} className="text-2xl m-3 cursor-pointer">
                            Hello, {fname} {lname}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <br></br>
            <div className="grid place-items-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Find A Course</CardTitle>
                        {!isVisible &&
                            <Alert variant="destructive">
                                <AlertCircleIcon className="flex-shrink-0" />
                                <AlertTitle className="">
                                    You are not the teacher of this course.
                                </AlertTitle>
                            </Alert>
                        }
                    </CardHeader>
                    <CardContent>
                        <FieldSet>
                            <Field>
                                <FieldLabel className="w-3xs" htmlFor="courseID">Course ID</FieldLabel>
                                <Input
                                    id="courseID"
                                    autoComplete="off"
                                    placeholder="TED6091"
                                    value={courseID}
                                    onChange={(e) => setCourseID(e.target.value)}
                                    className="mb-6"
                                />
                            </Field>
                        </FieldSet>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={handleOpenClick}>Open</Button>
                            </SheetTrigger>
                            {isVisible &&
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>{courseName || "Attendance"}</SheetTitle>
                                        <SheetDescription>
                                            Teacher: {teacher || "Unknown"} <br />
                                            Total Students: {studentIDs.length}
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="mt-4 space-y-4">
                                        {studentIDs.map((id, index) => (
                                            <StudentCard
                                                key={index}
                                                studentID={id}
                                                attendance={attendanceRecords[index]?.status || ""}
                                                comments={attendanceRecords[index]?.comments || ""}
                                                onAttendanceChange={(status) => updateAttendance(index, status)}
                                                onCommentsChange={(comments) => updateAttendance(index, attendanceRecords[index]?.status, comments)}
                                            />
                                        ))}
                                        <SheetClose>
                                            <Button className="w-full m-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={handleRecordAttendance}>
                                                Record Attendance
                                            </Button>
                                        </SheetClose>
                                    </div>
                                </SheetContent>
                            }
                        </Sheet>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}