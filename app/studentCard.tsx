"use client";
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
    Field,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface StudentCardProps {
    studentID: string;
    attendance: string;
    comments: string;
    onAttendanceChange: (status: string) => void;
    onCommentsChange: (comments: string) => void;
}

interface StudentData {
    firstName: string;
    lastName: string;
    grade: string;
    school: string;
}

export default function StudentCard({ 
    studentID, 
    attendance, 
    comments,
    onAttendanceChange,
    onCommentsChange
}: StudentCardProps) {
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log('Fetching student:', studentID);
                const response = await fetch(`http://localhost:8000/student/${studentID}`);
                const data = await response.json();
                console.log('Student data received:', data);
                setStudentData(data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [studentID]);

    console.log('Rendering StudentCard:', { studentID, studentData, loading });

    return (
        <Card className="mt-2 ml-2 mr-2">
            <CardContent className="pt-0 text-lg">
                {loading && <p>Loading...</p>}
                {!loading && !studentData && <p>No student data found</p>}
                {studentData && (
                    <>
                        <h2 className="mb-0 font-semibold">
                            {studentData.firstName} {studentData.lastName}
                        </h2>
                        <h4 className="mt-0 mb-4 font-semibold text-sm font-thin">
                            {studentID} | Grade: {studentData.grade}
                        </h4>
                    </>
                )}
                <ToggleGroup
                    type="single"
                    variant="outline"
                    value={attendance}
                    onValueChange={onAttendanceChange}
                >
                    <ToggleGroupItem
                        value="present"
                        aria-label="Toggle present"
                        className="data-[state=on]:bg-green-700 data-[state=on]:text-white"
                    >
                        P
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="absent"
                        aria-label="Toggle absent"
                        className="data-[state=on]:bg-red-500 data-[state=on]:text-white"
                    >
                        A
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="tardy"
                        aria-label="Toggle tardy"
                        className="data-[state=on]:bg-yellow-500 data-[state=on]:text-black"
                    >
                        T
                    </ToggleGroupItem>
                </ToggleGroup>
                {attendance === "tardy" && (
                    <FieldSet className="mt-4">
                        <Field>
                            <FieldLabel htmlFor={`tardy-${studentID}`}>Comments</FieldLabel>
                            <Input 
                                id={`tardy-${studentID}`} 
                                type="text"
                                value={comments}
                                onChange={(e) => onCommentsChange(e.target.value)}
                            />
                        </Field>
                    </FieldSet>
                )}
                {attendance === "absent" && (
                    <FieldSet className="mt-4">
                        <Field>
                            <FieldLabel htmlFor={`absent-${studentID}`}>Comments</FieldLabel>
                            <Input 
                                id={`absent-${studentID}`} 
                                type="text"
                                value={comments}
                                onChange={(e) => onCommentsChange(e.target.value)}
                            />
                        </Field>
                    </FieldSet>
                )}
            </CardContent>
        </Card>
    );
}