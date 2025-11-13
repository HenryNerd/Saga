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
}

interface StudentData {
    firstName: string;
    lastName: string;
    grade: string;
    school: string;
}

export default function StudentCard({ studentID }: StudentCardProps) {
    const [attendance, setAttendance] = useState("");
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log('Fetching student:', studentID); // Debug log
                const response = await fetch(`http://localhost:8000/student/${studentID}`);
                const data = await response.json();
                console.log('Student data received:', data); // Debug log
                setStudentData(data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [studentID]);

    console.log('Rendering StudentCard:', { studentID, studentData, loading }); // Debug log

    return (
        <Card className="m-2">
            <CardContent className="pt-6 text-lg">
                {loading && <p>Loading...</p>}
                {!loading && !studentData && <p>No student data found</p>}
                {studentData && (
                    <h2 className="mb-4 font-semibold">
                        {studentData.firstName} {studentData.lastName}
                    </h2>
                )}
                <ToggleGroup
                    type="single"
                    variant="outline"
                    value={attendance}
                    onValueChange={setAttendance}
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
                            <Input id={`tardy-${studentID}`} type="text" />
                        </Field>
                    </FieldSet>
                )}
                {attendance === "absent" && (
                    <FieldSet className="mt-4">
                        <Field>
                            <FieldLabel htmlFor={`absent-${studentID}`}>Comments</FieldLabel>
                            <Input id={`absent-${studentID}`} type="text" />
                        </Field>
                    </FieldSet>
                )}
            </CardContent>
        </Card>
    );
}