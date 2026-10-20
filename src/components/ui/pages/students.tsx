import { Student } from "@/app/page"
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Students() {
    return (
        <div className="bg-amber-100 w-full h-screen overflow-hidden p-2">
            <div className="bg-rose-800 w-full h-fit rounded-lg p-2">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>Students</BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>All Students</BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <StudentCard id="12345" name="Test Student" grade="10" school="Test High School" picture="" />
        </div>
    )
}

function StudentCard({ id, name, grade, school, picture }: Student) {
    return (
        <div className="bg-mist-600 w-full h-fit p-2 rounded-lg mt-2 flex gap-2 items-center">
            <Avatar>
                <AvatarImage src={picture} />
                <AvatarFallback>TS</AvatarFallback>
            </Avatar>
            <h1 className="font-zinc-100 text-xl font-semi">{name}</h1>
        </div>
    )
}