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

export default function schuduleCard() {

    return (
        <Card className="w-full max-w-sm">
        <Sheet>
            <SheetTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={handleOpenClick}>Open</Button>
            </SheetTrigger>
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
        </Sheet>
        </Card>
    )
}