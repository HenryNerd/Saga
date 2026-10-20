'use client'
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useState } from "react";
import Students from "@/components/ui/pages/students";
import { BellElectric } from "lucide-react";

export interface Student{
  id: string;
  name: string;
  grade: string;
  school: string;
  picture: string;
}

export default function Home() {
  const [page, setPage] = useState("/");

  function pushToPage(newPage: string){
    setPage(newPage);
  }

  return (
    <div>
      <main>
        <Navbar push={pushToPage}/>
        {page === "/" && (
          <div className="bg-amber-100 w-full h-screen">

          </div>
        )}
        {page === "/students" && (
          <div>
            <Students />
          </div>
        )}
      </main>
    </div>
  );
}

function Navbar({ push }: { push: (page: string) => void }) {
  return (
    <Menubar className="bg-rose-800 border-0 rounded-t-none rounded-b-sm flex items-center h-12 p-1">
      <MenubarMenu>
        <MenubarTrigger className="text-3xl font-semi"><BellElectric className="mr-2 size-8"/> Saga</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="text-lg rounded-md hover:bg-rose-900">Students</MenubarTrigger>
        <MenubarContent className="bg-rose-900">
          <MenubarGroup>
            <MenubarItem className="hover:bg-rose-950" onClick={() => push("/students")}>All Students</MenubarItem>
            <MenubarItem className="hover:bg-rose-950">Lookup Student</MenubarItem>
            <MenubarItem className="hover:bg-rose-950">Enroll Student</MenubarItem>
            <MenubarItem className="hover:bg-rose-950">Student Bulk Action</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}