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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ScheduleCardProps {
    courseName?: string
    teacher?: string
    studentIDs?: string[]
    attendanceRecords?: Array<{ status: string; comments: string }>
    onRecordAttendance?: () => void
    onAttendanceChange?: (index: number, status: string) => void
    onCommentsChange?: (index: number, comments: string) => void
}

export default function ScheduleCard({
    courseName = "Attendance",
    teacher = "Unknown",
    studentIDs = [],
    attendanceRecords = [],
    onRecordAttendance,
    onAttendanceChange,
    onCommentsChange,
}: ScheduleCardProps) {

    return (
        <Card className="w-full max-w-sm">
        <Sheet>
            <SheetTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Open</Button>
            </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{courseName}</SheetTitle>
                        <SheetDescription>
                            Teacher: {teacher} <br />
                            Total Students: {studentIDs.length}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-4">
                        {studentIDs.map((id, index) => (
                            <div key={index} className="p-2 border rounded">
                                <p>{id}</p>
                                <p>Status: {attendanceRecords[index]?.status || "Not marked"}</p>
                                <p>Comments: {attendanceRecords[index]?.comments || "None"}</p>
                            </div>
                        ))}
                        <SheetClose>
                            <Button 
                                className="w-full m-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" 
                                onClick={onRecordAttendance}
                            >
                                Record Attendance
                            </Button>
                        </SheetClose>
                    </div>
                </SheetContent>
        </Sheet>
        </Card>
    )
}