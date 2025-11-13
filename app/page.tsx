"use client"
import { useState, useEffect } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import StudentCard from './studentCard';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

async function fetchData(courseCode: string) {
    const response = await fetch(`http://localhost:8000/course/${courseCode}`);
    const data = await response.json();
    return data;
}

export default function Home() {
    const [courseID, setCourseID] = useState("");
    const [studentIDs, setStudentIDs] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []); 

const handleOpenClick = async () => {
    console.log("Course ID:", courseID);
    const data = await fetchData(courseID);
    console.log("Full course data:", data);
    console.log("Student roster:", data.roster_list);
    
    let roster = data.roster_list || [];
    
    if (typeof roster === 'string') {
        try {
            roster = JSON.parse(roster);
        } catch (e) {
            console.error("Error parsing student roster:", e);
        }
    }
    
    console.log("Processed roster:", roster);
    setStudentIDs(roster);
};

    return (
        <div>
            <FieldSet>
                <FieldLegend>Profile</FieldLegend>
                <Field>
                    <FieldLabel htmlFor="courseID">Course ID</FieldLabel>
                    <Input 
                        id="courseID" 
                        autoComplete="off" 
                        placeholder="TED6091"
                        value={courseID}
                        onChange={(e) => setCourseID(e.target.value)}
                    />
                </Field>
            </FieldSet>
            <Sheet>
                <SheetTrigger asChild>
                    <Button onClick={handleOpenClick}>Open</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Attendance</SheetTitle>
                        <SheetDescription>Total Students - {studentIDs.length}</SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-4">
                        {studentIDs.map((id, index) => (
                            <StudentCard key={index} studentID={id} />
                        ))}
                        <Button className="w-full mt-4">Record Attendance</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}