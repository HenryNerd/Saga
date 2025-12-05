'use client';
import {
    Card,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./button"
import { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import StudentCard from "./studentCard";
import { toast } from "sonner";

interface ClassCardProps {
    courseCode?: string
}

interface CourseData {
    roster_list: string[];
    courseName: string;
    teacher: string;
}

interface AttendanceRecord {
    studentID: string;
    status: string;
    comments?: string;
}

export default function ClassCard({ courseCode }: ClassCardProps) {
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

    const trimmedCode = courseCode?.trim() || "";
    const isNoCourse = trimmedCode === "" || trimmedCode === "NOCOURSE";

    useEffect(() => {
        if (isNoCourse) return;

        fetch(`http://localhost:8000/course/${trimmedCode}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch course data");
                return res.json();
            })
            .then((data: CourseData) => {
                setCourseData(data);
                const roster = Array.isArray(data.roster_list) ? data.roster_list : [];
                setAttendanceRecords(roster.map(id => ({
                    studentID: id,
                    status: "",
                    comments: ""
                })));
            })
            .catch(err => console.error(err));
    }, [trimmedCode, isNoCourse]);

    const colorMap = {
        active: "bg-red-200",
        neutral: "bg-gray-200",
        inactive: "bg-green-200"
    };

    const cardColor = isNoCourse ? colorMap.neutral : colorMap.active;

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
        if (!trimmedCode) return;

        const response = await fetch(`http://localhost:8000/attendance/${trimmedCode}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(attendanceRecords),
        });

        if (!response.ok) {
            toast.error("Failed to record attendance");
            return;
        }

        toast.success("Attendance recorded!");
    };

    return (
        <Card className={`w-89 h-[85px] p-4 ${cardColor}`}>
            <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{isNoCourse ? "No Course" : courseData?.courseName || trimmedCode}</CardTitle>

                {!isNoCourse && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="w-18 bg-gradient-to-r from-indigo-500 to-purple-500">
                                Open
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>{courseData?.courseName || "Attendance"}</SheetTitle>
                                <SheetDescription>
                                    Teacher: {courseData?.teacher || "Unknown"} <br />
                                    Total Students: {courseData?.roster_list?.length || 0}
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-4 space-y-4">
                                {courseData?.roster_list?.map((id, index) => (
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
                    </Sheet>
                )}
            </div>
        </Card>
    )
}
